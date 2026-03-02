import type { Metadata } from "next";
import InquiryForm from "@/components/sections/InquiryForm";
import GoldDivider from "@/components/ui/GoldDivider";

export const metadata: Metadata = {
  title: "Inquire",
  description:
    "Start your DG Creations experience. Submit an inquiry for private dining, catering, or meal prep services by Chef Daniel German.",
};

export default function InquirePage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 bg-dg-black">
        <div className="container-brand text-center">
          <span className="inline-block font-sans text-xs uppercase tracking-[0.3em] text-gold mb-4">
            Get Started
          </span>
          <h1 className="font-serif text-display-lg md:text-display-xl font-semibold text-cream mb-6">
            Begin Your
            <br />
            <span className="text-gold">Experience</span>
          </h1>
          <p className="font-sans text-base md:text-lg text-cream-muted/70 max-w-2xl mx-auto leading-relaxed">
            Share the details of your vision. Chef Daniel will personally review
            your inquiry and reach out within 48 hours to begin planning your
            experience.
          </p>
        </div>
      </section>

      <GoldDivider className="py-2 bg-dg-black" />

      {/* Form Section */}
      <section className="py-section bg-dg-black">
        <div className="container-brand">
          <div className="max-w-2xl mx-auto">
            <InquiryForm />
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-section-sm bg-dg-surface border-t border-dg-border/50">
        <div className="container-brand text-center">
          <p className="font-sans text-sm text-cream-muted/50 mb-2">
            Prefer to reach out directly?
          </p>
          <p className="font-sans text-sm text-cream-muted/70">
            Email us at{" "}
            <a
              href="mailto:hello@dgcreations.com"
              className="text-gold hover:text-gold-light transition-colors"
            >
              hello@dgcreations.com
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
