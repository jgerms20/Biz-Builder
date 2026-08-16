import { NextRequest, NextResponse } from "next/server";
import { getPolicy, setPolicy } from "@/lib/ledger";
import { CATEGORIES, describePosture } from "@/lib/autonomy";

export async function GET() {
  const policy = getPolicy();
  return NextResponse.json({
    policy,
    categories: CATEGORIES,
    posture: describePosture(policy),
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // setPolicy clamps anything below a category floor, so a client
    // cannot remove a gate that exists for legal or financial reasons.
    const policy = setPolicy(body.policy ?? body);
    return NextResponse.json({ policy, posture: describePosture(policy) });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not save the policy." },
      { status: 500 }
    );
  }
}
