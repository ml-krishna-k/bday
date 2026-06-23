import type { ChapterId } from "./content";

/** The global experience phases — Version 1: a continuous private story, no clock. */
export type ExperiencePhase =
  | "STORY" // the opening + the five chapters (SUM -> THR -> NC1..5)
  | "CROSSING" // the emotional turn into the confession (narrative bloom)
  | "CONFESSION" // NC7 -> Montage
  | "LANDED"; // the final ending (LND)

export type ExperienceEvent =
  | "BEGIN_CROSSING"
  | "CROSSING_DONE"
  | "MONTAGE_DONE"
  | "REPLAY";

export interface ProgressRecord {
  frameIndexByChapter: Partial<Record<ChapterId, number>>;
  nightStep: number;
  completed: ChapterId[];
  discovered: string[];
  /** Highest phase rank ever reached — used to route return visitors. */
  furthestPhaseRank: number;
}

export interface Settings {
  audioEnabled: boolean;
  hapticsEnabled: boolean;
  notificationsOptIn: boolean;
}
