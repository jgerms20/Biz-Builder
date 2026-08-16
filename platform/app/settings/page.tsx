"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  CATEGORIES,
  satisfiesFloor,
  type ActionCategory,
  type AutonomyLevel,
  type AutonomyPolicy,
  type CategorySpec,
} from "@/lib/autonomy";

/* ============================================================
   AUTONOMY SETTINGS

   The founder dials how hands-on they want to be, per category.
   The default posture is permissive on purpose. This page lets
   them tighten it, and states plainly where a gate cannot come
   off at all.
   ============================================================ */

const LEVELS: readonly AutonomyLevel[] = ["auto", "review", "approve"] as const;

type Accent = CategorySpec["accent"];

/* Tailwind class names are never interpolated — explicit maps only. */

const ACCENT_EDGE: Record<Accent, string> = {
  signal: "border-l-signal",
  amber: "border-l-amber",
  ion: "border-l-ion",
  violet: "border-l-violet",
  rose: "border-l-rose",
};

const ACCENT_BAR: Record<Accent, string> = {
  signal: "bg-signal",
  amber: "bg-amber",
  ion: "bg-ion",
  violet: "bg-violet",
  rose: "bg-rose",
};

const ACCENT_TEXT: Record<Accent, string> = {
  signal: "text-signal",
  amber: "text-amber",
  ion: "text-ion",
  violet: "text-violet",
  rose: "text-rose",
};

const LEVEL_NAME: Record<AutonomyLevel, string> = {
  auto: "Auto",
  review: "Review",
  approve: "Approve",
};

/* ---------- What the selected level actually means, per category ---------- */

const LEVEL_COPY: Record<ActionCategory, Record<AutonomyLevel, string>> = {
  generate: {
    auto: "Drafts get written the moment they are useful and land in the project. Nothing leaves the building.",
    review:
      "Drafts get written immediately, then stack up in your review queue so you read every one.",
    approve:
      "No draft is written until you say go. This is the slowest setting on the safest category.",
  },
  publish: {
    auto: "Deploys and posts go out without stopping.",
    review: "Goes out immediately, then lands in your review queue.",
    approve: "Waits in the queue until you approve it.",
  },
  message: {
    auto: "Replies and follow-ups send under your name without stopping.",
    review:
      "The message sends right away, then you see the exact text and who received it.",
    approve:
      "Nothing reaches a real person until you have read it and said yes.",
  },
  spend: {
    auto: "Charges go through unattended. Not available — money out is not reversible.",
    review:
      "Charges go through, then you find out. Not available — money out is not reversible.",
    approve:
      "Every charge waits on your yes, with the amount and the vendor shown before anything moves.",
  },
  contract: {
    auto: "Agreements get accepted on your behalf. Not available — a signature binds you.",
    review:
      "Agreements get accepted, then flagged. Not available — a signature binds you.",
    approve:
      "Terms are read, summarized, and held. Nothing is signed or agreed in your name until you approve it.",
  },
  file: {
    auto: "Filings submit unattended. Not available — filings need a real person on the signature line.",
    review:
      "Filings submit, then get flagged. Not available — filings need a real person on the signature line.",
    approve:
      "The filing is prepared in full — forms, fees, deadlines — and waits for you to sign and submit.",
  },
};

interface PolicyResponse {
  policy: AutonomyPolicy;
  categories: CategorySpec[];
  posture: string;
}

interface SaveResponse {
  policy: AutonomyPolicy;
  posture: string;
}

export default function SettingsPage() {
  const [policy, setPolicy] = useState<AutonomyPolicy | null>(null);
  const [serverPolicy, setServerPolicy] = useState<AutonomyPolicy | null>(null);
  const [categories, setCategories] = useState<CategorySpec[]>(CATEGORIES);
  const [posture, setPosture] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch("/api/policy", { cache: "no-store" });
        if (!response.ok) throw new Error(`Policy request failed (${response.status})`);
        const data = (await response.json()) as PolicyResponse;
        if (cancelled) return;
        setPolicy(data.policy);
        setServerPolicy(data.policy);
        if (Array.isArray(data.categories) && data.categories.length > 0) {
          setCategories(data.categories);
        }
        setPosture(data.posture ?? "");
        setError(null);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Could not load your policy.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  /* "Saved" holds for a few seconds, then clears itself. */
  useEffect(() => {
    if (savedAt === null) return;
    const timer = window.setTimeout(() => setSavedAt(null), 3200);
    return () => window.clearTimeout(timer);
  }, [savedAt]);

  const changed = useMemo<ActionCategory[]>(() => {
    if (!policy || !serverPolicy) return [];
    return categories
      .map((category) => category.id)
      .filter((id) => policy[id] !== serverPolicy[id]);
  }, [policy, serverPolicy, categories]);

  const select = useCallback(
    (category: CategorySpec, level: AutonomyLevel) => {
      if (!satisfiesFloor(level, category.floor)) return;
      setPolicy((current) =>
        current ? { ...current, [category.id]: level } : current
      );
      setSavedAt(null);
    },
    []
  );

  const discard = useCallback(() => {
    setPolicy(serverPolicy);
    setError(null);
  }, [serverPolicy]);

  const save = useCallback(async () => {
    if (!policy) return;
    setSaving(true);
    setError(null);
    try {
      const response = await fetch("/api/policy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ policy }),
      });
      if (!response.ok) throw new Error(`Save failed (${response.status})`);
      const data = (await response.json()) as SaveResponse;
      setPolicy(data.policy);
      setServerPolicy(data.policy);
      setPosture(data.posture ?? "");
      setSavedAt(Date.now());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save your policy.");
    } finally {
      setSaving(false);
    }
  }, [policy]);

  const dirty = changed.length > 0;

  return (
    <div className="pb-32">
      {/* ---------- Header ---------- */}
      <header className="grid-bg border-b border-line">
        <div className="mx-auto max-w-5xl px-5 py-12">
          <p className="label">Operating Layer</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-chalk sm:text-4xl">
            Autonomy
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
            Most of this work should just happen. Drafts, plans, revisions, the
            hundred small decisions between an idea and a live business — none of
            that needs you standing over it. Gates exist in three places only:
            when an action reaches the outside world, when it spends money, and
            when it binds you legally. Tighten anything on this page. A few
            things cannot be loosened, and they are marked as such.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5">
        {/* ---------- Current posture ---------- */}
        <section className="mt-10">
          <p className="label">Current posture</p>
          <div className="mt-2 rounded-lg border border-line bg-raised p-4">
            <p className="font-mono text-sm leading-relaxed text-chalk">
              {loading ? "Reading policy…" : posture || "No posture recorded."}
            </p>
          </div>
        </section>

        {error ? (
          <div className="mt-6 rounded-lg border border-line border-l-2 border-l-rose bg-surface p-4">
            <p className="label text-rose">Error</p>
            <p className="mt-2 font-mono text-xs leading-relaxed text-muted">
              {error}
            </p>
          </div>
        ) : null}

        {/* ---------- Categories ---------- */}
        <section className="mt-8 space-y-4">
          {loading || !policy ? (
            <>
              {[0, 1, 2, 3].map((key) => (
                <div
                  key={key}
                  className="h-52 rounded-lg border border-line bg-surface"
                  aria-hidden="true"
                />
              ))}
            </>
          ) : (
            categories.map((category) => {
              const current = policy[category.id];
              const locked = category.floor === "approve";
              const isChanged = changed.includes(category.id);

              return (
                <article
                  key={category.id}
                  className={[
                    "rounded-lg border border-line border-l-2 bg-surface p-6",
                    ACCENT_EDGE[category.accent],
                  ].join(" ")}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-lg font-semibold tracking-tight text-chalk">
                          {category.label}
                        </h2>
                        {locked ? (
                          <span className="chip border-amber/40 text-amber">
                            Locked
                          </span>
                        ) : null}
                        {isChanged ? (
                          <span className="chip border-ion/40 text-ion">
                            Changed
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                        {category.description}
                      </p>
                    </div>
                    <span className="label shrink-0 pt-1">{category.id}</span>
                  </div>

                  {/* Examples */}
                  <ul className="mt-4 space-y-1">
                    {category.examples.map((example) => (
                      <li
                        key={example}
                        className="flex gap-2 font-mono text-[11px] leading-relaxed text-faint"
                      >
                        <span aria-hidden="true">—</span>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Segmented control */}
                  <div
                    role="group"
                    aria-label={`${category.label} autonomy level`}
                    className="mt-5 flex w-fit rounded-md bg-elevated p-1"
                  >
                    {LEVELS.map((level) => {
                      const allowed = satisfiesFloor(level, category.floor);
                      const selected = current === level;

                      if (!allowed) {
                        return (
                          <button
                            key={level}
                            type="button"
                            disabled
                            aria-disabled="true"
                            title={
                              category.floorReason ??
                              "This gate cannot be lowered."
                            }
                            className="cursor-not-allowed rounded-sm px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-faint opacity-50"
                          >
                            {LEVEL_NAME[level]}
                          </button>
                        );
                      }

                      return (
                        <button
                          key={level}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => select(category, level)}
                          className={[
                            "relative rounded-sm px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition-colors",
                            selected
                              ? "bg-raised text-chalk"
                              : "text-muted hover:text-chalk",
                          ].join(" ")}
                        >
                          {LEVEL_NAME[level]}
                          {selected ? (
                            <span
                              aria-hidden="true"
                              className={[
                                "absolute inset-x-2 bottom-1 h-px",
                                ACCENT_BAR[category.accent],
                              ].join(" ")}
                            />
                          ) : null}
                        </button>
                      );
                    })}
                  </div>

                  {/* What the selected level means here */}
                  <p className="mt-3 max-w-2xl text-xs leading-relaxed text-muted">
                    {LEVEL_COPY[category.id][current]}
                  </p>

                  {/* Why the floor exists */}
                  {locked && category.floorReason ? (
                    <div className="mt-4 border-l-2 border-amber pl-3">
                      <p className={["label", ACCENT_TEXT.amber].join(" ")}>
                        Why this stays
                      </p>
                      <p className="mt-1 max-w-2xl text-xs leading-relaxed text-muted">
                        {category.floorReason}
                      </p>
                    </div>
                  ) : null}
                </article>
              );
            })
          )}
        </section>

        {/* ---------- Footer note ---------- */}
        <section className="mt-10 rounded-lg border border-line bg-surface p-6">
          <p className="label">Hard limits</p>
          <p className="mt-3 max-w-3xl text-xs leading-relaxed text-muted">
            Filings, EIN applications, and bank accounts require a signature, an
            SSN or ITIN, or identity verification on a real person. Those gates
            are regulatory, not preferences — the platform prepares the work and
            hands it to you. Everything else is yours to tune.
          </p>
          <p className="mt-4 font-mono text-[11px] text-faint">
            Every decision made under this policy is recorded in the{" "}
            <Link
              href="/"
              className="text-muted underline underline-offset-4 transition-colors hover:text-chalk"
            >
              action ledger
            </Link>
            .
          </p>
        </section>
      </div>

      {/* ---------- Sticky save bar ---------- */}
      {dirty ? (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/95 backdrop-blur">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-5 py-4">
            <p className="font-mono text-xs text-muted">
              <span className="text-chalk">{changed.length}</span>{" "}
              {changed.length === 1 ? "change" : "changes"} pending
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={discard}
                disabled={saving}
                className="rounded-md border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-muted transition-colors hover:border-line-bright hover:text-chalk disabled:cursor-not-allowed disabled:opacity-50"
              >
                Discard
              </button>
              <button
                type="button"
                onClick={() => void save()}
                disabled={saving}
                className="rounded-md border border-signal/40 bg-signal/10 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-signal transition-colors hover:bg-signal/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      ) : savedAt !== null ? (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/95 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-end px-5 py-4">
            <p className="font-mono text-[11px] uppercase tracking-widest text-signal">
              Saved
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
