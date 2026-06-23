"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useTimeSync } from "@/hooks/useTimeSync";
import { useUnlockEngine } from "@/hooks/useUnlockEngine";
import { useResumeGuard } from "@/hooks/useResumeGuard";
import { useExperienceStore } from "@/stores/experienceStore";
import { useProgressStore } from "@/stores/progressStore";
import { useTimeStore } from "@/stores/timeStore";
import { decideEntryPhase } from "@/engine/experienceMachine";
import { isNightComplete, allComplete } from "@/engine/unlockResolver";
import { birthdayMidnight, summonsStart, dayUnlockAt } from "@/engine/timeMath";
import { IS_DEBUG_ALLOWED } from "@/lib/constants";
import type { ExperiencePhase } from "@/types";
import { AudioProvider } from "./AudioProvider";

const VALID_PHASES: ExperiencePhase[] = [
  "DORMANT",
  "SUMMONED",
  "CROSSING",
  "CONFESSION",
  "LANDED",
  "DAYTIME",
  "ARRIVAL",
  "KEEPSAKE",
];

/** Reads optional debug params for time-travel previewing (guarded by env). */
function applyDebugParams(): ExperiencePhase | null {
  if (!IS_DEBUG_ALLOWED || typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);

  const simNow = params.get("simNow");
  if (simNow) {
    const parsed = Date.parse(simNow);
    if (!Number.isNaN(parsed)) {
      useTimeStore.getState().setDebugBase(parsed);
    }
  }

  const forced = params.get("phase") as ExperiencePhase | null;
  if (forced && VALID_PHASES.includes(forced)) {
    return forced;
  }
  return null;
}

function BootGate({ children }: { children: ReactNode }) {
  useTimeSync();
  useUnlockEngine();
  useResumeGuard();

  const setPhase = useExperienceStore((s) => s.setPhase);
  const setBooted = useExperienceStore((s) => s.setBooted);
  const setMissedMidnight = useExperienceStore((s) => s.setMissedMidnight);
  const correctedNow = useTimeStore((s) => s.correctedNow);

  const [hydrated, setHydrated] = useState(false);
  const didBoot = useRef(false);

  // Wait for persisted progress to rehydrate before deciding entry phase.
  useEffect(() => {
    if (useProgressStore.persist.hasHydrated()) {
      setHydrated(true);
      return;
    }
    const unsub = useProgressStore.persist.onFinishHydration(() => setHydrated(true));
    return unsub;
  }, []);

  useEffect(() => {
    if (!hydrated || didBoot.current) return;
    didBoot.current = true;

    const forced = applyDebugParams();
    const now = correctedNow();
    const { completed } = useProgressStore.getState();
    const nightComplete = isNightComplete(completed);

    if (forced) {
      setPhase(forced);
    } else {
      const entry = decideEntryPhase({
        now,
        summonsStart: summonsStart(),
        midnight: birthdayMidnight(),
        dayOpen: dayUnlockAt(8),
        nightComplete,
        allDayComplete: allComplete(completed),
        furthestRank: useProgressStore.getState().furthestPhaseRank,
      });

      // If she's into the daytime window but never finished the night, flag catch-up.
      if (entry === "DAYTIME" && !nightComplete) {
        setMissedMidnight(true);
      }
      setPhase(entry);
    }

    setBooted(true);
  }, [hydrated, correctedNow, setPhase, setBooted, setMissedMidnight]);

  return <>{children}</>;
}

export function ExperienceProvider({ children }: { children: ReactNode }) {
  return (
    <AudioProvider>
      <BootGate>{children}</BootGate>
    </AudioProvider>
  );
}
