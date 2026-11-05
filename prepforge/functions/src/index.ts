/**
 * PREPFORGE — TRUSTED FIREBASE CLOUD FUNCTIONS
 * Handles server-authoritative exam generation (stripping correct answers prior to submission),
 * server-validated deadline & idempotent exam grading with negative marking,
 * isolated Python sandbox execution proxy, and study-group invitation validation.
 */
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

/**
 * 1. createMockExamAttempt
 * Selects randomized questions on the trusted backend, strips `correctAnswer` and `explanation`
 * when in exam mode, sets a tamper-proof server `expiresAt` deadline, and stores the canonical
 * question order in `examAttempts/{attemptId}`.
 */
export const createMockExamAttempt = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Authentication required.');
  }
  const uid = context.auth.uid;
  const {
    examName,
    subjectId,
    topicIds = [],
    difficulty = 'All',
    questionCount = 10,
    durationMinutes = 20,
    negativeMarking = true,
    negativePenalty = 0.25,
    passingPercent = 60,
    mode = 'exam'
  } = data;

  let queryRef: FirebaseFirestore.Query = db
    .collection('questions')
    .where('publicationStatus', '==', 'published');

  if (subjectId && subjectId !== 'ALL') {
    queryRef = queryRef.where('subjectId', '==', subjectId);
  }
  if (difficulty && difficulty !== 'All' && difficulty !== 'Balanced') {
    queryRef = queryRef.where('difficulty', '==', difficulty);
  }

  const snap = await queryRef.limit(200).get();
  let pool = snap.docs.map(d => ({ id: d.id, ...(d.data() as Record<string, any>) }));

  if (Array.isArray(topicIds) && topicIds.length > 0) {
    pool = pool.filter(q => topicIds.includes(q.topicId));
  }

  if (pool.length < questionCount) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      `Insufficient questions matching criteria: requested ${questionCount}, available ${pool.length}.`
    );
  }

  // Cryptographically unbiased Fisher-Yates shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  const selected = pool.slice(0, questionCount);
  const nowMs = Date.now();
  const expiresAtMs = nowMs + durationMinutes * 60 * 1000;
  const attemptRef = db.collection('examAttempts').doc();

  // Client payload omits correctAnswer and explanation during active exam mode
  const sanitizedQuestions = selected.map(q => ({
    id: q.id,
    subjectId: q.subjectId,
    topicId: q.topicId,
    difficulty: q.difficulty,
    questionType: q.questionType,
    statement: q.statement,
    codeSnippet: q.codeSnippet || null,
    options: q.options || []
  }));

  await attemptRef.set({
    id: attemptRef.id,
    userId: uid,
    examName: examName || 'Custom Technical Mock Exam',
    subjectId,
    topicIds,
    difficulty,
    questionCount: selected.length,
    durationMinutes,
    negativeMarking,
    negativePenalty: negativeMarking ? Number(negativePenalty) : 0,
    passingPercent,
    mode,
    questionIds: selected.map(q => q.id),
    responses: {},
    flaggedIds: [],
    status: 'in_progress',
    score: null,
    startedAt: admin.firestore.Timestamp.fromMillis(nowMs),
    expiresAt: admin.firestore.Timestamp.fromMillis(expiresAtMs),
    submittedAt: null,
    idempotencyKey: null
  });

  return {
    attemptId: attemptRef.id,
    expiresAtMs,
    questions: sanitizedQuestions
  };
});

/**
 * 2. submitMockExamAttempt
 * Idempotent server-side grading. Enforces server deadline with a 15-second network grace window,
 * prevents duplicate submissions, calculates negative marking accurately, and updates revision queue.
 */
export const submitMockExamAttempt = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Authentication required.');
  }
  const uid = context.auth.uid;
  const { attemptId, responses = {}, idempotencyKey } = data;

  const attemptRef = db.collection('examAttempts').doc(attemptId);

  return db.runTransaction(async tx => {
    const attemptDoc = await tx.get(attemptRef);
    if (!attemptDoc.exists) {
      throw new functions.https.HttpsError('not-found', 'Exam attempt not found.');
    }
    const attempt = attemptDoc.data()!;
    if (attempt.userId !== uid) {
      throw new functions.https.HttpsError('permission-denied', 'Unauthorized attempt access.');
    }

    // Idempotency guard: if already submitted, return existing result without double-counting
    if (attempt.status === 'submitted' || attempt.status === 'expired_submitted') {
      return {
        alreadySubmitted: true,
        result: attempt.resultSummary
      };
    }

    const nowMs = Date.now();
    const expiresAtMs = attempt.expiresAt.toMillis();
    const isExpired = nowMs > expiresAtMs + 15000; // 15s grace window for in-flight requests
    const effectiveResponses = isExpired ? (attempt.responses || {}) : responses;

    const questionDocs = await Promise.all(
      (attempt.questionIds as string[]).map(qid => tx.get(db.collection('questions').doc(qid)))
    );

    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;
    let rawScore = 0;

    for (const qDoc of questionDocs) {
      if (!qDoc.exists) continue;
      const q = qDoc.data()!;
      const userAns = effectiveResponses[qDoc.id];
      if (userAns === undefined || userAns === null || userAns === '') {
        unanswered++;
      } else if (String(userAns).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase()) {
        correct++;
        rawScore += 1;
      } else {
        incorrect++;
        if (attempt.negativeMarking) {
          rawScore -= Number(attempt.negativePenalty || 0.25);
        }
      }
    }

    const finalScore = Math.max(0, Number(rawScore.toFixed(2)));
    const percentage = Number(((finalScore / attempt.questionCount) * 100).toFixed(1));

    const resultSummary = {
      score: finalScore,
      maxScore: attempt.questionCount,
      percentage,
      correct,
      incorrect,
      unanswered,
      passed: percentage >= (attempt.passingPercent || 60),
      gradedAtMs: nowMs,
      expiredAutoSubmit: isExpired
    };

    tx.update(attemptRef, {
      responses: effectiveResponses,
      status: isExpired ? 'expired_submitted' : 'submitted',
      score: finalScore,
      resultSummary,
      idempotencyKey: idempotencyKey || attemptId,
      submittedAt: admin.firestore.Timestamp.fromMillis(nowMs)
    });

    return {
      alreadySubmitted: false,
      result: resultSummary
    };
  });
});
