/**
 * Pure time math. No React, no globals — unit-testable.
 * Every meaningful instant of the experience is derived from the birthday date.
 */

import { BIRTHDAY_ISO, SUMMONS_LEAD_MINUTES } from "@/lib/constants";

/** Parse "YYYY-MM-DD" into a local Date at 00:00 (midnight of the birthday). */
export function birthdayMidnight(iso: string = BIRTHDAY_ISO): number {
  const [y, m, d] = iso.split("-").map((n) => parseInt(n, 10));
  // Construct in local time. Month is 0-indexed.
  const date = new Date(y, (m || 1) - 1, d || 1, 0, 0, 0, 0);
  return date.getTime();
}

/** When the Summons becomes available (a few minutes before midnight). */
export function summonsStart(iso: string = BIRTHDAY_ISO): number {
  return birthdayMidnight(iso) - SUMMONS_LEAD_MINUTES * 60 * 1000;
}

/** The unlock instant for a given daytime hour on the birthday. */
export function dayUnlockAt(hour: number, iso: string = BIRTHDAY_ISO): number {
  const base = new Date(birthdayMidnight(iso));
  base.setHours(hour, 0, 0, 0);
  return base.getTime();
}

/** Round-trip offset estimate from a server time sample (Cristian's algorithm). */
export function computeOffset(t0: number, serverNow: number, t1: number): number {
  const latency = (t1 - t0) / 2;
  return serverNow + latency - t1;
}

/** ms remaining until the birthday's midnight (negative if passed). */
export function msUntilMidnight(now: number, iso: string = BIRTHDAY_ISO): number {
  return birthdayMidnight(iso) - now;
}

export function isAfterMidnight(now: number, iso: string = BIRTHDAY_ISO): boolean {
  return now >= birthdayMidnight(iso);
}

export function isInSummonsWindow(now: number, iso: string = BIRTHDAY_ISO): boolean {
  return now >= summonsStart(iso) && now < birthdayMidnight(iso);
}
