"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { FrameSequence } from "@/components/chapter/FrameSequence";
import { LANDING_FRAMES } from "@/content";
import { dayUnlockAt } from "@/engine/timeMath";
import { useCorrectedNow } from "@/hooks/useCorrectedNow";
import { useExperienceStore } from "@/stores/experienceStore";
import { useUnlockStore } from "@/stores/unlockStore";

/**
 * LANDED — catch her, send her to sleep loved. The terminal "goodnight" rests; a delayed,
 * subtle footer offers the daytime if morning has come, or a promise if it hasn't.
 */
export function LandingPhase() {
  const transition = useExperienceStore((s) => s.transition);
  const recompute = useUnlockStore((s) => s.recompute);
  const now = useCorrectedNow();
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowFooter(true), 7000);
    return () => clearTimeout(t);
  }, []);

  const enterDay = useCallback(() => {
    recompute(now());
    transition("ENTER_DAYTIME");
  }, [recompute, now, transition]);

  const dayOpen = now() >= dayUnlockAt(8);

  return (
    <div className="relative min-h-[100dvh] w-full">
      <FrameSequence
        sequenceKey="landing"
        frames={LANDING_FRAMES}
        onComplete={() => undefined}
      />

      <AnimatePresence>
        {showFooter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute bottom-[max(2rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 text-center"
          >
            {dayOpen ? (
              <button
                type="button"
                onClick={enterDay}
                className="text-[0.72rem] uppercase tracking-[0.3em] text-amber/80"
              >
                the day is waiting →
              </button>
            ) : (
              <p className="measure font-serif text-[0.95rem] italic text-paper-dim/70">
                I saved more for the morning.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
