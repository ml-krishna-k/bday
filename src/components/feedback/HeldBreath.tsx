"use client";

import { motion } from "framer-motion";
import { breatheAnimation, breatheTransition } from "@/motion/variants";

interface HeldBreathProps {
  lines?: string[];
}

/**
 * The designed waiting state (pre-midnight HELD, dressed loading waits).
 * A single breathing light — never a spinner. Waiting is content here.
 */
export function HeldBreath({ lines = ["almost.", "stay with me."] }: HeldBreathProps) {
  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center gap-10 px-6">
      <motion.span
        className="block h-3 w-3 rounded-full bg-amber"
        animate={breatheAnimation}
        transition={breatheTransition}
        style={{ boxShadow: "0 0 40px 10px rgba(217,160,102,0.25)" }}
      />
      <div className="flex flex-col items-center gap-2">
        {lines.map((l, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 2.4, delay: i * 0.6 }}
            className="font-serif text-[1.1rem] italic text-paper/70"
          >
            {l}
          </motion.p>
        ))}
      </div>
    </div>
  );
}
