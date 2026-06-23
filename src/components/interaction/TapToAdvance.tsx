"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { useTapAdvance } from "@/hooks/useTapAdvance";
import { useHaptics } from "@/hooks/useHaptics";

interface TapToAdvanceProps {
  children: ReactNode;
  onAdvance: () => void;
  /** Settle grace period before a tap advances (ms). */
  settleMs?: number;
  /** Hide the affordance entirely (e.g. terminal frames). */
  showAffordance?: boolean;
}

/** Whole-screen tap layer. Shows a breathing affordance once the line has settled. */
export function TapToAdvance({
  children,
  onAdvance,
  settleMs = 1400,
  showAffordance = true,
}: TapToAdvanceProps) {
  const haptics = useHaptics();
  const { ready, onTap } = useTapAdvance(settleMs, () => {
    haptics.tap();
    onAdvance();
  });

  return (
    <button
      type="button"
      aria-label="Continue"
      onClick={onTap}
      className="flex min-h-[100dvh] w-full cursor-default flex-col items-center justify-center px-6 outline-none"
    >
      {children}
      <div className="absolute bottom-[max(2rem,env(safe-area-inset-bottom))] flex h-6 items-center justify-center">
        <AnimatePresence>
          {ready && showAffordance && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.25, 0.7, 0.25] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
              className="text-[0.7rem] uppercase tracking-[0.3em] text-paper-dim"
            >
              tap to continue
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </button>
  );
}
