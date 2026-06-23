"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useExperienceStore } from "@/stores/experienceStore";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { frameSwapVariants } from "@/motion/variants";
import { DormantPhase } from "./phases/DormantPhase";
import { NightFlow } from "./phases/NightFlow";
import { CrossingPhase } from "./phases/CrossingPhase";
import { ConfessionPhase } from "./phases/ConfessionPhase";
import { LandingPhase } from "./phases/LandingPhase";
import { DaytimePhase } from "./phases/DaytimePhase";
import { ArrivalPhase } from "./phases/ArrivalPhase";
import { KeepsakePhase } from "./phases/KeepsakePhase";
import { HeldBreath } from "@/components/feedback/HeldBreath";

/** Renders the active phase from experience state. Phase swaps crossfade — never navigate. */
export function PhaseRouter() {
  const phase = useExperienceStore((s) => s.phase);
  const booted = useExperienceStore((s) => s.booted);
  const reduced = useReducedMotion();

  // Hold a calm breath until boot reconciliation (time sync + hydration) completes.
  if (!booted) {
    return <HeldBreath lines={["", ""]} />;
  }

  const render = () => {
    switch (phase) {
      case "DORMANT":
        return <DormantPhase />;
      case "SUMMONED":
        return <NightFlow />;
      case "CROSSING":
        return <CrossingPhase />;
      case "CONFESSION":
        return <ConfessionPhase />;
      case "LANDED":
        return <LandingPhase />;
      case "DAYTIME":
        return <DaytimePhase />;
      case "ARRIVAL":
        return <ArrivalPhase />;
      case "KEEPSAKE":
        return <KeepsakePhase />;
      default:
        return <DormantPhase />;
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
