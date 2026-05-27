import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { ArrowLeft, CheckCircle, XCircle, Star, ChevronRight } from "lucide-react";
import { useAppState } from "../lib/state";
import { LESSONS, VOCABULARY, type LessonContent, type LessonSection } from "../data";
import { SpeakButton } from "../lib/speech";

function MarkdownText({ text }: { text: string }) {
  const html = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

function SectionRenderer({ section, vocabMap }: { section: LessonSection; vocabMap: Record<string, { english: string; audioPhonetic: string | null }> }) {
  if (section.type === "intro") {
    return (
      <div className="bg-card border border-border rounded-xl p-5 text-sm leading-relaxed text-foreground">
        <MarkdownText text={section.text} />
      </div>
    );
  }
  if (section.type === "tip") {
    return (
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-sm leading-relaxed">
        <div className="flex items-start gap-2">
          <span className="text-primary font-bold text-base">💡</span>
          <span className="text-foreground"><MarkdownText text={section.text} /></span>
        </div>
      </div>
    );
  }
  if (section.type === "vocab_list") {
    return (
      <div>
        <h3 className="font-semibold text-muted-foreground mb-3 text-xs uppercase tracking-wider">Key Words</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {section.words.map(word => {
            const entry = vocabMap[word];
            return (
              <div key={word} className="bg-card border border-border rounded-lg p-3">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-foreground text-sm">{word}</span>
                  <SpeakButton text={word} size="sm" rate={0.85} />
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{entry?.english || "—"}</div>
                {entry?.audioPhonetic && <div className="text-xs text-primary/70 mt-0.5 italic">/{entry.audioPhonetic}/</div>}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  if (section.type === "dialogue") {
    const rightSpeakers = new Set(["B", "Kelner", "Innbygger"]);
    return (
      <div>
        <h3 className="font-semibold text-muted-foreground mb-3 text-xs uppercase tracking-wider">Dialogue</h3>
        <div className="space-y-3 bg-card border border-border rounded-xl p-4">
          {section.lines.map((line, li) => {
            const isRight = rightSpeakers.has(line.speaker);
            return (
              <div key={li} className={`flex gap-3 ${isRight ? "flex-row-reverse" : ""}`}>
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                  {line.speaker[0]}
                </div>
                <div className={`max-w-xs flex flex-col ${isRight ? "items-end" : "items-start"}`}>
                  <div className="bg-muted rounded-xl px-3 py-2 text-sm">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-medium text-foreground">{line.text}</span>
                      <SpeakButton text={line.text} size="sm" rate={0.85} label={`Hear: ${line.text}`} />
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5 italic">{line.translation}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  if (section.type === "number_table") {
    return (
      <div>
        <h3 className="font-semibold text-muted-foreground mb-3 text-xs uppercase tracking-wider">Numbers</h3>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {section.numbers.map((row, ri) => (
            <div key={ri} className="grid grid-cols-4 divide-x divide-border border-b border-border last:border-b-0">
              {row.map((cell, ci) => <div key={ci} className="p-3 text-sm font-medium text-foreground">{cell}</div>)}
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (section.type === "phrase_group") {
    return (
      <div>
        {section.title && <h3 className="font-semibold text-muted-foreground mb-3 text-xs uppercase tracking-wider">{section.title}</h3>}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {section.phrases.map((p, pi) => (
            <div key={pi} className="flex items-start gap-4 px-4 py-3 border-b border-border/60 last:border-b-0 hover:bg-muted/20 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-foreground text-sm">{p.norwegian}</span>
                  <SpeakButton text={p.norwegian} size="sm" rate={0.85} />
                </div>
                {p.phonetic && <div className="text-xs text-primary/70 italic mt-0.5">/{p.phonetic}/</div>}
              </div>
              <div className="text-sm text-muted-foreground shrink-0 text-right">{p.english}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
}

function Quiz({ quiz, lessonId, xpReward }: { quiz: LessonContent["quiz"]; lessonId: number; xpReward: number }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [done, setDone] = useState(false);
  const [, setLocation] = useLocation();
  const { setLessonProgress } = useAppState();

  const question = quiz[current];

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === question.answer;
    const newAnswers = [...answers, correct];
    setAnswers(newAnswers);

    setTimeout(() => {
      if (current + 1 < quiz.length) {
        setCurrent(c => c + 1);
        setSelected(null);
      } else {
        const finalScore = Math.round((newAnswers.filter(Boolean).length / quiz.length) * 100);
        setLessonProgress(lessonId, {
          completed: true,
          score: finalScore,
          completedAt: new Date().toISOString(),
        });
        setDone(true);
      }
    }, 800);
  };

  if (done) {
    const correct = answers.filter(Boolean).length;
    const score = Math.round((correct / quiz.length) * 100);
    return (
      <div className="text-center py-8 space-y-4">
        <div className="text-5xl">{score >= 80 ? "🎉" : score >= 60 ? "👍" : "📚"}</div>
        <h3 className="text-xl font-bold text-foreground">
          {score >= 80 ? "Utmerket!" : score >= 60 ? "Bra jobbet!" : "Keep practicing!"}
        </h3>
        <p className="text-muted-foreground">You got {correct} out of {quiz.length} correct — {score}%</p>
        <div className="flex items-center justify-center gap-2 text-yellow-600 dark:text-yellow-400 font-semibold">
          <Star size={18} />
          +{xpReward} XP earned!
        </div>
        <div className="flex gap-3 justify-center mt-4">
          <button
            onClick={() => { setCurrent(0); setSelected(null); setAnswers([]); setDone(false); }}
            className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
          >
            Retry Quiz
          </button>
          <button
            onClick={() => setLocation("/lessons")}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            All Lessons <ChevronRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Question {current + 1} of {quiz.length}</span>
        <span>{answers.filter(Boolean).length} correct</span>
      </div>
      <div className="w-full bg-muted rounded-full h-1.5">
        <div className="bg-primary h-1.5 rounded-full progress-fill" style={{ width: `${(current / quiz.length) * 100}%` }} />
      </div>
      <div className="bg-card border border-border rounded-xl p-5">
        <p className="font-semibold text-foreground text-base mb-5">{question.question}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {question.options.map((opt, idx) => {
            const isCorrect = idx === question.answer;
            const isChosen = selected === idx;
            let cls = "p-3 rounded-xl border text-sm font-medium text-left transition-all duration-150 cursor-pointer ";
            if (selected === null) {
              cls += "border-border bg-muted/30 hover:border-primary/50 hover:bg-primary/5 text-foreground";
            } else if (isCorrect) {
              cls += "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400";
            } else if (isChosen) {
              cls += "border-red-400 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400";
            } else {
              cls += "border-border bg-muted/20 text-muted-foreground opacity-60";
            }
            return (
              <button key={idx} onClick={() => handleSelect(idx)} className={cls}>
                <span className="flex items-center gap-2">
                  {selected !== null && isCorrect && <CheckCircle size={15} className="text-emerald-500 shrink-0" />}
                  {selected !== null && isChosen && !isCorrect && <XCircle size={15} className="text-red-500 shrink-0" />}
                  {opt}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function LessonDetail() {
  const params = useParams<{ id: string }>();
  const lessonId = parseInt(params.id);
  const [, setLocation] = useLocation();
  const [mode, setMode] = useState<"learn" | "quiz">("learn");
  const { lessonProgress } = useAppState();

  const lesson = LESSONS.find(l => l.id === lessonId);
  const vocabMap: Record<string, { english: string; audioPhonetic: string | null }> = {};
  for (const v of VOCABULARY) vocabMap[v.norwegian] = { english: v.english, audioPhonetic: v.audioPhonetic };

  if (!lesson) return <div className="text-muted-foreground p-8">Lesson not found</div>;

  const progress = lessonProgress[lessonId];

  return (
    <div className="space-y-6">
      <button
        onClick={() => setLocation("/lessons")}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft size={16} />
        Back to lessons
      </button>

      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">{lesson.category}</div>
            <h1 className="text-xl font-bold text-foreground">{lesson.title}</h1>
            <p className="text-sm text-muted-foreground mt-0.5 italic">{lesson.titleNorwegian}</p>
            <p className="text-sm text-muted-foreground mt-2">{lesson.description}</p>
          </div>
          <div className="shrink-0 text-right">
            {progress?.completed ? (
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-sm font-semibold">
                <CheckCircle size={16} /> Completed
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-yellow-600 dark:text-yellow-400 text-sm font-medium">
                <Star size={14} /> {lesson.xpReward} XP
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-2 mt-4 border-t border-border pt-4">
          <button
            onClick={() => setMode("learn")}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${mode === "learn" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
          >Learn</button>
          <button
            onClick={() => setMode("quiz")}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${mode === "quiz" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
          >Quiz</button>
        </div>
      </div>

      {mode === "learn" ? (
        <div className="space-y-4">
          <div className="space-y-6">
            {lesson.content.sections.map((section, i) => (
              <SectionRenderer key={i} section={section} vocabMap={vocabMap} />
            ))}
          </div>
          <button
            onClick={() => setMode("quiz")}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            Take the Quiz <ChevronRight size={18} />
          </button>
        </div>
      ) : (
        <Quiz quiz={lesson.content.quiz} lessonId={lessonId} xpReward={lesson.xpReward} />
      )}
    </div>
  );
}
