"use client";

import { useCallback } from "react";
import { vibrate } from "@/lib/featureDetect";
import { useSettingsStore } from "@/stores/settingsStore";

export interface Haptics {
  tap: () => void;
  keep: () => void;
  bloom: () => void;
}

/** Co-timed haptic feedback, gated by the user's setting. */
export function useHaptics(): Haptics {
  const enabled = useSettingsStore((s) => s.hapticsEnabled);

  const tap = useCallback(() => {
    if (enabled) vibrate(8);
  }, [enabled]);

  const keep = useCallback(() => {
    if (enabled) vibrate([0, 18, 40, 22]);
  }, [enabled]);

  const bloom = useCallback(() => {
    if (enabled) vibrate([0, 30, 60, 30, 60, 40]);
  }, [enabled]);

  return { tap, keep, bloom };
}
