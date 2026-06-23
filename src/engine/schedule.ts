/**
 * Drift-safe scheduler. A single long setTimeout is unreliable when a tab is
 * backgrounded/throttled, so we re-check corrected time on a loop and tighten the
 * tick as the target approaches. Returns a cancel function.
 */

import { MIDNIGHT_TIGHT_WINDOW_MS } from "@/lib/constants";

export interface ScheduleHandle {
  cancel: () => void;
}

/**
 * Fire `onReach` the first tick where nowFn() >= targetMs.
 * @param targetMs absolute corrected-time target
 * @param nowFn returns current corrected time
 * @param onReach callback when target is reached
 */
export function scheduleAt(
  targetMs: number,
  nowFn: () => number,
  onReach: () => void
): ScheduleHandle {
  let cancelled = false;
  let timer: ReturnType<typeof setTimeout> | null = null;

  const tick = () => {
    if (cancelled) return;
    const now = nowFn();
    const remaining = targetMs - now;

    if (remaining <= 0) {
      onReach();
      return;
    }

    // Coarse far out, tight near the target, capped so background throttling
    // can't overshoot by much.
    let delay: number;
    if (remaining > MIDNIGHT_TIGHT_WINDOW_MS) {
      delay = Math.min(remaining - MIDNIGHT_TIGHT_WINDOW_MS, 15_000);
    } else if (remaining > 2_000) {
      delay = 500;
    } else {
      delay = 100;
    }

    timer = setTimeout(tick, delay);
  };

  tick();

  return {
    cancel: () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    },
  };
}
