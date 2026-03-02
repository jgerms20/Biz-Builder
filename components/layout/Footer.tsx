import Link from "next/link";

const serviceLinks = [
  { href: "/services#pants", label: "Pants & Bottoms" },
  { href: "/services#tops", label: "Tops & Jackets" },
  { href: "/services#dresses", label: "Dresses & Formal" },
  { href: "/services#custom", label: "Custom Work" },
];

const pageLinks = [
  { href: "/about", label: "About Janie" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/book", label: "Book an Alteration" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-olive text-cream">
      <div className="container-brand py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-serif text-2xl font-medium text-cream mb-2">
              Janie Bell&apos;s Alterations
            </h3>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-cream/60 mb-5">
              Walterboro, South Carolina
            </p>
            <p className="font-serif text-lg italic text-cream/80 mb-6">
              &ldquo;Fifty years of perfect fit.&rdquo;
            </p>
            <p className="font-sans text-sm text-cream/70 leading-relaxed max-w-xs">
              Master seamstress Janie Bell Daniels has spent a lifetime
              perfecting the craft of alterations in the heart of Colleton
              County. She does the sewing. She gets paid what she deserves.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-gold mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-cream/70 hover:text-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages + Payment */}
          <div>
            <h4 className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-gold mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3 mb-8">
              {pageLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-cream/70 hover:text-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-gold mb-3">
              Payment Accepted
            </h4>
            <p className="font-sans text-sm text-cream/70">
              Venmo &middot; Zelle &middot; Cash
            </p>
          </div>
        </div>

        <div className="border-t border-cream/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-cream/40">
            &copy; {new Date().getFullYear()} Janie Bell&apos;s Alterations.
            Walterboro, South Carolina.
          </p>
          <p className="font-sans text-xs text-cream/40">
            Managed by Joshua Daniels, Los Angeles, CA
          </p>
        </div>
      </div>
    </footer>
  );
}
