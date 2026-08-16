"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { isSeeded, saveSection } from "@/lib/clientStore";
import type { Project } from "@/lib/projects";
import { KIT_SECTIONS, type KitSection, type StarterKit } from "@/lib/schemas";
import type {
  Names,
  Positioning,
  Legal,
  Brand,
  Marketing,
  Digital,
  Financial,
} from "@/lib/schemas";

/* ============================================================
   KitPanel — the interactive half of the project hub.

   Owns the starter kit locally so a generated section appears
   the instant it lands, without a full route refresh. The server
   is only the generator now: it takes a brief and returns one
   section. Persistence happens here, in the browser, because a
   read-only host loses anything the server writes.

   Seeded projects are the exception — they are static and shared,
   so saving is a deliberate no-op. Generation still runs and still
   renders; it just does not survive a reload.
   ============================================================ */

interface KitPanelProps {
  project: Project;
}

/** Derived from Project so the client never reaches into the
 *  server-only generator module for its type. */
type Brief = NonNullable<Project["brief"]>;

interface GenerateResponse {
  section?: KitSection;
  result?: unknown;
  /** Formation steps the API fanned into the action ledger. */
  queuedSteps?: number;
  error?: string;
}

/** Section keys are a union, so the write needs one assertion. The value
 *  itself is schema-validated upstream by the structured-output call. */
function mergeSection(
  kit: StarterKit,
  section: KitSection,
  value: unknown
): StarterKit {
  return { ...kit, [section]: value } as StarterKit;
}

/* ---------- shared primitives ---------- */

function Micro({ children }: { children: ReactNode }) {
  return (
    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
      {children}
    </div>
  );
}

function Block({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="space-y-2">
      <Micro>{label}</Micro>
      <div className="text-[13px] leading-relaxed text-muted">{children}</div>
    </section>
  );
}

const BULLET_TONE: Record<"signal" | "amber" | "rose" | "neutral", string> = {
  signal: "bg-signal",
  amber: "bg-amber",
  rose: "bg-rose",
  neutral: "bg-faint",
};

function Bullets({
  items,
  tone = "neutral",
}: {
  items: string[];
  tone?: "signal" | "amber" | "rose" | "neutral";
}) {
  if (items.length === 0) return null;
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={`${i}-${item.slice(0, 24)}`} className="flex gap-2.5">
          <span
            aria-hidden
            className={`mt-[7px] h-1 w-1 shrink-0 rounded-sm ${BULLET_TONE[tone]}`}
          />
          <span className="text-[13px] leading-relaxed text-muted">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Chip({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "signal" | "amber" | "rose" | "neutral";
}) {
  const tones: Record<"signal" | "amber" | "rose" | "neutral", string> = {
    signal: "border-signal/40 bg-signal/10 text-signal",
    amber: "border-amber/40 bg-amber/10 text-amber",
    rose: "border-rose/40 bg-rose/10 text-rose",
    neutral: "border-line-bright bg-elevated text-muted",
  };
  return (
    <span
      className={`rounded-sm border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

/** Small right-aligned key/value used in dense meta rows. */
function Meta({ label, value }: { label: string; value: string }) {
  return (
    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
      {label} <span className="text-muted">{value}</span>
    </span>
  );
}

function Row({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-md border border-line bg-raised px-4 py-3.5">
      {children}
    </div>
  );
}

/* ---------- per-section renderers ---------- */

function NamesView({ v }: { v: Names }) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Micro>Options</Micro>
        <div className="space-y-2">
          {v.options.map((o, i) => (
            <Row key={`${o.name}-${i}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span className="text-sm font-medium text-chalk">{o.name}</span>
                <span className="font-mono text-[11px] text-ion">
                  {o.domainGuess}
                </span>
              </div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                {o.rationale}
              </p>
              <p className="mt-2 flex gap-2 text-[11px] leading-snug text-faint">
                <span className="shrink-0 font-mono uppercase tracking-[0.14em] text-amber">
                  risk
                </span>
                <span>{o.risk}</span>
              </p>
            </Row>
          ))}
        </div>
      </div>

      <div className="rounded-md border border-signal/30 bg-signal/[0.06] px-4 py-3.5">
        <Micro>Recommendation</Micro>
        <p className="mt-2 text-[13px] leading-relaxed text-chalk">
          {v.recommendation}
        </p>
      </div>
    </div>
  );
}

function PositioningView({ v }: { v: Positioning }) {
  return (
    <div className="space-y-6">
      <div className="rounded-md border border-line bg-raised px-4 py-4">
        <Micro>One-liner</Micro>
        <p className="mt-2 text-base leading-snug text-chalk">{v.oneLiner}</p>
      </div>
      <Block label="Mission">{v.mission}</Block>
      <div className="grid gap-6 sm:grid-cols-2">
        <Block label="Target customer">{v.targetCustomer}</Block>
        <Block label="Customer situation">{v.customerSituation}</Block>
      </div>
      <div className="space-y-2">
        <Micro>Problems solved</Micro>
        <Bullets items={v.problemsSolved} tone="signal" />
      </div>
      <Block label="Differentiator">{v.differentiator}</Block>
      <Block label="Elevator pitch">{v.elevatorPitch}</Block>
    </div>
  );
}

function LegalView({ v }: { v: Legal }) {
  const steps = [...v.steps].sort((a, b) => a.order - b.order);
  return (
    <div className="space-y-6">
      <div className="rounded-md border border-line bg-raised px-4 py-4">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <span className="text-sm font-medium text-chalk">
            {v.recommendedStructure}
          </span>
          <Meta label="est. total" value={v.totalEstimatedCost} />
        </div>
        <p className="mt-2 text-[13px] leading-relaxed text-muted">
          {v.structureRationale}
        </p>
      </div>

      <div className="space-y-2">
        <Micro>Steps</Micro>
        <ol className="space-y-2">
          {steps.map((s, i) => (
            <li key={`${s.order}-${i}`}>
              <Row>
                <div className="flex gap-4">
                  <span className="mt-[2px] shrink-0 font-mono text-xs text-faint">
                    {String(s.order).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium text-chalk">
                        {s.title}
                      </span>
                      {s.humanRequired ? (
                        <Chip tone="amber">needs you</Chip>
                      ) : null}
                    </div>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                      {s.detail}
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1">
                      <Meta label="cost" value={s.estimatedCost} />
                      <Meta label="time" value={s.estimatedTime} />
                      <Meta label="where" value={s.where} />
                    </div>
                  </div>
                </div>
              </Row>
            </li>
          ))}
        </ol>
      </div>

      {v.licensesAndPermits.length > 0 ? (
        <div className="space-y-2">
          <Micro>Licenses &amp; permits</Micro>
          <Bullets items={v.licensesAndPermits} tone="neutral" />
        </div>
      ) : null}

      {v.warnings.length > 0 ? (
        <div className="rounded-md border border-amber/30 bg-amber/[0.06] px-4 py-3.5">
          <Micro>Warnings</Micro>
          <div className="mt-2">
            <Bullets items={v.warnings} tone="amber" />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function BrandView({ v }: { v: Brand }) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Micro>Palette</Micro>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {v.colorPalette.map((c, i) => (
            <div
              key={`${c.hex}-${i}`}
              className="overflow-hidden rounded-md border border-line"
            >
              {/* Generated hex values cannot become Tailwind classes — inline
                  style is the correct escape hatch here. */}
              <div className="h-14 w-full" style={{ backgroundColor: c.hex }} />
              <div className="space-y-1.5 bg-raised px-3 py-2.5">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="truncate text-[13px] font-medium text-chalk">
                    {c.name}
                  </span>
                  <span className="shrink-0 font-mono text-[10px] uppercase text-faint">
                    {c.hex}
                  </span>
                </div>
                <Micro>{c.role}</Micro>
                <p className="text-[11px] leading-snug text-faint">{c.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Row>
          <Micro>Heading</Micro>
          <p className="mt-1.5 text-sm text-chalk">{v.typography.heading}</p>
        </Row>
        <Row>
          <Micro>Body</Micro>
          <p className="mt-1.5 text-sm text-chalk">{v.typography.body}</p>
        </Row>
      </div>
      <p className="text-[13px] leading-relaxed text-muted">
        {v.typography.rationale}
      </p>

      <div className="space-y-3">
        <Micro>Voice</Micro>
        <div className="flex flex-wrap gap-1.5">
          {v.voice.adjectives.map((a, i) => (
            <Chip key={`${a}-${i}`}>{a}</Chip>
          ))}
        </div>
        <p className="text-[13px] leading-relaxed text-muted">
          {v.voice.description}
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Micro>Do say</Micro>
            <Bullets items={v.voice.doSay} tone="signal" />
          </div>
          <div className="space-y-2">
            <Micro>Don&apos;t say</Micro>
            <Bullets items={v.voice.dontSay} tone="rose" />
          </div>
        </div>
      </div>

      <Block label="Logo direction">{v.logoDirection}</Block>

      <div className="space-y-2">
        <Micro>Tagline</Micro>
        <p className="text-base leading-snug text-chalk">{v.tagline}</p>
        {v.taglineAlternates.length > 0 ? (
          <Bullets items={v.taglineAlternates} tone="neutral" />
        ) : null}
      </div>
    </div>
  );
}

function priorityTone(priority: string): "signal" | "amber" | "neutral" {
  const p = priority.toLowerCase();
  if (p.includes("high") || p.includes("first") || p.includes("must")) {
    return "signal";
  }
  if (p.includes("medium") || p.includes("soon")) return "amber";
  return "neutral";
}

function DigitalView({ v }: { v: Digital }) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Micro>Domains</Micro>
        <div className="space-y-2">
          {v.domains.map((d, i) => (
            <Row key={`${d.domain}-${i}`}>
              <div className="font-mono text-[13px] text-ion">{d.domain}</div>
              <p className="mt-1 text-[13px] leading-relaxed text-muted">
                {d.note}
              </p>
            </Row>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Micro>Social handles</Micro>
        <div className="grid gap-2 sm:grid-cols-2">
          {v.socialHandles.map((h, i) => (
            <div
              key={`${h.platform}-${i}`}
              className="flex items-center justify-between gap-3 rounded-md border border-line bg-raised px-3.5 py-2.5"
            >
              <div className="min-w-0">
                <Micro>{h.platform}</Micro>
                <div className="mt-1 truncate font-mono text-[13px] text-chalk">
                  {h.handle}
                </div>
              </div>
              <Chip tone={priorityTone(h.priority)}>{h.priority}</Chip>
            </div>
          ))}
        </div>
      </div>

      <Block label="Email setup">{v.emailSetup}</Block>

      <div className="space-y-2">
        <Micro>Website pages</Micro>
        <div className="space-y-2">
          {v.websitePages.map((p, i) => (
            <Row key={`${p.page}-${i}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span className="text-sm font-medium text-chalk">{p.page}</span>
                <Meta label="cta" value={p.cta} />
              </div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                {p.purpose}
              </p>
              {p.sections.length > 0 ? (
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {p.sections.map((s, j) => (
                    <Chip key={`${s}-${j}`}>{s}</Chip>
                  ))}
                </div>
              ) : null}
            </Row>
          ))}
        </div>
      </div>

      <Block label="Google Business Profile">{v.googleBusinessProfile}</Block>

      <div className="space-y-2">
        <Micro>Tool stack</Micro>
        <div className="overflow-hidden rounded-md border border-line">
          {v.toolStack.map((t, i) => (
            <div
              key={`${t.tool}-${i}`}
              className="flex items-baseline justify-between gap-4 border-t border-line bg-raised px-4 py-2.5 first:border-t-0"
            >
              <div className="min-w-0">
                <span className="text-[13px] font-medium text-chalk">
                  {t.tool}
                </span>
                <span className="ml-2 text-[13px] text-muted">{t.purpose}</span>
              </div>
              <span className="shrink-0 font-mono text-[11px] text-faint">
                {t.cost}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MarketingView({ v }: { v: Marketing }) {
  const channels = [...v.channels].sort((a, b) => a.priority - b.priority);
  const launch = [...v.launchSequence].sort((a, b) => a.week - b.week);

  return (
    <div className="space-y-6">
      <div className="rounded-md border border-line bg-raised px-4 py-4">
        <Micro>Positioning statement</Micro>
        <p className="mt-2 text-[13px] leading-relaxed text-chalk">
          {v.positioningStatement}
        </p>
      </div>

      <div className="space-y-2">
        <Micro>Channels</Micro>
        <div className="space-y-2">
          {channels.map((c, i) => (
            <Row key={`${c.channel}-${i}`}>
              <div className="flex gap-4">
                <span className="mt-[2px] shrink-0 font-mono text-xs text-faint">
                  {String(c.priority).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                    <span className="text-sm font-medium text-chalk">
                      {c.channel}
                    </span>
                    <Meta label="effort" value={c.effort} />
                  </div>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                    {c.why}
                  </p>
                  <p className="mt-2 flex gap-2 text-[13px] leading-relaxed text-chalk">
                    <span className="mt-[3px] shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-signal">
                      first
                    </span>
                    <span>{c.firstAction}</span>
                  </p>
                </div>
              </div>
            </Row>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Micro>Content pillars</Micro>
        <div className="space-y-2">
          {v.contentPillars.map((p, i) => (
            <Row key={`${p.pillar}-${i}`}>
              <span className="text-sm font-medium text-chalk">{p.pillar}</span>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                {p.description}
              </p>
              {p.exampleposts.length > 0 ? (
                <div className="mt-2.5">
                  <Bullets items={p.exampleposts} tone="neutral" />
                </div>
              ) : null}
            </Row>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Micro>Launch sequence</Micro>
        <div className="space-y-2">
          {launch.map((w, i) => (
            <Row key={`${w.week}-${i}`}>
              <div className="flex gap-4">
                <span className="mt-[1px] shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                  wk {w.week}
                </span>
                <div className="min-w-0 flex-1">
                  <span className="text-sm font-medium text-chalk">
                    {w.focus}
                  </span>
                  <div className="mt-2">
                    <Bullets items={w.actions} tone="signal" />
                  </div>
                </div>
              </div>
            </Row>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Micro>First ten customers</Micro>
        <ol className="space-y-1.5">
          {v.firstTenCustomers.map((c, i) => (
            <li key={`${i}-${c.slice(0, 24)}`} className="flex gap-3">
              <span className="mt-[1px] shrink-0 font-mono text-[11px] text-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[13px] leading-relaxed text-muted">{c}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function necessityTone(necessity: string): "signal" | "amber" | "neutral" {
  const n = necessity.toLowerCase();
  if (n.includes("essential") || n.includes("required") || n.includes("must")) {
    return "signal";
  }
  if (n.includes("optional") || n.includes("nice") || n.includes("later")) {
    return "neutral";
  }
  return "amber";
}

function FinancialView({ v }: { v: Financial }) {
  return (
    <div className="space-y-6">
      <Block label="Pricing model">{v.pricingModel}</Block>

      <div className="space-y-2">
        <Micro>Price points</Micro>
        <div className="space-y-2">
          {v.pricePoints.map((p, i) => (
            <Row key={`${p.offer}-${i}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span className="text-sm font-medium text-chalk">{p.offer}</span>
                <span className="font-mono text-sm text-signal">{p.price}</span>
              </div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                {p.rationale}
              </p>
            </Row>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Micro>Startup costs</Micro>
        <div className="overflow-hidden rounded-md border border-line">
          {v.startupCosts.map((c, i) => (
            <div
              key={`${c.item}-${i}`}
              className="flex items-center justify-between gap-4 border-t border-line bg-raised px-4 py-2.5 first:border-t-0"
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="truncate text-[13px] text-chalk">{c.item}</span>
                <Chip tone={necessityTone(c.necessity)}>{c.necessity}</Chip>
              </div>
              <span className="shrink-0 font-mono text-[13px] text-muted">
                {c.cost}
              </span>
            </div>
          ))}
          <div className="flex items-center justify-between gap-4 border-t border-line-bright bg-elevated px-4 py-2.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
              total
            </span>
            <span className="font-mono text-[13px] text-chalk">
              {v.totalStartupCost}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Row>
          <Micro>Monthly overhead</Micro>
          <p className="mt-1.5 font-mono text-sm text-chalk">
            {v.monthlyOverhead}
          </p>
        </Row>
        <Row>
          <Micro>Break-even</Micro>
          <p className="mt-1.5 text-[13px] leading-relaxed text-chalk">
            {v.breakEven}
          </p>
        </Row>
      </div>

      <Block label="Payment processing">{v.paymentProcessing}</Block>
    </div>
  );
}

/** Dispatch on the section key so each view gets its real, narrowed type. */
function SectionBody({
  section,
  kit,
}: {
  section: KitSection;
  kit: StarterKit;
}) {
  switch (section) {
    case "names":
      return kit.names ? <NamesView v={kit.names} /> : null;
    case "positioning":
      return kit.positioning ? <PositioningView v={kit.positioning} /> : null;
    case "legal":
      return kit.legal ? <LegalView v={kit.legal} /> : null;
    case "brand":
      return kit.brand ? <BrandView v={kit.brand} /> : null;
    case "digital":
      return kit.digital ? <DigitalView v={kit.digital} /> : null;
    case "marketing":
      return kit.marketing ? <MarketingView v={kit.marketing} /> : null;
    case "financial":
      return kit.financial ? <FinancialView v={kit.financial} /> : null;
    default:
      return null;
  }
}

/* ---------- panel ---------- */

export default function KitPanel({ project }: KitPanelProps) {
  const [kit, setKit] = useState<StarterKit>(project.kit ?? {});
  const [loading, setLoading] = useState<KitSection | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [bulk, setBulk] = useState(false);
  const [open, setOpen] = useState<KitSection[]>([]);

  const seeded = isSeeded(project.id);

  /* The server no longer owns the project, so the brief travels with
     the request. Older builds predate the brief field — their
     description is the idea. */
  const brief = useMemo<Brief>(
    () =>
      project.brief ?? {
        idea: project.description,
        name: project.name,
        founder: project.founder,
      },
    [project.brief, project.description, project.name, project.founder]
  );

  const readyCount = useMemo(
    () => KIT_SECTIONS.filter((s) => kit[s.key] !== undefined).length,
    [kit]
  );
  const missingCount = KIT_SECTIONS.length - readyCount;
  const busy = loading !== null || bulk;

  function toggle(section: KitSection) {
    setOpen((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  }

  async function runSection(section: KitSection): Promise<boolean> {
    setLoading(section);
    setError(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, brief }),
      });
      const data = (await res.json()) as GenerateResponse;

      if (!res.ok || data.error) {
        setError(data.error ?? `Generation failed (${res.status}).`);
        return false;
      }

      // Write through to the browser store, then mirror it in local
      // state so the section renders without a reload. A no-op for
      // seeded projects, by design.
      saveSection(project.id, section, data.result);
      setKit((prev) => mergeSection(prev, section, data.result));
      setOpen((prev) => (prev.includes(section) ? prev : [...prev, section]));
      return true;
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Could not reach the generator. Check that the server is running."
      );
      return false;
    } finally {
      setLoading(null);
    }
  }

  /** Sequential on purpose — these are long model calls, not a fan-out. */
  async function generateAllMissing() {
    const missing = KIT_SECTIONS.filter((s) => kit[s.key] === undefined).map(
      (s) => s.key
    );
    if (missing.length === 0) return;

    setBulk(true);
    for (const section of missing) {
      const ok = await runSection(section);
      if (!ok) break;
    }
    setBulk(false);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
            Starter Kit
          </h2>
          <p className="mt-2 font-mono text-xs text-muted">
            <span className="text-chalk">{readyCount}</span>
            <span className="text-faint">/{KIT_SECTIONS.length}</span> sections
            generated
          </p>
        </div>

        {missingCount > 0 ? (
          <button
            type="button"
            onClick={generateAllMissing}
            disabled={busy}
            className="rounded-md border border-line-bright px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted transition-colors hover:border-signal hover:text-chalk disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line-bright disabled:hover:text-muted"
          >
            {bulk ? "running…" : `Generate all missing (${missingCount})`}
          </button>
        ) : null}
      </div>

      {error ? (
        <div className="flex items-start gap-4 rounded-md border border-rose/40 bg-rose/[0.08] px-4 py-3">
          <p className="flex-1 text-[13px] leading-relaxed text-rose">{error}</p>
          <button
            type="button"
            onClick={() => setError(null)}
            className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-rose/70 transition-colors hover:text-rose"
          >
            dismiss
          </button>
        </div>
      ) : null}

      <ul className="overflow-hidden rounded-lg border border-line bg-surface">
        {KIT_SECTIONS.map((section) => {
          const ready = kit[section.key] !== undefined;
          const isLoading = loading === section.key;
          const expanded = open.includes(section.key);

          return (
            <li
              key={section.key}
              className="border-t border-line first:border-t-0"
            >
              <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3 px-5 py-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-sm font-medium text-chalk">
                      {section.label}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                      {section.phase}
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] leading-snug text-muted">
                    {section.blurb}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2.5">
                  {isLoading ? (
                    <span className="animate-pulse rounded-md border border-amber/40 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-amber">
                      generating…
                    </span>
                  ) : ready ? (
                    <>
                      <span className="rounded-sm border border-signal/40 bg-signal/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-signal">
                        ready
                      </span>
                      <button
                        type="button"
                        onClick={() => runSection(section.key)}
                        disabled={busy}
                        className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint transition-colors hover:text-amber disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-faint"
                      >
                        redo
                      </button>
                      <button
                        type="button"
                        onClick={() => toggle(section.key)}
                        aria-expanded={expanded}
                        className="rounded-md border border-line-bright px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted transition-colors hover:border-line-bright hover:bg-elevated hover:text-chalk"
                      >
                        {expanded ? "hide" : "view"}
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => runSection(section.key)}
                      disabled={busy}
                      className="rounded-md border border-line-bright px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted transition-colors hover:border-signal hover:text-chalk disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line-bright disabled:hover:text-muted"
                    >
                      Generate
                    </button>
                  )}
                </div>
              </div>

              {ready && expanded ? (
                <div className="border-t border-line bg-ink/40 px-5 py-6">
                  <SectionBody section={section.key} kit={kit} />
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>

      {seeded ? (
        <p className="font-mono text-[11px] text-muted">
          Seeded example &mdash; generated sections show here but are not saved.
        </p>
      ) : null}
    </div>
  );
}
