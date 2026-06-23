"use client";

import { create } from "zustand";
import type { FrameMood } from "@/types";

/** Ambient "zone" derived from mood — drives the drone character. */
export type AudioZone = "silent" | "night" | "warm" | "valley" | "bloom";

interface AudioStore {
  ctxUnlocked: boolean;
  zone: AudioZone;
  muted: boolean;
  setUnlocked: (v: boolean) => void;
  setZone: (zone: AudioZone) => void;
  setMuted: (v: boolean) => void;
}

export function zoneFromMood(mood: FrameMood | undefined): AudioZone {
  switch (mood) {
    case "night":
    case "memory":
      return "night";
    case "warm":
    case "rise":
      return "warm";
    case "valley":
      return "valley";
    case "bloom":
      return "bloom";
    case "still":
      return "silent";
    default:
      return "night";
  }
}

export const useAudioStore = create<AudioStore>()((set) => ({
  ctxUnlocked: false,
  zone: "silent",
  muted: false,
  setUnlocked: (v) => set({ ctxUnlocked: v }),
  setZone: (zone) => set({ zone }),
  setMuted: (v) => set({ muted: v }),
}));
