import { NextResponse } from "next/server";
import { runAutoPass } from "@/lib/factory/autoMode";
import { hasApiKey } from "@/lib/claude";

/* /api/auto — one auto-mode pass over the watchlist.

   Fired by the scheduled Routine (or manually to test). It hunts,
   vets, rates, and STOPS — no building. Long-running because it
   does real web research + a judge pass per watch. */
export const dynamic = "force-dynamic";
export const maxDuration = 300;

export async function POST() {
  if (!hasApiKey()) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY is not set." },
      { status: 400 }
    );
  }
  try {
    const summary = await runAutoPass(new Date().toISOString());
    return NextResponse.json({ summary });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Auto pass failed." },
      { status: 500 }
    );
  }
}
