"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FrameSequence } from "@/components/chapter/FrameSequence";
import { LANDING_FRAMES } from "@/content";
import { useExperienceStore } from "@/stores/experienceStore";
import { useProgressStore } from "@/stores/progressStore";

/**
 * LANDED — the final ending. The "goodnight" rests; a delayed, almost-invisible line lets
 * her read it again if she wants. No exit pressure — the screen behaves like presence.
 */
export function LandingPhase() {
  const transition = useExperienceStore((s) => s.transition);
  const setNightStep = useProgressStore((s) => s.setNightStep);
  const reset = useProgressStore((s) => s.reset);
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowFooter(true), 9000);
    return () => clearTimeout(t);
  }, []);

  const replay = () => {
    reset();
    setNightStep(0);
    transition("REPLAY");
  };

  return (
    <div className="relative min-h-[100dvh] w-full">
      <FrameSequence
        sequenceKey="landing"
        frames={LANDING_FRAMES}
        onComplete={() => undefined}
      />

      <AnimatePresence>
        {showFooter && (
          <motion.button
            type="button"
            onClick={replay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            transition={{ duration: 2.4 }}
            className="absolute bottom-[max(2rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 text-[0.68rem] uppercase tracking-[0.32em] text-paper-dim/70"
          >
            read it again
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
