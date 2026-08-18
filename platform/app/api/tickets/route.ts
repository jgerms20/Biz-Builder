import { NextRequest, NextResponse } from "next/server";
import {
  listTickets,
  createTicket,
  boardFrom,
  boardStats,
} from "@/lib/factory/tickets";
import { storeIsWritable } from "@/lib/factory/gitStore";
import { ticketId, type NewTicketInput } from "@/lib/factory/ticket";

export const dynamic = "force-dynamic";

/* ============================================================
   /api/tickets

   GET  — the whole board in one shot: the flat list, the
          grouped board, the headline stats, and whether the
          store can actually persist writes right now.
   POST — queue a new ticket.
   ============================================================ */

export async function GET() {
  try {
    const tickets = await listTickets();
    return NextResponse.json({
      tickets,
      board: boardFrom(tickets),
      stats: boardStats(tickets),
      writable: storeIsWritable(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not load tickets." },
      { status: 500 }
    );
  }
}

/**
 * A per-process counter feeds the id salt so two tickets minted
 * in the same millisecond never collide, without reaching for
 * Math.random. It is intentionally not persisted — the timestamp
 * carries the global ordering, the counter only breaks ties.
 */
let mintCounter = 0;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      projectId,
      agent,
      phase,
      title,
      brief,
      dependsOn,
      inputsRef,
      outputsRef,
      gate,
      budgetTier,
      estUSD,
    } = body as Partial<NewTicketInput>;

    if (!projectId || !agent || !phase || !title) {
      return NextResponse.json(
        { error: "projectId, agent, phase, and title are required." },
        { status: 400 }
      );
    }

    const nowMs = Date.now();
    // Salt: rolling counter joined with the low digits of the clock,
    // both base-36 — deterministic given the inputs, no RNG.
    const salt = `${(mintCounter++).toString(36)}${(nowMs % 1_000_000).toString(36)}`;
    const now = new Date().toISOString();

    const ticket = await createTicket({
      id: ticketId(nowMs, salt),
      projectId,
      agent,
      phase,
      title,
      brief: brief ?? "",
      dependsOn: dependsOn ?? [],
      inputsRef: inputsRef ?? [],
      outputsRef: outputsRef ?? [],
      gate: gate ?? null,
      budgetTier: budgetTier ?? "mid",
      estUSD: estUSD ?? 0,
      now,
    });

    return NextResponse.json({ ticket });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not queue the ticket." },
      { status: 500 }
    );
  }
}
