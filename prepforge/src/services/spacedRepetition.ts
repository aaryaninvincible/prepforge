// ============================================================================
// PREPFORGE — EXPLAINABLE SPACED-REPETITION SCHEDULER
// Transparent interval calculation based on accuracy, difficulty, and recency.
// ============================================================================
import { QuestionDifficulty } from '../types';

export function computeNextReviewIntervalDays(
  previousIntervalDays: number,
  wasCorrect: boolean,
  difficulty: QuestionDifficulty,
  mistakeCount: number
): { nextIntervalDays: number; reason: string } {
  if (!wasCorrect) {
    return {
      nextIntervalDays: 1,
      reason: `Reset to 1 day because the most recent attempt was incorrect (${mistakeCount} total mistakes).`
    };
  }
  const difficultyMultiplier =
    difficulty === 'Hard' ? 1.5 : difficulty === 'Medium' ? 2.0 : 2.5;
  const base = Math.max(1, previousIntervalDays);
  const next = Math.min(30, Math.max(2, Math.round(base * difficultyMultiplier)));
  return {
    nextIntervalDays: next,
    reason: `Scheduled in ${next} days (${difficulty} difficulty multiplier ${difficultyMultiplier}x after correct review).`
  };
}
