import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import ConversionForm from "@/components/sections/ConversionForm";

export const metadata: Metadata = { title: "{{CTA_LABEL}}" };

export default function ConversionPage() {
  return (
    <section className="section-padding">
      <div className="container-brand grid gap-12 md:grid-cols-2">
        <div>
          <SectionHeading label="Get in touch" title="{{CTA_LABEL}}" subtitle="{{TAGLINE}}" />
          <div className="mt-8 space-y-2 text-sm text-ink-muted">
            <p>{{LOCATION}}</p>
            <p>{{PHONE}}</p>
            <p>{{EMAIL}}</p>
          </div>
        </div>
        <ConversionForm />
      </div>
    </section>
  );
}
