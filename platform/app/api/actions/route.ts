import { NextRequest, NextResponse } from "next/server";
import { listActions, pendingActions, ledgerStats, routeAction } from "@/lib/ledger";
import { getProject } from "@/lib/store";
import type { ActionCategory } from "@/lib/autonomy";

export async function GET(request: NextRequest) {
  const scope = request.nextUrl.searchParams.get("scope");
  const projectId = request.nextUrl.searchParams.get("projectId") ?? undefined;

  if (scope === "pending") {
    return NextResponse.json({ actions: pendingActions(), stats: ledgerStats() });
  }

  return NextResponse.json({
    actions: listActions({ projectId }),
    stats: ledgerStats(),
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { projectId, category, title, detail, effect, cost, humanRequired } = body as {
      projectId?: string;
      category?: ActionCategory;
      title?: string;
      detail?: string;
      effect?: string;
      cost?: string;
      humanRequired?: boolean;
    };

    if (!projectId || !category || !title) {
      return NextResponse.json(
        { error: "projectId, category, and title are required." },
        { status: 400 }
      );
    }

    const project = getProject(projectId);
    if (!project) {
      return NextResponse.json({ error: "Project not found." }, { status: 404 });
    }

    const { action, shouldExecute } = routeAction({
      projectId,
      projectName: project.name,
      category,
      title,
      detail: detail ?? "",
      effect: effect ?? "",
      cost,
      humanRequired,
    });

    return NextResponse.json({ action, shouldExecute });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not record the action." },
      { status: 500 }
    );
  }
}
