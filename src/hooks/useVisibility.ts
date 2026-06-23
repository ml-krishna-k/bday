"use client";

import { useEffect } from "react";

/** Fire a callback when the tab becomes visible again (resume / clock-drift correction). */
export function useVisibility(onVisible: () => void): void {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const handler = () => {
      if (document.visibilityState === "visible") onVisible();
    };
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, [onVisible]);
}
