import { useState, useEffect } from "react";
import { Check, X, RotateCcw } from "lucide-react";
import { useAppState } from "../lib/state";
import { VOCABULARY } from "../data";
import type { VocabWord } from "../data";

const categoryColors: Record<string, string> = {
  greetings: "text-sky-600 dark:text-sky-400",
  numbers: "text-violet-600 dark:text-violet-400",
  food: "text-amber-600 dark:text-amber-400",
  travel: "text-emerald-600 dark:text-emerald-400",
  nature: "text-teal-600 dark:text-teal-400",
  phrases: "text-rose-600 dark:text-rose-400",
  time: "text-orange-600 dark:text-orange-400",
};

function getDueCards(flashcardReviews: Record<string, { nextReviewAt: string }>, limit = 15): VocabWord[] {
  const now = new Date().toISOString();
  const due = VOCABULARY.filter(v => {
    const r = flashcardReviews[v.id];
    return !r || r.nextReviewAt <= now;
  });
  // Fisher-Yates shuffle
  for (let i = due.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [due[i], due[j]] = [due[j], due[i]];
  }
  return due.slice(0, limit);
}

export default function Flashcards() {
  const { submitFlashcard, flashcardReviews } = useAppState();
  const [sessionCards, setSessionCards] = useState<VocabWord[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [sessionResults, setSessionResults] = useState({ correct: 0, wrong: 0 });
  const [sessionDone, setSessionDone] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  // Initialize session cards once on mount
  useEffect(() => {
    setSessionCards(getDueCards(flashcardReviews));
    setLoaded(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const restart = () => {
    setSessionCards(getDueCards(flashcardReviews));
    setCurrentIdx(0);
    setFlipped(false);
    setSessionResults({ correct: 0, wrong: 0 });
    setSessionDone(false);
    setAnimKey(k => k + 1);
  };

  const card = sessionCards[currentIdx];

  const handleAnswer = (correct: boolean) => {
    if (!card) return;
    submitFlashcard(card.id, correct);
    const newResults = {
      correct: sessionResults.correct + (correct ? 1 : 0),
      wrong: sessionResults.wrong + (correct ? 0 : 1),
    };
    setSessionResults(newResults);
    if (currentIdx + 1 < sessionCards.length) {
      setCurrentIdx(i => i + 1);
      setFlipped(false);
      setAnimKey(k => k + 1);
    } else {
      setSessionDone(true);
    }
  };

  if (!loaded) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Flashkort</h1>
          <p className="text-muted-foreground mt-1">Loading your session…</p>
        </div>
      </div>
    );
  }

  if (sessionCards.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Flashkort</h1>
          <p className="text-muted-foreground mt-1">Spaced repetition vocabulary practice</p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-12 flex flex-col items-center text-center gap-4">
          <div className="text-5xl">🌟</div>
          <h2 className="font-bold text-foreground text-lg">All caught up!</h2>
          <p className="text-muted-foreground text-sm max-w-xs">
            No cards are due for review right now. Great work! Come back later for more practice.
          </p>
          <button
            onClick={restart}
            className="px-5 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <RotateCcw size={15} />
            Review all cards
          </button>
        </div>
      </div>
    );
  }

  if (sessionDone) {
    const total = sessionResults.correct + sessionResults.wrong;
    const pct = total > 0 ? Math.round((sessionResults.correct / total) * 100) : 0;
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Flashkort</h1>
        </div>
        <div className="bg-card border border-border rounded-2xl p-10 flex flex-col items-center text-center gap-5">
          <div className="text-5xl">{pct >= 80 ? "🎊" : pct >= 60 ? "✨" : "💪"}</div>
          <h2 className="font-bold text-foreground text-xl">Session Complete!</h2>
          <div className="flex gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-500">{sessionResults.correct}</div>
              <div className="text-xs text-muted-foreground mt-1">Correct</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500">{sessionResults.wrong}</div>
              <div className="text-xs text-muted-foreground mt-1">Incorrect</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{pct}%</div>
              <div className="text-xs text-muted-foreground mt-1">Accuracy</div>
            </div>
          </div>
          <p className="text-muted-foreground text-sm">
            {pct >= 80
              ? "Excellent work! Keep it up!"
              : pct >= 60
              ? "Good job! Keep practicing!"
              : "Don't give up — practice makes perfect!"}
          </p>
          <button
            onClick={restart}
            className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <RotateCcw size={15} />
            New Session
          </button>
        </div>
      </div>
    );
  }

  const progress = (currentIdx / sessionCards.length) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Flashkort</h1>
        <p className="text-muted-foreground mt-1">
          Card {currentIdx + 1} of {sessionCards.length}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-emerald-500 font-semibold">{sessionResults.correct}</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-red-500 font-semibold">{sessionResults.wrong}</span>
        </div>
      </div>

      <div
        key={animKey}
        className="bg-card border border-border rounded-2xl overflow-hidden cursor-pointer select-none hover:shadow-md transition-shadow"
        onClick={() => setFlipped(f => !f)}
        role="button"
        aria-label={flipped ? "Click to show Norwegian" : "Click to reveal English"}
      >
        <div className="bg-muted/40 px-4 py-2 border-b border-border flex items-center justify-between text-xs text-muted-foreground">
          <span className={`font-semibold capitalize ${categoryColors[card?.category ?? ""] ?? ""}`}>
            {card?.category}
          </span>
          <span>{flipped ? "English" : "Norwegian"} — tap to flip</span>
        </div>

        <div className="p-8 min-h-[220px] flex flex-col items-center justify-center text-center gap-4">
          {!flipped ? (
            <>
              <div className="text-4xl font-bold text-foreground tracking-tight">{card?.norwegian}</div>
              {card?.audioPhonetic && (
                <div className="text-sm text-muted-foreground italic">/{card.audioPhonetic}/</div>
              )}
              <div className="text-sm text-muted-foreground mt-2">Tap to see translation</div>
            </>
          ) : (
            <>
              <div className="text-3xl font-bold text-foreground">{card?.english}</div>
              {card?.example && (
                <div className="mt-3 bg-muted/60 rounded-xl px-4 py-3 max-w-sm text-left">
                  <div className="text-sm font-medium text-foreground">{card.example}</div>
                  <div className="text-xs text-muted-foreground mt-1 italic">{card.exampleTranslation}</div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {flipped && (
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={e => { e.stopPropagation(); handleAnswer(false); }}
            className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-semibold hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
          >
            <X size={18} />
            Still learning
          </button>
          <button
            onClick={e => { e.stopPropagation(); handleAnswer(true); }}
            className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-semibold hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors"
          >
            <Check size={18} />
            Got it!
          </button>
        </div>
      )}

      {!flipped && (
        <p className="text-center text-sm text-muted-foreground">
          Tap the card to reveal the English translation, then mark how well you knew it.
        </p>
      )}
    </div>
  );
}
