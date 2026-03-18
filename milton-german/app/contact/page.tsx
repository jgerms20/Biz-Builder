import type { Metadata } from "next";
import ContactForm from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach out to Milton German Bookkeeping. Schedule a free consultation for your South Carolina small business.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-mg-navy pt-32 pb-20">
        <div className="container-brand">
          <p className="font-sans text-xs uppercase tracking-[0.4em] text-mg-gold mb-4">Contact</p>
          <h1 className="font-serif text-display-md md:text-display-lg text-white max-w-2xl">
            Let&apos;s Get Your Books Right
          </h1>
        </div>
      </section>

      <section className="section-padding bg-mg-slate">
        <div className="container-brand">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-16">
            <div>
              <p className="font-sans text-xs uppercase tracking-widest text-mg-green mb-2">
                Send a Message
              </p>
              <h2 className="font-serif text-display-sm text-mg-navy mb-8">
                Tell Milton What You Need
              </h2>
              <ContactForm />
            </div>
            <div className="space-y-8">
              <div>
                <p className="font-sans text-xs uppercase tracking-widest text-mg-green mb-3">
                  Location
                </p>
                <p className="font-sans text-base text-mg-charcoal">South Carolina</p>
                <p className="font-sans text-sm text-mg-muted mt-1">
                  Serving small businesses statewide
                </p>
              </div>
              <div>
                <p className="font-sans text-xs uppercase tracking-widest text-mg-green mb-3">
                  Availability
                </p>
                <p className="font-sans text-sm text-mg-muted">By appointment</p>
                <p className="font-sans text-sm text-mg-muted mt-1">
                  Responds within 1&ndash;2 business days
                </p>
              </div>
              <div className="bg-white border border-mg-slate-dark p-6">
                <p className="font-serif text-lg text-mg-navy mb-2">Free First Consultation</p>
                <p className="font-sans text-sm text-mg-muted leading-relaxed">
                  The first conversation is always free. Milton will review your situation and tell
                  you exactly what he recommends &mdash; no obligation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
