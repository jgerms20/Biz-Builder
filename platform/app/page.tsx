"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { listAll, remove } from "@/lib/clientStore";
import { PHASES, PHASE_IDS } from "@/lib/framework";
import type { Project, ProjectStatus } from "@/lib/projects";

/* ------------------------------------------------------------
   Accent + status lookups.

   Project.accent is a dynamic string, so Tailwind classes can
   never be built by interpolation — the JIT scanner only sees
   complete class names in source. Every class an accent can
   resolve to is written out literally here.
   ------------------------------------------------------------ */

type Accent = Project["accent"];

interface AccentClasses {
  /** Text color — project name, stat numbers. */
  text: string;
  /** Solid fill — completed phase pips. */
  bg: string;
  /** 2px top rule on the project card. */
  borderTop: string;
}

const ACCENT: Record<Accent, AccentClasses> = {
  signal: { text: "text-signal", bg: "bg-signal", borderTop: "border-t-signal" },
  amber: { text: "text-amber", bg: "bg-amber", borderTop: "border-t-amber" },
  ion: { text: "text-ion", bg: "bg-ion", borderTop: "border-t-ion" },
  violet: { text: "text-violet", bg: "bg-violet", borderTop: "border-t-violet" },
  rose: { text: "text-rose", bg: "bg-rose", borderTop: "border-t-rose" },
};

const STATUS: Record<ProjectStatus, { label: string; chip: string }> = {
  live: { label: "Live", chip: "border-signal/35 bg-signal/10 text-signal" },
  building: { label: "Building", chip: "border-amber/35 bg-amber/10 text-amber" },
  idea: { label: "Idea", chip: "border-ion/35 bg-ion/10 text-ion" },
  paused: { label: "Paused", chip: "border-line-bright bg-elevated text-faint" },
};

/** Completed phases, ignoring unknown ids and duplicates. */
function completedPhases(project: Project): Set<string> {
  const valid = new Set<string>();
  for (const id of project.phasesComplete) {
    if (PHASE_IDS.includes(id)) valid.add(id);
  }
  return valid;
}

/* ------------------------------------------------------------
   Page

   The portfolio now reads from the browser: the founder's own
   builds live in localStorage, the seeded five stay static. That
   store is unavailable during SSR, so nothing touches it until
   after mount — until then the grid renders a skeleton and the
   stat tiles hold an em dash rather than flashing a wrong zero.
   ------------------------------------------------------------ */

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProjects(listAll());
    setHydrated(true);
  }, []);

  const handleDelete = useCallback((id: string) => {
    remove(id);
    setProjects(listAll());
  }, []);

  const total = projects.length;
  const liveCount = projects.filter((p) => p.status === "live").length;
  // Anything actively being worked or queued — everything but live and paused.
  const inProgressCount = projects.filter(
    (p) => p.status === "building" || p.status === "idea",
  ).length;
  const mineCount = projects.filter((p) => !p.seeded).length;

  const phasesDone = projects.reduce(
    (sum, p) => sum + completedPhases(p).size,
    0,
  );
  const phasesPossible = total * PHASES.length;

  const attention = projects
    .filter((p) => p.nextUp.length > 0)
    .map((p) => ({ project: p, action: p.nextUp[0] }))
    .slice(0, 6);

  return (
    <div className="pb-24">
      {/* ---------- Header ---------- */}
      <header className="grid-bg border-b border-line py-14">
        <div className="mx-auto max-w-7xl px-5">
          <p className="label">Operating Console</p>

          <h1 className="mt-3 font-sans text-4xl font-semibold tracking-tight md:text-5xl">
            Portfolio
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            {hydrated ? (
              <>
                {liveCount} of {total} {total === 1 ? "build is" : "builds are"}{" "}
                live.{" "}
              </>
            ) : null}
            Every business in the portfolio, the phase it has reached, and the
            next move waiting on each one.
          </p>

          {hydrated && mineCount > 0 ? (
            <p className="mt-2 font-mono text-[11px] text-faint">
              {mineCount} of these{" "}
              {mineCount === 1 ? "is yours and lives" : "are yours and live"} in
              this browser
            </p>
          ) : null}

          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-4">
            <StatTile
              label="Total Builds"
              value={hydrated ? total : "—"}
              tone="text-chalk"
            />
            <StatTile
              label="Live"
              value={hydrated ? liveCount : "—"}
              tone="text-signal"
            />
            <StatTile
              label="In Progress"
              value={hydrated ? inProgressCount : "—"}
              tone="text-amber"
            />
            <StatTile
              label="Phases Complete"
              value={hydrated ? phasesDone : "—"}
              suffix={hydrated ? `/${phasesPossible}` : undefined}
              tone="text-ion"
            />
          </div>
        </div>
      </header>

      {/* ---------- Needs You ---------- */}
      <section className="mx-auto max-w-7xl px-5 pt-12">
        <div className="flex items-baseline gap-3">
          <h2 className="font-sans text-sm font-semibold tracking-tight text-chalk">
            Needs You
          </h2>
          <span className="font-mono text-xs text-faint">
            {hydrated ? attention.length : "—"}
          </span>
        </div>

        <div className="mt-4 overflow-hidden rounded-lg border border-line bg-surface">
          {!hydrated ? (
            <ul className="divide-y divide-line" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <li key={i} className="flex items-center gap-4 px-4 py-4">
                  <span className="h-3 w-44 shrink-0 animate-pulse rounded bg-elevated opacity-60" />
                  <span className="h-3 flex-1 animate-pulse rounded bg-elevated opacity-60" />
                </li>
              ))}
            </ul>
          ) : attention.length === 0 ? (
            <p className="px-4 py-5 text-sm text-muted">
              Nothing queued. Every build has a clear runway.
            </p>
          ) : (
            <ul className="divide-y divide-line">
              {attention.map(({ project, action }) => (
                <li key={project.id}>
                  <Link
                    href={`/projects/${project.id}`}
                    className="group flex items-baseline gap-4 px-4 py-3 transition-colors hover:bg-raised"
                  >
                    <span
                      className={`w-44 shrink-0 truncate font-mono text-xs ${ACCENT[project.accent].text}`}
                    >
                      {project.name}
                    </span>
                    <span className="min-w-0 flex-1 text-sm leading-snug text-muted transition-colors group-hover:text-chalk">
                      {action}
                    </span>
                    <span className="shrink-0 font-mono text-xs text-faint transition-colors group-hover:text-muted">
                      &rarr;
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* ---------- Portfolio grid ---------- */}
      <section className="mx-auto max-w-7xl px-5 pt-12">
        <div className="flex items-baseline gap-3">
          <h2 className="font-sans text-sm font-semibold tracking-tight text-chalk">
            Builds
          </h2>
          <span className="font-mono text-xs text-faint">
            {hydrated ? total : "—"}
          </span>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {!hydrated ? (
            <>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  aria-hidden="true"
                  className="h-44 animate-pulse rounded-lg border border-line bg-surface opacity-60"
                />
              ))}
            </>
          ) : (
            <>
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onDelete={handleDelete}
                />
              ))}

              <Link
                href="/new"
                className="group flex min-h-[15rem] flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-line-bright bg-surface/40 p-6 text-center transition-colors hover:border-signal/60 hover:bg-surface"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-md border border-line-bright font-mono text-lg leading-none text-faint transition-colors group-hover:border-signal/60 group-hover:text-signal">
                  +
                </span>
                <span className="font-sans text-sm font-medium text-muted transition-colors group-hover:text-chalk">
                  Start a new build
                </span>
                <span className="label">Concept &rarr; Growth</span>
              </Link>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------
   Pieces
   ------------------------------------------------------------ */

function StatTile({
  label,
  value,
  suffix,
  tone,
}: {
  label: string;
  value: number | string;
  suffix?: string;
  tone: string;
}) {
  return (
    <div className="bg-surface px-5 py-6">
      <p className="flex items-baseline gap-1">
        <span
          className={`font-mono text-3xl font-semibold leading-none tracking-tight ${tone}`}
        >
          {value}
        </span>
        {suffix ? (
          <span className="font-mono text-sm leading-none text-faint">
            {suffix}
          </span>
        ) : null}
      </p>
      <p className="label mt-3">{label}</p>
    </div>
  );
}

function ProjectCard({
  project,
  onDelete,
}: {
  project: Project;
  onDelete: (id: string) => void;
}) {
  const accent = ACCENT[project.accent];
  const status = STATUS[project.status];
  const done = completedPhases(project);
  // Seeded builds are read-only — only the founder's own can be deleted.
  const deletable = !project.seeded;

  function handleDelete(event: React.MouseEvent<HTMLButtonElement>) {
    // The button sits over the card; neither the link nor a parent
    // handler should ever see this click.
    event.preventDefault();
    event.stopPropagation();

    const confirmed = window.confirm(
      `Delete "${project.name}"? It lives only in this browser, so this cannot be undone.`,
    );
    if (!confirmed) return;

    onDelete(project.id);
  }

  return (
    <div className="relative">
      <Link
        href={`/projects/${project.id}`}
        className={`group flex h-full min-h-[15rem] flex-col rounded-lg border-x border-b border-line bg-surface p-5 transition-colors hover:border-x-line-bright hover:border-b-line-bright hover:bg-raised border-t-2 ${accent.borderTop}`}
      >
        <div
          className={`flex items-start justify-between gap-3 ${
            deletable ? "pr-6" : ""
          }`}
        >
          <div className="min-w-0">
            <h3 className="truncate font-sans text-lg font-semibold leading-tight tracking-tight text-chalk">
              {project.name}
            </h3>
            <p className="mt-1 truncate font-mono text-xs text-faint">
              {project.founder}
            </p>
          </div>
          <span className={`chip shrink-0 ${status.chip}`}>{status.label}</span>
        </div>

        <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-muted">
          {project.tagline}
        </p>

        <div className="mt-5 flex items-center gap-3">
          <div className="flex gap-1" aria-hidden="true">
            {PHASES.map((phase) => (
              <span
                key={phase.id}
                title={phase.name}
                className={`h-2.5 w-2.5 rounded-[2px] ${
                  done.has(phase.id) ? accent.bg : "bg-elevated"
                }`}
              />
            ))}
          </div>
          <span className="font-mono text-xs leading-none text-faint">
            {done.size}/{PHASES.length}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <span className="chip truncate border-line bg-elevated text-muted">
            {project.category}
          </span>
          {project.url ? (
            <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-faint transition-colors group-hover:text-signal">
              &#8599; live
            </span>
          ) : null}
        </div>
      </Link>

      {deletable ? (
        <button
          type="button"
          onClick={handleDelete}
          title={`Delete ${project.name}`}
          aria-label={`Delete ${project.name}`}
          className="absolute right-2 top-2 rounded p-1 font-mono text-sm leading-none text-faint transition-colors hover:text-rose"
        >
          &times;
        </button>
      ) : null}
    </div>
  );
}
