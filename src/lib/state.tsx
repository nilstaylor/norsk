/**
 * App-wide state — session only (no localStorage/SQLite).
 * Progress resets on page reload. All state lives in React context.
 */
import { createContext, useContext, useState, ReactNode } from "react";
import { VOCABULARY } from "../data";

// ── Types ──────────────────────────────────────────────────────
export interface LessonProgressEntry {
  completed: boolean;
  score: number | null;
  completedAt: string | null;
}

export interface FlashcardReviewEntry {
  interval: number;      // days until next review
  easeFactor: number;    // SM-2 ease factor
  repetitions: number;   // number of times reviewed
  nextReviewAt: string;  // ISO timestamp
  correct: boolean;
}

export interface UserStats {
  totalXp: number;
  streak: number;
  totalReviews: number;
  correctReviews: number;
}

interface AppState {
  lessonProgress: Record<number, LessonProgressEntry>;
  flashcardReviews: Record<number, FlashcardReviewEntry>;
  stats: UserStats;
  setLessonProgress: (id: number, progress: LessonProgressEntry) => void;
  submitFlashcard: (vocabId: number, correct: boolean) => void;
}

// ── SM-2 Algorithm ─────────────────────────────────────────────
function sm2(
  prev: FlashcardReviewEntry | undefined,
  correct: boolean
): FlashcardReviewEntry {
  const ef = prev?.easeFactor ?? 2.5;
  const reps = prev?.repetitions ?? 0;
  const interval = prev?.interval ?? 1;

  let newEf = ef + (0.1 - (correct ? 0 : 0.3) - (correct ? 0 : 0.2) * (correct ? 1 : 0));
  newEf = Math.max(1.3, newEf);

  let newReps = correct ? reps + 1 : 0;
  let newInterval: number;
  if (!correct) {
    newInterval = 1;
  } else if (newReps === 1) {
    newInterval = 1;
  } else if (newReps === 2) {
    newInterval = 6;
  } else {
    newInterval = Math.round(interval * newEf);
  }

  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + newInterval);

  return {
    interval: newInterval,
    easeFactor: newEf,
    repetitions: newReps,
    nextReviewAt: nextDate.toISOString(),
    correct,
  };
}

// ── Context ────────────────────────────────────────────────────
const AppCtx = createContext<AppState>({
  lessonProgress: {},
  flashcardReviews: {},
  stats: { totalXp: 0, streak: 0, totalReviews: 0, correctReviews: 0 },
  setLessonProgress: () => {},
  submitFlashcard: () => {},
});

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [lessonProgress, setLessonProgressMap] = useState<Record<number, LessonProgressEntry>>({});
  const [flashcardReviews, setFlashcardReviews] = useState<Record<number, FlashcardReviewEntry>>({});
  const [stats, setStats] = useState<UserStats>({ totalXp: 0, streak: 0, totalReviews: 0, correctReviews: 0 });

  function setLessonProgress(id: number, progress: LessonProgressEntry) {
    setLessonProgressMap(prev => ({ ...prev, [id]: progress }));
    if (progress.completed) {
      // XP is added by LessonDetail — avoid double count
    }
  }

  function submitFlashcard(vocabId: number, correct: boolean) {
    const prev = flashcardReviews[vocabId];
    const next = sm2(prev, correct);
    setFlashcardReviews(r => ({ ...r, [vocabId]: next }));
    setStats(s => ({
      ...s,
      totalReviews: s.totalReviews + 1,
      correctReviews: s.correctReviews + (correct ? 1 : 0),
      totalXp: s.totalXp + (correct ? 2 : 0),
    }));
  }

  return (
    <AppCtx.Provider value={{ lessonProgress, flashcardReviews, stats, setLessonProgress, submitFlashcard }}>
      {children}
    </AppCtx.Provider>
  );
}

export const useAppState = () => useContext(AppCtx);

// ── Helpers ────────────────────────────────────────────────────
export function useDueFlashcards(limit = 15) {
  const { flashcardReviews } = useAppState();
  const now = new Date().toISOString();
  const due = VOCABULARY.filter(v => {
    const r = flashcardReviews[v.id];
    return !r || r.nextReviewAt <= now;
  });
  // Shuffle for variety
  for (let i = due.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [due[i], due[j]] = [due[j], due[i]];
  }
  return due.slice(0, limit);
}
