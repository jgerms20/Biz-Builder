"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Offerings", href: "/offerings" },
  { label: "{{CTA_LABEL}}", href: "{{CTA_HREF}}" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur">
      <div className="container-brand flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-xl text-ink">
          {{SHORT_NAME}}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.slice(0, 2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-ink-muted transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
          <Link href="{{CTA_HREF}}" className="btn-primary text-sm">
            {{CTA_LABEL}}
          </Link>
        </nav>

        <button
          className="p-2 text-ink md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-line bg-bg md:hidden">
          <div className="container-brand flex flex-col gap-3 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-1 text-sm text-ink-muted transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
