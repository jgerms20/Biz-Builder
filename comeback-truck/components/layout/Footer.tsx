import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Schedule", href: "/schedule" },
  { label: "Find Us", href: "/find-us" },
  { label: "About", href: "/about" },
  { label: "Book Us", href: "/book" },
];

export default function Footer() {
  return (
    <footer className="bg-ct-charcoal border-t-2 border-ct-mustard">
      <div className="container-ct py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          {/* Left: Branding */}
          <div className="flex flex-col gap-3">
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-lg text-ct-cream tracking-wide">
                THE COMEBACK
              </span>
              <span className="font-display text-lg text-ct-orange">
                TRUCK
              </span>
            </div>
            <p className="text-ct-cream-muted text-sm leading-relaxed">
              Food So Good You&apos;ll Come Back.
            </p>
            <p className="text-ct-muted text-sm">
              Soul food and Southern comfort brought to your event. Real ingredients,
              real flavor, served with heart.
            </p>
          </div>

          {/* Center: Nav */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display text-ct-cream uppercase tracking-widest text-xs mb-1">
              Navigation
            </h4>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-ct-cream-muted hover:text-ct-mustard text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: Contact */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display text-ct-cream uppercase tracking-widest text-xs mb-1">
              Contact
            </h4>
            <a
              href="tel:8033803309"
              className="text-ct-cream-muted hover:text-ct-mustard text-sm transition-colors"
            >
              803-380-3309
            </a>
            <a
              href="https://www.instagram.com/the.comeback.truck/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ct-cream-muted hover:text-ct-mustard text-sm transition-colors"
            >
              Instagram: @the.comeback.truck
            </a>
            <a
              href="https://www.facebook.com/thecomebacktruck"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ct-cream-muted hover:text-ct-mustard text-sm transition-colors"
            >
              Facebook: the comeback truck
            </a>
            <p className="text-ct-cream-muted text-sm">
              South Carolina &middot; Charlotte, NC &middot; N. Georgia
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-ct-border flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-ct-muted text-xs">
            &copy; {new Date().getFullYear()} The Comeback Truck &middot; Lorenzo Dykes &middot; Columbia, SC
          </p>
          <p className="text-ct-muted text-xs">Built with Biz Builder</p>
        </div>
      </div>
    </footer>
  );
}
