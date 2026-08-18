import type { ReactNode } from "react";
import type { Project } from "@/lib/projects";

/* ============================================================
   MaintenancePanel — the "how do I keep this alive" surface.

   Purely presentational and server-safe: no state, no effects,
   no browser APIs, so it renders identically on the server and
   after hydration inside the client-rendered project hub.

   The panel exists because this portfolio is a monorepo of five
   separate sites. The single most expensive mistake available is
   a wrong Vercel Root Directory — it silently deploys a different
   business — so that block gets the visual weight.
   ============================================================ */

interface MaintenancePanelProps {
  project: Project;
}

/* ---------- shared primitives ---------- */

function Micro({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
      {children}
    </span>
  );
}

/* Tailwind scans source for literal class names, so every class that
   depends on a value is a full string in a lookup map — never built by
   interpolation. Keyed by required/optional as a boolean-ish string. */

type Requirement = "required" | "optional";

const REQUIREMENT_CHIP: Record<Requirement, string> = {
  required: "chip border-amber/40 text-amber",
  optional: "chip border-line text-faint",
};

/* ---------- panel ---------- */

export default function MaintenancePanel({ project }: MaintenancePanelProps) {
  const maintenance = project.maintenance;

  /* Founder-created builds have no maintenance record yet. Nothing to
     say is better than an empty scaffold. */
  if (!maintenance) return null;

  const { rootDirectory, stack, envVars, updateFlow, knownGaps } = maintenance;
  const isRepoRoot = rootDirectory === ".";

  return (
    <div className="rounded-lg border border-line bg-surface">
      {/* ---------- header ---------- */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line px-5 py-4">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
          Maintenance
        </h2>
        <span className="font-mono text-[11px] text-faint">{stack}</span>
      </div>

      <div className="space-y-8 px-5 py-6">
        {/* ---------- deploy target ---------- */}
        <section className="space-y-3">
          <div className="rounded-md bg-elevated p-4">
            <Micro>Vercel Root Directory</Micro>

            <div className="mt-3">
              <code className="inline-block rounded-sm border border-line bg-raised px-2 py-1 font-mono text-base text-chalk">
                {rootDirectory}
              </code>
            </div>

            {isRepoRoot ? (
              <p className="mt-4 border-l-2 border-amber pl-3 text-xs leading-relaxed text-muted">
                This site is the repository root. Any Vercel project with Root
                Directory left blank will build THIS site instead of the one you
                intended.
              </p>
            ) : (
              <p className="mt-4 text-xs leading-relaxed text-muted">
                Set this exactly in Vercel &rarr; Settings &rarr; General &rarr;
                Root Directory. A wrong value here serves a different business.
              </p>
            )}
          </div>

          {project.repoPath ? (
            <p className="font-mono text-[11px] text-faint">
              Source <span className="text-muted">{project.repoPath}</span>
            </p>
          ) : null}
        </section>

        {/* ---------- environment variables ---------- */}
        <section className="space-y-3">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <Micro>Environment variables</Micro>
            <span className="font-mono text-[11px] text-faint">
              {envVars.length}
            </span>
          </div>

          <p className="text-xs leading-relaxed text-muted">
            Missing a required variable does not break the build &mdash; the
            page renders and the form fails silently at submit.
          </p>

          {envVars.length > 0 ? (
            <ul className="overflow-hidden rounded-md border border-line">
              {envVars.map((envVar) => {
                const requirement: Requirement = envVar.required
                  ? "required"
                  : "optional";
                return (
                  <li
                    key={envVar.key}
                    className="flex flex-wrap items-start gap-x-4 gap-y-2 border-t border-line px-4 py-3 first:border-t-0"
                  >
                    <code className="font-mono text-xs text-chalk">
                      {envVar.key}
                    </code>
                    <span className={REQUIREMENT_CHIP[requirement]}>
                      {requirement}
                    </span>
                    <span className="min-w-[12rem] flex-1 text-xs leading-relaxed text-muted">
                      {envVar.purpose}
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-[13px] text-faint">
              No environment variables required.
            </p>
          )}
        </section>

        {/* ---------- update flow ---------- */}
        <section className="space-y-3">
          <Micro>Update flow</Micro>

          {updateFlow.length > 0 ? (
            <ol className="space-y-2.5">
              {updateFlow.map((step, i) => (
                <li key={`${i}-${step.slice(0, 24)}`} className="flex gap-3">
                  <span className="mt-[2px] shrink-0 font-mono text-[11px] text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-relaxed text-muted">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-[13px] text-faint">No update flow documented.</p>
          )}
        </section>

        {/* ---------- known gaps ---------- */}
        <section className="space-y-3">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <Micro>Known gaps</Micro>
            <span className="font-mono text-[11px] text-faint">
              {knownGaps.length}
            </span>
          </div>

          {knownGaps.length > 0 ? (
            <ul className="space-y-2.5">
              {knownGaps.map((gap, i) => (
                <li key={`${i}-${gap.slice(0, 24)}`} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-[1px] bg-rose"
                  />
                  <span className="text-sm leading-relaxed text-muted">
                    {gap}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[13px] text-faint">Nothing outstanding.</p>
          )}
        </section>
      </div>
    </div>
  );
}
