import { NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

/** Authoritative server time for client clock-offset correction. Never cached. */
export function GET() {
  return NextResponse.json(
    { serverNow: Date.now() },
    { headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}
