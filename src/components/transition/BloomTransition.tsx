"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { bloomTransition } from "@/motion/variants";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface BloomTransitionProps {
  /** Fires after the bloom settles. */
  onBloomDone?: () => void;
  durationMs?: number;
}

/**
 * The midnight crossing — a single warm point of light blooms outward to fill the frame.
 * Dark to warmth; suspension to release.
 */
export function BloomTransition({ onBloomDone, durationMs = 3400 }: BloomTransitionProps) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!onBloomDone) return;
    const t = setTimeout(onBloomDone, reduced ? 900 : durationMs);
    return () => clearTimeout(t);
  }, [onBloomDone, durationMs, reduced]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-20"
      initial={{
        background:
          "radial-gradient(0% 0% at 50% 45%, rgba(217,160,102,0.9) 0%, transparent 60%)",
      }}
      animate={{
        background:
          "radial-gradient(140% 110% at 50% 45%, rgba(201,138,166,0.28) 0%, rgba(20,16,14,0) 70%)",
      }}
      transition={bloomTransition(reduced)}
    />
  );
}
