"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------
   The factory queue board — the operating station.

   lib/factory/tickets is server-only (fs + fetch), so its wire shapes
   are mirrored here as types and everything comes from /api/tickets.
   ------------------------------------------------------------------ */

type TicketState =
  | "queued"
  | "claimed"
  | "in_progress"
  | "review"
  | "approved"
  | "done"
  | "blocked"
  | "changes_requested"
  | "failed"
  | "cancelled";

type Phase = "concept" | "formation" | "identity" | "digital" | "operations" | "growth";
type Gate = "spend" | "contract" | "file" | "publish" | null;
type BudgetTier = "cheap" | "mid" | "judge" | "code";

interface TicketResult {
  commitSha?: string;
  previewUrl?: string;
  notes?: string;
  artifacts: string[];
}

interface Ticket {
  id: string;
  projectId: string;
  agent: string;
  phase: Phase;
  title: string;
  brief: string;
  dependsOn: string[];
  gate: Gate;
  budgetTier: BudgetTier;
  estUSD: number;
  state: TicketState;
  result?: TicketResult;
  createdAt: string;
  updatedAt: string;
}

interface Board {
  queued: Ticket[];
  active: Ticket[];
  review: Ticket[];
  blocked: Ticket[];
  changesRequested: Ticket[];
  done: Ticket[];
  closed: Ticket[];
}

interface Stats {
  total: number;
  building: number;
  held: number;
  blocked: number;
  done: number;
}

interface BoardResponse {
  tickets: Ticket[];
  board: Board;
  stats: Stats;
  writable: boolean;
}

const PHASES: Phase[] = ["concept", "formation", "identity", "digital", "operations", "growth"];
const AGENTS = [
  "business-identifier",
  "creative-director",
  "copywriter",
  "art-director",
  "website-developer",
  "devils-advocate",
  "judging-council",
  "market-researcher",
  "factory-runner",
];
const BUDGET_TIERS: BudgetTier[] = ["cheap", "mid", "judge", "code"];

/* Explicit lookup maps — never interpolate Tailwind class names. */
const PHASE_ACCENT: Record<Phase, string> = {
  concept: "border-l-ion",
  formation: "border-l-amber",
  identity: "border-l-violet",
  digital: "border-l-signal",
  operations: "border-l-rose",
  growth: "border-l-chalk",
};

const PHASE_TEXT: Record<Phase, string> = {
  concept: "text-ion",
  formation: "text-amber",
  identity: "text-violet",
  digital: "text-signal",
  operations: "text-rose",
  growth: "text-chalk",
};

function formatRelative(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const s = Math.max(0, Math.floor((Date.now() - then) / 1000));
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

/* ------------------------------------------------------------------ */

export default function FactoryPage() {
  const [data, setData] = useState<BoardResponse | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [reconnecting, setReconnecting] = useState(false);
  const [resolving, setResolving] = useState<string | null>(null);
  const [cardError, setCardError] = useState<Record<string, string>>({});
  const [showNew, setShowNew] = useState(false);
  const lastGood = useRef<BoardResponse | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/tickets", { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      const json = (await res.json()) as BoardResponse;
      lastGood.current = json;
      setData(json);
      setReconnecting(false);
    } catch {
      // Keep the last good board; just flag the hiccup.
      if (lastGood.current) setReconnecting(true);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    load();
    const t = setInterval(load, 20000);
    return () => clearInterval(t);
  }, [load]);

  const transition = useCallback(
    async (id: string, to: TicketState) => {
      setResolving(id);
      setCardError((e) => {
        const next = { ...e };
        delete next[id];
        return next;
      });
      try {
        const res = await fetch(`/api/tickets/${id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ to }),
        });
        const json = await res.json();
        if (!res.ok) {
          setCardError((e) => ({ ...e, [id]: json.error ?? "Could not update." }));
          return false;
        }
        return true;
      } catch (err) {
        setCardError((e) => ({
          ...e,
          [id]: err instanceof Error ? err.message : "Network error.",
        }));
        return false;
      } finally {
        setResolving(null);
      }
    },
    []
  );

  // Approve = review → approved → done, two legal steps.
  const approve = useCallback(
    async (id: string) => {
      const ok = await transition(id, "approved");
      if (ok) await transition(id, "done");
      await load();
    },
    [transition, load]
  );

  const move = useCallback(
    async (id: string, to: TicketState) => {
      const ok = await transition(id, to);
      if (ok) await load();
    },
    [transition, load]
  );

  const stats = data?.stats;
  const board = data?.board;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="grid-bg border-b border-line py-12">
        <div className="mx-auto max-w-7xl px-5">
          <p className="label">Factory</p>
          <h1 className="mt-2 font-sans text-4xl font-semibold tracking-tight text-chalk">
            Build Queue
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-muted">
            Units of work moving from queued to held-for-review. Agents claim and build them;
            some pause on an approval gate until you clear it.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-4">
            <StatTile label="Building" value={stats?.building} tone="text-chalk" hydrated={hydrated} />
            <StatTile label="Held for review" value={stats?.held} tone="text-ion" hydrated={hydrated} />
            <StatTile label="Blocked" value={stats?.blocked} tone="text-amber" hydrated={hydrated} />
            <StatTile label="Done" value={stats?.done} tone="text-signal" hydrated={hydrated} />
          </div>

          <div className="mt-4 flex items-center gap-3">
            {data && !data.writable && (
              <span className="chip border-amber/40 text-amber">
                read-only — set FACTORY_GITHUB_TOKEN to persist
              </span>
            )}
            {reconnecting && <span className="font-mono text-[11px] text-faint">reconnecting…</span>}
            <button
              onClick={() => setShowNew((v) => !v)}
              className="ml-auto rounded-md border border-line-bright px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-muted transition-colors hover:border-signal/60 hover:text-chalk"
            >
              {showNew ? "Close" : "+ New ticket"}
            </button>
          </div>

          {showNew && (
            <NewTicketForm
              onCreated={async () => {
                setShowNew(false);
                await load();
              }}
            />
          )}
        </div>
      </section>

      {/* Board */}
      <section className="mx-auto max-w-7xl px-5 py-10">
        {!hydrated ? (
          <BoardSkeleton />
        ) : !board || stats?.total === 0 ? (
          <EmptyState onNew={() => setShowNew(true)} />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
            <Column title="Queued" tickets={board.queued} />
            <Column title="Active" tickets={board.active} />
            <Column
              title="Held"
              tickets={board.review}
              renderActions={(t) =>
                (t.state === "review" || t.state === "approved") && (
                  <CardActions error={cardError[t.id]} busy={resolving === t.id}>
                    <button
                      onClick={() => approve(t.id)}
                      disabled={resolving === t.id}
                      className="rounded-md bg-signal px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-ink transition-opacity disabled:opacity-50"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => move(t.id, "changes_requested")}
                      disabled={resolving === t.id}
                      className="rounded-md border border-line-bright px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-muted transition-colors hover:border-amber hover:text-amber disabled:opacity-50"
                    >
                      Changes
                    </button>
                  </CardActions>
                )
              }
            />
            <Column
              title="Blocked"
              tickets={board.blocked}
              renderActions={(t) => (
                <CardActions error={cardError[t.id]} busy={resolving === t.id}>
                  <Link
                    href="/review"
                    className="font-mono text-[11px] text-amber underline-offset-2 hover:underline"
                  >
                    waiting on a gate → /review
                  </Link>
                  <button
                    onClick={() => move(t.id, "queued")}
                    disabled={resolving === t.id}
                    className="rounded-md border border-line-bright px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-muted transition-colors hover:border-signal hover:text-signal disabled:opacity-50"
                  >
                    Re-queue
                  </button>
                </CardActions>
              )}
            />
            <Column
              title="Changes"
              tickets={board.changesRequested}
              renderActions={(t) => (
                <CardActions error={cardError[t.id]} busy={resolving === t.id}>
                  <button
                    onClick={() => move(t.id, "in_progress")}
                    disabled={resolving === t.id}
                    className="rounded-md border border-line-bright px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-muted transition-colors hover:border-chalk hover:text-chalk disabled:opacity-50"
                  >
                    Back to work
                  </button>
                </CardActions>
              )}
            />
            <Column title="Done" tickets={board.done} />
          </div>
        )}
      </section>
    </div>
  );
}

/* ---------- Pieces ---------- */

function StatTile({
  label,
  value,
  tone,
  hydrated,
}: {
  label: string;
  value: number | undefined;
  tone: string;
  hydrated: boolean;
}) {
  return (
    <div className="bg-surface px-4 py-5">
      <p className={`font-mono text-2xl font-semibold leading-none ${tone}`}>
        {hydrated && value !== undefined ? value : "—"}
      </p>
      <p className="label mt-2">{label}</p>
    </div>
  );
}

function Column({
  title,
  tickets,
  renderActions,
}: {
  title: string;
  tickets: Ticket[];
  renderActions?: (t: Ticket) => React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <div className="mb-3 flex items-baseline gap-2">
        <span className="label">{title}</span>
        <span className="font-mono text-xs text-faint">{tickets.length}</span>
      </div>
      <div className="flex max-h-[70vh] flex-col gap-3 overflow-y-auto pr-1">
        {tickets.map((t) => (
          <TicketCard key={t.id} ticket={t} actions={renderActions?.(t)} />
        ))}
      </div>
    </div>
  );
}

function TicketCard({ ticket: t, actions }: { ticket: Ticket; actions?: React.ReactNode }) {
  return (
    <div className={`rounded-lg border border-line border-l-2 bg-surface p-4 ${PHASE_ACCENT[t.phase]}`}>
      <div className="flex items-center gap-2">
        <span className={`chip border-line ${PHASE_TEXT[t.phase]}`}>{t.phase}</span>
        <span className="truncate font-mono text-[11px] text-faint">{t.agent}</span>
        <span className="ml-auto shrink-0 font-mono text-[10px] text-faint">
          {formatRelative(t.updatedAt)}
        </span>
      </div>
      <p className="mt-2 text-sm font-semibold text-chalk">{t.title}</p>
      {t.brief && <p className="mt-1 line-clamp-2 text-xs text-muted">{t.brief}</p>}
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        {t.gate && <span className="chip border-amber/40 text-amber">{t.gate}</span>}
        <span className="chip border-line text-faint">{t.budgetTier}</span>
        {t.estUSD > 0 && <span className="chip border-line text-faint">${t.estUSD}</span>}
      </div>
      {t.dependsOn.length > 0 && (
        <p className="mt-2 font-mono text-[10px] text-faint">depends on {t.dependsOn.length}</p>
      )}
      {t.result?.previewUrl && (t.state === "review" || t.state === "approved" || t.state === "done") && (
        <a
          href={t.result.previewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block font-mono text-[11px] text-ion hover:underline"
        >
          Preview ↗
        </a>
      )}
      {actions}
    </div>
  );
}

function CardActions({
  children,
  error,
  busy,
}: {
  children: React.ReactNode;
  error?: string;
  busy: boolean;
}) {
  return (
    <div className="mt-3 border-t border-line pt-3">
      <div className="flex flex-wrap items-center gap-2">{children}</div>
      {busy && <p className="mt-2 font-mono text-[10px] text-faint">working…</p>}
      {error && <p className="mt-2 text-[11px] text-rose">{error}</p>}
    </div>
  );
}

function BoardSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
      {[0, 1, 2, 3, 4, 5].map((c) => (
        <div key={c} className="flex flex-col gap-3">
          <div className="h-3 w-16 animate-pulse rounded bg-surface" />
          {[0, 1].map((i) => (
            <div key={i} className="h-28 animate-pulse rounded-lg border border-line bg-surface opacity-60" />
          ))}
        </div>
      ))}
    </div>
  );
}

function EmptyState({ onNew }: { onNew: () => void }) {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-dashed border-line-bright bg-surface/40 px-6 py-12 text-center">
      <p className="font-sans text-lg font-semibold text-chalk">The queue is empty</p>
      <p className="mt-2 text-sm text-muted">
        It fills as work is queued — a brief becomes a ticket, an agent claims it and builds,
        and it lands here held for your review.
      </p>
      <button
        onClick={onNew}
        className="mt-6 rounded-md bg-signal px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-ink"
      >
        + New ticket
      </button>
    </div>
  );
}

function NewTicketForm({ onCreated }: { onCreated: () => void }) {
  const [form, setForm] = useState({
    projectId: "",
    agent: AGENTS[0],
    phase: "concept" as Phase,
    title: "",
    brief: "",
    gate: "none",
    budgetTier: "mid" as BudgetTier,
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async () => {
    if (!form.projectId.trim() || !form.title.trim()) {
      setError("Project id and title are required.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: form.projectId.trim(),
          agent: form.agent,
          phase: form.phase,
          title: form.title.trim(),
          brief: form.brief.trim(),
          gate: form.gate === "none" ? null : form.gate,
          budgetTier: form.budgetTier,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Could not queue the ticket.");
        return;
      }
      onCreated();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error.");
    } finally {
      setBusy(false);
    }
  };

  const field = "w-full rounded-md border border-line bg-elevated px-3 py-2 font-mono text-xs text-chalk focus:border-ion focus:outline-none";

  return (
    <div className="mt-5 rounded-lg border border-line bg-surface p-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="label">Project id</label>
          <input className={`mt-1 ${field}`} value={form.projectId} onChange={(e) => set("projectId", e.target.value)} placeholder="acme-dog-walking" />
        </div>
        <div>
          <label className="label">Title</label>
          <input className={`mt-1 ${field}`} value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Define the business" />
        </div>
        <div>
          <label className="label">Agent</label>
          <select className={`mt-1 ${field}`} value={form.agent} onChange={(e) => set("agent", e.target.value)}>
            {AGENTS.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Phase</label>
          <select className={`mt-1 ${field}`} value={form.phase} onChange={(e) => set("phase", e.target.value)}>
            {PHASES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Gate</label>
          <select className={`mt-1 ${field}`} value={form.gate} onChange={(e) => set("gate", e.target.value)}>
            {["none", "spend", "file", "contract", "publish"].map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Budget tier</label>
          <select className={`mt-1 ${field}`} value={form.budgetTier} onChange={(e) => set("budgetTier", e.target.value)}>
            {BUDGET_TIERS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-3">
        <label className="label">Brief</label>
        <textarea
          className={`mt-1 ${field} resize-none`}
          rows={3}
          value={form.brief}
          onChange={(e) => set("brief", e.target.value)}
          placeholder="What this ticket is for."
        />
      </div>
      {error && <p className="mt-3 text-xs text-rose">{error}</p>}
      <button
        onClick={submit}
        disabled={busy}
        className="mt-4 rounded-md bg-signal px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-ink transition-opacity disabled:opacity-50"
      >
        {busy ? "Queuing…" : "Queue ticket"}
      </button>
    </div>
  );
}
