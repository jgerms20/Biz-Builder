import { NextRequest, NextResponse } from "next/server";
import { slugify, type Project } from "@/lib/projects";
import { listProjects, saveProject, uniqueId, isPersistent } from "@/lib/store";
import type { Brief } from "@/lib/generators";

/* Reads and writes the on-disk (or in-memory) project store, so it must
   never be statically rendered at build time. */
export const dynamic = "force-dynamic";

const ACCENTS: Project["accent"][] = ["signal", "amber", "ion", "violet", "rose"];

/** Trimmed string, or undefined when the value is absent/blank. */
function text(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

/* ------------------------------------------------------------------ */
/* GET — the whole portfolio, plus whether writes survive a restart.   */
/* ------------------------------------------------------------------ */

export async function GET() {
  return NextResponse.json({
    projects: listProjects(),
    persistent: isPersistent(),
  });
}

/* ------------------------------------------------------------------ */
/* POST — create a project from a Brief.                               */
/* ------------------------------------------------------------------ */

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 }
    );
  }

  const raw = (body as { brief?: unknown } | null)?.brief;
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return NextResponse.json(
      { error: "Missing 'brief'. Send { brief: { idea: string, ... } }." },
      { status: 400 }
    );
  }

  const input = raw as Record<string, unknown>;

  const idea = text(input.idea);
  if (!idea) {
    return NextResponse.json(
      { error: "brief.idea is required — describe the business in a sentence." },
      { status: 400 }
    );
  }

  const briefName = text(input.name);
  const briefFounder = text(input.founder);
  const location = text(input.location);
  const customer = text(input.customer);
  const pricePoint = text(input.pricePoint);
  const notes = text(input.notes);

  const brief: Brief = {
    idea,
    ...(briefName ? { name: briefName } : {}),
    ...(briefFounder ? { founder: briefFounder } : {}),
    ...(location ? { location } : {}),
    ...(customer ? { customer } : {}),
    ...(pricePoint ? { pricePoint } : {}),
    ...(notes ? { notes } : {}),
  };

  const name = briefName ?? "Untitled Build";
  const existing = listProjects();
  const id = uniqueId(slugify(name) || "build");

  const project: Project = {
    id,
    name,
    founder: briefFounder ?? "Unassigned",
    tagline: "",
    category: "Unsorted",
    description: idea,
    status: "idea",
    accent: ACCENTS[existing.length % ACCENTS.length],
    phasesComplete: [],
    built: [],
    nextUp: [],
    createdAt: new Date().toISOString(),
    brief,
  };

  saveProject(project);

  return NextResponse.json({ project }, { status: 201 });
}
