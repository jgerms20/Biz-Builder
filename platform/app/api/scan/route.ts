import { NextRequest, NextResponse } from "next/server";
import { scanOpportunities } from "@/lib/generators";
import { hasApiKey } from "@/lib/claude";

/* Two-pass: live web research, then structuring. Slow by design. */
export const maxDuration = 300;
export const dynamic = "force-dynamic";

function text(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function messageOf(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "Opportunity scan failed for an unknown reason.";
}

export async function POST(request: NextRequest) {
  if (!hasApiKey()) {
    return NextResponse.json(
      {
        error:
          "ANTHROPIC_API_KEY is not set. Add it to .env.local (or your deployment environment variables) and restart the server.",
      },
      { status: 400 }
    );
  }

  let body: unknown = {};
  try {
    body = await request.json();
  } catch {
    // An empty body is legitimate here — every field is optional.
    body = {};
  }

  const input = (body ?? {}) as Record<string, unknown>;

  let count: number | undefined;
  if (input.count !== undefined && input.count !== null) {
    const parsed = Number(input.count);
    if (!Number.isFinite(parsed) || !Number.isInteger(parsed) || parsed < 1 || parsed > 12) {
      return NextResponse.json(
        { error: "count must be a whole number between 1 and 12." },
        { status: 400 }
      );
    }
    count = parsed;
  }

  const sector = text(input.sector);
  const region = text(input.region);
  const constraints = text(input.constraints);

  try {
    const scan = await scanOpportunities({
      ...(sector ? { sector } : {}),
      ...(region ? { region } : {}),
      ...(constraints ? { constraints } : {}),
      ...(count !== undefined ? { count } : {}),
    });

    return NextResponse.json({ scan });
  } catch (error) {
    return NextResponse.json({ error: messageOf(error) }, { status: 500 });
  }
}
