"use client";

import { useCallback } from "react";
import { useSettingsStore } from "@/stores/settingsStore";

/**
 * Soft, in-voice unlock notifications. Opt-in, best-effort. The experience never
 * depends on these — if denied or unsupported, it simply does nothing.
 */
export function useNotifications() {
  const optIn = useSettingsStore((s) => s.notificationsOptIn);
  const setOptIn = useSettingsStore((s) => s.setNotificationsOptIn);

  const request = useCallback(async () => {
    if (typeof Notification === "undefined") return false;
    try {
      const result = await Notification.requestPermission();
      const granted = result === "granted";
      setOptIn(granted);
      return granted;
    } catch {
      return false;
    }
  }, [setOptIn]);

  const notify = useCallback(
    (title: string, body: string) => {
      if (!optIn || typeof Notification === "undefined") return;
      if (Notification.permission !== "granted") return;
      try {
        new Notification(title, { body, silent: false });
      } catch {
        /* ignore */
      }
    },
    [optIn]
  );

  return { optIn, request, notify };
}
