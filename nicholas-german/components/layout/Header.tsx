"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Media", href: "/media" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-ng-black/95 backdrop-blur border-b border-ng-border">
      <div className="container-ng">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-baseline gap-1.5 group">
            <span className="font-display font-bold text-2xl text-ng-amber group-hover:text-ng-amber-light transition-colors">
              NG
            </span>
            <span className="font-display text-lg text-ng-cream tracking-wide group-hover:text-white transition-colors">
              Percussion
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-sans font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-ng-amber"
                    : "text-ng-muted hover:text-ng-cream"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book"
              className="bg-ng-amber hover:bg-ng-amber-light text-ng-black font-display font-semibold uppercase tracking-wider text-xs px-5 py-2.5 rounded transition-colors"
            >
              Book Nicholas
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-ng-cream hover:text-ng-amber transition-colors p-2"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-ng-surface border-t border-ng-border">
          <nav className="container-ng py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-sm font-sans font-medium py-2 transition-colors ${
                  isActive(link.href) ? "text-ng-amber" : "text-ng-muted hover:text-ng-cream"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book"
              onClick={() => setMobileOpen(false)}
              className="bg-ng-amber hover:bg-ng-amber-light text-ng-black font-display font-semibold uppercase tracking-wider text-xs px-5 py-3 rounded transition-colors text-center mt-2"
            >
              Book Nicholas
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
