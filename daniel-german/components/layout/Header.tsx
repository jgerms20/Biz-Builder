"use client";

import { useState } from "react";
import Link from "next/link";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Experiences", href: "/experiences" },
  { name: "Menus", href: "/menus" },
  { name: "Catering", href: "/catering" },
  { name: "Meal Prep", href: "/meal-prep" },
  { name: "Inquire", href: "/inquire" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dg-black/90 backdrop-blur-md border-b border-dg-border/50">
      <div className="container-brand">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col">
            <span className="font-serif text-2xl font-semibold text-cream tracking-wide">
              DG Creations
            </span>
            <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-gold/70 -mt-1">
              by Daniel German
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-sans text-sm text-cream-muted hover:text-gold transition-colors duration-300 tracking-wide"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <Link
            href="/inquire"
            className="hidden lg:inline-flex px-6 py-2.5 bg-gold/10 border border-gold/30 text-gold text-sm font-sans tracking-wider uppercase hover:bg-gold/20 hover:border-gold/50 transition-all duration-300"
          >
            Book Chef Daniel
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-cream"
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span
                className={`block h-px bg-cream transition-all duration-300 ${
                  mobileOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <span
                className={`block h-px bg-cream transition-all duration-300 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-px bg-cream transition-all duration-300 ${
                  mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-dg-border/50 pb-6">
            <nav className="flex flex-col py-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-sans text-sm text-cream-muted hover:text-gold py-3 px-2 transition-colors duration-300 tracking-wide border-b border-dg-border/30 last:border-0"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <Link
              href="/inquire"
              onClick={() => setMobileOpen(false)}
              className="inline-flex px-6 py-2.5 bg-gold/10 border border-gold/30 text-gold text-sm font-sans tracking-wider uppercase hover:bg-gold/20 hover:border-gold/50 transition-all duration-300 mt-2"
            >
              Book Chef Daniel
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
