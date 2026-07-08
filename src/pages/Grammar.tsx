import { useState } from "react";
import { BookMarked, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { SpeakButton } from "../lib/speech";
import { Link } from "wouter";

type CardProps = { title: string; subtitle?: string; defaultOpen?: boolean; children: React.ReactNode };

function GrammarCard({ title, subtitle, defaultOpen = false, children }: CardProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/40 transition-colors"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <div>
          <div className="font-semibold text-foreground text-sm">{title}</div>
          {subtitle && <div className="text-xs text-muted-foreground mt-0.5">{subtitle}</div>}
        </div>
        {open ? <ChevronUp size={16} className="text-muted-foreground shrink-0" /> : <ChevronDown size={16} className="text-muted-foreground shrink-0" />}
      </button>
      {open && <div className="border-t border-border px-5 py-4">{children}</div>}
    </div>
  );
}

function ConjTable({ rows, headers }: { rows: string[][]; headers: string[] }) {
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>{headers.map((h, i) => (
            <th key={i} className="text-left px-3 py-2 bg-muted/60 text-muted-foreground font-semibold text-xs uppercase tracking-wider border-b border-border first:rounded-tl-lg last:rounded-tr-lg">{h}</th>
          ))}</tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-border/60 last:border-b-0 hover:bg-muted/20 transition-colors">
              {row.map((cell, ci) => (
                <td key={ci} className={`px-3 py-2.5 ${ci === 0 ? "font-semibold text-primary text-sm" : ci === 1 ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                  {(ci === 0 || ci === 1) ? (
                    <span className="inline-flex items-center gap-1">
                      {cell}
                      {ci === 0 && <SpeakButton text={cell.replace(/^å /, '')} size="sm" rate={0.85} />}
                    </span>
                  ) : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AdjCard({ gender, tag, indef, def, pl, defPl, example }: { gender: string; tag: string; indef: string; def: string; pl: string; defPl: string; example: string }) {
  return (
    <div className="bg-muted/30 rounded-xl p-4 space-y-2">
      <div className="flex items-center gap-2 mb-3">
        <span className="px-2 py-0.5 rounded bg-primary/15 text-primary text-xs font-bold uppercase tracking-wide">{tag}</span>
        <span className="text-sm font-semibold text-foreground">{gender}</span>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <div><div className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Indefinite</div><div className="font-medium text-foreground">{indef}</div></div>
        <div><div className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Definite</div><div className="font-medium text-foreground">{def}</div></div>
        <div><div className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Plural</div><div className="font-medium text-foreground">{pl}</div></div>
        <div><div className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Definite Plural</div><div className="font-medium text-foreground">{defPl}</div></div>
      </div>
      <div className="flex items-center gap-1.5 border-t border-border/50 pt-2 mt-2">
        <span className="text-xs text-primary/80 italic">{example.split(" — ")[0]}</span>
        <SpeakButton text={example.split(" — ")[0]} size="sm" rate={0.85} />
        {example.includes(" — ") && <span className="text-xs text-muted-foreground">— {example.split(" — ")[1]}</span>}
      </div>
    </div>
  );
}

function TipBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex gap-2.5 text-sm text-foreground">
      <span className="text-primary font-bold shrink-0 text-base">💡</span>
      <span className="leading-relaxed">{children}</span>
    </div>
  );
}

function PrepRow({ prep, meaning, example }: { prep: string; meaning: string; example: string }) {
  const [norw, eng] = example.includes(" — ") ? example.split(" — ") : [example, ""];
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-border/60 last:border-b-0">
      <div className="w-24 shrink-0 flex items-center gap-1">
        <span className="font-bold text-primary text-sm">{prep}</span>
        <SpeakButton text={prep} size="sm" rate={0.85} />
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium text-foreground">{meaning}</div>
        <div className="flex items-center gap-1 mt-0.5">
          <span className="text-xs text-muted-foreground italic">{norw}</span>
          <SpeakButton text={norw} size="sm" rate={0.8} />
          {eng && <span className="text-xs text-muted-foreground">— {eng}</span>}
        </div>
      </div>
    </div>
  );
}

const regularVerbs = [
  ["å snakke","snakker","snakket / snakka","har snakket / snakka","to talk"],
  ["å vaske","vasker","vasket / vaska","har vasket / vaska","to wash"],
  ["å smile","smiler","smilte","har smilt","to smile"],
  ["å høre","hører","hørte","har hørt","to hear"],
  ["å prøve","prøver","prøvde","har prøvd","to try"],
  ["å eie","eier","eide","har eid","to own"],
  ["å snø","snør","snødde","har snødd","to snow"],
  ["å bo","bor","bodde","har bodd","to live"],
];

const irregularVerbs = [
  ["å være","er","var","har vært","to be"],
  ["å ha","har","hadde","har hatt","to have"],
  ["å få","får","fikk","har fått","to get/receive"],
  ["å gi","gir","ga","har gitt","to give"],
  ["å gå","går","gikk","har gått","to walk/go"],
  ["å drikke","drikker","drakk","har drukket","to drink"],
  ["å skrive","skriver","skrev","har skrevet","to write"],
  ["å finne","finner","fant","har funnet","to find"],
  ["å si","sier","sa","har sagt","to say"],
  ["å le","ler","lo","har ledd","to laugh"],
  ["å gjøre","gjør","gjorde","har gjort","to do"],
  ["å fly","flyr","fløy / flydde","har fløyet / flydd","to fly"],
  ["å sitte","sitter","satt","har sittet","to sit"],
  ["å ligge","ligger","lå","har ligget","to lie/lay"],
  ["å vite","vet","visste","har visst","to know"],
  ["å velge","velger","valgte","har valgt","to choose"],
  ["å spørre","spør","spurte","har spurt","to ask"],
  ["å synge","synger","sang","har sunget","to sing"],
];

const conjHeaders = ["Infinitiv","Presens","Preteritum","Perf.","English"];

const adjectives = [
  { gender:"Masculine / Hankjønn", tag:"en", indef:"en stor hund", def:"den store hunden", pl:"store hunder", defPl:"de store hundene", example:"Den store hunden er snill. — The big dog is kind." },
  { gender:"Feminine / Hunkjønn", tag:"ei", indef:"ei stor stjerne", def:"den store stjerna", pl:"store stjerner", defPl:"de store stjernene", example:"Den store stjerna lyser. — The big star shines." },
  { gender:"Neuter / Intetkjønn", tag:"et", indef:"et stort problem", def:"det store problemet", pl:"store problemer", defPl:"de store problemene", example:"Det store problemet er løst. — The big problem is solved." },
];

const articles = [
  { article:"en", gender:"Masculine (hankjønn)", example:"en hund — a dog", tip:"Most common gender. When in doubt, use 'en'." },
  { article:"ei", gender:"Feminine (hunkjønn)", example:"ei jente — a girl", tip:"Can often be replaced with 'en' in Bokmål." },
  { article:"et", gender:"Neuter (intetkjønn)", example:"et hus — a house", tip:"About 1/3 of nouns. Definite: -et (huset)." },
];

const prepositions = [
  { prep:"på loftet", meaning:"in/on the attic", example:"Klærne er på loftet. — The clothes are in the attic." },
  { prep:"i stua", meaning:"in the living room", example:"Vi ser TV i stua. — We watch TV in the living room." },
  { prep:"på kottet", meaning:"in the storage room", example:"Støvsugeren er på kottet. — The vacuum is in the storage room." },
  { prep:"på soverommet", meaning:"in the bedroom", example:"Sengen er på soverommet. — The bed is in the bedroom." },
  { prep:"på kjøkkenet", meaning:"in the kitchen", example:"Vi lager mat på kjøkkenet. — We cook in the kitchen." },
  { prep:"på badet", meaning:"in the bathroom", example:"Dusjen er på badet. — The shower is in the bathroom." },
  { prep:"i klesskapet", meaning:"in the wardrobe", example:"Skjortene er i klesskapet. — The shirts are in the wardrobe." },
  { prep:"i kjelleren", meaning:"in the basement", example:"Bilen er i kjelleren. — The car is in the basement." },
];

// ── Word order position pill ──────────────────────────────────────────────────
function PosPill({ label, role, accent = false }: { label: string; role: string; accent?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`px-3 py-1.5 rounded-lg text-sm font-bold whitespace-nowrap ${
        accent
          ? "bg-primary text-primary-foreground"
          : "bg-muted text-foreground border border-border"
      }`}>
        {label}
      </div>
      <div className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{role}</div>
    </div>
  );
}

function WordOrderDiagram({ parts, connector }: { parts: { label: string; role: string; accent?: boolean }[]; connector?: string }) {
  return (
    <div className="flex flex-wrap items-end gap-2 py-1">
      {parts.map((p, i) => (
        <>
          <PosPill key={i} {...p} />
          {i < parts.length - 1 && (
            <ArrowRight size={14} className="text-muted-foreground mb-3" />
          )}
        </>
      ))}
      {connector && <span className="text-xs text-muted-foreground mb-3 ml-1">{connector}</span>}
    </div>
  );
}

export default function Grammar() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-primary/10 rounded-xl"><BookMarked size={22} className="text-primary" /></div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Grammatikk</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Grammar reference cards — verb conjugation, adjective agreement, articles &amp; prepositions.</p>
        </div>
      </div>

      {/* ── FEATURED: Sentence Structure & Word Order ── */}
      <section>
        <div className="flex items-center gap-2 mb-3 px-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">⭐ Featured</span>
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Sentence Structure & Word Order — Setningsstruktur</h2>
        </div>
        <div className="bg-gradient-to-br from-primary/8 via-primary/4 to-transparent border border-primary/30 rounded-2xl p-5 space-y-5">

          {/* Intro callout */}
          <div className="flex items-start gap-3">
            <div className="text-2xl">📐</div>
            <div>
              <div className="font-bold text-foreground text-sm">The V2 Rule — Verbandreregelen</div>
              <div className="text-sm text-muted-foreground mt-1 leading-relaxed">
                In Norwegian, <strong className="text-foreground">the verb always comes second</strong> in a main clause — no matter what appears first.
                This is the single most important rule in Norwegian grammar.
              </div>
              <Link href="/lessons/14">
                <span className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-primary hover:underline cursor-pointer">
                  Open full lesson with 10-question quiz <ArrowRight size={11} />
                </span>
              </Link>
            </div>
          </div>

          {/* Rule 1: SVO */}
          <GrammarCard title="Rule 1 — Basic SVO: Subject · Verb · Object" subtitle="The default order when the subject starts the sentence" defaultOpen>
            <div className="space-y-4">
              <WordOrderDiagram parts={[
                { label: "Jeg",    role: "Subject" },
                { label: "spiser", role: "Verb", accent: true },
                { label: "et eple",role: "Object" },
              ]} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                {[
                  ["Jeg spiser et eple.", "I eat an apple."],
                  ["Hun leser en bok.", "She reads a book."],
                  ["Vi bor i Oslo.", "We live in Oslo."],
                  ["De liker musikk.", "They like music."],
                ].map(([no, en]) => (
                  <div key={no} className="flex items-center gap-2 bg-card/70 rounded-lg px-3 py-2 border border-border/60">
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{no}</div>
                      <div className="text-xs text-muted-foreground italic">{en}</div>
                    </div>
                    <SpeakButton text={no} size="sm" rate={0.85} />
                  </div>
                ))}
              </div>
            </div>
          </GrammarCard>

          {/* Rule 2: Inversion */}
          <GrammarCard title="Rule 2 — Inversion: Any Fronted Element + Verb Second" subtitle="When time/place/adverb leads, subject and verb swap" defaultOpen>
            <div className="space-y-4">
              <TipBox>
                If anything other than the subject starts the sentence, <strong>invert</strong> the subject and verb so the verb stays in position 2.
              </TipBox>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Normal SVO</div>
                  <WordOrderDiagram parts={[
                    { label: "Jeg",    role: "Subject" },
                    { label: "spiser", role: "Verb ②", accent: true },
                    { label: "lunsj",  role: "Object" },
                    { label: "i dag",  role: "Time" },
                  ]} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">Inverted (time first)</div>
                  <WordOrderDiagram parts={[
                    { label: "I dag",  role: "Time ①", accent: false },
                    { label: "spiser", role: "Verb ②", accent: true },
                    { label: "jeg",    role: "Subject ③" },
                    { label: "lunsj",  role: "Object" },
                  ]} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                {[
                  ["I dag jobber jeg hjemme.",       "Today I work from home."],
                  ["I morgen reiser vi til Bergen.",  "Tomorrow we travel to Bergen."],
                  ["Nå leser han avisen.",            "Now he is reading the newspaper."],
                  ["Derfor drikker vi kaffe.",        "Therefore we drink coffee."],
                ].map(([no, en]) => (
                  <div key={no} className="flex items-center gap-2 bg-card/70 rounded-lg px-3 py-2 border border-border/60">
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{no}</div>
                      <div className="text-xs text-muted-foreground italic">{en}</div>
                    </div>
                    <SpeakButton text={no} size="sm" rate={0.85} />
                  </div>
                ))}
              </div>
            </div>
          </GrammarCard>

          {/* Rule 3: Questions */}
          <GrammarCard title="Rule 3 — Questions" subtitle="Yes/No: verb first · Wh-questions: question word then verb">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Yes/No — Verb First</div>
                  <WordOrderDiagram parts={[
                    { label: "Liker", role: "Verb ①", accent: true },
                    { label: "du",    role: "Subject" },
                    { label: "kaffe?",role: "Object" },
                  ]} />
                  <div className="space-y-1.5 mt-3">
                    {[
                      ["Spiser du frokost?", "Do you eat breakfast?"],
                      ["Er hun norsk?",       "Is she Norwegian?"],
                      ["Kan du hjelpe meg?",  "Can you help me?"],
                    ].map(([no, en]) => (
                      <div key={no} className="flex items-center gap-2 bg-card/70 rounded-lg px-3 py-2 border border-border/60 text-sm">
                        <div className="flex-1">
                          <div className="font-medium text-foreground">{no}</div>
                          <div className="text-xs text-muted-foreground italic">{en}</div>
                        </div>
                        <SpeakButton text={no} size="sm" rate={0.85} />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Wh-Questions</div>
                  <WordOrderDiagram parts={[
                    { label: "Hvor", role: "Wh-word" },
                    { label: "bor",  role: "Verb ②", accent: true },
                    { label: "du?",  role: "Subject" },
                  ]} />
                  <div className="space-y-1.5 mt-3">
                    {[
                      ["Hva spiser du?",    "What do you eat?"],
                      ["Hvem er hun?",       "Who is she?"],
                      ["Hvorfor gråter han?","Why is he crying?"],
                    ].map(([no, en]) => (
                      <div key={no} className="flex items-center gap-2 bg-card/70 rounded-lg px-3 py-2 border border-border/60 text-sm">
                        <div className="flex-1">
                          <div className="font-medium text-foreground">{no}</div>
                          <div className="text-xs text-muted-foreground italic">{en}</div>
                        </div>
                        <SpeakButton text={no} size="sm" rate={0.85} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </GrammarCard>

          {/* Rule 4: Negation */}
          <GrammarCard title="Rule 4 — Negation with 'ikke'" subtitle="After verb in main clause · Before verb in subordinate clause">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mb-2">Main clause — ikke after verb</div>
                  <WordOrderDiagram parts={[
                    { label: "Jeg",    role: "Subject" },
                    { label: "spiser", role: "Verb", accent: true },
                    { label: "ikke",   role: "Negation", accent: false },
                    { label: "kjøtt.",  role: "Object" },
                  ]} />
                  <div className="space-y-1.5 mt-3">
                    {[
                      ["Hun liker ikke regn.",      "She does not like rain."],
                      ["Vi er ikke trøtte.",         "We are not tired."],
                      ["De snakker ikke norsk.",    "They don't speak Norwegian."],
                    ].map(([no, en]) => (
                      <div key={no} className="flex items-center gap-2 bg-card/70 rounded-lg px-3 py-2 border border-border/60 text-sm">
                        <div className="flex-1">
                          <div className="font-medium text-foreground">{no}</div>
                          <div className="text-xs text-muted-foreground italic">{en}</div>
                        </div>
                        <SpeakButton text={no} size="sm" rate={0.85} />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wide mb-2">Subordinate clause — ikke before verb</div>
                  <WordOrderDiagram parts={[
                    { label: "at hun",  role: "Conj + Subj" },
                    { label: "ikke",    role: "Negation", accent: false },
                    { label: "kan",     role: "Verb", accent: true },
                    { label: "komme",   role: "Inf." },
                  ]} />
                  <div className="space-y-1.5 mt-3">
                    {[
                      ["Jeg vet at han ikke er her.", "I know that he is not here."],
                      ["Hun sier at hun ikke kan komme.", "She says she cannot come."],
                      ["Fordi vi ikke har tid.", "Because we don't have time."],
                    ].map(([no, en]) => (
                      <div key={no} className="flex items-center gap-2 bg-card/70 rounded-lg px-3 py-2 border border-border/60 text-sm">
                        <div className="flex-1">
                          <div className="font-medium text-foreground">{no}</div>
                          <div className="text-xs text-muted-foreground italic">{en}</div>
                        </div>
                        <SpeakButton text={no} size="sm" rate={0.85} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </GrammarCard>

          {/* Quick cheat-sheet */}
          <div className="bg-card/80 border border-border rounded-xl p-4">
            <div className="font-semibold text-foreground text-sm mb-3">Quick Cheat Sheet — Hurtigoversikt</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { rule: "Basic statement",    pattern: "Subject → Verb → Object",              ex: "Jeg spiser mat." },
                { rule: "Inversion",          pattern: "[Adverb] → Verb → Subject → ...",       ex: "I dag spiser jeg mat." },
                { rule: "Yes/No question",    pattern: "Verb → Subject → Object?",              ex: "Spiser du mat?" },
                { rule: "Wh-question",        pattern: "Wh-word → Verb → Subject?",             ex: "Hva spiser du?" },
                { rule: "Negation (main)",    pattern: "Subject → Verb → ikke → ...",           ex: "Jeg spiser ikke kjøtt." },
                { rule: "Negation (sub)",     pattern: "Conj → Subject → ikke → Verb",          ex: "...at hun ikke spiser kjøtt." },
                { rule: "Adverbial order",    pattern: "Time → Manner → Place",                  ex: "I morgen med tog til Oslo." },
                { rule: "Subordinate clause", pattern: "Conj + Subject + [ikke] + Verb (+ rest)",ex: "fordi jeg elsker Norge." },
              ].map(({ rule, pattern, ex }) => (
                <div key={rule} className="bg-muted/30 rounded-lg px-3 py-2.5 space-y-0.5">
                  <div className="text-xs font-bold text-primary">{rule}</div>
                  <div className="text-xs text-muted-foreground font-mono">{pattern}</div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-foreground italic">{ex}</span>
                    <SpeakButton text={ex} size="sm" rate={0.85} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <section>
        <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 px-1">Verb Conjugation — Verbkonjugasjon</h2>
        <div className="space-y-3">
          <GrammarCard title="Regular Verbs — Regelrette verb" subtitle="Follow predictable patterns based on their ending" defaultOpen>
            <div className="space-y-4">
              <TipBox>Norwegian verbs conjugate in <strong>present (presens)</strong>, <strong>past (preteritum)</strong>, and <strong>present perfect (presens perfektum)</strong>. Regular verbs follow patterns based on their infinitive ending.</TipBox>
              <ConjTable headers={conjHeaders} rows={regularVerbs} />
            </div>
          </GrammarCard>
          <GrammarCard title="Irregular Verbs — Uregelrette verb" subtitle="Must be memorized — no predictable pattern" defaultOpen>
            <div className="space-y-4">
              <TipBox>These are the most common Norwegian verbs. The past tense changes completely — learn them by heart. <strong>Å være</strong> (to be) and <strong>å ha</strong> (to have) are used constantly.</TipBox>
              <ConjTable headers={conjHeaders} rows={irregularVerbs} />
            </div>
          </GrammarCard>
        </div>
      </section>

      <section>
        <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 px-1">Adjective Agreement — Adjektivbøying</h2>
        <div className="space-y-3">
          <GrammarCard title="Agreement by Gender" subtitle="Adjectives change form depending on noun gender and definiteness" defaultOpen>
            <div className="space-y-4">
              <TipBox>Norwegian adjectives agree with the noun in <strong>gender</strong> (masculine, feminine, neuter) and <strong>definiteness</strong>. In the <em>definite</em> form (with den/det/de), adjectives always take the <strong>-e</strong> ending regardless of gender.</TipBox>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {adjectives.map(adj => <AdjCard key={adj.tag} {...adj} />)}
              </div>
              <div className="bg-muted/30 rounded-xl p-4 text-sm">
                <div className="font-semibold text-foreground mb-2">Rule Summary</div>
                <div className="space-y-1.5 text-muted-foreground">
                  <div><span className="text-foreground font-medium">Indefinite singular:</span> base form (stor) or neuter +t (stort)</div>
                  <div><span className="text-foreground font-medium">Definite singular:</span> always +e (store)</div>
                  <div><span className="text-foreground font-medium">Any plural:</span> always +e (store)</div>
                </div>
              </div>
            </div>
          </GrammarCard>
        </div>
      </section>

      <section>
        <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 px-1">Articles &amp; Gender — Artikler og kjønn</h2>
        <div className="space-y-3">
          <GrammarCard title="Indefinite Articles (en / ei / et)" subtitle="Three genders — choose based on the noun" defaultOpen>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {articles.map(a => (
                  <div key={a.article} className="bg-muted/30 rounded-xl p-4 space-y-2">
                    <div className="text-3xl font-bold text-primary">{a.article}</div>
                    <div className="font-semibold text-foreground text-sm">{a.gender}</div>
                    <div className="text-sm text-muted-foreground italic">{a.example}</div>
                    <div className="text-xs text-muted-foreground border-t border-border/50 pt-2">{a.tip}</div>
                  </div>
                ))}
              </div>
              <TipBox><strong>No article needed</strong> in common situations: <em>Jeg sparer penger for å kjøpe hus</em> (no "et" before "hus"). <em>Har du katt?</em> (no "en" before "katt"). <em>Jeg tar buss til jobb</em> (no "en" before "buss"). This happens with very everyday/habitual nouns.</TipBox>
            </div>
          </GrammarCard>
          <GrammarCard title="Definite Forms" subtitle="Add a suffix to the noun instead of a separate article">
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="grid grid-cols-4 bg-muted/60 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                <div className="px-3 py-2.5 border-b border-border">Gender</div>
                <div className="px-3 py-2.5 border-b border-border border-l">Indefinite</div>
                <div className="px-3 py-2.5 border-b border-border border-l">Definite</div>
                <div className="px-3 py-2.5 border-b border-border border-l">Suffix</div>
              </div>
              {[["Masculine (en)","en hund","hunden","-en"],["Feminine (ei)","ei jente","jenta / jenten","-a / -en"],["Neuter (et)","et hus","huset","-et"],["Plural","hunder / hus","hundene / husene","-ene / -ene"]].map(([g, indef, def, suf]) => (
                <div key={g} className="grid grid-cols-4 border-b border-border/60 last:border-b-0 text-sm hover:bg-muted/20 transition-colors">
                  <div className="px-3 py-2.5 font-medium text-foreground">{g}</div>
                  <div className="px-3 py-2.5 text-muted-foreground border-l border-border/40 italic">{indef}</div>
                  <div className="px-3 py-2.5 font-semibold text-primary border-l border-border/40">{def}</div>
                  <div className="px-3 py-2.5 text-muted-foreground border-l border-border/40">{suf}</div>
                </div>
              ))}
            </div>
          </GrammarCard>
        </div>
      </section>

      <section>
        <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 px-1">Prepositions — Preposisjoner</h2>
        <div className="space-y-3">
          <GrammarCard title="Rooms &amp; Locations in the House" subtitle="Norwegian uses 'på' for most rooms, 'i' for enclosed spaces" defaultOpen>
            <div className="space-y-4">
              <TipBox>Norwegian makes a distinction: <strong>på</strong> is used for open rooms (på kjøkkenet, på soverommet), while <strong>i</strong> is used for enclosed or container-like spaces (i stua, i kjelleren, i klesskapet).</TipBox>
              <div className="bg-card border border-border rounded-xl px-4 pt-1 pb-1">
                {prepositions.map(p => <PrepRow key={p.prep} {...p} />)}
              </div>
            </div>
          </GrammarCard>
          <GrammarCard title="Common Directional Prepositions" subtitle="til, fra, mot, forbi, gjennom, over, under">
            <div className="bg-card border border-border rounded-xl px-4 pt-1 pb-1">
              {[
                { prep:"til", meaning:"to / towards", example:"Jeg går til skolen. — I go to school." },
                { prep:"fra", meaning:"from", example:"Jeg er fra Norge. — I am from Norway." },
                { prep:"mot", meaning:"towards / against", example:"Gå mot lyset. — Walk towards the light." },
                { prep:"forbi", meaning:"past / by", example:"Vi kjørte forbi parken. — We drove past the park." },
                { prep:"gjennom", meaning:"through", example:"Gå gjennom tunnelen. — Go through the tunnel." },
                { prep:"over", meaning:"over / across", example:"Fuglen flyr over huset. — The bird flies over the house." },
                { prep:"under", meaning:"under / below", example:"Katten sitter under bordet. — The cat sits under the table." },
              ].map(p => <PrepRow key={p.prep} {...p} />)}
            </div>
          </GrammarCard>
        </div>
      </section>

      <section>
        <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 px-1">Quick Tips — Hurtigtips</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { title:"No capital for days &amp; months", body:"Unlike English, Norwegian does not capitalize days of the week or months: mandag, tirsdag, januar, februar." },
            { title:"Verb position in questions", body:"In yes/no questions, the verb comes first: Er du norsk? (Are you Norwegian?) In wh-questions: Hva heter du? (What is your name?)" },
            { title:"Double consonant = short vowel", body:"If a vowel is short, the following consonant is doubled: mann (man), komme (come), kutte (cut). This signals pronunciation. Long vowels take a single consonant: bil (car), lese (read)." },
            { title:"Subject + Verb + Object", body:"Basic Norwegian follows SVO word order like English: Jeg spiser et eple. (I eat an apple.) Time expressions often come first: I dag spiser jeg et eple." },
          ].map(tip => (
            <div key={tip.title} className="bg-card border border-border rounded-xl p-4 space-y-2">
              <div className="font-semibold text-foreground text-sm" dangerouslySetInnerHTML={{ __html: tip.title }} />
              <div className="text-sm text-muted-foreground leading-relaxed">{tip.body}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
