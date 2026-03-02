import type { Metadata } from "next";
import Link from "next/link";
import OrderFlow from "@/components/how-it-works/OrderFlow";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Local drop-off in Walterboro, SC or mail-in from anywhere. Here's exactly how to get your garment altered by Janie Bell Daniels.",
};

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream-dark py-20 md:py-24">
        <div className="container-brand">
          <div className="max-w-2xl">
            <p className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-terracotta mb-4">
              The Process
            </p>
            <h1 className="font-serif text-display-md md:text-display-lg font-medium text-charcoal leading-tight">
              How It Works
            </h1>
            <p className="font-sans text-base text-charcoal/70 mt-4 leading-relaxed max-w-lg">
              Whether you&apos;re local to Walterboro or shipping from Los Angeles,
              getting your garment altered by Janie is simple.
            </p>
          </div>
        </div>
      </section>

      {/* Flow */}
      <section className="py-section bg-cream">
        <div className="container-brand">
          <OrderFlow />
        </div>
      </section>

      {/* Turnaround & FAQ */}
      <section className="py-section bg-cream-dark">
        <div className="container-brand max-w-3xl">
          <div className="text-center mb-12">
            <p className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-terracotta mb-3">
              Good to Know
            </p>
            <h2 className="font-serif text-display-sm md:text-3xl font-medium text-charcoal">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "What's the turnaround time?",
                a: "Standard turnaround for local orders is 3–5 business days. Mail-in orders are 5–7 business days from receipt of your garment. Rush service is available — mention it in your booking request.",
              },
              {
                q: "How do I pay?",
                a: "We accept Venmo, Zelle, and cash. For mail-in orders, we request payment before shipping your garment back. Local orders pay at pickup.",
              },
              {
                q: "How do I know the price before I commit?",
                a: "Submit your request with a description of the garment and what you need done. We'll confirm the exact price before any work begins. No surprises.",
              },
              {
                q: "What if the alteration isn't right?",
                a: "Janie stands behind her work. If something isn't right, let us know and we'll make it right — no charge.",
              },
              {
                q: "Do you do rush orders?",
                a: "Yes. Mention your deadline in the booking form and we'll let you know if we can accommodate. Rush orders may carry a small additional fee depending on complexity.",
              },
              {
                q: "For mail-in: how do I package my garment?",
                a: "Use a padded mailer or box. Include a note inside with your name, phone number, and order details — so we can match it to your booking. Use a tracked shipping method.",
              },
              {
                q: "Can Janie take on large or complex custom projects?",
                a: "Yes — custom sewing and complex alterations are quoted individually. Describe your project in the booking form and we'll get back to you with a quote and timeline.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="bg-cream border border-gray rounded-brand p-6"
              >
                <h3 className="font-serif text-lg font-medium text-charcoal mb-2">
                  {item.q}
                </h3>
                <p className="font-sans text-sm text-charcoal/65 leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-terracotta">
        <div className="container-brand text-center">
          <h2 className="font-serif text-3xl font-medium text-cream mb-4">
            Simple enough?
          </h2>
          <p className="font-sans text-base text-cream/80 mb-8 max-w-md mx-auto">
            Submit your booking request and we&apos;ll handle everything from there.
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
