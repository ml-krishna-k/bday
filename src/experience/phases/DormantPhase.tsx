"use client";

import { motion } from "framer-motion";
import { SUMMONS_LEAD_MINUTES } from "@/lib/constants";
import { breatheAnimation, breatheTransition } from "@/motion/variants";

/** EMP — opened too early. Protect the surprise; no content leaks. */
export function DormantPhase() {
  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center gap-10 px-6 text-center">
      <motion.span
        className="block h-2.5 w-2.5 rounded-full bg-amber"
        animate={breatheAnimation}
        transition={breatheTransition}
        style={{ boxShadow: "0 0 36px 8px rgba(217,160,102,0.2)" }}
      />
      <div className="measure flex flex-col gap-4">
        <p className="font-serif text-[1.4rem] text-paper/85">Not yet.</p>
        <p className="font-serif text-[1.1rem] italic text-paper/60">
          Come back {SUMMONS_LEAD_MINUTES} minutes before midnight.
        </p>
        <p className="text-[0.75rem] uppercase tracking-[0.3em] text-paper-dim/60">
          set an alarm if you have to
        </p>
      </div>
    </div>
  );
}
