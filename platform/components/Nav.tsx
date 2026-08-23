"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface NavItem {
  href: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Portfolio" },
  { href: "/factory", label: "Factory" },
  { href: "/new", label: "New Build" },
  { href: "/opportunities", label: "Opportunity Engine" },
  { href: "/review", label: "Review" },
  { href: "/settings", label: "Autonomy" },
];

const BADGE_HREF = "/review";
const POLL_INTERVAL_MS = 30_000;

interface PendingCounts {
  awaitingApproval: number;
  awaitingReview: number;
}

const EMPTY_COUNTS: PendingCounts = { awaitingApproval: 0, awaitingReview: 0 };

function toCount(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : 0;
}

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Nav() {
  const pathname = usePathname() ?? "/";
  const [counts, setCounts] = useState<PendingCounts>(EMPTY_COUNTS);

  useEffect(() => {
    let cancelled = false;

    async function loadPending(): Promise<void> {
      try {
        const response = await fetch("/api/actions?scope=pending", { cache: "no-store" });
        if (!response.ok) return;
        const payload: unknown = await response.json();
        const stats = (payload as { stats?: Record<string, unknown> } | null)?.stats;
        if (cancelled || !stats) return;
        setCounts({
          awaitingApproval: toCount(stats.awaitingApproval),
          awaitingReview: toCount(stats.awaitingReview),
        });
      } catch {
        // Nav badge is decorative — never surface transport errors here.
      }
    }

    void loadPending();
    const timer = window.setInterval(() => {
      void loadPending();
    }, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  const pendingTotal = counts.awaitingApproval + counts.awaitingReview;
  // Explicit literals — never interpolate Tailwind class names.
  const badgeTone =
    counts.awaitingApproval > 0 ? "bg-amber text-ink" : "bg-ion/20 text-ion";
  const badgeLabel =
    counts.awaitingApproval > 0
      ? `${pendingTotal} pending, ${counts.awaitingApproval} awaiting approval`
      : `${pendingTotal} awaiting review`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-14 border-b border-line bg-ink/90 backdrop-blur">
      <div className="mx-auto flex h-full max-w-7xl items-center gap-8 px-5">
        <Link
          href="/"
          className="group flex shrink-0 items-baseline gap-1.5 font-mono text-sm tracking-widest transition-colors"
        >
          <span className="text-chalk">BIZ</span>
          <span className="text-signal">BUILDER</span>
        </Link>

        <nav
          aria-label="Primary"
          style={{ scrollbarWidth: "none" }}
          className="-mb-[18px] flex min-w-0 items-center gap-1 overflow-x-auto pb-[18px] [&::-webkit-scrollbar]:hidden"
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item.href);
            const showBadge = item.href === BADGE_HREF && pendingTotal > 0;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "relative shrink-0 whitespace-nowrap rounded-md px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors",
                  active
                    ? "bg-raised text-chalk"
                    : "text-muted hover:bg-surface hover:text-chalk",
                ].join(" ")}
              >
                {item.label}
                {showBadge ? (
                  <span
                    aria-label={badgeLabel}
                    className={[
                      "ml-1.5 rounded-full px-1.5 py-0.5 font-mono text-[10px] tracking-normal",
                      badgeTone,
                    ].join(" ")}
                  >
                    {pendingTotal}
                  </span>
                ) : null}
                {active ? (
                  <span className="absolute inset-x-3 -bottom-[13px] h-px bg-signal" />
                ) : null}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
