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

          {/* Hero intro */}
          <div className="flex items-start gap-3">
            <div className="text-2xl">📐</div>
            <div>
              <div className="font-bold text-foreground text-sm">The Action Word is Like a Magnet 🧲</div>
              <div className="text-sm text-muted-foreground mt-1 leading-relaxed">
                In Norwegian, <strong className="text-foreground">the action word (verb) always sticks to spot #2</strong> — no matter what. If you put a time word first, the action word still comes second. This is the most important rule in all of Norwegian!
              </div>
              <Link href="/lessons/14">
                <span className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-primary hover:underline cursor-pointer">
                  Open full lesson with 10-question quiz <ArrowRight size={11} />
                </span>
              </Link>
            </div>
          </div>

          {/* Sentence Blueprint (setningsskjema) */}
          <GrammarCard title="The Sentence Blueprint — Setningsskjema" subtitle="Every Norwegian sentence fits into these slots" defaultOpen>
            <div className="space-y-4">
              <TipBox>
                Think of a Norwegian sentence as a train with 7 cars. Each car has its own job. The <strong>action word always rides in car #2</strong>. 🚂
              </TipBox>
              {/* Slot header row */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse min-w-[500px]">
                  <thead>
                    <tr>
                      {["① Front", "② Action Word", "③ Who", "④ ikke/aldri", "⑤ Extra Verb", "⑥ Object", "⑦ When/Where"].map((h, i) => (
                        <th key={h} className={`px-2 py-2 text-center font-bold border border-border/60 ${i === 1 ? "bg-primary/20 text-primary" : "bg-muted/40 text-muted-foreground"}`}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Jeg", "spiser", "—", "—", "—", "fisk", "hver dag"],
                      ["I dag", "har", "vi", "ikke", "sett", "filmen", "—"],
                      ["Spiser", "—", "du", "—", "—", "fisk?", "—"],
                      ["Hvorfor", "gråter", "han", "—", "—", "—", "—"],
                    ].map((row, ri) => (
                      <tr key={ri} className={ri % 2 === 0 ? "bg-card/50" : "bg-muted/20"}>
                        {row.map((cell, ci) => (
                          <td key={ci} className={`px-2 py-1.5 text-center border border-border/40 ${ci === 1 ? "font-bold text-primary" : "text-foreground"} ${cell === "—" ? "text-muted-foreground/40" : ""}`}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="text-xs text-muted-foreground italic text-center">Row 2: "I dag har vi ikke sett filmen." = Today we have not seen the movie.</div>
            </div>
          </GrammarCard>

          {/* Rule 1: SVO */}
          <GrammarCard title="Rule 1 — Basic Blueprint: Who · Action Word · What" subtitle="The normal order when the subject (who) starts the sentence" defaultOpen>
            <div className="space-y-4">
              <WordOrderDiagram parts={[
                { label: "Jeg",    role: "Who (Subject)" },
                { label: "spiser", role: "② Action Word", accent: true },
                { label: "et eple",role: "What (Object)" },
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

          {/* Rule 2: Inversion / The Switcheroo */}
          <GrammarCard title="Rule 2 — The Switcheroo! 🔀" subtitle="When time/place goes first, swap the action word and 'who' — verb stays at #2" defaultOpen>
            <div className="space-y-4">
              <TipBox>
                No matter what you put at the start of a sentence, the <strong>action word always comes second. Always. No exceptions.</strong> So if you move a time word to the front, the "who" word hops to spot #3. This swap is called <em>inversion</em>.
              </TipBox>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Normal Order</div>
                  <WordOrderDiagram parts={[
                    { label: "Jeg",    role: "① Who" },
                    { label: "spiser", role: "② Action", accent: true },
                    { label: "lunsj",  role: "What" },
                    { label: "i dag",  role: "Time" },
                  ]} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">After Switcheroo (time first)</div>
                  <WordOrderDiagram parts={[
                    { label: "I dag",  role: "① Time", accent: false },
                    { label: "spiser", role: "② Action", accent: true },
                    { label: "jeg",    role: "③ Who" },
                    { label: "lunsj",  role: "What" },
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
          <GrammarCard title="Rule 3 — Questions" subtitle="Yes/No: action word first · Question words: hva/hvor/hvem then action word">
            <div className="space-y-4">
              <TipBox>
                Norwegian has <strong>no "do" helper word</strong> in questions! Just put the action word first for yes/no questions. 🚫 Don't say "Gjør du snakker norsk?" — just say "Snakker du norsk?"
              </TipBox>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Yes/No — Action Word First!</div>
                  <WordOrderDiagram parts={[
                    { label: "Liker", role: "① Action", accent: true },
                    { label: "du",    role: "② Who" },
                    { label: "kaffe?",role: "What" },
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
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Question Words — Then Action Word</div>
                  <WordOrderDiagram parts={[
                    { label: "Hvor", role: "Question word" },
                    { label: "bor",  role: "② Action", accent: true },
                    { label: "du?",  role: "Who" },
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
          <GrammarCard title="Rule 4 — Saying 'Not' with ikke ❌" subtitle="The ikke Test: main sentence → verb THEN ikke · because/if/when → ikke THEN verb">
            <div className="space-y-4">
              <TipBox>
                <strong>The ikke Test:</strong> Where does "ikke" go? It tells you which type of sentence you are in!
                Normal sentence → action word first, then "ikke". &nbsp;
                "Because/if/when" sentence → "ikke" before the action word.
              </TipBox>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mb-2">✅ Normal sentence — action word, THEN ikke</div>
                  <WordOrderDiagram parts={[
                    { label: "Jeg",    role: "Who" },
                    { label: "spiser", role: "Action", accent: true },
                    { label: "ikke",   role: "not", accent: false },
                    { label: "kjøtt.", role: "What" },
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
                  <div className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wide mb-2">⚠️ Because/if/when — ikke BEFORE action word</div>
                  <WordOrderDiagram parts={[
                    { label: "at hun",  role: "conj + who" },
                    { label: "ikke",    role: "not", accent: false },
                    { label: "kan",     role: "Action", accent: true },
                    { label: "komme",   role: "Infinitive" },
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

          {/* Commands */}
          <GrammarCard title="Commands — Imperativ 📣" subtitle="Drop the subject, use just the root of the action word">
            <div className="space-y-3">
              <TipBox>
                Commands are <strong>super simple</strong>! Just take the action word, drop the <em>-e</em> ending, and you're done. No subject needed! <em>å snakke</em> → <strong>Snakk!</strong> · <em>å komme</em> → <strong>Kom!</strong>
              </TipBox>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                {[
                  ["Kom hit!", "Come here!"],
                  ["Snakk langsomt!", "Speak slowly!"],
                  ["Sett deg!", "Sit down!"],
                  ["Vent litt!", "Wait a moment!"],
                  ["Hjelp meg!", "Help me!"],
                  ["Vær så snill!", "Please! (be so kind)"],
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

          {/* Hidden Questions (Indirect) */}
          <GrammarCard title="Hidden Questions Inside Sentences 🤔" subtitle="When a question hides inside another sentence, word order flips back to normal">
            <div className="space-y-3">
              <TipBox>
                A question by itself: <em>Hvor bor han?</em> (Where does he live?) — action word second. <br />
                The same question hidden inside: <em>Jeg vet ikke <strong>hvor han bor</strong>.</em> — now "han bor" (normal order)! The switcheroo does NOT happen inside hidden questions.
              </TipBox>
              <div className="grid grid-cols-1 gap-2 text-sm">
                {[
                  ["Jeg vet ikke hvor han bor.", "I don't know where he lives."],
                  ["Hun spør hva jeg heter.", "She asks what my name is."],
                  ["Jeg lurer på hvem som kommer.", "I wonder who is coming."],
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

          {/* Jo — Magic Word */}
          <GrammarCard title="The Magic Word: Jo! 💡" subtitle="Say Jo (not Ja) when you want to contradict a negative question">
            <div className="space-y-3">
              <TipBox>
                If someone says "Don't you...?" or "Aren't you...?" and the answer is actually YES — say <strong>Jo!</strong> not <em>Ja</em>. <em>Ja</em> agrees with a normal question. <em>Jo</em> pushes back on a negative question. Think of it as "Yes I do, actually!"
              </TipBox>
              <div className="grid grid-cols-1 gap-2 text-sm">
                {[
                  { q: "Snakker du ikke norsk?", a: "Jo, det gjør jeg!", qEn: "Don't you speak Norwegian?", aEn: "Yes I do!" },
                  { q: "Liker du ikke kaffe?", a: "Jo, jeg liker kaffe!", qEn: "Don't you like coffee?", aEn: "Yes, I like coffee!" },
                  { q: "Er du ikke norsk?", a: "Jo, jeg er norsk!", qEn: "Aren't you Norwegian?", aEn: "Yes, I am Norwegian!" },
                ].map(({ q, a, qEn, aEn }) => (
                  <div key={q} className="bg-card/70 rounded-lg px-3 py-2.5 border border-border/60 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-muted-foreground w-4">Q:</span>
                      <div className="flex-1">
                        <span className="font-medium text-foreground">{q}</span>
                        <span className="text-xs text-muted-foreground italic ml-2">({qEn})</span>
                      </div>
                      <SpeakButton text={q} size="sm" rate={0.85} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-primary w-4">Jo:</span>
                      <div className="flex-1">
                        <span className="font-medium text-primary">{a}</span>
                        <span className="text-xs text-muted-foreground italic ml-2">({aEn})</span>
                      </div>
                      <SpeakButton text={a} size="sm" rate={0.85} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GrammarCard>

          {/* 5 Classic Pitfalls */}
          <GrammarCard title="5 Classic Mistakes — Don't Fall In! ⚠️" subtitle="The most common word order errors — and how to fix them">
            <div className="space-y-3">
              {[
                {
                  label: "Forgetting the switcheroo after a time word",
                  wrong: "I går jeg så filmen.",
                  right: "I går så jeg filmen.",
                  tip: "Time word first → action word must be second!",
                },
                {
                  label: "Normal order after 'fordi/at/hvis'",
                  wrong: "fordi han kommer ikke",
                  right: "fordi han ikke kommer",
                  tip: "In 'because/if' sentences, ikke goes BEFORE the action word.",
                },
                {
                  label: "Adding 'do' to questions (English habit!)",
                  wrong: "Gjør du snakker norsk?",
                  right: "Snakker du norsk?",
                  tip: "Norwegian has NO 'do' helper. Just flip the action word to front.",
                },
                {
                  label: "Switcheroo in hidden questions",
                  wrong: "Jeg vet ikke hva er det.",
                  right: "Jeg vet ikke hva det er.",
                  tip: "Hidden questions use normal order — no switcheroo inside!",
                },
                {
                  label: "Two things before the action word",
                  wrong: "I morgen vi reiser til Oslo.",
                  right: "I morgen reiser vi til Oslo.",
                  tip: "Only ONE thing can go before the action word. Ever.",
                },
              ].map(({ label, wrong, right, tip }) => (
                <div key={label} className="bg-muted/30 rounded-xl p-3 space-y-2">
                  <div className="text-xs font-bold text-foreground">⚠️ {label}</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-1.5">
                      <div className="text-[10px] font-bold text-red-500 uppercase tracking-wide mb-0.5">✗ Wrong</div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm text-foreground font-medium">{wrong}</span>
                        <SpeakButton text={wrong} size="sm" rate={0.85} />
                      </div>
                    </div>
                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-3 py-1.5">
                      <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mb-0.5">✓ Right</div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm text-foreground font-medium">{right}</span>
                        <SpeakButton text={right} size="sm" rate={0.85} />
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground italic">💡 {tip}</div>
                </div>
              ))}
            </div>
          </GrammarCard>

          {/* Quick cheat-sheet */}
          <div className="bg-card/80 border border-border rounded-xl p-4">
            <div className="font-semibold text-foreground text-sm mb-3">Quick Cheat Sheet — Hurtigoversikt</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { rule: "Normal sentence",     pattern: "Who → Action Word → What",                  ex: "Jeg spiser mat." },
                { rule: "The Switcheroo",       pattern: "[Time/Place] → Action Word → Who → ...",    ex: "I dag spiser jeg mat." },
                { rule: "Yes/No question",      pattern: "Action Word → Who → What?",                 ex: "Spiser du mat?" },
                { rule: "Question word",        pattern: "Hva/Hvor/... → Action Word → Who?",         ex: "Hva spiser du?" },
                { rule: "ikke (normal)",        pattern: "Who → Action Word → ikke → ...",            ex: "Jeg spiser ikke kjøtt." },
                { rule: "ikke (because/if)",    pattern: "Conj → Who → ikke → Action Word",           ex: "...at hun ikke spiser kjøtt." },
                { rule: "Commands",             pattern: "Action Word root only! (no subject)",        ex: "Snakk! / Kom! / Vent!" },
                { rule: "Jo (magic yes!)",      pattern: "Use Jo to contradict a negative question",  ex: "Snakker du ikke norsk? — Jo!" },
                { rule: "Hidden questions",     pattern: "Normal order inside — no switcheroo",       ex: "Jeg vet ikke hvor han bor." },
                { rule: "Time order",           pattern: "When → How → Where",                        ex: "I morgen med tog til Oslo." },
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
