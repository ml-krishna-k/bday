"use client";

import { create } from "zustand";
import type { ExperienceEvent, ExperiencePhase } from "@/types";
import { nextPhase } from "@/engine/experienceMachine";
import { useProgressStore } from "./progressStore";

interface ExperienceStore {
  phase: ExperiencePhase;
  booted: boolean;
  transition: (event: ExperienceEvent) => void;
  setPhase: (phase: ExperiencePhase) => void;
  setBooted: (v: boolean) => void;
}

export const useExperienceStore = create<ExperienceStore>()((set, get) => ({
  phase: "STORY",
  booted: false,

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
}));
