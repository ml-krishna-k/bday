"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { MontageShot } from "@/types";
import { cardCrossfadeVariants } from "@/motion/variants";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { prefersReducedData } from "@/lib/featureDetect";

const ACCENT_GLOW: Record<NonNullable<MontageShot["accent"]>, string> = {
  amber: "rgba(217,160,102,0.30)",
  bloom: "rgba(201,138,166,0.32)",
  blueberry: "rgba(109,106,156,0.30)",
  strawberry: "rgba(200,122,134,0.30)",
  cookiedough: "rgba(216,199,163,0.28)",
  dusk: "rgba(111,125,146,0.28)",
};

interface MontagePlayerProps {
  shots: MontageShot[];
  onEnded: () => void;
}

/**
 * The evidence reel. A chrome-less crossfade of memory cards — the only sustained
 * motion moment. No controls; tap is intentionally inert so she cannot rush the proof.
 * Asset-free (text-led); honors reduced-motion/data by shortening, never skipping beats.
 */
export function MontagePlayer({ shots, onEnded }: MontagePlayerProps) {
  const reduced = useReducedMotion() || prefersReducedData();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (i >= shots.length) {
      const t = setTimeout(onEnded, 1200);
      return () => clearTimeout(t);
    }
    const dur = reduced ? Math.min(shots[i].durationMs, 2600) : shots[i].durationMs;
    const t = setTimeout(() => setI((n) => n + 1), dur);
    return () => clearTimeout(t);
  }, [i, shots, onEnded, reduced]);

  const shot = shots[Math.min(i, shots.length - 1)];
  const done = i >= shots.length;
  const glow = shot.accent ? ACCENT_GLOW[shot.accent] : ACCENT_GLOW.amber;

  return (
    <div className="relative flex min-h-[100dvh] w-full items-center justify-center px-8">
      <AnimatePresence mode="wait">
        {!done && (
          <motion.div
            key={shot.id}
            variants={cardCrossfadeVariants(reduced)}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative flex flex-col items-center text-center"
          >
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -inset-24 -z-10"
              style={{
                background: `radial-gradient(60% 60% at 50% 50%, ${glow} 0%, transparent 70%)`,
              }}
              animate={reduced ? undefined : { scale: [1, 1.15], opacity: [0.85, 1] }}
              transition={{ duration: shot.durationMs / 1000, ease: "easeOut" }}
            />
            <motion.p
              animate={reduced ? undefined : { y: [8, -8] }}
              transition={{ duration: shot.durationMs / 1000, ease: "linear" }}
              className="measure font-serif text-[1.5rem] italic leading-snug text-paper sm:text-[1.8rem]"
            >
              {shot.caption}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* faint reel progress */}
      <div className="pointer-events-none absolute bottom-[max(2rem,env(safe-area-inset-bottom))] left-1/2 flex -translate-x-1/2 gap-1.5">
        {shots.map((s, idx) => (
          <span
            key={s.id}
            className="block h-1 w-1 rounded-full bg-paper transition-opacity duration-700"
            style={{ opacity: idx <= Math.min(i, shots.length - 1) ? 0.5 : 0.12 }}
          />
        ))}
      </div>
    </div>
  );
}
