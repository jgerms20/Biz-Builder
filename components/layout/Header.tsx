"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/about", label: "About Janie" },
  { href: "/services", label: "Services & Pricing" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-cream border-b border-gray sticky top-0 z-50">
      <div className="container-brand">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Wordmark */}
          <Link href="/" className="flex-shrink-0">
            <span className="font-serif text-xl md:text-2xl font-medium tracking-wide text-charcoal hover:text-terracotta transition-colors">
              Janie Bell&apos;s
            </span>
            <span className="hidden md:inline font-sans text-xs tracking-[0.2em] uppercase text-charcoal/50 ml-3">
              Alterations
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-xs font-medium tracking-[0.15em] uppercase text-charcoal/70 hover:text-terracotta transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book"
              className="ml-4 bg-terracotta text-cream font-sans text-xs font-medium tracking-[0.15em] uppercase px-5 py-2.5 hover:bg-terracotta-dark transition-colors rounded-brand"
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-charcoal"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block font-sans text-sm font-medium tracking-wider uppercase py-3 text-charcoal/70 hover:text-terracotta transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3">
              <Link
                href="/book"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center bg-terracotta text-cream font-sans text-sm font-medium tracking-wider uppercase py-3 hover:bg-terracotta-dark transition-colors rounded-brand"
              >
                Book Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
