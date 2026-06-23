"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import type { ContentFrame } from "@/types";
import { FrameRenderer } from "./FrameRenderer";
import { frameSwapVariants } from "@/motion/variants";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface FrameSequenceProps {
  /** Stable key for discover tracking (e.g. "summons", "threshold"). */
  sequenceKey: string;
  frames: ContentFrame[];
  onComplete: () => void;
}

/**
 * Walks a flat list of frames (screen-level: Summons, Threshold, Landing) one at a time.
 * Like ChapterShell but without chapter unlock semantics.
 */
export function FrameSequence({ sequenceKey, frames, onComplete }: FrameSequenceProps) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const completedRef = useRef(false);

  const next = useCallback(() => {
    setIndex((current) => {
      const target = current + 1;
      if (target >= frames.length) {
        if (!completedRef.current) {
          completedRef.current = true;
          onComplete();
        }
        return current;
      }
      return target;
    });
  }, [frames.length, onComplete]);

  const frame = frames[Math.min(index, frames.length - 1)];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={frame.id}
        variants={frameSwapVariants(reduced)}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="min-h-[100dvh] w-full"
      >
        <FrameRenderer chapterId={sequenceKey} frame={frame} onNext={next} />
      </motion.div>
    </AnimatePresence>
  );
}
