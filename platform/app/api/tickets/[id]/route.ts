import { NextRequest, NextResponse } from "next/server";
import { getTicket, transitionTicket } from "@/lib/factory/tickets";
import { TICKET_STATES, type TicketState } from "@/lib/factory/ticket";

export const dynamic = "force-dynamic";

/* ============================================================
   /api/tickets/[id]

   GET  — one ticket.
   POST — apply a state transition. The state machine in ticket.ts
          rejects illegal moves by throwing; we surface that as a
          400 rather than a 500 so the board can show it inline.
   ============================================================ */

function isState(v: unknown): v is TicketState {
  return typeof v === "string" && (TICKET_STATES as readonly string[]).includes(v);
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const ticket = await getTicket(params.id);
    if (!ticket) {
      return NextResponse.json({ error: `No ticket ${params.id}.` }, { status: 404 });
    }
    return NextResponse.json({ ticket });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not load the ticket." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const input = (body ?? {}) as Record<string, unknown>;
  const to = input.to;
  const by = typeof input.by === "string" ? input.by : "operator";
  const note = typeof input.note === "string" ? input.note : undefined;
  const patch =
    input.patch && typeof input.patch === "object"
      ? (input.patch as Record<string, unknown>)
      : undefined;

  if (!isState(to)) {
    return NextResponse.json(
      { error: `"to" must be one of: ${TICKET_STATES.join(", ")}.` },
      { status: 400 }
    );
  }

  try {
    const ticket = await transitionTicket(params.id, {
      to,
      by,
      at: new Date().toISOString(),
      note,
      // patch is validated by TicketSchema.parse inside transition().
      patch: patch as never,
    });
    return NextResponse.json({ ticket });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not update the ticket.";
    // Missing ticket → 404; illegal transition (or any other validation) → 400.
    if (message.startsWith("No ticket")) {
      return NextResponse.json({ error: message }, { status: 404 });
    }
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
