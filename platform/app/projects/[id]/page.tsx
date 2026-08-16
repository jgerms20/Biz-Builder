import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import KitPanel from "@/components/KitPanel";
import { PHASES, phaseProgress } from "@/lib/framework";
import type { Project, ProjectStatus } from "@/lib/projects";
import { getProject } from "@/lib/store";

/* Kits are generated at runtime and written back to the store, so this
   page must never be frozen at build time. */
export const dynamic = "force-dynamic";

interface PageProps {
  params: { id: string };
}

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

export function generateMetadata({ params }: PageProps): Metadata {
  const project = getProject(params.id);
  return { title: project?.name ?? "Project" };
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
      {children}
    </h2>
  );
}

export default function ProjectPage({ params }: PageProps) {
  const project = getProject(params.id);
  if (!project) notFound();

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

          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer noopener"
              className="shrink-0 rounded-md border border-line-bright px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted transition-colors hover:border-signal hover:text-chalk"
            >
              Visit site &#8599;
            </a>
          ) : null}
        </div>
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
              <a
                href={`/api/export/${project.id}`}
                download={`${project.id}-starter-kit.md`}
                className="mt-4 block rounded-md border border-line-bright px-4 py-2.5 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-muted transition-colors hover:border-signal hover:text-chalk"
              >
                Download Markdown
              </a>
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
