import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Three straightforward steps to clean books and financial clarity for your South Carolina small business.",
};

const steps = [
  {
    number: "01",
    title: "Free Consultation",
    description:
      "We sit down — in person or by phone — and look at where your books are. Milton listens to what's going on in your business, asks a few questions, and tells you honestly what he recommends. No pressure, no commitment required.",
    details: [
      "Review your current financial records",
      "Understand your business structure and needs",
      "Receive a straightforward recommendation",
    ],
  },
  {
    number: "02",
    title: "Setup or Cleanup",
    description:
      "If you're starting fresh, Milton sets up a proper chart of accounts, connects your bank accounts, and builds the system from scratch. If your books need cleanup, he works back through your records and gets everything reconciled and organized.",
    details: [
      "Chart of accounts built for your business type",
      "Bank and credit card account reconciliation",
      "Clean baseline established for ongoing work",
    ],
  },
  {
    number: "03",
    title: "Ongoing Support",
    description:
      "Every month, Milton records your transactions, reconciles your accounts, and delivers your financial statements. You know where you stand, every month, without having to think about it.",
    details: [
      "Monthly bookkeeping handled start to finish",
      "Financial statements delivered on schedule",
      "Available by phone or email when questions come up",
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="bg-mg-navy pt-32 pb-20">
        <div className="container-brand">
          <p className="font-sans text-xs uppercase tracking-[0.4em] text-mg-gold mb-4">Process</p>
          <h1 className="font-serif text-display-md md:text-display-lg text-white max-w-2xl">
            Simple. Straightforward. Done Right.
          </h1>
        </div>
      </section>

      <section className="section-padding bg-mg-slate">
        <div className="container-brand">
          <div className="max-w-3xl mx-auto space-y-6">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {index < steps.length - 1 && (
                  <div className="absolute left-8 top-24 h-6 w-px bg-mg-slate-dark hidden md:block" />
                )}
                <div className="bg-white border border-mg-slate-dark p-8 md:pl-24 relative">
                  <span className="hidden md:block absolute left-4 top-8 font-serif text-4xl text-mg-slate-dark">
                    {step.number}
                  </span>
                  <span className="md:hidden font-sans text-xs uppercase tracking-widest text-mg-green block mb-2">
                    Step {step.number}
                  </span>
                  <h2 className="font-serif text-display-sm text-mg-navy mb-3">{step.title}</h2>
                  <p className="font-sans text-base text-mg-muted leading-relaxed mb-5">
                    {step.description}
                  </p>
                  <ul className="space-y-2">
                    {step.details.map((d) => (
                      <li key={d} className="flex gap-3 font-sans text-sm text-mg-charcoal">
                        <span className="text-mg-green">✓</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/contact" className="btn-primary">
              Start With a Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
