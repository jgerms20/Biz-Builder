"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import KitPanel from "@/components/KitPanel";
import MaintenancePanel from "@/components/MaintenancePanel";
import {
  clearOverride,
  get as getStoredProject,
  getOverrides,
  setOverride,
} from "@/lib/clientStore";
import { kitToMarkdown } from "@/lib/export";
import { PHASES, phaseProgress } from "@/lib/framework";
import type { Project, ProjectStatus } from "@/lib/projects";

/* ------------------------------------------------------------
   Project hub.

   The founder's own builds live in the browser now — a read-only
   host loses anything the server writes — so this page reads from
   localStorage rather than the server store. localStorage does not
   exist during SSR, so nothing touches it until after mount: until
   then the page renders a skeleton, never a flash of "not found".
   ------------------------------------------------------------ */

type Accent = Project["accent"];

/* Tailwind scans source for literal class names — every accent-dependent
   class is a full string in a lookup map, never interpolated. */

const ACCENT_TEXT: Record<Accent, string> = {
  signal: "text-signal",
  amber: "text-amber",
  ion: "text-ion",
  violet: "text-violet",
  rose: "text-rose",
};

const ACCENT_BORDER: Record<Accent, string> = {
  signal: "border-signal/50",
  amber: "border-amber/50",
  ion: "border-ion/50",
  violet: "border-violet/50",
  rose: "border-rose/50",
};

const ACCENT_BAR: Record<Accent, string> = {
  signal: "bg-signal",
  amber: "bg-amber",
  ion: "bg-ion",
  violet: "bg-violet",
  rose: "bg-rose",
};

const STATUS_CHIP: Record<ProjectStatus, string> = {
  live: "border-signal/40 bg-signal/10 text-signal",
  building: "border-amber/40 bg-amber/10 text-amber",
  idea: "border-ion/40 bg-ion/10 text-ion",
  paused: "border-line-bright bg-elevated text-faint",
};

function formatDate(value: string): string {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toISOString().slice(0, 10);
}

/** Route params are `string | string[]`; this route only ever has one id. */
function readId(value: string | string[] | undefined): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value[0] ?? "";
  return "";
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
      {children}
    </h2>
  );
}

/* ---------- loading ---------- */

function Bar({ className }: { className: string }) {
  return (
    <span
      className={`block animate-pulse rounded bg-elevated opacity-60 ${className}`}
    />
  );
}

/** Mirrors the real layout so nothing jumps when the store lands. */
function Skeleton() {
  return (
    <div className="mx-auto max-w-7xl px-5" aria-hidden="true">
      <header className="border-b border-line py-10">
        <Bar className="h-3 w-24" />
        <div className="mt-6 space-y-4">
          <Bar className="h-8 w-72 max-w-full" />
          <Bar className="h-3 w-56 max-w-full" />
          <Bar className="h-4 w-full max-w-2xl" />
        </div>
      </header>

      <section className="border-b border-line py-10">
        <Bar className="h-3 w-28" />
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="space-y-3 rounded-lg border border-line bg-surface p-4"
            >
              <Bar className="h-4 w-7" />
              <Bar className="h-3.5 w-24 max-w-full" />
              <Bar className="h-2.5 w-full" />
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-10 py-10 lg:grid-cols-3 lg:gap-12">
        <div className="space-y-12 lg:col-span-2">
          <div className="space-y-4">
            <Bar className="h-3 w-24" />
            <Bar className="h-4 w-full max-w-3xl" />
            <Bar className="h-4 w-4/5 max-w-3xl" />
          </div>
          <div className="space-y-4">
            <Bar className="h-3 w-28" />
            <Bar className="h-3.5 w-3/4" />
            <Bar className="h-3.5 w-2/3" />
          </div>
          <div className="overflow-hidden rounded-lg border border-line bg-surface">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-6 border-t border-line px-5 py-4 first:border-t-0"
              >
                <Bar className="h-3.5 w-48 max-w-full" />
                <Bar className="h-7 w-24 shrink-0" />
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-4 lg:col-span-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-lg border border-line bg-surface p-5">
              <Bar className="h-3 w-20" />
              <div className="mt-4 space-y-2.5">
                <Bar className="h-3.5 w-full" />
                <Bar className="h-3.5 w-5/6" />
              </div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}

/* ---------- missing ---------- */

/** Not a 404: the id may be perfectly valid in another browser. */
function NotInThisBrowser({ id }: { id: string }) {
  return (
    <div className="mx-auto max-w-7xl px-5">
      <div className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
          Not in this browser
        </span>

        <h1 className="mt-5 text-2xl font-semibold tracking-tight text-chalk md:text-3xl">
          No build with that id
        </h1>

        {id ? (
          <p className="mt-4 font-mono text-[13px] text-amber">{id}</p>
        ) : null}

        <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">
          Your builds are stored in this browser, not on the server. This one is
          not here &mdash; it may live in another browser or on another device,
          or it may have been deleted.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-md border border-line-bright px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted transition-colors hover:border-signal hover:text-chalk"
          >
            Back to portfolio
          </Link>
          <Link
            href="/new"
            className="rounded-md border border-line px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-faint transition-colors hover:border-line-bright hover:text-muted"
          >
            Start a new build
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ---------- page ---------- */

export default function ProjectPage() {
  const params = useParams();
  const id = readId(params?.id);

  const [project, setProject] = useState<Project | undefined>(undefined);
  const [hydrated, setHydrated] = useState(false);

  /* The seeded URLs were guessed at seed time. The founder can correct
     one here; the correction is stored as an override in this browser,
     never written back into the seeded record. */
  const [editingUrl, setEditingUrl] = useState(false);
  const [urlDraft, setUrlDraft] = useState("");
  const [urlOverridden, setUrlOverridden] = useState(false);

  /* localStorage does not exist during SSR — every read below runs from
     an effect or an event handler, never during render. */
  const refresh = useCallback(() => {
    const next = getStoredProject(id);
    setProject(next);
    setUrlOverridden(getOverrides()[id]?.url !== undefined);
    return next;
  }, [id]);

  useEffect(() => {
    refresh();
    setHydrated(true);
  }, [refresh]);

  function openUrlEditor(current: Project) {
    setUrlDraft(current.url ?? "");
    setEditingUrl(true);
  }

  function cancelUrlEditor(current: Project) {
    setUrlDraft(current.url ?? "");
    setEditingUrl(false);
  }

  /* A bare "example.com" is what people actually type; treat the scheme
     as optional rather than bouncing the value back at them. */
  function saveUrl(current: Project) {
    const trimmed = urlDraft.trim();
    const normalized =
      trimmed && !/^https?:\/\//i.test(trimmed) ? `https://${trimmed}` : trimmed;

    setOverride(current.id, { url: normalized || undefined });
    const next = refresh();
    setUrlDraft(next?.url ?? "");
    setEditingUrl(false);
  }

  function resetUrl(current: Project) {
    clearOverride(current.id);
    const next = refresh();
    setUrlDraft(next?.url ?? "");
    setEditingUrl(false);
  }

  /* The server export route cannot see a browser-owned project, so the
     Markdown is built here and handed to the browser as a Blob. Re-read
     the store first: sections generated during this session are persisted
     by KitPanel, and this page's copy predates them. */
  function downloadMarkdown(current: Project) {
    const latest = getStoredProject(current.id) ?? current;
    const md = kitToMarkdown(latest);
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${current.id}-starter-kit.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!hydrated) return <Skeleton />;
  if (!project) return <NotInThisBrowser id={id} />;

  const accent = project.accent;
  const complete = new Set(project.phasesComplete);
  const doneCount = PHASES.filter((p) => complete.has(p.id)).length;
  const progress = phaseProgress(project.phasesComplete);

  return (
    <div className="mx-auto max-w-7xl px-5">
      {/* ---------- header ---------- */}
      <header className="border-b border-line py-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-faint transition-colors hover:text-chalk"
        >
          <span aria-hidden>&larr;</span> Portfolio
        </Link>

        <div className="mt-6 flex flex-wrap items-start justify-between gap-x-8 gap-y-5">
          <div className="min-w-0">
            <h1 className="text-3xl font-semibold tracking-tight text-chalk md:text-4xl">
              {project.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em]">
              <span className="text-muted">{project.founder}</span>
              <span aria-hidden className="text-faint">
                /
              </span>
              <span className="text-faint">{project.category}</span>
              <span
                className={`rounded-sm border px-2 py-0.5 tracking-[0.14em] ${STATUS_CHIP[project.status]}`}
              >
                {project.status}
              </span>
            </div>

            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
              {project.tagline}
            </p>

            {project.repoPath ? (
              <p className="mt-4 font-mono text-xs text-faint">
                repo <span className="text-muted">{project.repoPath}</span>
              </p>
            ) : null}
          </div>

          <div className="w-full shrink-0 sm:w-auto">
            <div className="flex flex-wrap items-center gap-3">
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded-md border border-line-bright px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted transition-colors hover:border-signal hover:text-chalk"
                >
                  Visit site &#8599;
                </a>
              ) : null}

              {editingUrl ? null : (
                <>
                  {project.url ? (
                    <button
                      type="button"
                      onClick={() => openUrlEditor(project)}
                      className="font-mono text-[10px] uppercase tracking-widest text-faint transition-colors hover:text-chalk"
                    >
                      edit
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => openUrlEditor(project)}
                      className="rounded-md border border-dashed border-line-bright px-4 py-2 font-mono text-xs text-muted transition-colors hover:text-chalk"
                    >
                      + Add live URL
                    </button>
                  )}

                  {urlOverridden ? (
                    <button
                      type="button"
                      onClick={() => resetUrl(project)}
                      className="font-mono text-[10px] uppercase tracking-widest text-faint transition-colors hover:text-chalk"
                    >
                      reset
                    </button>
                  ) : null}
                </>
              )}
            </div>

            {editingUrl ? (
              <div className="mt-3">
                <label
                  htmlFor="live-url"
                  className="block font-mono text-[10px] uppercase tracking-[0.18em] text-faint"
                >
                  Live URL
                </label>
                <input
                  id="live-url"
                  type="text"
                  autoFocus
                  value={urlDraft}
                  onChange={(e) => setUrlDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveUrl(project);
                    if (e.key === "Escape") cancelUrlEditor(project);
                  }}
                  placeholder="https://&hellip;"
                  spellCheck={false}
                  autoComplete="off"
                  className="mt-2 w-full rounded-md border border-line bg-elevated px-3 py-2 font-mono text-xs text-chalk outline-none transition-colors placeholder:text-faint focus:border-ion sm:w-80"
                />
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => saveUrl(project)}
                    className="rounded-md border border-line-bright px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-colors hover:border-signal hover:text-chalk"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => cancelUrlEditor(project)}
                    className="rounded-md border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-faint transition-colors hover:border-line-bright hover:text-muted"
                  >
                    Cancel
                  </button>
                  {urlOverridden ? (
                    <button
                      type="button"
                      onClick={() => resetUrl(project)}
                      className="font-mono text-[10px] uppercase tracking-widest text-faint transition-colors hover:text-chalk"
                    >
                      reset
                    </button>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {urlOverridden ? (
          <p className="mt-5 font-mono text-[10px] text-faint">
            URL set by you, saved in this browser.
          </p>
        ) : null}
      </header>

      {/* ---------- phase track ---------- */}
      <section className="border-b border-line py-10">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <SectionLabel>Phase Track</SectionLabel>
          <div className="flex items-center gap-3">
            <div className="h-px w-24 bg-line">
              <div
                className={`h-px ${ACCENT_BAR[accent]}`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="font-mono text-[11px] text-faint">
              <span className={ACCENT_TEXT[accent]}>{doneCount}</span>/
              {PHASES.length} complete
            </span>
          </div>
        </div>

        <ol className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          {PHASES.map((phase) => {
            const done = complete.has(phase.id);
            return (
              <li
                key={phase.id}
                className={[
                  "rounded-lg border p-4 transition-colors",
                  done
                    ? `${ACCENT_BORDER[accent]} bg-raised`
                    : "border-line bg-surface hover:border-line-bright",
                ].join(" ")}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span
                    className={[
                      "font-mono text-lg leading-none",
                      done ? ACCENT_TEXT[accent] : "text-faint",
                    ].join(" ")}
                  >
                    {String(phase.number).padStart(2, "0")}
                  </span>
                  {done ? (
                    <span
                      className={`font-mono text-[10px] uppercase tracking-[0.18em] ${ACCENT_TEXT[accent]}`}
                    >
                      done
                    </span>
                  ) : null}
                </div>

                <div
                  className={[
                    "mt-3 text-sm font-medium",
                    done ? "text-chalk" : "text-muted",
                  ].join(" ")}
                >
                  {phase.name}
                </div>

                <p className="mt-1.5 line-clamp-2 text-[11px] leading-snug text-faint">
                  {phase.deliverable}
                </p>
              </li>
            );
          })}
        </ol>
      </section>

      {/* ---------- body ---------- */}
      <div className="grid gap-10 py-10 lg:grid-cols-3 lg:gap-12">
        {/* left */}
        <div className="space-y-12 lg:col-span-2">
          <section className="space-y-4">
            <SectionLabel>Description</SectionLabel>
            <p className="max-w-3xl text-[15px] leading-relaxed text-muted">
              {project.description}
            </p>
          </section>

          <section className="space-y-4">
            <SectionLabel>What&rsquo;s Built</SectionLabel>
            {project.built.length > 0 ? (
              <ul className="space-y-2.5">
                {project.built.map((item, i) => (
                  <li key={`${i}-${item.slice(0, 24)}`} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-[9px] h-1 w-1 shrink-0 rounded-sm bg-signal"
                    />
                    <span className="text-[14px] leading-relaxed text-muted">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[13px] text-faint">Nothing logged yet.</p>
            )}
          </section>

          <MaintenancePanel project={project} />

          <section>
            <KitPanel project={project} />
          </section>
        </div>

        {/* right */}
        <aside className="lg:col-span-1">
          <div className="space-y-4 lg:sticky lg:top-20">
            <div className="rounded-lg border border-line bg-surface p-5">
              <SectionLabel>Needs You</SectionLabel>
              {project.nextUp.length > 0 ? (
                <ol className="mt-4 space-y-3">
                  {project.nextUp.map((item, i) => (
                    <li key={`${i}-${item.slice(0, 24)}`} className="flex gap-3">
                      <span className="mt-[2px] shrink-0 font-mono text-[11px] text-amber">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[13px] leading-relaxed text-muted">
                        {item}
                      </span>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="mt-4 text-[13px] text-faint">
                  Nothing queued. Generate a kit section to surface next steps.
                </p>
              )}
            </div>

            <div className="rounded-lg border border-line bg-surface p-5">
              <SectionLabel>Export</SectionLabel>
              <p className="mt-3 text-[13px] leading-relaxed text-muted">
                Everything generated for this project, as one Markdown file.
              </p>
              <button
                type="button"
                onClick={() => downloadMarkdown(project)}
                className="mt-4 block w-full rounded-md border border-line-bright px-4 py-2.5 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-muted transition-colors hover:border-signal hover:text-chalk"
              >
                Download Markdown
              </button>
            </div>

            <div className="rounded-lg border border-line bg-surface p-5">
              <SectionLabel>Meta</SectionLabel>
              <dl className="mt-4 space-y-2.5 font-mono text-xs">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-faint">id</dt>
                  <dd className="truncate text-muted">{project.id}</dd>
                </div>
                {project.createdAt ? (
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-faint">created</dt>
                    <dd className="text-muted">
                      {formatDate(project.createdAt)}
                    </dd>
                  </div>
                ) : null}
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-faint">source</dt>
                  <dd className={project.seeded ? "text-muted" : "text-signal"}>
                    {project.seeded ? "seeded" : "created here"}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-faint">accent</dt>
                  <dd className={ACCENT_TEXT[accent]}>{accent}</dd>
                </div>
              </dl>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
