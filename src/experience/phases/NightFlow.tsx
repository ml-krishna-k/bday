"use client";

import { useCallback } from "react";
import { FrameSequence } from "@/components/chapter/FrameSequence";
import { ChapterShell } from "@/components/chapter/ChapterShell";
import { SUMMONS_FRAMES, THRESHOLD_FRAMES, getChapter } from "@/content";
import { STORY_STEPS, LAST_STORY_CHAPTER } from "@/lib/constants";
import type { ChapterId } from "@/types";
import { useProgressStore } from "@/stores/progressStore";
import { useExperienceStore } from "@/stores/experienceStore";

/**
 * The opening ribbon: opening -> Threshold -> NC1..NC5. Linear, forward-only, no clock.
 * Completing the final chapter turns — narratively — into the confession (the bloom).
 */
export function NightFlow() {
  const step = useProgressStore((s) => s.nightStep);
  const setNightStep = useProgressStore((s) => s.setNightStep);
  const markCompleted = useProgressStore((s) => s.markCompleted);
  const transition = useExperienceStore((s) => s.transition);

  const key = STORY_STEPS[Math.min(step, STORY_STEPS.length - 1)];

  const advance = useCallback(() => {
    setNightStep(step + 1);
  }, [setNightStep, step]);

  const completeChapter = useCallback(
    (id: ChapterId) => {
      markCompleted(id);
      if (id === LAST_STORY_CHAPTER) {
        transition("BEGIN_CROSSING");
      } else {
        advance();
      }
    },
    [markCompleted, transition, advance]
  );

  switch (key) {
    case "summons":
      return (
        <FrameSequence sequenceKey="summons" frames={SUMMONS_FRAMES} onComplete={advance} />
      );
    case "threshold":
      return (
        <FrameSequence
          sequenceKey="threshold"
          frames={THRESHOLD_FRAMES}
          onComplete={advance}
        />
      );
    default: {
      const chapter = getChapter(key as ChapterId);
      return (
        <ChapterShell
          key={chapter.id}
          chapter={chapter}
          persist
          onComplete={() => completeChapter(chapter.id)}
        />
      );
    }
  }
}
