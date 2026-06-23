"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface HoldGesture {
  progress: number; // 0..1
  isHolding: boolean;
  handlers: {
    onPointerDown: (e: React.PointerEvent) => void;
    onPointerUp: (e: React.PointerEvent) => void;
    onPointerCancel: (e: React.PointerEvent) => void;
  };
}

/**
 * Press-and-hold. Fires onComplete after holdMs of continuous hold.
 * Captures the pointer so finger drift / micro-scroll never cancels it; releasing
 * early (before completion) resets. Reports normalized progress for the visual intensify.
 */
export function useHoldGesture(holdMs: number, onComplete: () => void): HoldGesture {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef(0);
  const doneRef = useRef(false);

  const clearRaf = useCallback(() => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  }, []);

  const loop = useCallback(() => {
    const elapsed = performance.now() - startRef.current;
    const p = Math.min(elapsed / holdMs, 1);
    setProgress(p);
    if (p >= 1) {
      if (!doneRef.current) {
        doneRef.current = true;
        clearRaf();
        setIsHolding(false);
        onComplete();
      }
      return;
    }
    rafRef.current = requestAnimationFrame(loop);
  }, [holdMs, onComplete, clearRaf]);

  const release = useCallback(
    (e: React.PointerEvent) => {
      try {
        (e.currentTarget as Element).releasePointerCapture?.(e.pointerId);
      } catch {
        /* ignore */
      }
      clearRaf();
      setIsHolding(false);
      if (!doneRef.current) setProgress(0); // reset only if the hold didn't complete
    },
    [clearRaf]
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      // Primary button only (mouse); touch/pen always pass.
      if (e.pointerType === "mouse" && e.button !== 0) return;
      e.preventDefault();
      try {
        (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
      } catch {
        /* ignore */
      }
      doneRef.current = false;
      startRef.current = performance.now();
      setProgress(0);
      setIsHolding(true);
      clearRaf();
      rafRef.current = requestAnimationFrame(loop);
    },
    [loop, clearRaf]
  );

  // Safety: stop the RAF if the component unmounts mid-hold.
  useEffect(() => clearRaf, [clearRaf]);

  return {
    progress,
    isHolding,
    handlers: {
      onPointerDown,
      onPointerUp: release,
      onPointerCancel: release,
    },
  };
}
