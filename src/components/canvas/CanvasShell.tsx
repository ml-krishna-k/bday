"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { FrameMood } from "@/types";
import { useMoodStore } from "@/stores/moodStore";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** The light character of each mood — a warm radial glow over the ink canvas. */
const MOOD_LIGHT: Record<FrameMood, { color: string; intensity: number; y: string }> = {
  night: { color: "rgba(217,160,102,0.10)", intensity: 0.5, y: "45%" },
  memory: { color: "rgba(111,125,146,0.12)", intensity: 0.45, y: "42%" },
  warm: { color: "rgba(217,160,102,0.16)", intensity: 0.7, y: "44%" },
  valley: { color: "rgba(111,125,146,0.10)", intensity: 0.4, y: "50%" },
  rise: { color: "rgba(217,160,102,0.18)", intensity: 0.8, y: "40%" },
  bloom: { color: "rgba(201,138,166,0.22)", intensity: 1, y: "42%" },
  still: { color: "rgba(217,160,102,0.06)", intensity: 0.3, y: "46%" },
};

/**
 * The persistent stage. Lives above all phase swaps so the background never flashes.
 * Renders the warm light (mood-driven), grain, and vignette beneath the content.
 */
export function CanvasShell({ children }: { children: ReactNode }) {
  const mood = useMoodStore((s) => s.mood);
  const reduced = useReducedMotion();
  const light = MOOD_LIGHT[mood];

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden bg-ink no-select">
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        animate={{
          background: `radial-gradient(120% 90% at 50% ${light.y}, ${light.color} 0%, transparent 60%)`,
          opacity: light.intensity,
        }}
        transition={{ duration: reduced ? 0.6 : 3.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="vignette" aria-hidden />
      <div className="grain-overlay" aria-hidden />
      <div className="relative z-10 min-h-[100dvh] w-full">{children}</div>
    </div>
  );
}
