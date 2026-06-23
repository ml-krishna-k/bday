"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback } from "react";
import type { ContentChapter } from "@/types";
import { FrameRenderer } from "./FrameRenderer";
import { useChapterProgress } from "@/hooks/useChapterProgress";
import { frameSwapVariants } from "@/motion/variants";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ProgressBreath } from "@/components/feedback/ProgressBreath";

interface ChapterShellProps {
  chapter: ContentChapter;
  onComplete: () => void;
  /** Persist + resume mid-chapter (night flow). */
  persist?: boolean;
  /** Show the subtle progress whisper. */
  showProgress?: boolean;
}

/** Walks a chapter's frames, one at a time, inside a crossfade. */
export function ChapterShell({
  chapter,
  onComplete,
  persist = false,
  showProgress = true,
}: ChapterShellProps) {
  const reduced = useReducedMotion();
  const handleComplete = useCallback(() => onComplete(), [onComplete]);

  const { index, next } = useChapterProgress(chapter.id, chapter.frames.length, {
    persist,
    onComplete: handleComplete,
  });

  const frame = chapter.frames[Math.min(index, chapter.frames.length - 1)];

  return (
    <div className="relative min-h-[100dvh] w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={frame.id}
          variants={frameSwapVariants(reduced)}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="min-h-[100dvh] w-full"
        >
          <FrameRenderer chapterId={chapter.id} frame={frame} onNext={next} />
        </motion.div>
      </AnimatePresence>

      {showProgress && (
        <ProgressBreath total={chapter.frames.length} current={index} />
      )}
    </div>
  );
}
