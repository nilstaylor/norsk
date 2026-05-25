import { Link } from "wouter";
import { ArrowRight, BookOpen } from "lucide-react";
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
  time: "🕐", clothing: "👕", animals: "🐾", professions: "💼", phrases: "💬",
};

export default function Lessons() {
  const { lessonProgress } = useAppState();
  const completedCount = Object.values(lessonProgress).filter(p => p.completed).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Leksjoner</h1>
        <p className="text-muted-foreground mt-1">
          {completedCount} of {LESSONS.length} completed
        </p>
      </div>

      <div className="space-y-2">
        {LESSONS.map(lesson => {
          const done = lessonProgress[lesson.id]?.completed;
          const score = lessonProgress[lesson.id]?.score;
          return (
            <Link key={lesson.id} href={`/lessons/${lesson.id}`}>
              <div className="flex items-center gap-4 bg-card border border-border rounded-xl p-4 cursor-pointer hover:border-primary/40 transition-all group">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 ${
                  done ? "bg-emerald-500 text-white" : "bg-muted"
                }`}>
                  {done ? "✓" : (categoryEmoji[lesson.category] || <BookOpen size={16} />)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-foreground text-sm truncate">{lesson.title}</div>
                  <div className="text-xs text-muted-foreground truncate">{lesson.titleNorwegian}</div>
                  {done && score !== null && score !== undefined && (
                    <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">Score: {score}%</div>
                  )}
                </div>
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
        })}
      </div>
    </div>
  );
}
