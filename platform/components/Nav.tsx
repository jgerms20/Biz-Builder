"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  href: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Portfolio" },
  { href: "/new", label: "New Build" },
  { href: "/opportunities", label: "Opportunities" },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Nav() {
  const pathname = usePathname() ?? "/";

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

        <nav aria-label="Primary" className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "relative rounded-md px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors",
                  active
                    ? "bg-raised text-chalk"
                    : "text-muted hover:bg-surface hover:text-chalk",
                ].join(" ")}
              >
                {item.label}
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
