/**
 * Content models — the LOCKED story expressed as data.
 * A small set of generic renderers consumes these; screens are data, not code.
 */

export type InteractionKind = "tap" | "hold" | "discover" | "auto" | "none";

export interface TextLine {
  text: string;
  /** Tender / spoken-aloud lines render in italic. */
  italic?: boolean;
  /** The single most important line of a frame — gets isolation + weight. */
  emphasis?: boolean;
}

export interface DiscoverContent {
  /** Additive grace-note lines, revealed only if she lingers. Never required. */
  lines: TextLine[];
}

export interface MorphSpec {
  from: string;
  to: string;
}

export interface ContentFrame {
  id: string;
  lines: TextLine[];
  interaction: InteractionKind;
  /** Label for hold frames, e.g. "hold to begin" / "press and hold to keep this". */
  holdLabel?: string;
  /** For interaction === "auto": ms before auto-advance. */
  autoAdvanceMs?: number;
  /** Optional linger-reward content. */
  discover?: DiscoverContent;
  /** Optional morphing text (e.g. "Where is the bus?" -> "Where are you?"). */
  morph?: MorphSpec;
  /** Mood hint, used to tint background light. */
  mood?: FrameMood;
  /** Longer hold/dwell on the most sacred lines (ms). */
  dwellMs?: number;
}

export type FrameMood =
  | "night"
  | "memory"
  | "warm"
  | "valley"
  | "rise"
  | "bloom"
  | "still";

export type ChapterPhase = "night";

export interface ContentChapter {
  id: ChapterId;
  title: string;
  phase: ChapterPhase;
  frames: ContentFrame[];
}

/** Canonical chapter identifiers — Version 1: the night experience only. */
export type ChapterId = "nc1" | "nc2" | "nc3" | "nc4" | "nc5" | "nc7";

export interface MontageShot {
  id: string;
  durationMs: number;
  caption: string;
  /** Accent color key for the card's light. */
  accent?: "amber" | "bloom" | "blueberry" | "strawberry" | "cookiedough" | "dusk";
}
