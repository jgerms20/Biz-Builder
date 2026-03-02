import Link from "next/link";

const footerLinks = [
  {
    heading: "Services",
    links: [
      { name: "Private Dining", href: "/experiences" },
      { name: "Catering", href: "/catering" },
      { name: "Meal Prep", href: "/meal-prep" },
      { name: "View Menus", href: "/menus" },
    ],
  },
  {
    heading: "Company",
    links: [
      { name: "About Chef Daniel", href: "/about" },
      { name: "Inquire", href: "/inquire" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-dg-black border-t border-dg-border/50">
      {/* Main Footer */}
      <div className="container-brand py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <div className="flex flex-col mb-6">
              <span className="font-serif text-2xl font-semibold text-cream tracking-wide">
                DG Creations
              </span>
              <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-gold/70 -mt-1">
                by Daniel German
              </span>
            </div>
            <p className="font-sans text-sm text-cream-muted/70 leading-relaxed max-w-sm">
              Elevated private dining experiences, bespoke catering, and
              personalized meal preparation. Every plate is a creation, every
              meal an experience.
            </p>
          </div>

          {/* Links Columns */}
          {footerLinks.map((group) => (
            <div key={group.heading} className="md:col-span-2">
              <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-gold mb-6">
                {group.heading}
              </h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm text-cream-muted/60 hover:text-gold transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div className="md:col-span-3">
            <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-gold mb-6">
              Get in Touch
            </h3>
            <div className="space-y-3">
              <p className="font-sans text-sm text-cream-muted/60">
                Ready to create an unforgettable dining experience?
              </p>
              <Link
                href="/inquire"
                className="inline-flex px-5 py-2 bg-gold/10 border border-gold/30 text-gold text-xs font-sans tracking-wider uppercase hover:bg-gold/20 hover:border-gold/50 transition-all duration-300"
              >
                Start Your Inquiry
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dg-border/30">
        <div className="container-brand py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-cream-muted/40">
            &copy; {new Date().getFullYear()} DG Creations by Daniel German. All
            rights reserved.
          </p>
          <p className="font-sans text-xs text-cream-muted/30">
            Every plate, a creation.
          </p>
        </div>
      </div>
    </footer>
  );
}
