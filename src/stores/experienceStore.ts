"use client";

import { create } from "zustand";
import type { ExperienceEvent, ExperiencePhase } from "@/types";
import { nextPhase } from "@/engine/experienceMachine";
import { useProgressStore } from "./progressStore";

interface ExperienceStore {
  phase: ExperiencePhase;
  booted: boolean;
  /** True when she opened too late and we replayed the crossing as catch-up. */
  missedMidnight: boolean;
  transition: (event: ExperienceEvent) => void;
  setPhase: (phase: ExperiencePhase) => void;
  setBooted: (v: boolean) => void;
  setMissedMidnight: (v: boolean) => void;
}

export const useExperienceStore = create<ExperienceStore>()((set, get) => ({
  phase: "DORMANT",
  booted: false,
  missedMidnight: false,

  transition: (event) => {
    const target = nextPhase(get().phase, event);
    if (target !== get().phase) {
      useProgressStore.getState().recordPhase(target);
      set({ phase: target });
    }
  },

  setPhase: (phase) => {
    useProgressStore.getState().recordPhase(phase);
    set({ phase });
  },

  setBooted: (v) => set({ booted: v }),
  setMissedMidnight: (v) => set({ missedMidnight: v }),
}));
