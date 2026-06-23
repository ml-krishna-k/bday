/**
 * Motion tokens — the pacing of the whole experience lives here.
 * The director can re-tune feel without touching components.
 * Durations in seconds (Framer Motion expects seconds).
 */

export const EASE = {
  arrive: [0.22, 1, 0.36, 1] as const, // light/meaning arriving
  recede: [0.4, 0, 1, 1] as const, // memory let go
  gentle: [0.4, 0, 0.2, 1] as const,
};

export const DURATION = {
  reveal: 1.6,
  dissolve: 1.2,
  bloom: 3.4,
  breathe: 5.2,
  holdIntensify: 0.5,
  cardCrossfade: 1.4,
  phaseSwap: 1.0,
};

/** Stagger between sibling lines in a single frame. */
export const STAGGER = {
  line: 0.5,
};

/** Reduced-motion equivalents — same rhythm, less movement. */
export const REDUCED = {
  reveal: 0.5,
  dissolve: 0.4,
  bloom: 0.8,
  cardCrossfade: 0.6,
  phaseSwap: 0.35,
};

export const HOLD_DEFAULT_MS = 1800;
