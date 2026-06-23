"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { DiscoverContent } from "@/types";
import { useLingerDiscover } from "@/hooks/useLingerDiscover";

interface DiscoverRevealProps {
  content: DiscoverContent;
  discoverKey: string;
  lingerMs?: number;
  onDiscovered?: (key: string) => void;
}

/** Additive grace note — appears only if she lingers. Never required. */
export function DiscoverReveal({
  content,
  discoverKey,
  lingerMs = 3200,
  onDiscovered,
}: DiscoverRevealProps) {
  const revealed = useLingerDiscover(true, lingerMs, () => onDiscovered?.(discoverKey));

  return (
    <div className="mt-6 flex min-h-[1.5rem] flex-col items-center gap-2">
      <AnimatePresence>
        {revealed &&
          content.lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 0.6, y: 0 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.3 }}
              className={`font-serif text-[0.95rem] text-paper-dim ${line.italic ? "italic" : ""}`}
            >
              {line.text}
            </motion.p>
          ))}
      </AnimatePresence>
    </div>
  );
}
