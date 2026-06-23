"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Settings } from "@/types";
import { safeStorage } from "@/lib/storage";
import { STORAGE_KEYS } from "@/lib/constants";

interface SettingsStore extends Settings {
  setAudioEnabled: (v: boolean) => void;
  toggleAudio: () => void;
  setHapticsEnabled: (v: boolean) => void;
  setNotificationsOptIn: (v: boolean) => void;
}

const INITIAL: Settings = {
  audioEnabled: true,
  hapticsEnabled: true,
  notificationsOptIn: false,
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      ...INITIAL,
      setAudioEnabled: (v) => set({ audioEnabled: v }),
      toggleAudio: () => set((s) => ({ audioEnabled: !s.audioEnabled })),
      setHapticsEnabled: (v) => set({ hapticsEnabled: v }),
      setNotificationsOptIn: (v) => set({ notificationsOptIn: v }),
    }),
    {
      name: STORAGE_KEYS.settings,
      version: 1,
      storage: createJSONStorage(() => safeStorage),
    }
  )
);
