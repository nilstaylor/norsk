import { Link, useLocation } from "wouter";
import { useTheme } from "../lib/theme";
import { Sun, Moon, BookOpen, Home, Layers, Grid3x3, BookMarked } from "lucide-react";

const navItems = [
  { href: "/", icon: Home, label: "Hjem", sublabel: "Dashboard" },
  { href: "/lessons", icon: BookOpen, label: "Leksjoner", sublabel: "Lessons" },
  { href: "/flashcards", icon: Layers, label: "Flashkort", sublabel: "Flashcards" },
  { href: "/vocabulary", icon: Grid3x3, label: "Ordbok", sublabel: "Vocabulary" },
  { href: "/grammar", icon: BookMarked, label: "Grammatikk", sublabel: "Grammar" },
];

function NorskLogo() {
  return (
    <svg aria-label="Norsk" viewBox="0 0 120 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
      <rect x="0" y="0" width="36" height="36" rx="6" fill="#EF2B2D"/>
      <rect x="0" y="14" width="36" height="8" fill="#FFFFFF"/>
      <rect x="12" y="0" width="8" height="36" fill="#FFFFFF"/>
      <rect x="0" y="15.5" width="36" height="5" fill="#002868"/>
      <rect x="13.5" y="0" width="5" height="36" fill="#002868"/>
      <text x="44" y="25" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="18" fill="currentColor" letterSpacing="-0.5">norsk</text>
    </svg>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { theme, toggle } = useTheme();

  const isActive = (href: string) =>
    href === "/" ? location === "/" : location.startsWith(href);

  return (
    <div className="flex min-h-dvh bg-background">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-56 border-r border-border bg-card shrink-0 sticky top-0 h-dvh">
        <div className="p-5 border-b border-border">
          <Link href="/"><NorskLogo /></Link>
          <p className="text-xs text-muted-foreground mt-1 font-medium tracking-wide uppercase">Learn Norwegian</p>
        </div>

        <nav className="flex-1 p-3 space-y-1" role="navigation" aria-label="Main navigation">
          {navItems.map(({ href, icon: Icon, label, sublabel }) => (
            <Link key={href} href={href}>
              <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 cursor-pointer ${
                isActive(href)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}>
                <Icon size={17} className="shrink-0" />
                <div>
                  <div className="text-sm font-semibold leading-none">{label}</div>
                  <div className={`text-xs mt-0.5 ${isActive(href) ? "text-primary-foreground/70" : "text-muted-foreground/70"}`}>{sublabel}</div>
                </div>
              </div>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <button
            onClick={toggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="flex items-center gap-2 px-3 py-2 w-full rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-card border-t border-border flex" aria-label="Mobile navigation">
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link key={href} href={href} className="flex-1">
            <div className={`flex flex-col items-center gap-1 py-2.5 transition-colors ${
              isActive(href) ? "text-primary" : "text-muted-foreground"
            }`}>
              <Icon size={20} />
              <span className="text-xs font-medium">{label}</span>
            </div>
          </Link>
        ))}
      </nav>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0 pb-20 md:pb-0">
        {/* Mobile header */}
        <header className="md:hidden sticky top-0 z-30 bg-card border-b border-border px-4 py-3 flex items-center justify-between">
          <Link href="/"><NorskLogo /></Link>
          <button onClick={toggle} aria-label="Toggle theme" className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground">
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </header>

        <div className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
