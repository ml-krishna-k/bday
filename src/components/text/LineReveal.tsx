"use client";

import { motion } from "framer-motion";
import type { TextLine } from "@/types";
import { lineContainerVariants, lineRevealVariants } from "@/motion/variants";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface LineRevealProps {
  lines: TextLine[];
}

/**
 * Reveals a frame's lines, fading up from dark with a gentle stagger.
 * Emphasis lines get the serif voice, more size, and breathing room.
 */
export function LineReveal({ lines }: LineRevealProps) {
  const reduced = useReducedMotion();
  const lineVariants = lineRevealVariants(reduced);

  return (
    <motion.div
      className="measure flex flex-col items-center gap-5 text-center"
      variants={lineContainerVariants()}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {lines.map((line, i) => {
        const isEmphasis = Boolean(line.emphasis);
        const className = [
          isEmphasis
            ? "font-serif text-[1.7rem] leading-snug sm:text-[2rem]"
            : "font-serif text-[1.25rem] leading-relaxed sm:text-[1.4rem]",
          line.italic ? "italic" : "",
          isEmphasis ? "text-paper" : "text-paper/85",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <motion.p key={i} variants={lineVariants} className={className}>
            {line.text}
          </motion.p>
        );
      })}
    </motion.div>
  );
}
