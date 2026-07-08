import { Link } from "wouter";
import { ArrowRight, BookOpen, Star } from "lucide-react";
import { useAppState } from "../lib/state";
import { LESSONS } from "../data";

const difficultyColor: Record<string, string> = {
  beginner: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  intermediate: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  advanced: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const categoryEmoji: Record<string, string> = {
  greetings: "👋", numbers: "🔢", emotions: "💬", adjectives: "✨",
  verbs: "⚡", food: "🍽️", travel: "✈️", nature: "🌿",
  time: "🕐", clothing: "👕", animals: "🐾", professions: "💼",
  phrases: "💬", grammar: "📐",
};

// Lessons highlighted as "Featured" — Sentence Structure is essential
const FEATURED_IDS = new Set([14]);

export default function Lessons() {
  const { lessonProgress } = useAppState();
  const completedCount = Object.values(lessonProgress).filter(p => p.completed).length;

  // Split featured vs regular so featured appears at top with a callout
  const featured = LESSONS.filter(l => FEATURED_IDS.has(l.id));
  const regular  = LESSONS.filter(l => !FEATURED_IDS.has(l.id));

  const LessonRow = ({ lesson, highlight = false }: { lesson: typeof LESSONS[0]; highlight?: boolean }) => {
    const done  = lessonProgress[lesson.id]?.completed;
    const score = lessonProgress[lesson.id]?.score;

    return (
      <Link href={`/lessons/${lesson.id}`}>
        <div className={`flex items-center gap-4 rounded-xl p-4 cursor-pointer transition-all group border ${
          highlight
            ? "bg-gradient-to-r from-primary/8 via-primary/5 to-transparent border-primary/40 hover:border-primary/70 hover:shadow-sm"
            : "bg-card border-border hover:border-primary/40"
        }`}>
          {/* icon */}
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 ${
            done
              ? "bg-emerald-500 text-white"
              : highlight
              ? "bg-primary/15 text-primary"
              : "bg-muted"
          }`}>
            {done ? "✓" : (categoryEmoji[lesson.category] || <BookOpen size={16} />)}
          </div>

          {/* text */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`font-semibold text-sm truncate ${highlight ? "text-primary" : "text-foreground"}`}>
                {lesson.title}
              </span>
              {highlight && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-primary text-primary-foreground shrink-0">
                  <Star size={9} />
                  Featured
                </span>
              )}
            </div>
            <div className="text-xs text-muted-foreground truncate">{lesson.titleNorwegian}</div>
            {highlight && !done && (
              <div className="text-xs text-primary/70 mt-0.5 leading-snug">
                {lesson.description}
              </div>
            )}
            {done && score !== null && score !== undefined && (
              <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">Score: {score}%</div>
            )}
          </div>

          {/* badges */}
          <div className="flex items-center gap-2 shrink-0">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${difficultyColor[lesson.difficulty]}`}>
              {lesson.difficulty}
            </span>
            <span className="text-xs text-muted-foreground">{lesson.xpReward} XP</span>
            <ArrowRight size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Leksjoner</h1>
        <p className="text-muted-foreground mt-1">
          {completedCount} of {LESSONS.length} completed
        </p>
      </div>

      {/* ── Featured lessons ── */}
      {featured.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 px-1">
            <Star size={13} className="text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Featured Lesson</span>
          </div>
          {featured.map(l => <LessonRow key={l.id} lesson={l} highlight />)}
        </div>
      )}

      {/* ── All other lessons ── */}
      <div className="space-y-2">
        {featured.length > 0 && (
          <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-1 pb-1">
            All Lessons
          </div>
        )}
        {regular.map(l => <LessonRow key={l.id} lesson={l} />)}
      </div>
    </div>
  );
}
