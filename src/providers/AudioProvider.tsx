"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useAudioEngine } from "@/hooks/useAudioEngine";

interface AudioApi {
  unlock: () => void;
  cue: (freq?: number) => void;
}

const AudioContext = createContext<AudioApi | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const { unlock, cue } = useAudioEngine();
  const api = useMemo<AudioApi>(() => ({ unlock, cue }), [unlock, cue]);

  // The song (MusicPlayer) is the soundtrack for V1, so the synthesized ambient drone
  // is intentionally left dormant to avoid clashing. The cue() API stays available as a
  // safe no-op (the audio context is simply never unlocked here).

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
