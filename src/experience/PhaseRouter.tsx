"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useExperienceStore } from "@/stores/experienceStore";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { frameSwapVariants } from "@/motion/variants";
import { NightFlow } from "./phases/NightFlow";
import { CrossingPhase } from "./phases/CrossingPhase";
import { ConfessionPhase } from "./phases/ConfessionPhase";
import { LandingPhase } from "./phases/LandingPhase";

/** Renders the active phase from experience state. Phase swaps crossfade — never navigate. */
export function PhaseRouter() {
  const phase = useExperienceStore((s) => s.phase);
  const booted = useExperienceStore((s) => s.booted);
  const reduced = useReducedMotion();

  // Boot is instant (just persisted-progress hydration). Show only the warm dark
  // canvas underneath until ready — no spinner, no waiting copy.
  if (!booted) return null;

  const render = () => {
    switch (phase) {
      case "STORY":
        return <NightFlow />;
      case "CROSSING":
        return <CrossingPhase />;
      case "CONFESSION":
        return <ConfessionPhase />;
      case "LANDED":
        return <LandingPhase />;
      default:
        return <NightFlow />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={phase}
        variants={frameSwapVariants(reduced)}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="min-h-[100dvh] w-full"
      >
        {render()}
      </motion.div>
    </AnimatePresence>
  );
}
