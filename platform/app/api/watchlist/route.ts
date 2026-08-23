import { NextRequest, NextResponse } from "next/server";
import {
  loadWatchlist,
  addWatch,
  removeWatch,
  setWatchActive,
} from "@/lib/factory/watchlist";
import { storeIsWritable } from "@/lib/factory/gitStore";

export const dynamic = "force-dynamic";

/* /api/watchlist — the Opportunity Engine's standing interests. */

let mintCounter = 0;
function watchId(): string {
  const now = Date.now();
  return `wch_${now.toString(36)}${(mintCounter++).toString(36)}`;
}

export async function GET() {
  try {
    const list = await loadWatchlist();
    return NextResponse.json({ ...list, writable: storeIsWritable() });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not load the watchlist." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sector, region, constraints, scope, note } = body ?? {};
    if (!sector && !region) {
      return NextResponse.json(
        { error: "Give at least a sector or a region to watch." },
        { status: 400 }
      );
    }
    const entry = await addWatch({
      sector,
      region,
      constraints,
      scope,
      note,
      id: watchId(),
      now: new Date().toISOString(),
    });
    return NextResponse.json({ entry });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not add the watch." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, active } = body ?? {};
    if (typeof id !== "string" || typeof active !== "boolean") {
      return NextResponse.json({ error: "id and active are required." }, { status: 400 });
    }
    const entry = await setWatchActive(id, active);
    if (!entry) return NextResponse.json({ error: "Watch not found." }, { status: 404 });
    return NextResponse.json({ entry });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not update the watch." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id is required." }, { status: 400 });
    const removed = await removeWatch(id);
    if (!removed) return NextResponse.json({ error: "Watch not found." }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not remove the watch." },
      { status: 500 }
    );
  }
}
