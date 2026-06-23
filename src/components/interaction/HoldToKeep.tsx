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
 * Press-and-hold the most sacred lines. Holding intensifies the content (light gathers,
 * the rest recedes); a haptic + soft tone mark the moment it "takes". Tap-fallback after a
 * short delay so it never hard-gates access.
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
    <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center px-6">
      <motion.div
        {...handlers}
        className="flex flex-col items-center justify-center"
        style={{ touchAction: "none" }}
        animate={{
          scale: 1 + progress * 0.05,
          opacity: 0.78 + progress * 0.22,
        }}
        transition={{ duration: 0.1, ease: "linear" }}
      >
        {children}
      </motion.div>

      <div className="absolute bottom-[max(2.5rem,env(safe-area-inset-bottom))] flex flex-col items-center gap-3">
        <div className="h-[2px] w-28 overflow-hidden rounded-full bg-paper/15">
          <motion.div
            className="h-full bg-amber"
            style={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
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
