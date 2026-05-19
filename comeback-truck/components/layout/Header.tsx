"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Schedule", href: "/schedule" },
  { label: "Find Us", href: "/find-us" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-ct-black/95 backdrop-blur border-b border-ct-border">
      <div className="container-ct">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-baseline gap-1.5 group">
            <span className="font-display text-lg md:text-xl text-ct-cream tracking-wide group-hover:text-white transition-colors">
              THE COMEBACK
            </span>
            <span className="font-display text-lg md:text-xl text-ct-mustard group-hover:text-ct-mustard-light transition-colors">
              TRUCK
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-sans font-medium uppercase tracking-wider transition-colors ${
                  isActive(link.href)
                    ? "text-ct-mustard"
                    : "text-ct-cream-muted hover:text-ct-cream"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-ct-mustard" />
                )}
              </Link>
            ))}
            <Link
              href="/book"
              className="bg-ct-mustard hover:bg-ct-mustard-light text-ct-black font-display tracking-wider text-sm px-5 py-2.5 rounded transition-colors"
            >
              BOOK US
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-ct-cream hover:text-ct-mustard transition-colors p-2"
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
        <div className="md:hidden bg-ct-charcoal border-t border-ct-border">
          <nav className="container-ct py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-sm font-sans font-medium uppercase tracking-wider py-2 transition-colors ${
                  isActive(link.href) ? "text-ct-mustard" : "text-ct-cream-muted hover:text-ct-cream"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book"
              onClick={() => setMobileOpen(false)}
              className="bg-ct-mustard hover:bg-ct-mustard-light text-ct-black font-display tracking-wider text-sm px-5 py-3 rounded transition-colors text-center mt-2"
            >
              BOOK US
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
