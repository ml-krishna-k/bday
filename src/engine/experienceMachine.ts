/**
 * The global experience state machine — pure transition function.
 */

import type { ExperienceEvent, ExperiencePhase } from "@/types";

const TRANSITIONS: Record<ExperiencePhase, Partial<Record<ExperienceEvent, ExperiencePhase>>> =
  {
    DORMANT: { OPEN: "SUMMONED", BEGIN_NIGHT: "SUMMONED", ENTER_DAYTIME: "DAYTIME", ENTER_KEEPSAKE: "KEEPSAKE" },
    SUMMONED: { MIDNIGHT_REACHED: "CROSSING", ENTER_DAYTIME: "DAYTIME" },
    CROSSING: { CROSSING_DONE: "CONFESSION" },
    CONFESSION: { MONTAGE_DONE: "LANDED" },
    LANDED: { ENTER_DAYTIME: "DAYTIME", ENTER_KEEPSAKE: "KEEPSAKE" },
    DAYTIME: { ARRIVAL_FIRED: "ARRIVAL", ENTER_KEEPSAKE: "KEEPSAKE" },
    ARRIVAL: { ENTER_KEEPSAKE: "KEEPSAKE", ENTER_DAYTIME: "DAYTIME" },
    KEEPSAKE: { ENTER_DAYTIME: "DAYTIME" },
  };

export function nextPhase(
  current: ExperiencePhase,
  event: ExperienceEvent
): ExperiencePhase {
  const target = TRANSITIONS[current]?.[event];
  return target ?? current;
}

export interface EntryDecisionInput {
  now: number;
  summonsStart: number;
  midnight: number;
  dayOpen: number; // dayUnlockAt(8)
  nightComplete: boolean;
  allDayComplete: boolean;
  furthestRank: number;
}

/**
 * Decide where a (re)visit should land. Time-derived; never trusts a stale persisted phase.
 */
export function decideEntryPhase(input: EntryDecisionInput): ExperiencePhase {
  const { now, summonsStart, midnight, dayOpen, nightComplete, allDayComplete } = input;

  if (allDayComplete) return "KEEPSAKE";

  // Daytime window has opened.
  if (now >= dayOpen) return "DAYTIME";

  // Between midnight and morning.
  if (now >= midnight) {
    return nightComplete ? "LANDED" : "SUMMONED";
  }

  // Pre-midnight summons window.
  if (now >= summonsStart) return "SUMMONED";

  // Too early — protect the surprise (unless the night was somehow already done).
  return nightComplete ? "LANDED" : "DORMANT";
}
