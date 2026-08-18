import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = { title: "Offerings" };

const offerings: { title: string; blurb: string; price?: string }[] = [
  /* {{OFFERINGS}} */
];

export default function OfferingsPage() {
  return (
    <section className="section-padding">
      <div className="container-brand">
        <SectionHeading label="Offerings" title="What we offer" subtitle="{{TAGLINE}}" />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {offerings.map((o) => (
            <div key={o.title} className="border border-line bg-surface p-8 rounded-lg">
              <h3 className="font-display text-2xl text-ink">{o.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-ink-muted">{o.blurb}</p>
              {o.price && <p className="mt-5 font-display text-xl text-brand">{o.price}</p>}
            </div>
          ))}
        </div>
        <div className="mt-12">
          <Link href="{{CTA_HREF}}" className="btn-primary">{{CTA_LABEL}}</Link>
        </div>
      </div>
    </section>
  );
}
