import { Link } from "wouter";
import { Flame, Star, Target, BookOpen, Layers, ArrowRight, TrendingUp } from "lucide-react";
import { useAppState } from "../lib/state";
import { LESSONS } from "../data";

function StatCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: string | number; color: string }) {
  return (
    <div className="bg-card rounded-xl p-4 border border-border flex items-center gap-4">
      <div className={`p-2.5 rounded-lg ${color}`}><Icon size={20} /></div>
      <div>
        <div className="text-xl font-bold text-foreground">{value}</div>
        <div className="text-xs text-muted-foreground font-medium">{label}</div>
      </div>
    </div>
  );
}

const difficultyColor: Record<string, string> = {
  beginner: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  intermediate: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  advanced: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default function Dashboard() {
  const { stats, lessonProgress } = useAppState();

  const completedCount = Object.values(lessonProgress).filter(p => p.completed).length;
  const nextLesson = LESSONS.find(l => !lessonProgress[l.id]?.completed);
  const accuracy = stats.totalReviews > 0 ? Math.round((stats.correctReviews / stats.totalReviews) * 100) : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">God dag! 👋</h1>
        <p className="text-muted-foreground mt-1">Ready to practice Norwegian today?</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={Flame} label="Day streak" value={stats.streak} color="bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400" />
        <StatCard icon={Star} label="Total XP" value={stats.totalXp} color="bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400" />
        <StatCard icon={Target} label="Accuracy" value={`${accuracy}%`} color="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" />
        <StatCard icon={BookOpen} label="Lessons done" value={`${completedCount}/${LESSONS.length}`} color="bg-primary/10 text-primary" />
      </div>

      <div className="bg-card rounded-xl border border-border p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <TrendingUp size={17} className="text-primary" />
            Your Progress
          </h2>
          <span className="text-sm text-muted-foreground">{completedCount} of {LESSONS.length} completed</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2.5">
          <div className="bg-primary h-2.5 rounded-full progress-fill" style={{ width: `${(completedCount / LESSONS.length) * 100}%` }} />
        </div>
      </div>

      {nextLesson && (
        <div>
          <h2 className="font-semibold text-foreground mb-3">Continue Learning</h2>
          <Link href={`/lessons/${nextLesson.id}`}>
            <div className="bg-primary text-primary-foreground rounded-xl p-5 flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity group">
              <div>
                <div className="text-xs font-medium opacity-75 uppercase tracking-wider mb-1">{nextLesson.category}</div>
                <div className="font-bold text-lg leading-tight">{nextLesson.title}</div>
                <div className="text-sm opacity-80 mt-0.5">{nextLesson.titleNorwegian}</div>
              </div>
              <ArrowRight size={22} className="shrink-0 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </div>
      )}

      <div>
        <h2 className="font-semibold text-foreground mb-3">Quick Practice</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/flashcards">
            <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:border-primary/40 hover:bg-muted/30 transition-all group">
              <div className="p-2.5 bg-primary/10 rounded-lg text-primary"><Layers size={20} /></div>
              <div>
                <div className="font-semibold text-foreground text-sm">Flashcard Review</div>
                <div className="text-xs text-muted-foreground">Practice vocabulary with spaced repetition</div>
              </div>
              <ArrowRight size={16} className="ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </Link>
          <Link href="/vocabulary">
            <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:border-primary/40 hover:bg-muted/30 transition-all group">
              <div className="p-2.5 bg-secondary rounded-lg text-secondary-foreground"><BookOpen size={20} /></div>
              <div>
                <div className="font-semibold text-foreground text-sm">Browse Vocabulary</div>
                <div className="text-xs text-muted-foreground">Explore all words by category</div>
              </div>
              <ArrowRight size={16} className="ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </Link>
        </div>
      </div>

      <div>
        <h2 className="font-semibold text-foreground mb-3">All Lessons</h2>
        <div className="space-y-2">
          {LESSONS.map(lesson => (
            <Link key={lesson.id} href={`/lessons/${lesson.id}`}>
              <div className="flex items-center gap-4 bg-card border border-border rounded-xl p-4 cursor-pointer hover:border-primary/40 transition-all group">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                  lessonProgress[lesson.id]?.completed ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground"
                }`}>
                  {lessonProgress[lesson.id]?.completed ? "✓" : lesson.order}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-foreground text-sm truncate">{lesson.title}</div>
                  <div className="text-xs text-muted-foreground truncate">{lesson.titleNorwegian}</div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${difficultyColor[lesson.difficulty]}`}>{lesson.difficulty}</span>
                  <span className="text-xs text-muted-foreground">{lesson.xpReward} XP</span>
                  <ArrowRight size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
