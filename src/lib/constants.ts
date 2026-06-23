import type { ChapterId, ExperiencePhase } from "@/types";

/** Her name, used at the climax. Configurable via env. */
export const HER_NAME: string = process.env.NEXT_PUBLIC_NAME?.trim() || "Indumathi";

/** Version 1 chapters — a continuous private story, linear. No clock. */
export const NIGHT_CHAPTER_IDS: ChapterId[] = ["nc1", "nc2", "nc3", "nc4", "nc5", "nc7"];

export const ALL_CHAPTER_IDS: ChapterId[] = [...NIGHT_CHAPTER_IDS];

/** Phase ranking for "furthest reached" persistence and return-visitor routing. */
export const PHASE_RANK: Record<ExperiencePhase, number> = {
  STORY: 0,
  CROSSING: 1,
  CONFESSION: 2,
  LANDED: 3,
};

/** Story-flow step keys (the opening ribbon, no waiting state). */
export const STORY_STEPS = [
  "summons",
  "threshold",
  "nc1",
  "nc2",
  "nc3",
  "nc4",
  "nc5",
] as const;
export type StoryStepKey = (typeof STORY_STEPS)[number];

/** The last chapter of the opening ribbon — completing it turns into the confession. */
export const LAST_STORY_CHAPTER: ChapterId = "nc5";

/** localStorage keys. */
export const STORAGE_KEYS = {
  progress: "indumathi.progress.v1",
  settings: "indumathi.settings.v1",
} as const;

export const IS_DEBUG_ALLOWED =
  process.env.NEXT_PUBLIC_ALLOW_DEBUG === "true" || process.env.NODE_ENV !== "production";
