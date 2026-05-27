import { useState, useCallback, useRef } from "react";
import { Volume2, Loader2 } from "lucide-react";

/**
 * Web Speech API hook — 100% free, no API key, works in all modern browsers.
 * Uses nb-NO (Norwegian Bokmål) voice when available, falls back to any
 * available Norwegian voice, then to browser default.
 */

let cachedVoice: SpeechSynthesisVoice | null | undefined = undefined;

function getNorwegianVoice(): SpeechSynthesisVoice | null {
  if (!("speechSynthesis" in window)) return null;
  if (cachedVoice !== undefined) return cachedVoice;

  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) return null; // not loaded yet

  // Priority order: nb-NO exact → nn-NO → any voice with "norw" in name → any "nb" → null
  const priority = [
    voices.find(v => v.lang === "nb-NO"),
    voices.find(v => v.lang === "nn-NO"),
    voices.find(v => v.lang.startsWith("nb")),
    voices.find(v => v.name.toLowerCase().includes("norw")),
    voices.find(v => v.lang.startsWith("no")),
  ];
  cachedVoice = priority.find(Boolean) ?? null;
  return cachedVoice;
}

export function speak(text: string, rate = 0.88): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!("speechSynthesis" in window)) {
      reject(new Error("Speech synthesis not supported"));
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "nb-NO";
    utter.rate = rate;
    utter.pitch = 1.0;
    utter.volume = 1.0;

    const voice = getNorwegianVoice();
    if (voice) utter.voice = voice;

    utter.onend = () => resolve();
    utter.onerror = (e) => reject(e);

    // Voices may not be loaded yet on first call — wait and retry once
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = () => {
        cachedVoice = undefined; // reset cache so we re-detect
        const v = getNorwegianVoice();
        if (v) utter.voice = v;
        window.speechSynthesis.speak(utter);
      };
    } else {
      window.speechSynthesis.speak(utter);
    }
  });
}

export function useSpeech() {
  const [speaking, setSpeaking] = useState(false);
  const abortRef = useRef(false);

  const say = useCallback(async (text: string, rate?: number) => {
    if (!text) return;
    abortRef.current = false;
    setSpeaking(true);
    try {
      await speak(text, rate);
    } catch (_) {
      // Silently swallow — cancelled utterances throw, that's fine
    } finally {
      if (!abortRef.current) setSpeaking(false);
    }
  }, []);

  const stop = useCallback(() => {
    abortRef.current = true;
    window.speechSynthesis?.cancel();
    setSpeaking(false);
  }, []);

  return { say, stop, speaking };
}

// ─── SpeakButton ──────────────────────────────────────────────────────────────

interface SpeakButtonProps {
  text: string;
  /** Speech rate: 1.0 = normal, 0.75 = slow (good for learning) */
  rate?: number;
  /** Visual size: "sm" | "md" | "lg" */
  size?: "sm" | "md" | "lg";
  /** Extra Tailwind classes */
  className?: string;
  /** Show tooltip label */
  label?: string;
}

const sizeMap = {
  sm: { btn: "p-1", icon: 13 },
  md: { btn: "p-1.5", icon: 16 },
  lg: { btn: "p-2", icon: 20 },
};

export function SpeakButton({ text, rate = 0.88, size = "md", className = "", label }: SpeakButtonProps) {
  const { say, stop, speaking } = useSpeech();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent card flip / other parent clicks
    if (speaking) { stop(); return; }
    say(text, rate);
  };

  const { btn, icon } = sizeMap[size];

  return (
    <button
      onClick={handleClick}
      title={label ?? `Hear "${text}"`}
      aria-label={label ?? `Pronounce ${text}`}
      className={`
        inline-flex items-center justify-center rounded-full
        transition-all duration-150 select-none
        ${speaking
          ? "bg-primary/20 text-primary scale-110"
          : "bg-muted/60 text-muted-foreground hover:bg-primary/15 hover:text-primary hover:scale-105"
        }
        ${btn} ${className}
      `}
    >
      {speaking
        ? <Loader2 size={icon} className="animate-spin" />
        : <Volume2 size={icon} />
      }
    </button>
  );
}

// ─── SpeakRow: word + phonetic + button in one line ───────────────────────────

interface SpeakRowProps {
  norwegian: string;
  phonetic?: string | null;
  size?: "sm" | "md" | "lg";
  wordClass?: string;
}

export function SpeakRow({ norwegian, phonetic, size = "md", wordClass = "" }: SpeakRowProps) {
  return (
    <span className="inline-flex items-center gap-1.5 flex-wrap">
      <span className={wordClass}>{norwegian}</span>
      {phonetic && (
        <span className="text-xs text-muted-foreground italic opacity-75">/{phonetic}/</span>
      )}
      <SpeakButton text={norwegian} size={size} />
    </span>
  );
}
