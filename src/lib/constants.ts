import type { ChapterId, ExperiencePhase } from "@/types";

/** Her name, used at the climax. Configurable via env. */
export const HER_NAME: string = process.env.NEXT_PUBLIC_NAME?.trim() || "Indumathi";

/**
 * The birthday as a local date "YYYY-MM-DD". The experience's midnight is 00:00 of this date.
 * Defaults to a near date; override via NEXT_PUBLIC_BIRTHDAY.
 */
export const BIRTHDAY_ISO: string =
  process.env.NEXT_PUBLIC_BIRTHDAY?.trim() || "2026-07-15";

/** Minutes before midnight that the Summons becomes available. */
export const SUMMONS_LEAD_MINUTES = 5;

/** Daytime chapter unlock hours (local), mapped to chapter ids. */
export const DAY_UNLOCK_HOURS: Record<
  Extract<
    ChapterId,
    | "day-08"
    | "day-09"
    | "day-10"
    | "day-11"
    | "day-12"
    | "day-13"
    | "day-14"
    | "day-15"
    | "day-16"
  >,
  number
> = {
  "day-08": 8,
  "day-09": 9,
  "day-10": 10,
  "day-11": 11,
  "day-12": 12,
  "day-13": 13,
  "day-14": 14,
  "day-15": 15,
  "day-16": 16,
};

export const NIGHT_CHAPTER_IDS: ChapterId[] = ["nc1", "nc2", "nc3", "nc4", "nc5", "nc7"];

export const DAY_CHAPTER_IDS: ChapterId[] = [
  "day-08",
  "day-09",
  "day-10",
  "day-11",
  "day-12",
  "day-13",
  "day-14",
  "day-15",
  "day-16",
];

export const ALL_CHAPTER_IDS: ChapterId[] = [...NIGHT_CHAPTER_IDS, ...DAY_CHAPTER_IDS];

/** Phase ranking for "furthest reached" persistence and return-visitor routing. */
export const PHASE_RANK: Record<ExperiencePhase, number> = {
  DORMANT: 0,
  SUMMONED: 1,
  CROSSING: 2,
  CONFESSION: 3,
  LANDED: 4,
  DAYTIME: 5,
  ARRIVAL: 6,
  KEEPSAKE: 7,
};

/** Night-flow step keys (the ribbon order before midnight). */
export const NIGHT_STEPS = [
  "summons",
  "threshold",
  "nc1",
  "nc2",
  "nc3",
  "nc4",
  "nc5",
  "held",
] as const;
export type NightStepKey = (typeof NIGHT_STEPS)[number];

/** localStorage keys. */
export const STORAGE_KEYS = {
  progress: "indumathi.progress.v1",
  settings: "indumathi.settings.v1",
} as const;

/** Time sync cadence. */
export const TIME_RESYNC_INTERVAL_MS = 10 * 60 * 1000;

/** How close to midnight before the schedule loop tightens its tick. */
export const MIDNIGHT_TIGHT_WINDOW_MS = 60 * 1000;

export const IS_DEBUG_ALLOWED =
  process.env.NEXT_PUBLIC_ALLOW_DEBUG === "true" || process.env.NODE_ENV !== "production";
