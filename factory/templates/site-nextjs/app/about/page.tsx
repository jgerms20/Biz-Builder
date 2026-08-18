import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <section className="section-padding">
      <div className="container-brand max-w-3xl">
        <SectionHeading label="About" title="{{BUSINESS_NAME}}" />
        <div className="mt-8 space-y-5 text-base leading-relaxed text-ink-muted">
          <p>{{ABOUT_INTRO}}</p>
          <p>{{ABOUT_BODY}}</p>
        </div>
      </div>
    </section>
  );
}
