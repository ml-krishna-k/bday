"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MorphTextProps {
  from: string;
  to: string;
  /** Delay before the morph begins (ms). */
  delayMs?: number;
}

/**
 * One phrase dissolving into another in place — e.g. "Where is the bus?" -> "Where are you?".
 * The discovery is the transformation itself.
 */
export function MorphText({ from, to, delayMs = 1600 }: MorphTextProps) {
  const reduced = useReducedMotion();
  const [showTo, setShowTo] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowTo(true), delayMs);
    return () => clearTimeout(t);
  }, [delayMs]);

  const current = showTo ? to : from;

  return (
    <div className="measure flex min-h-[3rem] items-center justify-center text-center">
      <AnimatePresence mode="wait">
        <motion.p
          key={current}
          initial={{ opacity: 0, filter: reduced ? "none" : "blur(6px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: reduced ? "none" : "blur(6px)" }}
          transition={{ duration: reduced ? 0.4 : 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[1.7rem] italic leading-snug text-paper sm:text-[2rem]"
        >
          {current}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
