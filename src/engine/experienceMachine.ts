/**
 * The global experience state machine — pure transition function.
 * Version 1: a continuous private story. No clock, no gating.
 */

import { NIGHT_CHAPTER_IDS } from "@/lib/constants";
import type { ChapterId, ExperienceEvent, ExperiencePhase } from "@/types";

const TRANSITIONS: Record<ExperiencePhase, Partial<Record<ExperienceEvent, ExperiencePhase>>> =
  {
    STORY: { BEGIN_CROSSING: "CROSSING" },
    CROSSING: { CROSSING_DONE: "CONFESSION" },
    CONFESSION: { MONTAGE_DONE: "LANDED" },
    LANDED: { REPLAY: "STORY" },
  };

export function nextPhase(
  current: ExperiencePhase,
  event: ExperienceEvent
): ExperiencePhase {
  const target = TRANSITIONS[current]?.[event];
  return target ?? current;
}

export function isStoryComplete(completed: ChapterId[]): boolean {
  return NIGHT_CHAPTER_IDS.every((id) => completed.includes(id));
}

/** Where a (re)visit should land. No time involved — purely progress-based. */
export function decideEntryPhase(storyComplete: boolean): ExperiencePhase {
  return storyComplete ? "LANDED" : "STORY";
}
