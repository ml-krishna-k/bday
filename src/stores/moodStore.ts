"use client";

import { create } from "zustand";
import type { FrameMood } from "@/types";

interface MoodStore {
  mood: FrameMood;
  setMood: (mood: FrameMood) => void;
}

/** Current background light mood — set by frames, read by the persistent CanvasShell. */
export const useMoodStore = create<MoodStore>()((set) => ({
  mood: "night",
  setMood: (mood) => set({ mood }),
}));
