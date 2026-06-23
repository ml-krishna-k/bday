"use client";

import { useCallback } from "react";
import { FrameSequence } from "@/components/chapter/FrameSequence";
import { ChapterShell } from "@/components/chapter/ChapterShell";
import { HeldBreath } from "@/components/feedback/HeldBreath";
import { SUMMONS_FRAMES, THRESHOLD_FRAMES, getChapter } from "@/content";
import { NIGHT_STEPS } from "@/lib/constants";
import type { ChapterId } from "@/types";
import { useProgressStore } from "@/stores/progressStore";
import { useExperienceStore } from "@/stores/experienceStore";
import { useMidnightTrigger } from "@/hooks/useMidnightTrigger";

/**
 * The pre-midnight ribbon: SUM -> THR -> NC1..NC5 -> HELD.
 * Linear, forward-only. Resumes from the persisted night step. HELD waits for midnight.
 */
export function NightFlow() {
  const step = useProgressStore((s) => s.nightStep);
  const setNightStep = useProgressStore((s) => s.setNightStep);
  const markCompleted = useProgressStore((s) => s.markCompleted);
  const transition = useExperienceStore((s) => s.transition);

  const key = NIGHT_STEPS[Math.min(step, NIGHT_STEPS.length - 1)];

  const advance = useCallback(() => {
    setNightStep(step + 1);
  }, [setNightStep, step]);

  const completeChapter = useCallback(
    (id: ChapterId) => {
      markCompleted(id);
      advance();
    },
    [markCompleted, advance]
  );

  const onMidnight = useCallback(() => {
    transition("MIDNIGHT_REACHED");
  }, [transition]);

  // The held breath arms the midnight trigger.
  useMidnightTrigger(onMidnight, key === "held");

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
    case "held":
      return <HeldBreath />;
    default: {
      // A night chapter (nc1..nc5).
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
