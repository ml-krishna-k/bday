/**
 * SSR-safe localStorage adapter. No-ops on the server, swallows quota/private-mode
 * errors, and stays JSON-safe. The experience must never crash on storage failure.
 */

function hasWindow(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function readJSON<T>(key: string): T | null {
  if (!hasWindow()) return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw == null) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function writeJSON<T>(key: string, value: T): void {
  if (!hasWindow()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota exceeded / private mode — silently ignore */
  }
}

export function removeKey(key: string): void {
  if (!hasWindow()) return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

/** Zustand persist-compatible storage that is SSR-safe. */
export const safeStorage = {
  getItem: (name: string): string | null => {
    if (!hasWindow()) return null;
    try {
      return window.localStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: string): void => {
    if (!hasWindow()) return;
    try {
      window.localStorage.setItem(name, value);
    } catch {
      /* ignore */
    }
  },
  removeItem: (name: string): void => {
    removeKey(name);
  },
};
