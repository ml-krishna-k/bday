"use client";

import { useCallback, useRef, useState } from "react";

export interface HoldGesture {
  progress: number; // 0..1
  isHolding: boolean;
  handlers: {
    onPointerDown: (e: React.PointerEvent) => void;
    onPointerUp: (e: React.PointerEvent) => void;
    onPointerLeave: (e: React.PointerEvent) => void;
    onPointerCancel: (e: React.PointerEvent) => void;
  };
}

/**
 * Press-and-hold. Fires onComplete after holdMs of continuous hold.
 * Reports normalized progress for the visual intensify. Releasing early resets.
 */
export function useHoldGesture(holdMs: number, onComplete: () => void): HoldGesture {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef(0);
  const doneRef = useRef(false);

  const stop = useCallback(() => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    setIsHolding(false);
    if (!doneRef.current) setProgress(0);
  }, []);

  const loop = useCallback(() => {
    const elapsed = performance.now() - startRef.current;
    const p = Math.min(elapsed / holdMs, 1);
    setProgress(p);
    if (p >= 1) {
      if (!doneRef.current) {
        doneRef.current = true;
        onComplete();
      }
      return;
    }
    rafRef.current = requestAnimationFrame(loop);
  }, [holdMs, onComplete]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      doneRef.current = false;
      startRef.current = performance.now();
      setIsHolding(true);
      rafRef.current = requestAnimationFrame(loop);
    },
    [loop]
  );

  return {
    progress,
    isHolding,
    handlers: {
      onPointerDown,
      onPointerUp: stop,
      onPointerLeave: stop,
      onPointerCancel: stop,
    },
  };
}
