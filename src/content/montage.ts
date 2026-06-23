import type { MontageShot } from "@/types";

/**
 * The Montage — the only sustained motion+image moment. The evidence after the verdict.
 * Rendered as a cinematic crossfade of memory cards (asset-free, text-led). If a video
 * source is later supplied, MontagePlayer can use it; this manifest is the fallback and
 * the source of truth for pacing.
 */
export const MONTAGE_SHOTS: MontageShot[] = [
  { id: "m1", caption: "the same school. never a word.", durationMs: 4200, accent: "dusk" },
  { id: "m2", caption: "“where is the bus?”", durationMs: 4200, accent: "amber" },
  { id: "m3", caption: "a fork, reaching across to my plate.", durationMs: 4000, accent: "strawberry" },
  { id: "m4", caption: "blueberry. strawberry. cookie dough.", durationMs: 4400, accent: "blueberry" },
  { id: "m5", caption: "“did you eat? did you sleep?”", durationMs: 4200, accent: "amber" },
  { id: "m6", caption: "the call you cut — and then waited by.", durationMs: 4400, accent: "dusk" },
  { id: "m7", caption: "the flowers that made you stop and look.", durationMs: 4200, accent: "bloom" },
  { id: "m8", caption: "every ordinary day I was paying attention.", durationMs: 4800, accent: "amber" },
  { id: "m9", caption: "you were the plan.", durationMs: 5200, accent: "bloom" },
];
