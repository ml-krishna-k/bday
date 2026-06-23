"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveals additive content after the user lingers (dwells) on a frame.
 * Never required — a grace note that rewards attention.
 */
export function useLingerDiscover(
  enabled: boolean,
  lingerMs: number,
  onDiscovered?: () => void
): boolean {
  const [revealed, setRevealed] = useState(false);
  const firedRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;
    firedRef.current = false;
    setRevealed(false);
    const t = setTimeout(() => {
      setRevealed(true);
      if (!firedRef.current) {
        firedRef.current = true;
        onDiscovered?.();
      }
    }, lingerMs);
    return () => clearTimeout(t);
  }, [enabled, lingerMs, onDiscovered]);

  return revealed;
}
