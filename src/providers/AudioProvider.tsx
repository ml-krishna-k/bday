"use client";

import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import { useAudioEngine } from "@/hooks/useAudioEngine";

interface AudioApi {
  unlock: () => void;
  cue: (freq?: number) => void;
}

const AudioContext = createContext<AudioApi | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const { unlock, cue } = useAudioEngine();
  const api = useMemo<AudioApi>(() => ({ unlock, cue }), [unlock, cue]);

  // Unlock the audio context on the very first user gesture (autoplay policy).
  useEffect(() => {
    const handler = () => unlock();
    window.addEventListener("pointerdown", handler, { once: true });
    return () => window.removeEventListener("pointerdown", handler);
  }, [unlock]);

  return <AudioContext.Provider value={api}>{children}</AudioContext.Provider>;
}

export function useAudio(): AudioApi {
  const ctx = useContext(AudioContext);
  if (!ctx) {
    // Safe no-op fallback so components never crash outside the provider.
    return { unlock: () => {}, cue: () => {} };
  }
  return ctx;
}
