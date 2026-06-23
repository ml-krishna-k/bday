"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useExperienceStore } from "@/stores/experienceStore";
import { useProgressStore } from "@/stores/progressStore";
import { decideEntryPhase, isStoryComplete } from "@/engine/experienceMachine";
import { IS_DEBUG_ALLOWED } from "@/lib/constants";
import type { ExperiencePhase } from "@/types";
import { AudioProvider } from "./AudioProvider";

const VALID_PHASES: ExperiencePhase[] = ["STORY", "CROSSING", "CONFESSION", "LANDED"];

/** Optional ?phase= override for previewing a specific beat (guarded by env). */
function forcedPhase(): ExperiencePhase | null {
  if (!IS_DEBUG_ALLOWED || typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const forced = params.get("phase") as ExperiencePhase | null;
  return forced && VALID_PHASES.includes(forced) ? forced : null;
}

function BootGate({ children }: { children: ReactNode }) {
  const setPhase = useExperienceStore((s) => s.setPhase);
  const setBooted = useExperienceStore((s) => s.setBooted);

  const [hydrated, setHydrated] = useState(false);
  const didBoot = useRef(false);

  // Wait for persisted progress to rehydrate before deciding entry phase (for resume).
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

    const forced = forcedPhase();
    if (forced) {
      setPhase(forced);
    } else {
      const { completed } = useProgressStore.getState();
      setPhase(decideEntryPhase(isStoryComplete(completed)));
    }
    setBooted(true);
  }, [hydrated, setPhase, setBooted]);

  return <>{children}</>;
}

export function ExperienceProvider({ children }: { children: ReactNode }) {
  return (
    <AudioProvider>
      <BootGate>{children}</BootGate>
    </AudioProvider>
  );
}
