import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-mg-navy text-white">
      <div className="container-brand py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <p className="font-serif text-2xl text-white mb-2">Milton German</p>
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-mg-gold mb-4">
              Bookkeeping
            </p>
            <p className="font-sans text-sm text-white/50">
              South Carolina small business accounting. Your books, done right.
            </p>
          </div>

          {/* Pages */}
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-mg-gold mb-4">Pages</p>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/services", label: "Services" },
                { href: "/how-it-works", label: "How It Works" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-mg-gold mb-4">Contact</p>
            <p className="font-sans text-sm text-white/60">South Carolina</p>
            <p className="font-sans text-sm text-white/60 mt-2">
              Available by appointment
            </p>
            <Link
              href="/contact"
              className="inline-block mt-4 font-sans text-xs uppercase tracking-widest text-mg-gold hover:text-white transition-colors"
            >
              Schedule a Consultation →
            </Link>
          </div>
        </div>

        <div className="border-t border-mg-navy-light mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs text-white/30">
            © {new Date().getFullYear()} Milton German Bookkeeping. All rights reserved.
          </p>
          <p className="font-sans text-xs text-white/30">
            Site by{" "}
            <a
              href="https://jgerms20.github.io/Business-Builder/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-mg-gold/60 hover:text-mg-gold transition-colors"
            >
              Biz Builder
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
