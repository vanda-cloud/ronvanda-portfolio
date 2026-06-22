"use client";

import { useEffect, useState } from "react";

interface TypingTextProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

/**
 * Classic typewriter effect: types each string in `texts` out, pauses,
 * deletes it, then moves to the next — looping forever. Purely decorative
 * (aria-hidden by the caller); pair it with a visually-hidden static list
 * of the same text for screen readers.
 */
export function TypingText({
  texts,
  typingSpeed = 60,
  deletingSpeed = 32,
  pauseDuration = 1800,
  className,
}: TypingTextProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [phase, setPhase] = useState<"typing" | "deleting">("typing");

  useEffect(() => {
    if (!texts.length) return;
    const current = texts[textIndex % texts.length];

    if (phase === "typing") {
      if (display.length < current.length) {
        const timeout = setTimeout(() => {
          setDisplay(current.slice(0, display.length + 1));
        }, typingSpeed);
        return () => clearTimeout(timeout);
      }
      const timeout = setTimeout(() => setPhase("deleting"), pauseDuration);
      return () => clearTimeout(timeout);
    }

    // phase === "deleting"
    if (display.length > 0) {
      const timeout = setTimeout(() => {
        setDisplay(current.slice(0, display.length - 1));
      }, deletingSpeed);
      return () => clearTimeout(timeout);
    }
    setTextIndex((index) => (index + 1) % texts.length);
    setPhase("typing");
  }, [display, phase, textIndex, texts, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={className}>
      {display}
      <span className="typing-cursor">|</span>
    </span>
  );
}
