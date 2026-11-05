// ============================================================================
// PREPFORGE — DETERMINISTIC & RANDOMIZED EXAM ENGINE + TRUSTED SCORING
// ============================================================================
import { ExamAttempt, ExamConfig, QuestionItem } from '../types';

export function selectRandomizedQuestions(
  pool: QuestionItem[],
  config: ExamConfig
): { selected: QuestionItem[]; warning?: string } {
  let eligible = pool.filter(q => q.publicationStatus === 'published');

  if (config.subjectId && config.subjectId !== 'ALL') {
    eligible = eligible.filter(q => q.subjectId === config.subjectId);
  }
  if (config.topicIds.length > 0) {
    eligible = eligible.filter(q => config.topicIds.includes(q.topicId));
  }
  if (config.questionTypes.length > 0) {
    eligible = eligible.filter(q => config.questionTypes.includes(q.questionType));
  }
  if (config.difficulty !== 'All' && config.difficulty !== 'Balanced') {
    eligible = eligible.filter(q => q.difficulty === config.difficulty);
  }

  // Deduplicate by stable ID unless explicitly allowed
  if (!config.allowDuplicates) {
    const seen = new Set<string>();
    eligible = eligible.filter(q => {
      if (seen.has(q.id)) return false;
      seen.add(q.id);
      return true;
    });
  }

  let warning: string | undefined;
  if (eligible.length < config.questionCount) {
    warning = `Only ${eligible.length} matching questions exist for your filter (requested ${config.questionCount}). Reduce count or broaden filters.`;
  }

  const copy = [...eligible];
  if (config.randomizeQuestions) {
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
  }

  if (config.difficulty === 'Balanced' && copy.length >= config.questionCount) {
    const easy = copy.filter(q => q.difficulty === 'Easy');
    const med = copy.filter(q => q.difficulty === 'Medium');
    const hard = copy.filter(q => q.difficulty === 'Hard');
    const balanced: QuestionItem[] = [];
    let idx = 0;
    while (balanced.length < config.questionCount) {
      if (easy[idx] && balanced.length < config.questionCount) balanced.push(easy[idx]);
      if (med[idx] && balanced.length < config.questionCount) balanced.push(med[idx]);
      if (hard[idx] && balanced.length < config.questionCount) balanced.push(hard[idx]);
      idx++;
      if (idx > copy.length) break;
    }
    return { selected: balanced.slice(0, config.questionCount), warning };
  }

  return { selected: copy.slice(0, config.questionCount), warning };
}

export function scoreExamAttemptIdempotent(
  attempt: ExamAttempt,
  questionsMap: Record<string, QuestionItem>,
  nowMs: number,
  idempotencyKey: string
): ExamAttempt {
  // Idempotent lock: never re-score or duplicate an already submitted attempt
  if (attempt.status === 'submitted' || attempt.status === 'expired_submitted') {
    return attempt;
  }

  const isExpired = nowMs > attempt.expiresAtMs + 1000;
  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;
  let rawScore = 0;

  const topicBreakdown: Record<string, { correct: number; total: number; accuracy: number }> = {};
  const difficultyBreakdown: Record<string, { correct: number; total: number; accuracy: number }> = {};

  for (const qId of attempt.questionIds) {
    const q = questionsMap[qId];
    if (!q) continue;

    if (!topicBreakdown[q.topicName]) {
      topicBreakdown[q.topicName] = { correct: 0, total: 0, accuracy: 0 };
    }
    if (!difficultyBreakdown[q.difficulty]) {
      difficultyBreakdown[q.difficulty] = { correct: 0, total: 0, accuracy: 0 };
    }
    topicBreakdown[q.topicName].total += 1;
    difficultyBreakdown[q.difficulty].total += 1;

    const rawAns = attempt.responses[qId];
    if (rawAns === undefined || rawAns === null || String(rawAns).trim() === '') {
      unansweredCount += 1;
    } else if (String(rawAns).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase()) {
      correctCount += 1;
      rawScore += 1;
      topicBreakdown[q.topicName].correct += 1;
      difficultyBreakdown[q.difficulty].correct += 1;
    } else {
      incorrectCount += 1;
      if (attempt.config.negativeMarking) {
        rawScore -= Math.abs(attempt.config.negativePenalty);
      }
    }
  }

  Object.keys(topicBreakdown).forEach(k => {
    const t = topicBreakdown[k];
    t.accuracy = t.total > 0 ? Number(((t.correct / t.total) * 100).toFixed(1)) : 0;
  });

  Object.keys(difficultyBreakdown).forEach(k => {
    const d = difficultyBreakdown[k];
    d.accuracy = d.total > 0 ? Number(((d.correct / d.total) * 100).toFixed(1)) : 0;
  });

  const finalScore = Math.max(0, Number(rawScore.toFixed(2)));
  const maxScore = attempt.questionIds.length || 1;
  const percentage = Number(((finalScore / maxScore) * 100).toFixed(1));
  const effectiveEndMs = Math.min(nowMs, attempt.expiresAtMs);
  const timeTakenSeconds = Math.max(1, Math.round((effectiveEndMs - attempt.startedAtMs) / 1000));

  return {
    ...attempt,
    status: isExpired ? 'expired_submitted' : 'submitted',
    submittedAtMs: nowMs,
    idempotencyKey,
    score: finalScore,
    maxScore,
    percentage,
    correctCount,
    incorrectCount,
    unansweredCount,
    timeTakenSeconds,
    topicBreakdown,
    difficultyBreakdown
  };
}
