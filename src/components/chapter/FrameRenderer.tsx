"use client";

import { useEffect } from "react";
import type { ContentFrame } from "@/types";
import { LineReveal } from "@/components/text/LineReveal";
import { MorphText } from "@/components/text/MorphText";
import { TapToAdvance } from "@/components/interaction/TapToAdvance";
import { HoldToKeep } from "@/components/interaction/HoldToKeep";
import { DiscoverReveal } from "@/components/interaction/DiscoverReveal";
import { useMoodStore } from "@/stores/moodStore";
import { useAudioStore, zoneFromMood } from "@/stores/audioStore";
import { useProgressStore } from "@/stores/progressStore";

interface FrameRendererProps {
  /** Used for discover keys; a ChapterId for chapters or a screen key for screens. */
  chapterId: string;
  frame: ContentFrame;
  onNext: () => void;
}

/** Renders one content frame and wires its declared interaction to onNext. */
export function FrameRenderer({ chapterId, frame, onNext }: FrameRendererProps) {
  const setMood = useMoodStore((s) => s.setMood);
  const setZone = useAudioStore((s) => s.setZone);
  const markDiscovered = useProgressStore((s) => s.markDiscovered);

  // Set the emotional atmosphere when this frame mounts.
  useEffect(() => {
    if (frame.mood) {
      setMood(frame.mood);
      setZone(zoneFromMood(frame.mood));
    }
  }, [frame.mood, setMood, setZone]);

  // Auto-advance frames (midnight, etc.).
  useEffect(() => {
    if (frame.interaction !== "auto") return;
    const ms = frame.autoAdvanceMs ?? 4000;
    const t = setTimeout(onNext, ms);
    return () => clearTimeout(t);
  }, [frame.interaction, frame.autoAdvanceMs, onNext]);

  const discoverKey = `${chapterId}:${frame.id}`;
  const settleMs = frame.dwellMs ?? 1400;

  const body = frame.morph ? (
    <MorphText from={frame.morph.from} to={frame.morph.to} />
  ) : (
    <div className="flex flex-col items-center">
      <LineReveal lines={frame.lines} />
      {frame.discover && (
        <DiscoverReveal
          content={frame.discover}
          discoverKey={discoverKey}
          onDiscovered={markDiscovered}
        />
      )}
    </div>
  );

  switch (frame.interaction) {
    case "hold":
      return (
        <HoldToKeep
          label={frame.holdLabel ?? "hold"}
          holdMs={frame.dwellMs ?? 1800}
          onComplete={onNext}
        >
          {body}
        </HoldToKeep>
      );

    case "auto":
      return (
        <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center px-6">
          {body}
        </div>
      );

    case "none":
      return (
        <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center px-6">
          {body}
        </div>
      );

    case "discover":
    case "tap":
    default:
      return (
        <TapToAdvance onAdvance={onNext} settleMs={settleMs}>
          {body}
        </TapToAdvance>
      );
  }
}
