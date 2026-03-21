import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Media", href: "/media" },
  { label: "Book Nicholas", href: "/book" },
];

export default function Footer() {
  return (
    <footer className="bg-ng-surface border-t-2 border-ng-amber">
      <div className="container-ng py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          {/* Left: Branding */}
          <div className="flex flex-col gap-3">
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-bold text-2xl text-ng-amber">NG</span>
              <span className="font-display text-lg text-ng-cream tracking-wide">Percussion</span>
            </div>
            <p className="text-ng-muted text-sm leading-relaxed">
              The Rhythm Behind the Music.
            </p>
            <p className="text-ng-muted text-sm">
              Professional drummer and percussionist available for jazz gigs, church worship, weddings, and events.
            </p>
          </div>

          {/* Center: Nav */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display text-ng-cream uppercase tracking-widest text-xs font-semibold mb-1">
              Navigation
            </h4>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-ng-muted hover:text-ng-amber text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: Contact / Location */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display text-ng-cream uppercase tracking-widest text-xs font-semibold mb-1">
              Contact
            </h4>
            <p className="text-ng-muted text-sm">Columbia, SC</p>
            <p className="text-ng-muted text-sm">Available across the Midlands & beyond</p>
            <p className="text-ng-muted text-sm">
              Bookings:{" "}
              <span className="text-ng-amber">contact via booking form</span>
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-ng-border flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-ng-muted text-xs">
            &copy; {new Date().getFullYear()} Nicholas German · NG Percussion · Columbia, SC
          </p>
          <p className="text-ng-muted text-xs">The Rhythm Behind the Music</p>
        </div>
      </div>
    </footer>
  );
}
