"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { KIT_SECTIONS, type KitSection } from "@/lib/schemas";
import { slugify, type Project } from "@/lib/projects";
import { nextAccent, save, saveSection, uniqueId } from "@/lib/clientStore";

/* ============================================================
   NEW BUILD — intake

   The front door for "someone came to me with an idea." One
   screen, one required field, then it runs. The founder is
   often typing this with a phone against their ear, so nothing
   here asks a second question it could infer later.

   The project itself is created in the BROWSER — the host's
   filesystem is read-only, so anything the server wrote would
   die at the next cold start. The server stays the generation
   engine: it receives the brief inline and hands back a
   section, which we persist the moment it lands.
   ============================================================ */

type Step = "brief" | "generating" | "done";

/** The shape the generate API expects, taken from the project itself. */
type Brief = NonNullable<Project["brief"]>;

interface BriefForm {
  idea: string;
  name: string;
  founder: string;
  location: string;
  customer: string;
  pricePoint: string;
  notes: string;
}

const EMPTY_FORM: BriefForm = {
  idea: "",
  name: "",
  founder: "",
  location: "Columbia, SC",
  customer: "",
  pricePoint: "",
  notes: "",
};

/** Enough words that the generators have something to work with. */
const MIN_IDEA = 20;

const IDEA_PLACEHOLDER =
  "My cousin cuts hair out of his kitchen and wants to go legit — barbershop, maybe mobile too. Columbia area. He's good with fades and has a following on Instagram.";

interface FieldSpec {
  key: Exclude<keyof BriefForm, "idea" | "notes">;
  label: string;
  hint?: string;
  placeholder: string;
}

const FIELDS: FieldSpec[] = [
  {
    key: "name",
    label: "Working name",
    hint: "(leave blank and we'll generate options)",
    placeholder: "None yet",
  },
  { key: "founder", label: "Founder", placeholder: "Who is actually running it" },
  { key: "location", label: "Location / market", placeholder: "Columbia, SC" },
  {
    key: "customer",
    label: "Intended customer",
    placeholder: "Men 18–45, Northeast Columbia",
  },
  { key: "pricePoint", label: "Price expectation", placeholder: "$35 a cut" },
];

const TOTAL_SECTIONS = KIT_SECTIONS.length;

/* ------------------------------------------------------------------ */
/* Fetch helpers — the API returns real, actionable errors (a missing  */
/* key, a rate limit). Surface the server's words, never a generic     */
/* substitute.                                                         */
/* ------------------------------------------------------------------ */

function messageOf(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "Something failed and gave no reason.";
}

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  let data: unknown = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const serverError = (data as { error?: unknown } | null)?.error;
    throw new Error(
      typeof serverError === "string" && serverError.trim().length > 0
        ? serverError
        : `${url} failed (${response.status} ${response.statusText}).`,
    );
  }

  return data as T;
}

interface GenerateResponse {
  section: KitSection;
  result: unknown;
  queuedSteps: number;
}

/** Trimmed, non-empty fields only — blanks get figured out downstream. */
function briefPayload(form: BriefForm): Brief {
  const filled = (value: string): string | undefined => {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  };

  return {
    idea: form.idea.trim(),
    name: filled(form.name),
    founder: filled(form.founder),
    location: filled(form.location),
    customer: filled(form.customer),
    pricePoint: filled(form.pricePoint),
    notes: filled(form.notes),
  };
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function NewBuildPage() {
  const [step, setStep] = useState<Step>("brief");
  const [form, setForm] = useState<BriefForm>(EMPTY_FORM);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [projectName, setProjectName] = useState<string>("");
  const [brief, setBrief] = useState<Brief | null>(null);
  const [done, setDone] = useState<KitSection[]>([]);
  const [active, setActive] = useState<KitSection | null>(null);
  const [error, setError] = useState<string | null>(null);

  const ideaLength = form.idea.trim().length;
  const ready = ideaLength >= MIN_IDEA;

  const remaining = useMemo<KitSection[]>(
    () => KIT_SECTIONS.map((s) => s.key).filter((key) => !done.includes(key)),
    [done],
  );

  const update = useCallback((key: keyof BriefForm, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  }, []);

  /** Sequential on purpose — each section is a long model call, and the
   *  founder wants to watch them land one at a time. Every section is
   *  written to the browser store the instant it arrives, so closing the
   *  tab mid-run costs only the sections that had not finished. */
  const runKit = useCallback(
    async (id: string, payload: Brief, sections: KitSection[]) => {
      setError(null);
      setStep("generating");

      for (const section of sections) {
        setActive(section);
        try {
          const response = await postJson<GenerateResponse>("/api/generate", {
            section,
            brief: payload,
          });
          saveSection(id, section, response.result);
        } catch (err) {
          setActive(null);
          setError(messageOf(err));
          setStep("done");
          return;
        }
        setDone((current) =>
          current.includes(section) ? current : [...current, section],
        );
      }

      setActive(null);
      setStep("done");
    },
    [],
  );

  const submit = useCallback(async () => {
    if (!ready || step !== "brief") return;

    setError(null);
    setStep("generating");
    setDone([]);
    setActive(null);

    const payload = briefPayload(form);
    const name = payload.name?.trim() || "Untitled Build";

    let id: string;
    try {
      id = uniqueId(slugify(name));
      const project: Project = {
        id,
        name,
        founder: payload.founder?.trim() || "",
        tagline: "",
        category: "",
        description: payload.idea.trim(),
        status: "idea",
        accent: nextAccent(),
        phasesComplete: [],
        built: [],
        nextUp: [],
        createdAt: new Date().toISOString(),
        brief: payload,
      };
      save(project);
    } catch (err) {
      // Nothing was stored, so there is nothing to open — back to the form.
      setError(messageOf(err));
      setStep("brief");
      return;
    }

    setProjectId(id);
    setProjectName(name);
    setBrief(payload);

    await runKit(
      id,
      payload,
      KIT_SECTIONS.map((s) => s.key),
    );
  }, [form, ready, step, runKit]);

  const reset = useCallback(() => {
    setStep("brief");
    setForm(EMPTY_FORM);
    setProjectId(null);
    setProjectName("");
    setBrief(null);
    setDone([]);
    setActive(null);
    setError(null);
  }, []);

  if (step === "generating") {
    return (
      <GeneratingView done={done} active={active} projectName={projectName} />
    );
  }

  if (step === "done") {
    return (
      <DoneView
        done={done}
        error={error}
        projectId={projectId}
        projectName={projectName}
        onRetry={() => {
          if (projectId && brief) void runKit(projectId, brief, remaining);
        }}
        onReset={reset}
      />
    );
  }

  return (
    <div className="pb-24">
      {/* ---------- Header ---------- */}
      <header className="grid-bg border-b border-line py-14">
        <div className="mx-auto max-w-3xl px-5">
          <p className="label">New Build</p>
          <h1 className="mt-3 font-sans text-4xl font-semibold tracking-tight md:text-5xl">
            Describe the idea
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            Type it the way it was told to you. Everything below the first box is
            optional — anything you leave blank gets figured out.
          </p>
        </div>
      </header>

      {/* ---------- Form ---------- */}
      <div className="mx-auto max-w-3xl px-5">
        <form
          className="mt-10 rounded-lg border border-line bg-surface p-6 md:p-8"
          onSubmit={(event) => {
            event.preventDefault();
            void submit();
          }}
          onKeyDown={(event) => {
            // Fast path for someone mid-conversation.
            if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
              event.preventDefault();
              void submit();
            }
          }}
        >
          {/* Hero field */}
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor="idea" className="label">
                The idea
                <span className="ml-2 text-rose" aria-hidden="true">
                  *
                </span>
              </label>
              <span
                className={[
                  "font-mono text-[10px] tabular-nums",
                  ready ? "text-faint" : "text-amber",
                ].join(" ")}
              >
                {ready ? `${ideaLength} chars` : `${ideaLength}/${MIN_IDEA}`}
              </span>
            </div>
            <textarea
              id="idea"
              name="idea"
              rows={5}
              autoFocus
              required
              value={form.idea}
              onChange={(event) => update("idea", event.target.value)}
              placeholder={IDEA_PLACEHOLDER}
              className="mt-2 w-full resize-y rounded-md border border-line bg-ink px-3 py-2.5 font-sans text-sm leading-relaxed text-chalk transition-colors placeholder:text-faint hover:border-line-bright focus:border-line-bright"
            />
          </div>

          {/* Optional context */}
          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            {FIELDS.map((field) => (
              <div key={field.key}>
                <label htmlFor={field.key} className="label block">
                  {field.label}
                  {field.hint ? (
                    <span className="ml-1.5 normal-case tracking-normal text-faint/80">
                      {field.hint}
                    </span>
                  ) : null}
                </label>
                <input
                  id={field.key}
                  name={field.key}
                  type="text"
                  autoComplete="off"
                  value={form[field.key]}
                  onChange={(event) => update(field.key, event.target.value)}
                  placeholder={field.placeholder}
                  className="mt-2 w-full rounded-md border border-line bg-ink px-3 py-2 font-mono text-[13px] leading-tight text-chalk transition-colors placeholder:text-faint hover:border-line-bright focus:border-line-bright"
                />
              </div>
            ))}

            <div className="sm:col-span-2">
              <label htmlFor="notes" className="label block">
                Anything else
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={2}
                value={form.notes}
                onChange={(event) => update("notes", event.target.value)}
                placeholder="Constraints, deadlines, what they already have, what they've already tried."
                className="mt-2 w-full resize-y rounded-md border border-line bg-ink px-3 py-2 font-sans text-sm leading-relaxed text-chalk transition-colors placeholder:text-faint hover:border-line-bright focus:border-line-bright"
              />
            </div>
          </div>

          {/* Error from project creation */}
          {error ? (
            <div className="mt-7 rounded-lg border border-line border-l-2 border-l-rose bg-raised p-4">
              <p className="label text-rose">Could not start the build</p>
              <p className="mt-2 font-mono text-xs leading-relaxed text-muted">
                {error}
              </p>
            </div>
          ) : null}

          {/* Submit */}
          <button
            type="submit"
            disabled={!ready}
            className="mt-7 w-full rounded-md bg-signal px-4 py-3 font-mono text-xs uppercase tracking-widest text-ink transition-colors hover:bg-signal/90 disabled:cursor-not-allowed disabled:bg-elevated disabled:text-faint"
          >
            Build the kit
          </button>

          <p className="mt-3 text-center font-mono text-[11px] leading-relaxed text-faint">
            {ready ? (
              <>
                Creates the project, then generates all {TOTAL_SECTIONS} sections
                of the starter kit — names through pricing.{" "}
                <span className="text-muted">⌘↵</span> works too.
              </>
            ) : (
              <>
                Write at least {MIN_IDEA} characters. A sentence or two of how it
                was described to you is plenty.
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 2 — generating                                                 */
/* ------------------------------------------------------------------ */

function GeneratingView({
  done,
  active,
  projectName,
}: {
  done: KitSection[];
  active: KitSection | null;
  projectName: string;
}) {
  const percent = Math.round((done.length / TOTAL_SECTIONS) * 100);

  return (
    <div className="mx-auto max-w-xl px-5 py-20">
      <p className="label">
        {projectName ? projectName : "Creating the project"}
      </p>
      <h1 className="mt-3 font-sans text-3xl font-semibold tracking-tight">
        Building the kit
      </h1>

      {/* Progress */}
      <div className="mt-8">
        <div className="flex items-baseline justify-between">
          <span className="label">Progress</span>
          <span className="font-mono text-xs tabular-nums text-muted">
            {done.length}/{TOTAL_SECTIONS}
          </span>
        </div>
        <div
          className="mt-2 h-px w-full bg-line"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={TOTAL_SECTIONS}
          aria-valuenow={done.length}
          aria-label="Starter kit sections generated"
        >
          <div
            className="h-px bg-signal transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Checklist */}
      <ul className="mt-8 divide-y divide-line" aria-live="polite">
        {KIT_SECTIONS.map((section) => {
          const isDone = done.includes(section.key);
          const isActive = active === section.key;

          return (
            <li key={section.key} className="flex items-center gap-3 py-3">
              <span
                aria-hidden="true"
                className={[
                  "h-2.5 w-2.5 shrink-0 rounded-[2px]",
                  isDone
                    ? "bg-signal"
                    : isActive
                      ? "animate-pulse bg-amber"
                      : "border border-line-bright",
                ].join(" ")}
              />
              <span
                className={[
                  "min-w-0 flex-1 truncate font-mono text-xs",
                  isDone ? "text-signal" : isActive ? "text-amber" : "text-faint",
                ].join(" ")}
              >
                {section.label}
              </span>
              <span
                className={[
                  "shrink-0 font-mono text-[10px] uppercase tracking-[0.18em]",
                  isDone ? "text-signal" : isActive ? "text-amber" : "text-faint",
                ].join(" ")}
              >
                {isDone ? "done" : isActive ? "generating…" : "queued"}
              </span>
            </li>
          );
        })}
      </ul>

      <p className="mt-8 text-xs leading-relaxed text-muted">
        This runs one section at a time and takes a couple of minutes. Leave the
        tab open — closing it stops the run, though anything already finished is
        saved to the project.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 3 — done (or stopped early)                                    */
/* ------------------------------------------------------------------ */

function DoneView({
  done,
  error,
  projectId,
  projectName,
  onRetry,
  onReset,
}: {
  done: KitSection[];
  error: string | null;
  projectId: string | null;
  projectName: string;
  onRetry: () => void;
  onReset: () => void;
}) {
  const failed = error !== null;

  return (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <p className="label">{projectName || "New build"}</p>

      <h1
        className={[
          "mt-3 font-sans text-3xl font-semibold tracking-tight",
          failed ? "text-rose" : "text-signal",
        ].join(" ")}
      >
        {failed ? "Stopped early" : "Kit ready"}
      </h1>

      <p className="mt-3 font-mono text-xs text-muted">
        <span className="text-chalk tabular-nums">{done.length}</span> of{" "}
        <span className="tabular-nums">{TOTAL_SECTIONS}</span> sections
        generated
      </p>

      {failed ? (
        <>
          <div className="mt-6 rounded-lg border border-line border-l-2 border-l-rose bg-surface p-4 text-left">
            <p className="label text-rose">What went wrong</p>
            <p className="mt-2 font-mono text-xs leading-relaxed text-muted">
              {error}
            </p>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted">
            The project was created and everything generated before the failure
            is saved. You can open it as-is, or run the remaining sections again.
          </p>
        </>
      ) : (
        <>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Names, positioning, formation plan, brand, digital setup, marketing,
            and pricing are all written and saved. Formation steps are already in
            your review queue.
          </p>
          <p className="mt-3 font-mono text-[11px] leading-relaxed text-muted">
            Saved in this browser. Export to Markdown from the build page to keep
            a copy.
          </p>
        </>
      )}

      <div className="mt-8 flex flex-col items-center gap-4">
        {projectId ? (
          <Link
            href={`/projects/${projectId}`}
            className="w-full rounded-md bg-signal px-4 py-3 font-mono text-xs uppercase tracking-widest text-ink transition-colors hover:bg-signal/90"
          >
            Open the build
          </Link>
        ) : null}

        {failed && projectId ? (
          <button
            type="button"
            onClick={onRetry}
            className="w-full rounded-md border border-line px-4 py-3 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:border-line-bright hover:text-chalk"
          >
            Retry the rest
          </button>
        ) : null}

        <button
          type="button"
          onClick={onReset}
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint underline underline-offset-4 transition-colors hover:text-chalk"
        >
          Start another
        </button>
      </div>
    </div>
  );
}
