"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Opportunity, OpportunityScan } from "@/lib/schemas";

/* ============================================================
   OPPORTUNITY SCANNER — Phase 2

   The rest of this console waits for someone to walk in with an
   idea. This screen goes looking instead: it runs live web
   research server-side and comes back with evidenced gaps,
   scored and ranked.

   Everything it returns is a lead, not a verified business. The
   copy on this page says so out loud, on purpose.
   ============================================================ */

const DEFAULT_REGION = "South Carolina and the Southeast";
const DEFAULT_COUNT = 6;
const COUNT_OPTIONS = [4, 6, 8] as const;

const SECTOR_SUGGESTIONS = [
  "home services",
  "food and beverage",
  "professional services",
];

/* ---------- Scope ---------- */

type Scope = "local" | "general" | "both";

interface ScopeOption {
  value: Scope;
  label: string;
}

const SCOPE_OPTIONS: ScopeOption[] = [
  { value: "local", label: "Local" },
  { value: "general", label: "General" },
  { value: "both", label: "Both" },
];

const DEFAULT_SCOPE: Scope = "both";

/** The bias sentence we prepend to constraints so the scan endpoint reacts
 *  even though it does not read an unknown `scope` field. */
const SCOPE_BIAS: Record<Scope, string> = {
  local: "Focus on local, place-specific openings. ",
  general: "Focus on general patterns that work in many markets. ",
  both: "",
};

/** Explicit lookup — never interpolate Tailwind class names. */
const SCOPE_CHIP_CLASS: Record<Scope, string> = {
  local: "border-line bg-raised text-ion",
  general: "border-line bg-raised text-violet",
  both: "border-line bg-raised text-muted",
};

/* ---------- Watchlist ---------- */

interface WatchEntry {
  id: string;
  sector: string;
  region: string;
  constraints: string;
  scope: Scope;
  note: string;
  active: boolean;
  createdAt: string;
  lastScannedAt?: string;
  lastTopScore?: number;
  lastCount?: number;
}

/* ---------- Score bars ---------- */

interface ScoreSpec {
  key: keyof Opportunity["scores"];
  label: string;
}

const SCORE_SPECS: ScoreSpec[] = [
  { key: "demand", label: "Demand" },
  { key: "feasibility", label: "Feasibility" },
  { key: "margin", label: "Margin" },
  { key: "defensibility", label: "Defensibility" },
  { key: "speedToLaunch", label: "Speed to launch" },
];

/* ---------- Helpers ---------- */

function messageOf(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "The scan failed and gave no reason.";
}

/** Scores are 0–10 from the model; never trust them enough to blow out a bar. */
function clampScore(value: number): number {
  if (!Number.isFinite(value)) return 0;
  if (value < 0) return 0;
  if (value > 10) return 10;
  return value;
}

/** 8.4 stays 8.4, 8 stays 8 — no trailing ".0" noise in a dense view. */
function formatScore(value: number): string {
  const safe = clampScore(value);
  return Number.isInteger(safe) ? String(safe) : safe.toFixed(1);
}

/** Band the composite score. Written out literally — Tailwind can't see interpolation. */
function scoreBandClass(value: number): string {
  const safe = clampScore(value);
  if (safe >= 8) return "text-signal";
  if (safe >= 6) return "text-amber";
  return "text-faint";
}

/** Compact "how long ago" for a watchlist timestamp. Never throws on junk input. */
function formatRelative(iso: string): string {
  const then = Date.parse(iso);
  if (!Number.isFinite(then)) return "unknown";
  const seconds = Math.round((Date.now() - then) / 1000);
  if (seconds < 45) return "just now";
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.round(days / 30);
  if (months < 12) return `${months}mo ago`;
  const years = Math.round(months / 12);
  return `${years}y ago`;
}

/** Normalize an unknown scope value from the API into our union. */
function toScope(value: unknown): Scope {
  return value === "local" || value === "general" || value === "both"
    ? value
    : "both";
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function OpportunitiesPage() {
  const [sector, setSector] = useState("");
  const [region, setRegion] = useState(DEFAULT_REGION);
  const [constraints, setConstraints] = useState("");
  const [scope, setScope] = useState<Scope>(DEFAULT_SCOPE);
  const [count, setCount] = useState<number>(DEFAULT_COUNT);
  const [loading, setLoading] = useState(false);
  const [scan, setScan] = useState<OpportunityScan | null>(null);
  const [error, setError] = useState<string | null>(null);

  /* ---- Watchlist ---- */
  const [watchEntries, setWatchEntries] = useState<WatchEntry[]>([]);
  const [watchWritable, setWatchWritable] = useState(true);
  const [watchLoading, setWatchLoading] = useState(true);
  const [watchError, setWatchError] = useState<string | null>(null);
  const [watchAdding, setWatchAdding] = useState(false);
  /** ids of rows with an in-flight pause/resume/remove. */
  const [rowBusy, setRowBusy] = useState<Record<string, boolean>>({});

  /** Highest composite first, so the rank number means something. */
  const ranked = useMemo<Opportunity[]>(() => {
    if (!scan) return [];
    return [...scan.opportunities].sort(
      (a, b) => clampScore(b.compositeScore) - clampScore(a.compositeScore),
    );
  }, [scan]);

  const runScan = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      // Bias the scan toward the chosen scope. We prepend a sentence to the
      // constraints string (which the endpoint definitely reads) AND pass a
      // dedicated `scope` field, so it works whether or not the endpoint
      // learns to read `scope`.
      const biasedConstraints = `${SCOPE_BIAS[scope]}${constraints.trim()}`.trim();

      const response = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sector: sector.trim(),
          region: region.trim(),
          constraints: biasedConstraints,
          scope,
          count,
        }),
      });

      let data: unknown = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        // The API returns real, actionable errors. Say exactly what it said.
        const serverError = (data as { error?: unknown } | null)?.error;
        throw new Error(
          typeof serverError === "string" && serverError.trim().length > 0
            ? serverError
            : `The scan failed (${response.status} ${response.statusText}).`,
        );
      }

      const result = (data as { scan?: OpportunityScan } | null)?.scan;
      if (!result) {
        throw new Error("The scan returned no results.");
      }

      setScan(result);
    } catch (err) {
      setError(messageOf(err));
      setScan(null);
    } finally {
      setLoading(false);
    }
  }, [loading, sector, region, constraints, scope, count]);

  /* ---------------- Watchlist wiring ---------------- */

  const loadWatchlist = useCallback(async () => {
    setWatchLoading(true);
    setWatchError(null);
    try {
      const response = await fetch("/api/watchlist", { cache: "no-store" });
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
            : `Could not load the watchlist (${response.status} ${response.statusText}).`,
        );
      }
      const rawEntries = (data as { entries?: unknown } | null)?.entries;
      const entries = Array.isArray(rawEntries)
        ? rawEntries.map((raw): WatchEntry => {
            const e = raw as Record<string, unknown>;
            return {
              id: String(e.id ?? ""),
              sector: typeof e.sector === "string" ? e.sector : "",
              region: typeof e.region === "string" ? e.region : "",
              constraints: typeof e.constraints === "string" ? e.constraints : "",
              scope: toScope(e.scope),
              note: typeof e.note === "string" ? e.note : "",
              active: e.active !== false,
              createdAt: typeof e.createdAt === "string" ? e.createdAt : "",
              lastScannedAt:
                typeof e.lastScannedAt === "string" ? e.lastScannedAt : undefined,
              lastTopScore:
                typeof e.lastTopScore === "number" ? e.lastTopScore : undefined,
              lastCount: typeof e.lastCount === "number" ? e.lastCount : undefined,
            };
          })
        : [];
      setWatchEntries(entries);
      const writable = (data as { writable?: unknown } | null)?.writable;
      setWatchWritable(writable !== false);
    } catch (err) {
      setWatchError(messageOf(err));
    } finally {
      setWatchLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadWatchlist();
  }, [loadWatchlist]);

  const canWatch = sector.trim().length > 0 || region.trim().length > 0;

  const watchThisSearch = useCallback(async () => {
    if (watchAdding || !canWatch) return;
    setWatchAdding(true);
    setWatchError(null);
    try {
      const response = await fetch("/api/watchlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sector: sector.trim(),
          region: region.trim(),
          constraints: constraints.trim(),
          scope,
        }),
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
            : `Could not add the watch (${response.status} ${response.statusText}).`,
        );
      }
      await loadWatchlist();
    } catch (err) {
      setWatchError(messageOf(err));
    } finally {
      setWatchAdding(false);
    }
  }, [watchAdding, canWatch, sector, region, constraints, scope, loadWatchlist]);

  const setRowBusyFor = useCallback((id: string, busy: boolean) => {
    setRowBusy((prev) => ({ ...prev, [id]: busy }));
  }, []);

  const toggleWatchActive = useCallback(
    async (entry: WatchEntry) => {
      if (rowBusy[entry.id]) return;
      setRowBusyFor(entry.id, true);
      setWatchError(null);
      try {
        const response = await fetch("/api/watchlist", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: entry.id, active: !entry.active }),
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
              : `Could not update the watch (${response.status} ${response.statusText}).`,
          );
        }
        await loadWatchlist();
      } catch (err) {
        setWatchError(messageOf(err));
      } finally {
        setRowBusyFor(entry.id, false);
      }
    },
    [rowBusy, setRowBusyFor, loadWatchlist],
  );

  const removeWatch = useCallback(
    async (id: string) => {
      if (rowBusy[id]) return;
      setRowBusyFor(id, true);
      setWatchError(null);
      try {
        const response = await fetch(
          `/api/watchlist?id=${encodeURIComponent(id)}`,
          { method: "DELETE" },
        );
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
              : `Could not remove the watch (${response.status} ${response.statusText}).`,
          );
        }
        await loadWatchlist();
      } catch (err) {
        setWatchError(messageOf(err));
      } finally {
        setRowBusyFor(id, false);
      }
    },
    [rowBusy, setRowBusyFor, loadWatchlist],
  );

  const showEmptyState = !loading && !scan && !error;

  return (
    <div className="pb-24">
      {/* ---------- Header ---------- */}
      <header className="grid-bg border-b border-line py-12">
        <div className="mx-auto max-w-5xl px-5">
          <p className="label">Signal</p>
          <h1 className="mt-3 font-sans text-4xl font-semibold tracking-tight md:text-5xl">
            Opportunity Engine
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
            Searches live sources for market gaps that have evidence behind them
            — demand people are already voicing, supply that has not shown up
            yet — then scores each one on demand, feasibility, margin,
            defensibility, and speed to launch.{" "}
            <span className="text-chalk">
              What comes back is a set of leads to investigate, not verified
              businesses.
            </span>{" "}
            Every score is a model&rsquo;s read of what it found. Check the
            evidence before you spend a dollar on any of it.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5">
        {/* ---------- Control bar ---------- */}
        <form
          className="mt-10 rounded-lg border border-line bg-surface p-5"
          onSubmit={(event) => {
            event.preventDefault();
            void runScan();
          }}
        >
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label htmlFor="sector" className="label block">
                Sector
              </label>
              <input
                id="sector"
                name="sector"
                type="text"
                autoComplete="off"
                value={sector}
                onChange={(event) => setSector(event.target.value)}
                placeholder="home services, food, professional services… or leave blank"
                className="mt-2 w-full rounded-md border border-line bg-ink px-3 py-2 font-mono text-[13px] leading-tight text-chalk transition-colors placeholder:text-faint hover:border-line-bright focus:border-line-bright"
              />
            </div>

            <div>
              <label htmlFor="region" className="label block">
                Region
              </label>
              <input
                id="region"
                name="region"
                type="text"
                autoComplete="off"
                value={region}
                onChange={(event) => setRegion(event.target.value)}
                placeholder={DEFAULT_REGION}
                className="mt-2 w-full rounded-md border border-line bg-ink px-3 py-2 font-mono text-[13px] leading-tight text-chalk transition-colors placeholder:text-faint hover:border-line-bright focus:border-line-bright"
              />
            </div>

            <div>
              <label htmlFor="constraints" className="label block">
                Constraints
              </label>
              <input
                id="constraints"
                name="constraints"
                type="text"
                autoComplete="off"
                value={constraints}
                onChange={(event) => setConstraints(event.target.value)}
                placeholder="under $5k startup, no inventory, solo-operable"
                className="mt-2 w-full rounded-md border border-line bg-ink px-3 py-2 font-mono text-[13px] leading-tight text-chalk transition-colors placeholder:text-faint hover:border-line-bright focus:border-line-bright"
              />
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-wrap items-end gap-6">
              <div>
                <span className="label block" id="scope-label">
                  Scope
                </span>
                <div
                  role="radiogroup"
                  aria-labelledby="scope-label"
                  className="mt-2 inline-flex rounded-md bg-elevated p-1"
                >
                  {SCOPE_OPTIONS.map((option) => {
                    const selected = scope === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => setScope(option.value)}
                        className={[
                          "relative rounded px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest transition-colors",
                          selected
                            ? "bg-raised text-chalk"
                            : "text-muted hover:text-chalk",
                        ].join(" ")}
                      >
                        {option.label}
                        {selected ? (
                          <span className="absolute inset-x-2 -bottom-px h-px bg-ion" />
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label htmlFor="count" className="label block">
                  Return
                </label>
                <select
                  id="count"
                  name="count"
                  value={count}
                  onChange={(event) => setCount(Number(event.target.value))}
                  className="mt-2 w-28 rounded-md border border-line bg-ink px-3 py-2 font-mono text-[13px] leading-tight text-chalk transition-colors hover:border-line-bright focus:border-line-bright"
                >
                  {COUNT_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option} leads
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className="rounded-md bg-ion px-6 py-3 font-mono text-xs uppercase tracking-widest text-ink transition-colors hover:bg-ion/90 disabled:cursor-not-allowed disabled:bg-elevated disabled:text-faint sm:min-w-[13rem]"
            >
              {loading ? "scanning…" : "Run scan"}
            </button>
          </div>
        </form>

        {/* ---------- Watchlist ---------- */}
        <WatchlistPanel
          entries={watchEntries}
          writable={watchWritable}
          loading={watchLoading}
          error={watchError}
          canWatch={canWatch}
          adding={watchAdding}
          rowBusy={rowBusy}
          onWatch={watchThisSearch}
          onToggle={toggleWatchActive}
          onRemove={removeWatch}
        />

        {/* ---------- Error ---------- */}
        {error ? (
          <div className="mt-8 rounded-lg border border-line border-l-2 border-l-rose bg-surface p-5">
            <p className="label text-rose">Scan failed</p>
            <p className="mt-2 font-mono text-xs leading-relaxed text-muted">
              {error}
            </p>
          </div>
        ) : null}

        {/* ---------- Loading ---------- */}
        {loading ? <ScanSkeleton count={count} /> : null}

        {/* ---------- Empty ---------- */}
        {showEmptyState ? (
          <EmptyState onPickSector={(value) => setSector(value)} />
        ) : null}

        {/* ---------- Results ---------- */}
        {!loading && scan ? (
          <section className="mt-12" aria-label="Scan results">
            <div className="border-l-2 border-ion pl-4">
              <p className="label">Scan summary</p>
              <p className="mt-2 text-sm leading-relaxed text-chalk">
                {scan.scanSummary}
              </p>
            </div>

            {scan.marketContext ? (
              <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">
                {scan.marketContext}
              </p>
            ) : null}

            <div className="mt-4 flex items-baseline gap-3">
              <span className="label">Ranked leads</span>
              <span className="font-mono text-[11px] tabular-nums text-faint">
                {ranked.length}
              </span>
            </div>

            <div className="mt-4 space-y-6">
              {ranked.map((opportunity, index) => (
                <OpportunityCard
                  key={`${opportunity.title}-${index}`}
                  rank={index + 1}
                  opportunity={opportunity}
                />
              ))}
            </div>

            {scan.sourcesConsulted.length > 0 ? (
              <div className="mt-12 border-t border-line pt-6">
                <p className="label">Sources consulted</p>
                <ul className="mt-3 space-y-1.5">
                  {scan.sourcesConsulted.map((source, index) => (
                    <li
                      key={`${source}-${index}`}
                      className="break-words font-mono text-[11px] leading-relaxed text-faint"
                    >
                      {source}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>
        ) : null}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Watchlist panel                                                     */
/* ------------------------------------------------------------------ */

function WatchlistPanel({
  entries,
  writable,
  loading,
  error,
  canWatch,
  adding,
  rowBusy,
  onWatch,
  onToggle,
  onRemove,
}: {
  entries: WatchEntry[];
  writable: boolean;
  loading: boolean;
  error: string | null;
  canWatch: boolean;
  adding: boolean;
  rowBusy: Record<string, boolean>;
  onWatch: () => void;
  onToggle: (entry: WatchEntry) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <section className="card mt-8 p-5" aria-label="Watchlist">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="label">Watchlist</span>
          <span className="font-mono text-[11px] tabular-nums text-faint">
            {entries.length}
          </span>
          {!writable ? (
            <span className="chip border-amber/40 bg-amber/10 text-amber">
              read-only — set FACTORY_GITHUB_TOKEN to persist
            </span>
          ) : null}
        </div>

        <button
          type="button"
          onClick={onWatch}
          disabled={!canWatch || adding}
          aria-busy={adding}
          className="rounded-md border border-line bg-raised px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-muted transition-colors hover:border-line-bright hover:text-chalk disabled:cursor-not-allowed disabled:border-line disabled:text-faint disabled:hover:text-faint"
        >
          {adding ? "watching…" : "Watch this search"}
        </button>
      </div>

      <p className="mt-3 max-w-3xl text-xs leading-relaxed text-muted">
        {canWatch
          ? "Save the current sector or region. Auto mode keeps re-scanning watched entries on a schedule and records what surfaces."
          : "Enter a sector or region above, then watch it. Auto mode keeps re-scanning watched entries on a schedule and records what surfaces."}
      </p>

      {error ? (
        <p className="mt-4 font-mono text-xs leading-relaxed text-rose">{error}</p>
      ) : null}

      {loading ? (
        <p className="mt-5 font-mono text-xs text-faint">Loading watchlist…</p>
      ) : entries.length === 0 ? (
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted">
          Nothing watched yet — run a search and watch the sectors you care
          about. Auto mode re-scans them on a schedule.
        </p>
      ) : (
        <ul className="mt-5 divide-y divide-line border-t border-line">
          {entries.map((entry) => (
            <WatchRow
              key={entry.id}
              entry={entry}
              busy={Boolean(rowBusy[entry.id])}
              onToggle={onToggle}
              onRemove={onRemove}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

function WatchRow({
  entry,
  busy,
  onToggle,
  onRemove,
}: {
  entry: WatchEntry;
  busy: boolean;
  onToggle: (entry: WatchEntry) => void;
  onRemove: (id: string) => void;
}) {
  const sectorLabel = entry.sector.trim() || "any sector";
  const regionLabel = entry.region.trim() || "any region";

  return (
    <li className="flex flex-wrap items-start justify-between gap-4 py-4">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2.5">
          <span
            className={[
              "font-mono text-[13px] leading-tight",
              entry.active ? "text-chalk" : "text-faint",
            ].join(" ")}
          >
            {sectorLabel}
            <span className="text-faint"> · </span>
            {regionLabel}
          </span>
          <span className={["chip", SCOPE_CHIP_CLASS[entry.scope]].join(" ")}>
            {entry.scope}
          </span>
          {!entry.active ? (
            <span className="chip border-line bg-elevated text-faint">paused</span>
          ) : null}
        </div>

        {entry.lastScannedAt ? (
          <p className="mt-1.5 font-mono text-[11px] leading-relaxed text-faint">
            last scanned {formatRelative(entry.lastScannedAt)}
            {typeof entry.lastTopScore === "number"
              ? ` · top ${formatScore(entry.lastTopScore)}`
              : ""}
            {typeof entry.lastCount === "number"
              ? ` · ${entry.lastCount} found`
              : ""}
          </p>
        ) : (
          <p className="mt-1.5 font-mono text-[11px] leading-relaxed text-faint">
            not scanned yet
          </p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={() => onToggle(entry)}
          disabled={busy}
          aria-busy={busy}
          className="rounded-md border border-line bg-raised px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted transition-colors hover:border-line-bright hover:text-chalk disabled:cursor-not-allowed disabled:text-faint disabled:hover:text-faint"
        >
          {entry.active ? "Pause" : "Resume"}
        </button>
        <button
          type="button"
          onClick={() => onRemove(entry.id)}
          disabled={busy}
          aria-label={`Remove watch for ${sectorLabel} in ${regionLabel}`}
          className="rounded-md border border-line bg-raised px-3 py-1.5 font-mono text-sm leading-none text-muted transition-colors hover:border-rose/50 hover:text-rose disabled:cursor-not-allowed disabled:text-faint disabled:hover:text-faint"
        >
          &times;
        </button>
      </div>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* Loading skeleton                                                    */
/* ------------------------------------------------------------------ */

function ScanSkeleton({ count }: { count: number }) {
  return (
    <div className="mt-10" aria-live="polite" aria-busy="true">
      <p className="font-mono text-xs leading-relaxed text-muted">
        Running live web searches across news, listings, forums, and local
        directories. This takes 1&ndash;3 minutes — leave the tab open.
      </p>

      <div className="mt-6 space-y-6">
        {[0, 1, 2].map((row) => (
          <div
            key={row}
            className="animate-pulse rounded-lg border border-line bg-surface p-6"
          >
            <div className="flex items-start justify-between gap-6">
              <div className="h-6 w-10 rounded-sm bg-elevated" />
              <div className="h-8 w-14 rounded-sm bg-elevated" />
            </div>
            <div className="mt-5 h-5 w-2/3 rounded-sm bg-elevated" />
            <div className="mt-3 h-3 w-full rounded-sm bg-raised" />
            <div className="mt-2 h-3 w-4/5 rounded-sm bg-raised" />
            <div className="mt-6 space-y-2.5">
              {SCORE_SPECS.map((spec) => (
                <div key={spec.key} className="h-1.5 w-full rounded-full bg-elevated" />
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 font-mono text-[11px] text-faint">
        Looking for {count} leads.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Empty state                                                         */
/* ------------------------------------------------------------------ */

function EmptyState({
  onPickSector,
}: {
  onPickSector: (sector: string) => void;
}) {
  return (
    <div className="mt-16 flex flex-col items-center px-4 text-center">
      <p className="label">No scan yet</p>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
        A scan returns ranked opportunities — each with the demand signal that
        surfaced it, the citations behind that signal, who needs it, why the gap
        is still open, a startup cost and time-to-revenue estimate, and the
        first three moves you would make.
      </p>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
        Leave every field blank for a wide sweep, or narrow it down. Start with
        a sector:
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        {SECTOR_SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => onPickSector(suggestion)}
            className="chip border-line bg-raised text-muted transition-colors hover:border-line-bright hover:text-chalk"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Opportunity card                                                    */
/* ------------------------------------------------------------------ */

function OpportunityCard({
  rank,
  opportunity,
}: {
  rank: number;
  opportunity: Opportunity;
}) {
  return (
    <article className="rounded-lg border border-line bg-surface p-6 transition-colors hover:border-line-bright">
      {/* Rank + composite */}
      <div className="flex items-start justify-between gap-6">
        <span className="font-mono text-3xl leading-none tabular-nums text-faint">
          {String(rank).padStart(2, "0")}
        </span>

        <div className="text-right">
          <p className="label">Composite</p>
          <p
            className={[
              "mt-1 font-mono text-3xl leading-none tabular-nums",
              scoreBandClass(opportunity.compositeScore),
            ].join(" ")}
          >
            {formatScore(opportunity.compositeScore)}
          </p>
        </div>
      </div>

      {/* Title + sector */}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <h2 className="text-xl font-semibold tracking-tight text-chalk">
          {opportunity.title}
        </h2>
        {opportunity.sector ? (
          <span className="chip border-line-bright bg-raised text-muted">
            {opportunity.sector}
          </span>
        ) : null}
      </div>

      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
        {opportunity.summary}
      </p>

      {/* Score bars */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {SCORE_SPECS.map((spec) => {
          const value = clampScore(opportunity.scores[spec.key]);
          return (
            <div key={spec.key}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="label">{spec.label}</span>
                <span className="font-mono text-[11px] tabular-nums text-muted">
                  {formatScore(value)}
                </span>
              </div>
              <div
                className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-elevated"
                role="meter"
                aria-label={spec.label}
                aria-valuemin={0}
                aria-valuemax={10}
                aria-valuenow={value}
              >
                <div
                  className="h-full rounded-full bg-ion"
                  style={{ width: `${value * 10}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Demand signal + evidence */}
      <div className="mt-7 border-t border-line pt-6">
        <p className="label">Demand signal</p>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-chalk">
          {opportunity.demandSignal}
        </p>

        {opportunity.evidence.length > 0 ? (
          <>
            <p className="label mt-5">Evidence</p>
            <ul className="mt-2 space-y-1.5">
              {opportunity.evidence.map((item, index) => (
                <li
                  key={`${item}-${index}`}
                  className="break-words font-mono text-xs leading-relaxed text-faint"
                >
                  {item}
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>

      {/* Who / why */}
      <div className="mt-6 grid gap-6 border-t border-line pt-6 md:grid-cols-2">
        <div>
          <p className="label">Who needs it</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {opportunity.whoNeedsIt}
          </p>
        </div>
        <div>
          <p className="label">Why the gap exists</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {opportunity.whyGapExists}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-6 border-t border-line pt-6">
        <div>
          <p className="label">Startup cost</p>
          <p className="mt-1.5 font-mono text-sm leading-tight text-chalk">
            {opportunity.startupCost}
          </p>
        </div>
        <div>
          <p className="label">Time to revenue</p>
          <p className="mt-1.5 font-mono text-sm leading-tight text-chalk">
            {opportunity.timeToRevenue}
          </p>
        </div>
      </div>

      {/* Moves + risks */}
      <div className="mt-6 grid gap-6 border-t border-line pt-6 md:grid-cols-2">
        {opportunity.firstThreeMoves.length > 0 ? (
          <div>
            <p className="label">First three moves</p>
            <ol className="mt-2.5 space-y-2.5">
              {opportunity.firstThreeMoves.map((move, index) => (
                <li
                  key={`${move}-${index}`}
                  className="flex gap-3 text-sm leading-relaxed text-muted"
                >
                  <span className="mt-px shrink-0 font-mono text-[11px] tabular-nums text-ion">
                    {index + 1}
                  </span>
                  <span>{move}</span>
                </li>
              ))}
            </ol>
          </div>
        ) : null}

        {opportunity.risks.length > 0 ? (
          <div>
            <p className="label">Risks</p>
            <ul className="mt-2.5 space-y-2.5">
              {opportunity.risks.map((risk, index) => (
                <li
                  key={`${risk}-${index}`}
                  className="flex gap-3 text-sm leading-relaxed text-rose/85"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-rose"
                  />
                  <span>{risk}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      {/* Footer */}
      <div className="mt-7 border-t border-line pt-5">
        <Link
          href="/new"
          className="inline-flex items-center gap-2 rounded-md border border-line bg-raised px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:border-line-bright hover:text-chalk"
        >
          Build this
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </article>
  );
}
