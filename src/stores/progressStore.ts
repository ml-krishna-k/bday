"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { ChapterId, ProgressRecord } from "@/types";
import { safeStorage } from "@/lib/storage";
import { STORAGE_KEYS, PHASE_RANK } from "@/lib/constants";
import type { ExperiencePhase } from "@/types";

interface ProgressStore extends ProgressRecord {
  setFrame: (id: ChapterId, index: number) => void;
  advanceFrame: (id: ChapterId) => void;
  getFrame: (id: ChapterId) => number;
  markCompleted: (id: ChapterId) => void;
  markDiscovered: (key: string) => void;
  hasDiscovered: (key: string) => boolean;
  setNightStep: (step: number) => void;
  recordPhase: (phase: ExperiencePhase) => void;
  reset: () => void;
}

const INITIAL: ProgressRecord = {
  frameIndexByChapter: {},
  nightStep: 0,
  completed: [],
  discovered: [],
  furthestPhaseRank: 0,
};

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      ...INITIAL,

      setFrame: (id, index) =>
        set((s) => ({
          frameIndexByChapter: { ...s.frameIndexByChapter, [id]: index },
        })),

      advanceFrame: (id) =>
        set((s) => ({
          frameIndexByChapter: {
            ...s.frameIndexByChapter,
            [id]: (s.frameIndexByChapter[id] ?? 0) + 1,
          },
        })),

      getFrame: (id) => get().frameIndexByChapter[id] ?? 0,

      markCompleted: (id) =>
        set((s) =>
          s.completed.includes(id) ? s : { completed: [...s.completed, id] }
        ),

      markDiscovered: (key) =>
        set((s) =>
          s.discovered.includes(key) ? s : { discovered: [...s.discovered, key] }
        ),

      hasDiscovered: (key) => get().discovered.includes(key),

      setNightStep: (step) =>
        set((s) => ({ nightStep: Math.max(s.nightStep, step) })),

      recordPhase: (phase) =>
        set((s) => ({
          furthestPhaseRank: Math.max(s.furthestPhaseRank, PHASE_RANK[phase]),
        })),

      reset: () => set({ ...INITIAL }),
    }),
    {
      name: STORAGE_KEYS.progress,
      version: 1,
      storage: createJSONStorage(() => safeStorage),
      partialize: (s) => ({
        frameIndexByChapter: s.frameIndexByChapter,
        nightStep: s.nightStep,
        completed: s.completed,
        discovered: s.discovered,
        furthestPhaseRank: s.furthestPhaseRank,
      }),
    }
  )
);
