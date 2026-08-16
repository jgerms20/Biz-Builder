import { NextRequest, NextResponse } from "next/server";
import { resolveAction } from "@/lib/ledger";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { decision, note } = body as {
      decision?: "approve" | "reject" | "acknowledge";
      note?: string;
    };

    if (!decision || !["approve", "reject", "acknowledge"].includes(decision)) {
      return NextResponse.json(
        { error: "decision must be one of: approve, reject, acknowledge." },
        { status: 400 }
      );
    }

    const action = resolveAction(params.id, decision, note);
    if (!action) {
      return NextResponse.json({ error: "Action not found." }, { status: 404 });
    }

    return NextResponse.json({ action });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not resolve the action." },
      { status: 500 }
    );
  }
}
