"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { ActionCategory, AutonomyLevel } from "@/lib/autonomy";

/* ------------------------------------------------------------------
   lib/ledger is server-only (it touches the filesystem), so the wire
   shapes it returns are mirrored here as types rather than imported.
   ------------------------------------------------------------------ */

type ActionState =
  | "executed"
  | "awaiting_review"
  | "reviewed"
  | "awaiting_approval"
  | "approved"
  | "rejected";

interface Action {
  id: string;
  projectId: string;
  projectName: string;
  category: ActionCategory;
  title: string;
  detail: string;
  effect: string;
  cost?: string;
  humanRequired?: boolean;
  state: ActionState;
  level: AutonomyLevel;
  createdAt: string;
  resolvedAt?: string;
  note?: string;
}

interface LedgerStats {
  total: number;
  awaitingApproval: number;
  awaitingReview: number;
  executed: number;
}

type Decision = "approve" | "reject" | "acknowledge";
type Filter = "all" | "approval" | "review";

/* ---------- Static lookup maps (never interpolate Tailwind names) ---------- */

const CATEGORY_LABEL: Record<ActionCategory, string> = {
  generate: "Generate",
  publish: "Publish",
  message: "Message",
  spend: "Spend",
  contract: "Contract",
  file: "File",
};

const CATEGORY_CHIP: Record<ActionCategory, string> = {
  generate: "border-signal/35 bg-signal/10 text-signal",
  publish: "border-ion/35 bg-ion/10 text-ion",
  message: "border-violet/35 bg-violet/10 text-violet",
  spend: "border-amber/35 bg-amber/10 text-amber",
  contract: "border-rose/35 bg-rose/10 text-rose",
  file: "border-amber/35 bg-amber/10 text-amber",
};

const CATEGORY_EDGE: Record<ActionCategory, string> = {
  generate: "border-l-signal",
  publish: "border-l-ion",
  message: "border-l-violet",
  spend: "border-l-amber",
  contract: "border-l-rose",
  file: "border-l-amber",
};

const FILTER_LABEL: Record<Filter, string> = {
  all: "All",
  approval: "Needs approval",
  review: "Flagged",
};

const FILTER_ORDER: Filter[] = ["all", "approval", "review"];

/* ---------- Helpers ---------- */

function formatRelative(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "—";

  const minutes = Math.floor((Date.now() - then) / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}w ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;

  return `${Math.floor(days / 365)}y ago`;
}

const EMPTY_STATS: LedgerStats = {
  total: 0,
  awaitingApproval: 0,
  awaitingReview: 0,
  executed: 0,
};

/* ================================================================== */

export default function ReviewPage() {
  const [actions, setActions] = useState<Action[]>([]);
  const [stats, setStats] = useState<LedgerStats>(EMPTY_STATS);
  const [posture, setPosture] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [resolving, setResolving] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch("/api/actions?scope=pending");
        if (!response.ok) throw new Error(`Could not load the queue (${response.status}).`);

        const data = (await response.json()) as {
          actions?: Action[];
          stats?: LedgerStats;
        };
        if (cancelled) return;

        setActions(data.actions ?? []);
        setStats(data.stats ?? EMPTY_STATS);
      } catch (loadError) {
        if (cancelled) return;
        setError(
          loadError instanceof Error ? loadError.message : "Could not load the queue."
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    // The posture line is context, not a blocker — a failure here is silent.
    async function loadPosture() {
      try {
        const response = await fetch("/api/policy");
        if (!response.ok) return;
        const data = (await response.json()) as { posture?: string };
        if (!cancelled && data.posture) setPosture(data.posture);
      } catch {
        /* leave the fallback copy in place */
      }
    }

    void load();
    void loadPosture();

    return () => {
      cancelled = true;
    };
  }, []);

  const resolve = useCallback(
    async (id: string, decision: Decision) => {
      setResolving(id);
      setError(null);

      try {
        const response = await fetch(`/api/actions/${id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ decision }),
        });

        const data = (await response.json()) as { action?: Action; error?: string };
        if (!response.ok || !data.action) {
          throw new Error(data.error ?? "Could not record that decision.");
        }

        const settled = data.action;

        setActions((current) => current.filter((a) => a.id !== id));
        setStats((current) => ({
          total: current.total,
          awaitingApproval:
            decision === "approve" || decision === "reject"
              ? Math.max(0, current.awaitingApproval - 1)
              : current.awaitingApproval,
          awaitingReview:
            decision === "acknowledge"
              ? Math.max(0, current.awaitingReview - 1)
              : current.awaitingReview,
          executed:
            settled.state === "reviewed" ? current.executed + 1 : current.executed,
        }));
      } catch (resolveError) {
        setError(
          resolveError instanceof Error
            ? resolveError.message
            : "Could not record that decision."
        );
      } finally {
        setResolving(null);
      }
    },
    []
  );

  const approvals = useMemo(
    () => actions.filter((a) => a.state === "awaiting_approval"),
    [actions]
  );
  const flagged = useMemo(
    () => actions.filter((a) => a.state === "awaiting_review"),
    [actions]
  );

  const counts: Record<Filter, number> = {
    all: actions.length,
    approval: approvals.length,
    review: flagged.length,
  };

  const showApprovals = filter === "all" || filter === "approval";
  const showFlagged = filter === "all" || filter === "review";
  const visibleCount =
    (showApprovals ? approvals.length : 0) + (showFlagged ? flagged.length : 0);

  return (
    <div className="min-h-screen bg-ink">
      {/* ---------- Header ---------- */}
      <header className="grid-bg border-b border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="label">Operating Layer</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-chalk">
              Review Queue
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
              Two kinds of things land here: work the platform already did on your
              behalf and flagged for you to look over, and work it will not do until
              you say yes. Nothing on this page is hidden from you, and nothing gated
              runs behind your back.
            </p>
          </div>

          <dl className="flex shrink-0 items-start gap-8 lg:gap-10">
            <div>
              <dd className="font-mono text-2xl leading-none text-amber">
                {stats.awaitingApproval}
              </dd>
              <dt className="label mt-2 block">Awaiting approval</dt>
            </div>
            <div>
              <dd className="font-mono text-2xl leading-none text-ion">
                {stats.awaitingReview}
              </dd>
              <dt className="label mt-2 block">Flagged for review</dt>
            </div>
            <div>
              <dd className="font-mono text-2xl leading-none text-faint">
                {stats.executed}
              </dd>
              <dt className="label mt-2 block">Executed</dt>
            </div>
          </dl>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8">
        {/* ---------- Error ---------- */}
        {error ? (
          <div
            role="alert"
            className="mb-8 flex items-start justify-between gap-4 rounded-lg border border-rose/45 bg-rose/[0.07] p-4"
          >
            <div>
              <p className="label text-rose">Error</p>
              <p className="mt-2 text-sm text-chalk">{error}</p>
            </div>
            <button
              type="button"
              onClick={() => setError(null)}
              className="shrink-0 rounded-md border border-line-bright px-2.5 py-1 font-mono text-[11px] uppercase tracking-widest text-muted transition-colors hover:border-rose hover:text-rose"
            >
              Dismiss
            </button>
          </div>
        ) : null}

        {/* ---------- Filter tabs ---------- */}
        <div className="flex flex-wrap items-center gap-1 border-b border-line pb-4">
          {FILTER_ORDER.map((key) => {
            const active = filter === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                aria-pressed={active}
                className={[
                  "rounded-md px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest transition-colors",
                  active
                    ? "bg-raised text-chalk"
                    : "text-muted hover:bg-surface hover:text-chalk",
                ].join(" ")}
              >
                {FILTER_LABEL[key]}{" "}
                <span className="text-faint">({counts[key]})</span>
              </button>
            );
          })}
        </div>

        {/* ---------- Queue ---------- */}
        {loading ? (
          <div className="mt-8 space-y-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-40 animate-pulse rounded-lg border border-line bg-surface"
              />
            ))}
            <p className="label pt-2">Loading queue …</p>
          </div>
        ) : actions.length === 0 ? (
          <EmptyState posture={posture} />
        ) : (
          <div className="mt-8 space-y-12">
            {showApprovals && approvals.length > 0 ? (
              <section>
                <SectionHeading
                  title="Needs your approval"
                  count={approvals.length}
                  tone="amber"
                  explainer="Nothing here has happened yet. It runs when you approve it."
                />
                <div className="mt-5 space-y-4">
                  {approvals.map((action) => (
                    <ActionCard
                      key={action.id}
                      action={action}
                      resolving={resolving === action.id}
                      disabled={resolving !== null}
                      onResolve={resolve}
                    />
                  ))}
                </div>
              </section>
            ) : null}

            {showFlagged && flagged.length > 0 ? (
              <section>
                <SectionHeading
                  title="Flagged for review"
                  count={flagged.length}
                  tone="ion"
                  explainer="These already ran. Look them over — you can still act on anything that looks wrong."
                />
                <div className="mt-5 space-y-4">
                  {flagged.map((action) => (
                    <ActionCard
                      key={action.id}
                      action={action}
                      resolving={resolving === action.id}
                      disabled={resolving !== null}
                      onResolve={resolve}
                    />
                  ))}
                </div>
              </section>
            ) : null}

            {visibleCount === 0 ? (
              <p className="py-16 text-center font-mono text-xs text-faint">
                Nothing in this filter. {actions.length} item
                {actions.length === 1 ? "" : "s"} waiting under{" "}
                <button
                  type="button"
                  onClick={() => setFilter("all")}
                  className="text-muted underline underline-offset-4 transition-colors hover:text-chalk"
                >
                  All
                </button>
                .
              </p>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

/* ================================================================== */

const SECTION_TONE: Record<"amber" | "ion", string> = {
  amber: "text-amber",
  ion: "text-ion",
};

function SectionHeading({
  title,
  count,
  tone,
  explainer,
}: {
  title: string;
  count: number;
  tone: "amber" | "ion";
  explainer: string;
}) {
  return (
    <div className="border-b border-line pb-4">
      <div className="flex items-baseline gap-3">
        <h2 className="text-lg font-semibold tracking-tight text-chalk">{title}</h2>
        <span className={`font-mono text-xs ${SECTION_TONE[tone]}`}>
          {count.toString().padStart(2, "0")}
        </span>
      </div>
      <p className="mt-1.5 text-sm text-muted">{explainer}</p>
    </div>
  );
}

/* ================================================================== */

function ActionCard({
  action,
  resolving,
  disabled,
  onResolve,
}: {
  action: Action;
  resolving: boolean;
  disabled: boolean;
  onResolve: (id: string, decision: Decision) => void;
}) {
  const needsApproval = action.state === "awaiting_approval";

  return (
    <article
      aria-busy={resolving}
      className={[
        "rounded-lg border border-line border-l-2 bg-surface p-5 transition-colors",
        CATEGORY_EDGE[action.category],
        resolving ? "opacity-60" : "",
      ].join(" ")}
    >
      {/* Top row */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className={`chip ${CATEGORY_CHIP[action.category]}`}>
          {CATEGORY_LABEL[action.category]}
        </span>
        <span className="font-mono text-xs text-muted">{action.projectName}</span>
        <span aria-hidden className="text-faint">
          ·
        </span>
        <time
          dateTime={action.createdAt}
          className="font-mono text-xs text-faint"
          suppressHydrationWarning
        >
          {formatRelative(action.createdAt)}
        </time>
        {action.cost ? (
          <span className="chip ml-auto border-amber/40 bg-amber/10 text-amber">
            {action.cost}
          </span>
        ) : null}
      </div>

      {/* Body */}
      <h3 className="mt-4 text-base font-semibold text-chalk">{action.title}</h3>
      {action.detail ? (
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{action.detail}</p>
      ) : null}

      {/* Effect */}
      {action.effect ? (
        <div className="mt-4 rounded-md border border-line bg-elevated p-3">
          <p className="label">What changes</p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-chalk">
            {action.effect}
          </p>
        </div>
      ) : null}

      {/* Human-required callout */}
      {action.humanRequired ? (
        <div className="mt-4 rounded-md border border-amber/50 bg-amber/[0.07] p-3">
          <p className="label text-amber">Requires you personally</p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-chalk">
            This needs a signature, an SSN/ITIN, or ID verification. The platform
            prepares it; you complete it. Approving here means the paperwork gets
            staged for you — it does not file anything in your name.
          </p>
        </div>
      ) : null}

      {/* Actions */}
      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-line pt-4">
        {needsApproval ? (
          <>
            <button
              type="button"
              disabled={disabled}
              onClick={() => onResolve(action.id, "approve")}
              className="rounded-md bg-signal px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-ink transition-colors hover:bg-signal-dim disabled:cursor-not-allowed disabled:opacity-50"
            >
              Approve
            </button>
            <button
              type="button"
              disabled={disabled}
              onClick={() => onResolve(action.id, "reject")}
              className="rounded-md border border-line-bright px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-muted transition-colors hover:border-rose hover:text-rose disabled:cursor-not-allowed disabled:opacity-50"
            >
              Reject
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              disabled={disabled}
              onClick={() => onResolve(action.id, "acknowledge")}
              className="rounded-md border border-line-bright px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-muted transition-colors hover:border-ion hover:text-ion disabled:cursor-not-allowed disabled:opacity-50"
            >
              Mark reviewed
            </button>
            <span className="font-mono text-[11px] text-faint">
              Already ran — marking it reviewed only clears it from this queue.
            </span>
          </>
        )}

        {resolving ? (
          <span className="ml-auto font-mono text-[11px] uppercase tracking-widest text-faint">
            Working …
          </span>
        ) : null}
      </div>
    </article>
  );
}

/* ================================================================== */

function EmptyState({ posture }: { posture: string | null }) {
  return (
    <div className="flex flex-col items-center px-5 py-24 text-center">
      <p className="label">Queue clear</p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-signal">
        Nothing waiting on you
      </h2>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
        {posture
          ? `Current posture — ${posture}. Everything else runs on its own and lands in the ledger, not here.`
          : "Everything inside your current posture runs on its own and lands in the ledger, not here. Only gated or flagged work interrupts you."}
      </p>
      <Link
        href="/settings"
        className="mt-6 rounded-md border border-line-bright px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-muted transition-colors hover:border-signal hover:text-signal"
      >
        Change what gets gated
      </Link>
    </div>
  );
}
