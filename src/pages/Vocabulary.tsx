import { useState } from "react";
import { Search } from "lucide-react";
import { VOCABULARY, CATEGORIES } from "../data";

const categoryLabel: Record<string, string> = {
  greetings: "Greetings", numbers: "Numbers", emotions: "Emotions", adjectives: "Adjectives",
  verbs: "Verbs", food: "Food", travel: "Travel", nature: "Nature",
  time: "Time", clothing: "Clothing", animals: "Animals", professions: "Professions", phrases: "Phrases",
};

const difficultyColor: Record<string, string> = {
  beginner: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  intermediate: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  advanced: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default function Vocabulary() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = VOCABULARY.filter(v => {
    const matchCat = !activeCategory || v.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch = !q || v.norwegian.toLowerCase().includes(q) || v.english.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Ordbok</h1>
        <p className="text-muted-foreground mt-1">{VOCABULARY.length} words across {CATEGORIES.length} categories</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search Norwegian or English..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${!activeCategory ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"}`}
        >
          All
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all capitalize ${activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"}`}
          >
            {categoryLabel[cat] || cat}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="text-xs text-muted-foreground px-1">{filtered.length} words</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {filtered.map(v => (
          <div key={v.id} className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-colors">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div>
                <div className="font-bold text-foreground">{v.norwegian}</div>
                {v.audioPhonetic && <div className="text-xs text-primary/70 italic">/{v.audioPhonetic}/</div>}
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${difficultyColor[v.difficulty]}`}>{v.difficulty}</span>
            </div>
            <div className="text-sm text-muted-foreground font-medium">{v.english}</div>
            {v.example && (
              <div className="mt-2 pt-2 border-t border-border/50 text-xs">
                <div className="text-foreground italic">{v.example}</div>
                <div className="text-muted-foreground mt-0.5">{v.exampleTranslation}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
