"use client";

import { useCallback, useRef, useState } from "react";
import type { ChapterId } from "@/types";
import { useProgressStore } from "@/stores/progressStore";

export interface ChapterProgress {
  index: number;
  isLast: boolean;
  next: () => void;
  restart: () => void;
}

interface Options {
  /** Persist + resume mid-chapter (night flow). Day re-reads start fresh. */
  persist?: boolean;
  onComplete: () => void;
}

/**
 * Tracks the current frame index within a chapter and advances it.
 * Calls onComplete when advancing past the final frame.
 */
export function useChapterProgress(
  chapterId: ChapterId,
  frameCount: number,
  { persist = false, onComplete }: Options
): ChapterProgress {
  const setFrame = useProgressStore((s) => s.setFrame);

  const initial = persist
    ? Math.min(useProgressStore.getState().getFrame(chapterId), frameCount - 1)
    : 0;

  const [index, setIndex] = useState(initial);
  const completedRef = useRef(false);

  const next = useCallback(() => {
    setIndex((current) => {
      const target = current + 1;
      if (target >= frameCount) {
        if (!completedRef.current) {
          completedRef.current = true;
          onComplete();
        }
        return current;
      }
      if (persist) setFrame(chapterId, target);
      return target;
    });
  }, [frameCount, onComplete, persist, setFrame, chapterId]);

  const restart = useCallback(() => {
    completedRef.current = false;
    setIndex(0);
    if (persist) setFrame(chapterId, 0);
  }, [persist, setFrame, chapterId]);

  return { index, isLast: index === frameCount - 1, next, restart };
}
