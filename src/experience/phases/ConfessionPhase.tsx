"use client";

import { useCallback, useState } from "react";
import { ChapterShell } from "@/components/chapter/ChapterShell";
import { MontagePlayer } from "@/components/media/MontagePlayer";
import { GracefulError } from "@/components/system/GracefulError";
import { getChapter, MONTAGE_SHOTS } from "@/content";
import { useExperienceStore } from "@/stores/experienceStore";
import { useProgressStore } from "@/stores/progressStore";

/**
 * CONFESSION — NC7 (the climax), then the Montage (the evidence). The thesis words are
 * provided as the error fallback so the confession can never be unreachable.
 */
export function ConfessionPhase() {
  const transition = useExperienceStore((s) => s.transition);
  const markCompleted = useProgressStore((s) => s.markCompleted);
  const [showMontage, setShowMontage] = useState(false);

  const onTruthComplete = useCallback(() => {
    setShowMontage(true);
  }, []);

  const onMontageEnded = useCallback(() => {
    markCompleted("nc7");
    transition("MONTAGE_DONE");
  }, [markCompleted, transition]);

  const nc7 = getChapter("nc7");

  return (
    <GracefulError
      fallbackLines={[
        "The problem was never that I didn't notice.",
        "The problem was that I didn't say it.",
        "You were never part of my plan. You were the plan.",
      ]}
    >
      {showMontage ? (
        <MontagePlayer shots={MONTAGE_SHOTS} onEnded={onMontageEnded} />
      ) : (
        <ChapterShell
          chapter={nc7}
          persist
          showProgress={false}
          onComplete={onTruthComplete}
        />
      )}
    </GracefulError>
  );
}
