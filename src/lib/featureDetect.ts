/** Capability detection — all guarded for SSR and older browsers. */

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function prefersReducedData(): boolean {
  if (typeof navigator === "undefined") return false;
  const conn = (navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
  }).connection;
  if (!conn) return false;
  if (conn.saveData) return true;
  if (conn.effectiveType && /2g/.test(conn.effectiveType)) return true;
  return false;
}

export function canVibrate(): boolean {
  return typeof navigator !== "undefined" && typeof navigator.vibrate === "function";
}

export function vibrate(pattern: number | number[]): void {
  if (!canVibrate()) return;
  try {
    navigator.vibrate(pattern);
  } catch {
    /* some browsers throw on certain patterns — ignore */
  }
}

export function supportsAudioContext(): boolean {
  if (typeof window === "undefined") return false;
  return (
    "AudioContext" in window ||
    "webkitAudioContext" in (window as unknown as Record<string, unknown>)
  );
}
