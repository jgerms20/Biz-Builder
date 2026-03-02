import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Submit Your Request",
    description:
      "Fill out our simple booking form — or call us. Tell us what you need done and we'll confirm.",
  },
  {
    number: "02",
    title: "Janie Does the Work",
    description:
      "Drop off locally in Walterboro, or ship your garment. Janie gets to work — fast, precise, done right.",
  },
  {
    number: "03",
    title: "Pick Up or Receive",
    description:
      "Collect locally or we ship it back. Pay via Venmo, Zelle, or cash. That simple.",
  },
];

export default function HowItWorksPreview() {
  return (
    <section className="py-section bg-olive text-cream">
      <div className="container-brand">
        <div className="text-center mb-12 md:mb-16">
          <p className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-gold mb-3">
            The Process
          </p>
          <h2 className="font-serif text-display-sm md:text-display-md font-medium text-cream">
            How It Works
          </h2>
          <p className="mt-4 text-base text-cream/70 max-w-lg mx-auto">
            Local drop-off in Walterboro or mail-in from anywhere in the
            country — both are simple.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative">
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-px bg-cream/10" />

          {steps.map((step, i) => (
            <div key={step.number} className="relative text-center md:text-left">
              <div className="inline-flex items-center justify-center w-14 h-14 border border-cream/20 rounded-brand mb-6">
                <span className="font-serif text-2xl font-light text-gold">
                  {step.number}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-7 left-[calc(100%+1.5rem)] w-8 text-cream/20 text-lg">
                  →
                </div>
              )}
              <h3 className="font-serif text-xl font-medium text-cream mb-3">
                {step.title}
              </h3>
              <p className="font-sans text-sm text-cream/70 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/how-it-works"
            className="inline-flex items-center justify-center border border-cream/30 text-cream font-sans text-xs font-medium tracking-[0.2em] uppercase px-8 py-4 hover:border-cream/70 hover:bg-cream/10 transition-colors rounded-brand"
          >
            Full Details →
          </Link>
        </div>
      </div>
    </section>
  );
}
