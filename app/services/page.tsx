import type { Metadata } from "next";
import Link from "next/link";
import PricingTable from "@/components/services/PricingTable";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description:
    "Hemming, tapering, dress alterations, custom sewing, and more. Real pricing for expert work by Janie Bell Daniels in Walterboro, SC.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream-dark py-20 md:py-24">
        <div className="container-brand">
          <div className="max-w-2xl">
            <p className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-terracotta mb-4">
              What We Offer
            </p>
            <h1 className="font-serif text-display-md md:text-display-lg font-medium text-charcoal leading-tight">
              Services &amp; Pricing
            </h1>
            <p className="font-sans text-base text-charcoal/70 mt-4 leading-relaxed max-w-lg">
              Every price listed is for real work, done right. If your garment
              has something unique going on, describe it in your booking and
              we&apos;ll confirm before we start.
            </p>
          </div>
        </div>
      </section>

      {/* Jump links */}
      <section className="bg-cream border-b border-gray">
        <div className="container-brand">
          <div className="flex items-center gap-6 py-4 overflow-x-auto">
            <span className="font-sans text-xs text-charcoal/40 tracking-wider uppercase flex-shrink-0">
              Jump to:
            </span>
            {[
              { href: "#pants", label: "Pants & Bottoms" },
              { href: "#tops", label: "Tops & Jackets" },
              { href: "#dresses", label: "Dresses & Formal" },
              { href: "#custom", label: "Custom Work" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans text-xs font-medium tracking-wider uppercase text-charcoal/60 hover:text-terracotta transition-colors flex-shrink-0"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-section bg-cream">
        <div className="container-brand max-w-3xl">
          <PricingTable />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-terracotta">
        <div className="container-brand text-center">
          <h2 className="font-serif text-3xl font-medium text-cream mb-4">
            Ready to get started?
          </h2>
          <p className="font-sans text-base text-cream/80 mb-8 max-w-md mx-auto">
            Submit your request online or get in touch. Local drop-off and
            mail-in orders both welcome.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center justify-center bg-cream text-terracotta font-sans text-xs font-medium tracking-[0.2em] uppercase px-8 py-4 hover:bg-cream-dark transition-colors rounded-brand"
          >
            Book an Alteration
          </Link>
        </div>
      </section>
    </>
  );
}
