import type { Variants, Transition } from "framer-motion";
import { DURATION, EASE, REDUCED, STAGGER } from "./tokens";

/**
 * Variant factories. Pass reduced=true to swap drift for pure crossfade while
 * preserving emotional timing.
 */

export function lineRevealVariants(reduced: boolean): Variants {
  const dur = reduced ? REDUCED.reveal : DURATION.reveal;
  const exit = reduced ? REDUCED.dissolve : DURATION.dissolve;
  return {
    hidden: { opacity: 0, y: reduced ? 0 : 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: dur, ease: EASE.arrive },
    },
    exit: {
      opacity: 0,
      y: reduced ? 0 : -8,
      transition: { duration: exit, ease: EASE.recede },
    },
  };
}

export function lineContainerVariants(): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: STAGGER.line, delayChildren: 0.15 } },
    exit: { transition: { staggerChildren: 0.05 } },
  };
}

export function frameSwapVariants(reduced: boolean): Variants {
  const dur = reduced ? REDUCED.phaseSwap : DURATION.phaseSwap;
  return {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: dur, ease: EASE.gentle } },
    exit: { opacity: 0, transition: { duration: dur * 0.8, ease: EASE.gentle } },
  };
}

export function bloomTransition(reduced: boolean): Transition {
  return { duration: reduced ? REDUCED.bloom : DURATION.bloom, ease: EASE.arrive };
}

export function cardCrossfadeVariants(reduced: boolean): Variants {
  const dur = reduced ? REDUCED.cardCrossfade : DURATION.cardCrossfade;
  return {
    hidden: { opacity: 0, scale: reduced ? 1 : 1.03 },
    visible: { opacity: 1, scale: 1, transition: { duration: dur, ease: EASE.arrive } },
    exit: { opacity: 0, scale: reduced ? 1 : 0.99, transition: { duration: dur, ease: EASE.recede } },
  };
}

/** The slow breathing pulse for waiting/idle lights. */
export const breatheAnimation = {
  scale: [1, 1.06, 1],
  opacity: [0.7, 1, 0.7],
};

export const breatheTransition: Transition = {
  duration: DURATION.breathe,
  ease: EASE.gentle,
  repeat: Infinity,
};
