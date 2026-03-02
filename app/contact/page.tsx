import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Janie Bell's Alterations. Located in Walterboro, South Carolina. Local drop-off and mail-in alterations welcome.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream-dark py-20 md:py-24">
        <div className="container-brand">
          <div className="max-w-2xl">
            <p className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-terracotta mb-4">
              Reach Out
            </p>
            <h1 className="font-serif text-display-md md:text-display-lg font-medium text-charcoal leading-tight">
              Contact
            </h1>
            <p className="font-sans text-base text-charcoal/70 mt-4 leading-relaxed max-w-lg">
              Ready to get started? Have a question? Reach out below — or go
              straight to the booking form.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-section bg-cream">
        <div className="container-brand">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Info */}
            <div className="space-y-10">
              {/* Location */}
              <div>
                <h2 className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-terracotta mb-3">
                  Location
                </h2>
                <p className="font-serif text-2xl font-medium text-charcoal mb-1">
                  Walterboro, South Carolina
                </p>
                <p className="font-sans text-base text-charcoal/60">
                  Colleton County — the heart of the Lowcountry
                </p>
                <p className="font-sans text-sm text-charcoal/50 mt-2 italic">
                  Drop-off address is provided upon booking confirmation.
                </p>
              </div>

              {/* Service Area */}
              <div>
                <h2 className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-terracotta mb-3">
                  Service Area
                </h2>
                <div className="space-y-2">
                  {[
                    {
                      label: "Local",
                      value: "Walterboro, Colleton County, and surrounding areas",
                    },
                    {
                      label: "Expanded",
                      value: "Charleston metro and Columbia, SC",
                    },
                    {
                      label: "Mail-In",
                      value: "Nationwide — ship your garment, we ship it back",
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex gap-4">
                      <span className="font-sans text-xs font-medium tracking-wider uppercase text-charcoal/40 w-20 flex-shrink-0 pt-0.5">
                        {item.label}
                      </span>
                      <span className="font-sans text-sm text-charcoal/70">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment */}
              <div>
                <h2 className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-terracotta mb-3">
                  Payment Methods
                </h2>
                <div className="space-y-4">
                  <div className="bg-cream-dark border border-gray rounded-brand p-5">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-8 h-8 bg-[#3D95CE]/10 rounded flex items-center justify-center flex-shrink-0">
                        <span className="font-serif text-sm font-bold text-[#3D95CE]">V</span>
                      </div>
                      <h3 className="font-sans text-sm font-medium text-charcoal">
                        Venmo
                      </h3>
                    </div>
                    <p className="font-sans text-sm text-charcoal/60">
                      @janiebells-alterations{" "}
                      <span className="text-charcoal/40 text-xs">
                        (placeholder — update with real handle)
                      </span>
                    </p>
                  </div>

                  <div className="bg-cream-dark border border-gray rounded-brand p-5">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-8 h-8 bg-[#6D1ED4]/10 rounded flex items-center justify-center flex-shrink-0">
                        <span className="font-serif text-sm font-bold text-[#6D1ED4]">Z</span>
                      </div>
                      <h3 className="font-sans text-sm font-medium text-charcoal">
                        Zelle
                      </h3>
                    </div>
                    <p className="font-sans text-sm text-charcoal/60">
                      Payment details provided in order confirmation
                    </p>
                  </div>

                  <div className="bg-cream-dark border border-gray rounded-brand p-5">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-8 h-8 bg-olive/10 rounded flex items-center justify-center flex-shrink-0">
                        <span className="font-serif text-sm font-bold text-olive">$</span>
                      </div>
                      <h3 className="font-sans text-sm font-medium text-charcoal">
                        Cash
                      </h3>
                    </div>
                    <p className="font-sans text-sm text-charcoal/60">
                      Accepted for local drop-off orders
                    </p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div>
                <h2 className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-terracotta mb-3">
                  Business Hours
                </h2>
                <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
                  By appointment. Submit your request online and we&apos;ll
                  coordinate a convenient drop-off or pickup time.
                </p>
              </div>
            </div>

            {/* CTA + Managed by */}
            <div className="space-y-8">
              <div className="bg-cream-dark border border-gray rounded-brand p-8">
                <h2 className="font-serif text-2xl font-medium text-charcoal mb-2">
                  Ready to book?
                </h2>
                <p className="font-sans text-sm text-charcoal/60 leading-relaxed mb-6">
                  The fastest way to get started is our online booking form.
                  Describe your garment, choose local or mail-in, and we&apos;ll
                  confirm within 24 hours with pricing.
                </p>
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center w-full bg-terracotta text-cream font-sans text-xs font-medium tracking-[0.2em] uppercase px-8 py-4 hover:bg-terracotta-dark transition-colors rounded-brand"
                >
                  Book an Alteration
                </Link>
              </div>

              <div className="bg-olive text-cream rounded-brand p-8">
                <h2 className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-gold mb-4">
                  A Note
                </h2>
                <p className="font-serif text-lg text-cream/90 leading-relaxed mb-4">
                  Janie doesn&apos;t manage the digital side — that&apos;s her
                  grandson Joshua, working remotely from Los Angeles.
                </p>
                <p className="font-sans text-sm text-cream/70 leading-relaxed">
                  All booking requests, questions, and digital communication
                  go through Joshua, who coordinates directly with Janie. She
                  does the sewing. He handles the business. You get a perfectly
                  altered garment.
                </p>
              </div>

              <div className="border border-gray rounded-brand p-6">
                <p className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-charcoal/40 mb-3">
                  Mail-In Address
                </p>
                <p className="font-serif text-xl text-charcoal mb-1">
                  Walterboro, SC 29488
                </p>
                <p className="font-sans text-sm text-charcoal/50 italic">
                  Full mailing address provided upon booking confirmation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
