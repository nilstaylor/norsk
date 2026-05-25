import { useState, useEffect } from "react";
import { Check, X, RotateCcw, Layers, Grid3X3 } from "lucide-react";
import { useAppState } from "../lib/state";
import { VOCABULARY } from "../data";
import type { VocabWord } from "../data";

// ─── helpers ──────────────────────────────────────────────────────────────────

const categoryColors: Record<string, string> = {
  greetings: "text-sky-600 dark:text-sky-400",
  numbers: "text-violet-600 dark:text-violet-400",
  food: "text-amber-600 dark:text-amber-400",
  travel: "text-emerald-600 dark:text-emerald-400",
  nature: "text-teal-600 dark:text-teal-400",
  phrases: "text-rose-600 dark:text-rose-400",
  time: "text-orange-600 dark:text-orange-400",
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getDueCards(reviews: Record<string, { nextReviewAt: string }>, limit = 15): VocabWord[] {
  const now = new Date().toISOString();
  const due = VOCABULARY.filter(v => {
    const r = reviews[v.id];
    return !r || r.nextReviewAt <= now;
  });
  return shuffle(due).slice(0, limit);
}

// ─── Score summary (shared by both modes) ─────────────────────────────────────

function ScoreSummary({
  correct,
  wrong,
  onRestart,
}: {
  correct: number;
  wrong: number;
  onRestart: () => void;
}) {
  const total = correct + wrong;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  return (
    <div className="bg-card border border-border rounded-2xl p-10 flex flex-col items-center text-center gap-5">
      <div className="text-5xl">{pct >= 80 ? "🎊" : pct >= 60 ? "✨" : "💪"}</div>
      <h2 className="font-bold text-foreground text-xl">Session Complete!</h2>
      <div className="flex gap-8">
        <div className="text-center">
          <div className="text-3xl font-bold text-emerald-500">{correct}</div>
          <div className="text-xs text-muted-foreground mt-1">Correct</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-red-500">{wrong}</div>
          <div className="text-xs text-muted-foreground mt-1">Incorrect</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-primary">{pct}%</div>
          <div className="text-xs text-muted-foreground mt-1">Accuracy</div>
        </div>
      </div>
      <p className="text-muted-foreground text-sm">
        {pct >= 80 ? "Excellent work! Keep it up!" : pct >= 60 ? "Good job! Keep practicing!" : "Don't give up — practice makes perfect!"}
      </p>
      <button
        onClick={onRestart}
        className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
      >
        <RotateCcw size={15} />
        New Session
      </button>
    </div>
  );
}

// ─── Flashcard mode ───────────────────────────────────────────────────────────

function FlashcardMode({
  cards,
  onSessionDone,
  submitFlashcard,
}: {
  cards: VocabWord[];
  onSessionDone: (correct: number, wrong: number) => void;
  submitFlashcard: (id: number, correct: boolean) => void;
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [results, setResults] = useState({ correct: 0, wrong: 0 });
  const [animKey, setAnimKey] = useState(0);

  const card = cards[currentIdx];

  const handleAnswer = (correct: boolean) => {
    if (!card) return;
    submitFlashcard(card.id, correct);
    const next = { correct: results.correct + (correct ? 1 : 0), wrong: results.wrong + (correct ? 0 : 1) };
    setResults(next);
    if (currentIdx + 1 < cards.length) {
      setCurrentIdx(i => i + 1);
      setFlipped(false);
      setAnimKey(k => k + 1);
    } else {
      onSessionDone(next.correct, next.wrong);
    }
  };

  const progress = (currentIdx / cards.length) * 100;

  return (
    <div className="space-y-5">
      {/* progress bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-muted rounded-full h-2">
          <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-emerald-500 font-semibold">{results.correct}</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-red-500 font-semibold">{results.wrong}</span>
        </div>
      </div>

      {/* card */}
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
        <div className="p-8 min-h-[200px] flex flex-col items-center justify-center text-center gap-4">
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

      {flipped ? (
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
      ) : (
        <p className="text-center text-sm text-muted-foreground">
          Tap the card to reveal the English translation, then mark how well you knew it.
        </p>
      )}
    </div>
  );
}

// ─── Match mode ───────────────────────────────────────────────────────────────

const MATCH_ROUND_SIZE = 5; // exactly 5 pairs per round

type MatchState = "idle" | "correct" | "wrong";

interface MatchCell {
  word: VocabWord;
  side: "norwegian" | "english";
  key: string; // unique key for rendering
}

function buildRound(words: VocabWord[]): { leftCol: MatchCell[]; rightCol: MatchCell[] } {
  const leftCol: MatchCell[] = words.map(w => ({ word: w, side: "norwegian", key: `no-${w.id}` }));
  const rightCol: MatchCell[] = shuffle(words.map(w => ({ word: w, side: "english", key: `en-${w.id}` })));
  return { leftCol, rightCol };
}

function MatchMode({
  cards,
  onSessionDone,
  submitFlashcard,
}: {
  cards: VocabWord[];
  onSessionDone: (correct: number, wrong: number) => void;
  submitFlashcard: (id: number, correct: boolean) => void;
}) {
  // Split cards into rounds of MATCH_ROUND_SIZE
  const rounds: VocabWord[][] = [];
  for (let i = 0; i < cards.length; i += MATCH_ROUND_SIZE) {
    rounds.push(cards.slice(i, i + MATCH_ROUND_SIZE));
  }

  const [roundIdx, setRoundIdx] = useState(0);
  const [{ leftCol, rightCol }, setCols] = useState(() => buildRound(rounds[0] ?? []));
  const [selected, setSelected] = useState<MatchCell | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set()); // matched word ids
  const [feedback, setFeedback] = useState<{ key: string; state: MatchState }[]>([]);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalWrong, setTotalWrong] = useState(0);

  // Reset columns when roundIdx changes
  useEffect(() => {
    const round = rounds[roundIdx];
    if (round) {
      setCols(buildRound(round));
      setSelected(null);
      setMatched(new Set());
      setFeedback([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundIdx]);

  const currentRound = rounds[roundIdx] ?? [];
  const progress = ((roundIdx * MATCH_ROUND_SIZE + matched.size) / cards.length) * 100;

  const getFeedback = (key: string): MatchState => {
    return feedback.find(f => f.key === key)?.state ?? "idle";
  };

  const handleSelect = (cell: MatchCell) => {
    // Already matched — ignore
    if (matched.has(cell.word.id)) return;
    // Clear any lingering wrong feedback
    setFeedback(prev => prev.filter(f => f.state !== "wrong"));

    if (!selected) {
      setSelected(cell);
      return;
    }

    // Same cell tapped again — deselect
    if (selected.key === cell.key) {
      setSelected(null);
      return;
    }

    // Same side tapped — switch selection
    if (selected.side === cell.side) {
      setSelected(cell);
      return;
    }

    // Different sides — check match
    const isMatch = selected.word.id === cell.word.id;
    if (isMatch) {
      submitFlashcard(cell.word.id, true);
      const newMatched = new Set(matched).add(cell.word.id);
      setMatched(newMatched);
      setFeedback(prev => [
        ...prev,
        { key: selected.key, state: "correct" },
        { key: cell.key, state: "correct" },
      ]);
      setSelected(null);
      const newCorrect = totalCorrect + 1;
      setTotalCorrect(newCorrect);

      // Round complete?
      if (newMatched.size === currentRound.length) {
        setTimeout(() => {
          const nextRound = roundIdx + 1;
          if (nextRound < rounds.length) {
            setRoundIdx(nextRound);
            setTotalCorrect(newCorrect);
          } else {
            onSessionDone(newCorrect, totalWrong);
          }
        }, 600);
      }
    } else {
      submitFlashcard(cell.word.id, false);
      const newWrong = totalWrong + 1;
      setTotalWrong(newWrong);
      setFeedback(prev => [
        ...prev.filter(f => f.state !== "wrong"),
        { key: selected.key, state: "wrong" },
        { key: cell.key, state: "wrong" },
      ]);
      setSelected(null);
      // Clear wrong feedback after 700ms
      setTimeout(() => {
        setFeedback(prev => prev.filter(f => f.state !== "wrong"));
      }, 700);
    }
  };

  const cellClass = (cell: MatchCell) => {
    const isMatched = matched.has(cell.word.id);
    const isSelected = selected?.key === cell.key;
    const fb = getFeedback(cell.key);

    const base =
      "px-4 py-3 rounded-xl border-2 text-sm font-semibold text-center cursor-pointer transition-all duration-150 select-none leading-snug min-h-[52px] flex items-center justify-center";

    if (isMatched)
      return `${base} border-emerald-400 bg-emerald-50 dark:bg-emerald-900/25 text-emerald-700 dark:text-emerald-300 opacity-60 cursor-default`;
    if (fb === "correct")
      return `${base} border-emerald-400 bg-emerald-50 dark:bg-emerald-900/25 text-emerald-700 dark:text-emerald-300 scale-105`;
    if (fb === "wrong")
      return `${base} border-red-400 bg-red-50 dark:bg-red-900/25 text-red-700 dark:text-red-300 animate-shake`;
    if (isSelected)
      return `${base} border-primary bg-primary/10 text-primary shadow-sm scale-[1.02]`;
    return `${base} border-border bg-card text-foreground hover:border-primary/50 hover:bg-muted/50`;
  };

  return (
    <div className="space-y-5">
      {/* progress */}
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-muted rounded-full h-2">
          <div className="bg-primary h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          Round {roundIdx + 1} / {rounds.length}
        </span>
      </div>

      {/* instruction */}
      <p className="text-sm text-muted-foreground text-center">
        Tap a Norwegian word, then its English match. Complete all {MATCH_ROUND_SIZE} pairs.
      </p>

      {/* grid: left = Norwegian, right = English */}
      <div className="grid grid-cols-2 gap-3">
        {/* Norwegian column */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground text-center uppercase tracking-wide mb-1">
            Norsk 🇳🇴
          </div>
          {leftCol.map(cell => {
            const isMatched = matched.has(cell.word.id);
            return (
              <div key={cell.key} className="space-y-0.5">
                <button
                  className={cellClass(cell)}
                  onClick={() => handleSelect(cell)}
                  disabled={isMatched}
                  style={{ width: "100%" }}
                  data-testid={`match-no-${cell.word.id}`}
                >
                  {cell.word.norwegian}
                </button>
                {/* phonetic shown under Norwegian word */}
                {cell.word.audioPhonetic && (
                  <div className={`text-center text-[11px] italic transition-opacity ${isMatched ? "text-emerald-500/60" : "text-muted-foreground"}`}>
                    /{cell.word.audioPhonetic}/
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* English column */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground text-center uppercase tracking-wide mb-1">
            English 🇬🇧
          </div>
          {rightCol.map(cell => {
            const isMatched = matched.has(cell.word.id);
            return (
              <div key={cell.key} className="space-y-0.5">
                <button
                  className={cellClass(cell)}
                  onClick={() => handleSelect(cell)}
                  disabled={isMatched}
                  style={{ width: "100%" }}
                  data-testid={`match-en-${cell.word.id}`}
                >
                  {cell.word.english}
                </button>
                {/* example sentence shown under English word once matched */}
                {isMatched && cell.word.example && (
                  <div className="text-[11px] text-emerald-600/70 dark:text-emerald-400/60 italic text-center px-1 leading-tight">
                    {cell.word.example}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* category legend for this round */}
      <div className="flex flex-wrap gap-2 justify-center pt-1">
        {[...new Set(currentRound.map(w => w.category))].map(cat => (
          <span
            key={cat}
            className={`text-xs font-semibold capitalize px-2 py-0.5 rounded-full bg-muted ${categoryColors[cat] ?? ""}`}
          >
            {cat}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Main Flashcards page ─────────────────────────────────────────────────────

type Tab = "flashcard" | "match";

export default function Flashcards() {
  const { submitFlashcard, flashcardReviews } = useAppState();
  const [tab, setTab] = useState<Tab>("flashcard");
  const [sessionCards, setSessionCards] = useState<VocabWord[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [sessionDone, setSessionDone] = useState(false);
  const [finalCorrect, setFinalCorrect] = useState(0);
  const [finalWrong, setFinalWrong] = useState(0);
  const [sessionKey, setSessionKey] = useState(0); // forces re-mount of mode components

  useEffect(() => {
    setSessionCards(getDueCards(flashcardReviews));
    setLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const restart = () => {
    setSessionCards(getDueCards(flashcardReviews));
    setSessionDone(false);
    setFinalCorrect(0);
    setFinalWrong(0);
    setSessionKey(k => k + 1);
  };

  const handleSessionDone = (correct: number, wrong: number) => {
    setFinalCorrect(correct);
    setFinalWrong(wrong);
    setSessionDone(true);
  };

  const handleTabChange = (t: Tab) => {
    setTab(t);
    // Reset session when switching modes
    setSessionCards(getDueCards(flashcardReviews));
    setSessionDone(false);
    setFinalCorrect(0);
    setFinalWrong(0);
    setSessionKey(k => k + 1);
  };

  if (!loaded) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Flashkort</h1>
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* page header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Flashkort</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          {tab === "flashcard" ? "Flip cards and self-assess — spaced repetition" : "Tap a Norwegian word, then its English match"}
        </p>
      </div>

      {/* mode tabs */}
      <div className="flex gap-1 bg-muted p-1 rounded-xl w-fit">
        <button
          onClick={() => handleTabChange("flashcard")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            tab === "flashcard"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Layers size={15} />
          Flashcards
        </button>
        <button
          onClick={() => handleTabChange("match")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            tab === "match"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Grid3X3 size={15} />
          Match
        </button>
      </div>

      {/* no cards state */}
      {sessionCards.length === 0 && (
        <div className="bg-card border border-border rounded-2xl p-12 flex flex-col items-center text-center gap-4">
          <div className="text-5xl">🌟</div>
          <h2 className="font-bold text-foreground text-lg">All caught up!</h2>
          <p className="text-muted-foreground text-sm max-w-xs">
            No cards are due for review right now. Come back later or review all cards.
          </p>
          <button
            onClick={restart}
            className="px-5 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <RotateCcw size={15} />
            Review all cards
          </button>
        </div>
      )}

      {/* session done summary */}
      {sessionCards.length > 0 && sessionDone && (
        <ScoreSummary correct={finalCorrect} wrong={finalWrong} onRestart={restart} />
      )}

      {/* active session */}
      {sessionCards.length > 0 && !sessionDone && (
        <div key={sessionKey}>
          {tab === "flashcard" ? (
            <FlashcardMode
              cards={sessionCards}
              onSessionDone={handleSessionDone}
              submitFlashcard={submitFlashcard}
            />
          ) : (
            <MatchMode
              cards={sessionCards}
              onSessionDone={handleSessionDone}
              submitFlashcard={submitFlashcard}
            />
          )}
        </div>
      )}
    </div>
  );
}
