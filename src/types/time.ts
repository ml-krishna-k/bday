export type SyncStatus = "idle" | "syncing" | "synced" | "error";

export interface TimeSyncState {
  /** correctedNow = base + serverOffsetMs. */
  serverOffsetMs: number;
  lastSyncAt: number | null;
  syncStatus: SyncStatus;
  /** Debug-only fixed base time (ms) for time-travel previewing. */
  debugBaseMs: number | null;
}

export interface ServerTimeResponse {
  serverNow: number;
}
