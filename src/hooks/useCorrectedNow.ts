"use client";

import { useCallback } from "react";
import { useTimeStore } from "@/stores/timeStore";

/** Returns a stable getter for the corrected current time (ms). */
export function useCorrectedNow(): () => number {
  const correctedNow = useTimeStore((s) => s.correctedNow);
  return useCallback(() => correctedNow(), [correctedNow]);
}
