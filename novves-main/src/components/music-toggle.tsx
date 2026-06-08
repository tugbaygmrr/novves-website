"use client";

import { useRef, useState } from "react";

const AUDIO_URL = "/audio/novves-heart.mp3";
const VOLUME = 0.7;

/**
 * Navbar muzik toggle — "Novves'in kalbi".
 * Ses dosyasi yalnizca kullanici tikladiginda yuklenir.
 */
export function MusicToggle({ inverted = false }: { inverted?: boolean }) {
  const [on, setOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (!a.paused) {
      a.pause();
      setOn(false);
      return;
    }
    try {
      if (!a.src) a.src = AUDIO_URL;
      a.volume = VOLUME;
      a.muted = false;
      await a.play();
      setOn(true);
    } catch (err) {
      console.warn("[MusicToggle] play blocked:", err);
      setOn(false);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="none"
        onPlay={() => setOn(true)}
        onPause={() => setOn(false)}
        onEnded={() => setOn(false)}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={on ? "Muzigi kapat" : "Muzigi ac"}
        aria-pressed={on}
        title={on ? "Muzigi kapat" : "Novves'in kalbi"}
        className={`relative inline-flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 ${
          inverted
            ? "border-white/15 bg-white/[0.04] text-white/75 hover:border-white/40 hover:text-white"
            : "border-secondary/15 bg-white/30 text-secondary/65 hover:border-primary/50 hover:text-primary"
        }`}
      >
        {on ? (
          <>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" aria-hidden>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396.234-.847 1.058-1.354 1.938-1.354H6.75z"
              />
            </svg>
            <span className="pointer-events-none absolute -inset-0.5 animate-ping rounded-full ring-1 ring-primary/35" />
          </>
        ) : (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" aria-hidden>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396.234-.847 1.058-1.354 1.938-1.354H6.75z"
            />
          </svg>
        )}
      </button>
    </>
  );
}
