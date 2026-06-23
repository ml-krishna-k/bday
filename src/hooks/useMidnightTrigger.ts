"use client";

import { useEffect } from "react";
import { scheduleAt } from "@/engine/schedule";
import { birthdayMidnight } from "@/engine/timeMath";
import { useCorrectedNow } from "./useCorrectedNow";

/**
 * Fires `onMidnight` exactly when corrected time crosses the birthday's midnight.
 * If midnight has already passed when mounted, fires immediately (ungated late arrival).
 */
export function useMidnightTrigger(onMidnight: () => void, active: boolean): void {
  const now = useCorrectedNow();

  useEffect(() => {
    if (!active) return;
    const target = birthdayMidnight();

    if (now() >= target) {
      onMidnight();
      return;
    }

    const handle = scheduleAt(target, now, onMidnight);
    return () => handle.cancel();
    // `now` is a stable callback; onMidnight is provided stable by callers.
  }, [active, now, onMidnight]);
}
