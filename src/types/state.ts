import type { ChapterId } from "./content";

/** The global experience phases (the experience state machine). */
export type ExperiencePhase =
  | "DORMANT" // before the summons window; protect the surprise
  | "SUMMONED" // night flow: SUM -> THR -> NC1..5 -> HELD
  | "CROSSING" // the midnight bloom (MID)
  | "CONFESSION" // NC7 -> Montage
  | "LANDED" // the post-midnight landing (LND), then sleep
  | "DAYTIME" // 8AM -> 4PM hub + spokes
  | "ARRIVAL" // the 4PM real-world arrival (DAY-16)
  | "KEEPSAKE"; // return-visitor memory book

export type ExperienceEvent =
  | "OPEN"
  | "BEGIN_NIGHT"
  | "MIDNIGHT_REACHED"
  | "CROSSING_DONE"
  | "MONTAGE_DONE"
  | "ENTER_DAYTIME"
  | "ARRIVAL_FIRED"
  | "ENTER_KEEPSAKE";

/** Per-chapter unlock lifecycle (the unlock state machine). */
export type ChapterUnlockState =
  | "LOCKED"
  | "AVAILABLE"
  | "OPENED"
  | "COMPLETED"
  | "REVISITABLE";

export type UnlockMap = Record<ChapterId, ChapterUnlockState>;

export interface ProgressRecord {
  frameIndexByChapter: Partial<Record<ChapterId, number>>;
  nightStep: number;
  completed: ChapterId[];
  discovered: string[];
  /** Highest phase rank ever reached — used to route return visitors. */
  furthestPhaseRank: number;
  /** Whether the missed-midnight catch-up has played. */
  catchUpDone: boolean;
}

export interface Settings {
  audioEnabled: boolean;
  hapticsEnabled: boolean;
  notificationsOptIn: boolean;
}
