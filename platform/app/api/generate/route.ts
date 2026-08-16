import { NextRequest, NextResponse } from "next/server";
import type { Project } from "@/lib/projects";
import { getProject, saveProject } from "@/lib/store";
import { generateSection, type Brief } from "@/lib/generators";
import { KIT_SECTIONS, type KitSection, type StarterKit, type Legal } from "@/lib/schemas";
import { hasApiKey } from "@/lib/claude";
import { routeAction } from "@/lib/ledger";
import type { ActionCategory } from "@/lib/autonomy";

/* Long-running model calls — Legal and Marketing routinely run past
   the default serverless ceiling. */
export const maxDuration = 300;
export const dynamic = "force-dynamic";

const SECTION_KEYS = KIT_SECTIONS.map((s) => s.key);

function isKitSection(value: unknown): value is KitSection {
  return typeof value === "string" && (SECTION_KEYS as string[]).includes(value);
}

/** Section keys are a union, so the write needs one assertion. The value
 *  itself is schema-validated upstream by the structured-output call. */
function mergeSection(
  kit: StarterKit | undefined,
  section: KitSection,
  value: unknown
): StarterKit {
  return { ...(kit ?? {}), [section]: value } as StarterKit;
}

/**
 * A generated formation plan is not just a document — every step in it is
 * a real action someone has to take, most of them costing money and several
 * legally requiring a person. Fan them into the ledger so they land in the
 * review queue with their gates already applied, instead of sitting inert
 * inside a kit nobody re-reads.
 */
function enqueueFormationSteps(
  projectId: string,
  projectName: string,
  legal: Legal
): number {
  let queued = 0;

  for (const step of legal.steps) {
    // A step that spends money but needs no signature is a spend; anything
    // requiring a person is a filing regardless of what it costs.
    const category: ActionCategory = step.humanRequired ? "file" : "spend";

    routeAction({
      projectId,
      projectName,
      category,
      title: step.title,
      detail: step.detail,
      effect: `${step.where} · ${step.estimatedTime}`,
      cost: step.estimatedCost,
      humanRequired: step.humanRequired,
    });
    queued += 1;
  }

  return queued;
}

function messageOf(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "Generation failed for an unknown reason.";
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

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 }
    );
  }

  const input = (body ?? {}) as Record<string, unknown>;
  const projectId = typeof input.projectId === "string" ? input.projectId.trim() : "";
  const section = input.section;

  if (!projectId) {
    return NextResponse.json(
      { error: "projectId is required." },
      { status: 400 }
    );
  }

  if (!isKitSection(section)) {
    return NextResponse.json(
      { error: `section must be one of: ${SECTION_KEYS.join(", ")}.` },
      { status: 400 }
    );
  }

  const project = getProject(projectId);
  if (!project) {
    return NextResponse.json(
      { error: `No project with id "${projectId}".` },
      { status: 404 }
    );
  }

  const stored = project.brief;
  const idea = stored?.idea?.trim() || project.description.trim();

  if (!idea) {
    return NextResponse.json(
      {
        error:
          "This project has no brief and no description — there is nothing to generate from. Add a description first.",
      },
      { status: 400 }
    );
  }

  const brief: Brief = {
    ...(stored ?? {}),
    idea,
    name: stored?.name?.trim() || project.name,
    founder: stored?.founder?.trim() || project.founder,
  };

  try {
    const result = await generateSection(section, brief);

    const updated: Project = {
      ...project,
      kit: mergeSection(project.kit, section, result),
    };
    saveProject(updated);

    // Drafting is reversible and internal, so it records as an executed
    // action rather than waiting on anything.
    routeAction({
      projectId,
      projectName: project.name,
      category: "generate",
      title: `Generated ${section}`,
      detail: `Drafted the ${section} section of the starter kit for ${project.name}.`,
      effect: "Saved to the project. Nothing left the building.",
    });

    let queuedSteps = 0;
    if (section === "legal") {
      queuedSteps = enqueueFormationSteps(projectId, project.name, result as Legal);
    }

    return NextResponse.json({ section, result, queuedSteps });
  } catch (error) {
    return NextResponse.json({ error: messageOf(error) }, { status: 500 });
  }
}
