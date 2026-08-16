import { NextRequest, NextResponse } from "next/server";
import type { Project, ProjectStatus } from "@/lib/projects";
import { getProject, saveProject, deleteProject } from "@/lib/store";

export const dynamic = "force-dynamic";

const STATUSES: ProjectStatus[] = ["live", "building", "idea", "paused"];

function isStatus(value: unknown): value is ProjectStatus {
  return typeof value === "string" && (STATUSES as string[]).includes(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((v) => typeof v === "string");
}

/* ------------------------------------------------------------------ */
/* GET — one project.                                                  */
/* ------------------------------------------------------------------ */

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const project = getProject(params.id);

  if (!project) {
    return NextResponse.json(
      { error: `No project with id "${params.id}".` },
      { status: 404 }
    );
  }

  return NextResponse.json({ project });
}

/* ------------------------------------------------------------------ */
/* PATCH — merge a narrow set of mutable fields.                       */
/* ------------------------------------------------------------------ */

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const project = getProject(params.id);

  if (!project) {
    return NextResponse.json(
      { error: `No project with id "${params.id}".` },
      { status: 404 }
    );
  }

  if (project.seeded) {
    return NextResponse.json(
      {
        error: `"${project.name}" is a seeded portfolio project and cannot be edited through the API.`,
      },
      { status: 400 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 }
    );
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json(
      { error: "Request body must be an object of fields to update." },
      { status: 400 }
    );
  }

  const patch = body as Record<string, unknown>;
  const next: Project = { ...project };
  let changed = false;

  if ("status" in patch) {
    if (!isStatus(patch.status)) {
      return NextResponse.json(
        { error: `status must be one of: ${STATUSES.join(", ")}.` },
        { status: 400 }
      );
    }
    next.status = patch.status;
    changed = true;
  }

  for (const key of ["nextUp", "built", "phasesComplete"] as const) {
    if (key in patch) {
      if (!isStringArray(patch[key])) {
        return NextResponse.json(
          { error: `${key} must be an array of strings.` },
          { status: 400 }
        );
      }
      next[key] = patch[key] as string[];
      changed = true;
    }
  }

  for (const key of ["description", "tagline"] as const) {
    if (key in patch) {
      if (typeof patch[key] !== "string") {
        return NextResponse.json(
          { error: `${key} must be a string.` },
          { status: 400 }
        );
      }
      next[key] = patch[key] as string;
      changed = true;
    }
  }

  if (!changed) {
    return NextResponse.json(
      {
        error:
          "No updatable fields provided. Allowed: status, nextUp, built, phasesComplete, description, tagline.",
      },
      { status: 400 }
    );
  }

  saveProject(next);

  return NextResponse.json({ project: next });
}

/* ------------------------------------------------------------------ */
/* DELETE — custom projects only.                                      */
/* ------------------------------------------------------------------ */

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const project = getProject(params.id);

  if (!project) {
    return NextResponse.json(
      { error: `No project with id "${params.id}".` },
      { status: 404 }
    );
  }

  if (project.seeded) {
    return NextResponse.json(
      {
        error: `"${project.name}" is a seeded portfolio project and cannot be deleted.`,
      },
      { status: 400 }
    );
  }

  const removed = deleteProject(params.id);

  if (!removed) {
    return NextResponse.json(
      { error: `Could not delete "${params.id}".` },
      { status: 500 }
    );
  }

  return NextResponse.json({ deleted: params.id });
}
