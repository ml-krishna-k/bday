"use client";

import { motion } from "framer-motion";

interface ProgressBreathProps {
  total: number;
  current: number;
}

/**
 * The whisper of progress — a single faint dot that warms as the chapter advances.
 * Never a bar, never numeric; presence over measurement.
 */
export function ProgressBreath({ total, current }: ProgressBreathProps) {
  const ratio = total <= 1 ? 1 : current / (total - 1);
  return (
    <div className="pointer-events-none absolute top-[max(1.5rem,env(safe-area-inset-top))] left-1/2 -translate-x-1/2">
      <motion.span
        className="block h-1.5 w-1.5 rounded-full bg-amber"
        animate={{ opacity: 0.2 + ratio * 0.6, scale: [1, 1.25, 1] }}
        transition={{ scale: { duration: 5.2, repeat: Infinity, ease: "easeInOut" } }}
      />
    </div>
  );
}
