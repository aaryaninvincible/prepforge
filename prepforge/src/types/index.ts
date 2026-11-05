// ============================================================================
// PREPFORGE — STRICT TYPESCRIPT DOMAIN SCHEMA
// ============================================================================

export type UserRole = 'student' | 'admin';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  role: UserRole;
  emailVerified: boolean;
  targetRole: string;
  targetCompanies: string[];
  dailyGoalMinutes: number;
  studyGroupId: string | null;
  streakDays: number;
  totalStudyMinutes: number;
  preferences: {
    reducedMotion: boolean;
    shareProgressWithGroup: boolean;
    shareExamScoresWithGroup: boolean;
    defaultExamMode: 'practice' | 'exam';
  };
  createdAt: string;
  updatedAt: string;
}

export interface SubjectTrack {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  iconName: string;
  accentColor: string;
  status: 'published' | 'draft';
  modules: CurriculumModule[];
}

export interface CurriculumModule {
  id: string;
  subjectId: string;
  order: number;
  title: string;
  topic: string;
  estimatedMinutes: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  summary: string;
  explanation: string;
  beginnerExample: string;
  codeSnippet: string;
  expectedOutput: string;
  commonMistakes: string[];
  keyTakeaways: string[];
  externalResources: {
    title: string;
    url: string;
    provider: string;
  }[];
}

export type QuestionDifficulty = 'Easy' | 'Medium' | 'Hard';
export type QuestionType =
  | 'MCQ'
  | 'Multiple-Select'
  | 'Output Prediction'
  | 'Fill-in-the-Blank'
  | 'Code Debugging';

export interface QuestionItem {
  id: string;
  subjectId: string;
  topicId: string;
  topicName: string;
  difficulty: QuestionDifficulty;
  questionType: QuestionType;
  statement: string;
  codeSnippet?: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  tags: string[];
  sourceUrl?: string;
  sourceAttribution?: string;
  publicationStatus: 'published' | 'draft' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface ExamConfig {
  examName: string;
  subjectId: string;
  topicIds: string[];
  difficulty: 'All' | 'Easy' | 'Medium' | 'Hard' | 'Balanced';
  questionCount: number;
  durationMinutes: number;
  questionTypes: QuestionType[];
  negativeMarking: boolean;
  negativePenalty: number;
  passingScorePercent: number;
  randomizeQuestions: boolean;
  randomizeOptions: boolean;
  mode: 'practice' | 'exam';
  allowDuplicates: boolean;
}

export interface ExamAttempt {
  id: string;
  userId: string;
  config: ExamConfig;
  questionIds: string[];
  optionOrderMap: Record<string, string[]>;
  responses: Record<string, string>;
  flaggedIds: string[];
  currentIndex: number;
  status: 'in_progress' | 'submitted' | 'expired_submitted';
  startedAtMs: number;
  expiresAtMs: number;
  submittedAtMs: number | null;
  idempotencyKey: string | null;
  score: number | null;
  maxScore: number;
  percentage: number | null;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  timeTakenSeconds: number;
  topicBreakdown: Record<string, { correct: number; total: number; accuracy: number }>;
  difficultyBreakdown: Record<string, { correct: number; total: number; accuracy: number }>;
}

export interface CodingTestCase {
  id: string;
  inputExpr: string;
  expectedOutput: string;
  isHidden: boolean;
  explanation?: string;
}

export interface CodingProblem {
  id: string;
  title: string;
  subjectId: string;
  topicName: string;
  difficulty: QuestionDifficulty;
  statement: string;
  functionName: string;
  starterCode: string;
  sampleInput: string;
  sampleOutput: string;
  constraints: string[];
  hints: string[];
  optimalSolutionExplanation: string;
  timeComplexity: string;
  spaceComplexity: string;
  testCases: CodingTestCase[];
}

export interface CodingSubmission {
  id: string;
  userId: string;
  problemId: string;
  code: string;
  language: 'python';
  mode: 'sample' | 'submit';
  passedAll: boolean;
  passedCount: number;
  totalCount: number;
  runtimeMs: number;
  memoryMb: number;
  errorOutput?: string;
  createdAt: string;
}

export type RoadmapTaskStatus = 'Not Started' | 'In Progress' | 'Done' | 'Revision' | 'Blocked';

export interface RoadmapTask {
  id: string;
  week: string;
  phase: string;
  title: string;
  description: string;
  subjectId: string;
  topic: string;
  priority: 'High' | 'Medium' | 'Low';
  plannedDate: string;
  revisionDate?: string;
  estimatedMinutes: number;
  status: RoadmapTaskStatus;
  aryanStatus: RoadmapTaskStatus;
  parsaStatus: RoadmapTaskStatus;
  owner: 'Aryan' | 'Parsa' | 'Both' | string;
  resourceLinks: { label: string; url: string }[];
  completionEvidence: string;
  notes: string;
  updatedAt: string;
}

export interface RevisionItem {
  id: string;
  userId: string;
  itemType: 'question' | 'topic' | 'coding';
  referenceId: string;
  title: string;
  subjectId: string;
  topicName: string;
  difficulty: QuestionDifficulty;
  mistakeCount: number;
  lastAccuracy: number;
  intervalDays: number;
  lastReviewedAt: string;
  nextReviewDate: string;
  status: 'pending' | 'reviewed';
}

export interface StudyGroup {
  id: string;
  name: string;
  inviteCode: string;
  createdBy: string;
  sharedGoal: string;
  nextSharedMockDate: string;
  memberIds: string[];
}
