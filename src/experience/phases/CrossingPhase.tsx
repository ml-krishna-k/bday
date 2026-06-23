"use client";

import { useCallback, useEffect } from "react";
import { FrameSequence } from "@/components/chapter/FrameSequence";
import { BloomTransition } from "@/components/transition/BloomTransition";
import { CROSSING_FRAMES } from "@/content";
import { useExperienceStore } from "@/stores/experienceStore";
import { useAudio } from "@/providers/AudioProvider";
import { useHaptics } from "@/hooks/useHaptics";

/** CROSSING — the emotional turn into the confession. Dark blooms into warmth. */
export function CrossingPhase() {
  const transition = useExperienceStore((s) => s.transition);
  const audio = useAudio();
  const haptics = useHaptics();

  useEffect(() => {
    audio.cue(174.61);
    haptics.bloom();
  }, [audio, haptics]);

  const onComplete = useCallback(() => {
    transition("CROSSING_DONE");
  }, [transition]);

  return (
    <div className="relative min-h-[100dvh] w-full">
      <BloomTransition />
      <FrameSequence
        sequenceKey="crossing"
        frames={CROSSING_FRAMES}
        onComplete={onComplete}
      />
    </div>
  );
}
