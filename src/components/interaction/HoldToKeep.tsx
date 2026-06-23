"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useHoldGesture } from "@/hooks/useHoldGesture";
import { useHaptics } from "@/hooks/useHaptics";
import { useAudio } from "@/providers/AudioProvider";

interface HoldToKeepProps {
  children: ReactNode;
  label: string;
  holdMs?: number;
  onComplete: () => void;
}

/**
 * Press-and-hold the most sacred lines. The ENTIRE screen is the press surface; the pointer
 * is captured so drift/scroll can't cancel it. Holding intensifies the content (light gathers);
 * a haptic + soft tone mark the moment it "takes".
 */
export function HoldToKeep({
  children,
  label,
  holdMs = 1800,
  onComplete,
}: HoldToKeepProps) {
  const haptics = useHaptics();
  const audio = useAudio();

  const { progress, isHolding, handlers } = useHoldGesture(holdMs, () => {
    haptics.keep();
    audio.cue(196);
    onComplete();
  });

  return (
    <div
      {...handlers}
      role="button"
      aria-label={label}
      className="relative flex min-h-[100dvh] w-full cursor-pointer select-none flex-col items-center justify-center px-6"
      style={{ touchAction: "none", WebkitTapHighlightColor: "transparent" }}
    >
      <motion.div
        className="pointer-events-none flex flex-col items-center justify-center"
        animate={{
          scale: 1 + progress * 0.05,
          opacity: 0.78 + progress * 0.22,
        }}
        transition={{ duration: 0.12, ease: "linear" }}
      >
        {children}
      </motion.div>

      <div className="pointer-events-none absolute bottom-[max(2.5rem,env(safe-area-inset-bottom))] flex flex-col items-center gap-3">
        <div className="h-[2px] w-28 overflow-hidden rounded-full bg-paper/15">
          <motion.div
            className="h-full bg-amber"
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.12, ease: "linear" }}
          />
        </div>
        <motion.span
          animate={{ opacity: isHolding ? 0.9 : [0.25, 0.6, 0.25] }}
          transition={
            isHolding
              ? { duration: 0.2 }
              : { duration: 3.4, repeat: Infinity, ease: "easeInOut" }
          }
          className="text-[0.7rem] uppercase tracking-[0.3em] text-paper-dim"
        >
          {label}
        </motion.span>
      </div>
    </div>
  );
}
