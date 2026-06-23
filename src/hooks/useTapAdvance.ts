"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Whole-screen tap-to-advance with a "settle" grace period: a tap during the reveal
 * completes the line instantly (sets ready); the next tap actually advances.
 */
export function useTapAdvance(
  settleMs: number,
  onAdvance: () => void
): { ready: boolean; onTap: () => void } {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
    const t = setTimeout(() => setReady(true), settleMs);
    return () => clearTimeout(t);
  }, [settleMs]);

  const onTap = useCallback(() => {
    if (!ready) {
      setReady(true);
      return;
    }
    onAdvance();
  }, [ready, onAdvance]);

  return { ready, onTap };
}
