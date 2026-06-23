"use client";

import { useCallback, useEffect } from "react";
import { useTimeStore } from "@/stores/timeStore";
import { computeOffset } from "@/engine/timeMath";
import { TIME_RESYNC_INTERVAL_MS } from "@/lib/constants";
import type { ServerTimeResponse } from "@/types";
import { useVisibility } from "./useVisibility";

/**
 * Syncs the client clock against the authoritative server time and maintains the offset.
 * On failure, keeps the last-known offset (biasing toward "not yet" for unlocks).
 */
export function useTimeSync(): { sync: () => Promise<void> } {
  const applyOffset = useTimeStore((s) => s.applyOffset);
  const setStatus = useTimeStore((s) => s.setStatus);

  const sync = useCallback(async () => {
    setStatus("syncing");
    try {
      const t0 = Date.now();
      const res = await fetch("/api/time", { cache: "no-store" });
      if (!res.ok) throw new Error(`time ${res.status}`);
      const data = (await res.json()) as ServerTimeResponse;
      const t1 = Date.now();
      const offset = computeOffset(t0, data.serverNow, t1);
      applyOffset(offset);
    } catch {
      // Keep last-known offset; just mark error so UI can degrade gracefully.
      setStatus("error");
    }
  }, [applyOffset, setStatus]);

  useEffect(() => {
    void sync();
    const interval = setInterval(() => void sync(), TIME_RESYNC_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [sync]);

  // Re-sync on tab focus (handles device sleep/wake clock drift).
  useVisibility(() => void sync());

  return { sync };
}
