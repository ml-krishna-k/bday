"use client";

import { create } from "zustand";
import type { SyncStatus, TimeSyncState } from "@/types";

interface TimeStore extends TimeSyncState {
  /** Current corrected time in ms. Uses debug base if set. */
  correctedNow: () => number;
  applyOffset: (offsetMs: number) => void;
  setStatus: (status: SyncStatus) => void;
  setDebugBase: (ms: number | null) => void;
}

export const useTimeStore = create<TimeStore>()((set, get) => ({
  serverOffsetMs: 0,
  lastSyncAt: null,
  syncStatus: "idle",
  debugBaseMs: null,

  correctedNow: () => {
    const { serverOffsetMs, debugBaseMs } = get();
    const base = debugBaseMs ?? Date.now();
    return base + serverOffsetMs;
  },

  applyOffset: (offsetMs) =>
    set({ serverOffsetMs: offsetMs, lastSyncAt: Date.now(), syncStatus: "synced" }),

  setStatus: (status) => set({ syncStatus: status }),

  setDebugBase: (ms) => set({ debugBaseMs: ms }),
}));
