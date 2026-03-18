import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Bookkeeping setup, monthly accounting, compliance review, and small business financial consulting for South Carolina businesses.",
};

const services = [
  {
    number: "01",
    title: "Bookkeeping Setup & Cleanup",
    tagline: "Get your financial records organized and accurate.",
    description:
      "Whether you're starting a new business or need to straighten out records that have gotten off track, Milton builds a system that works. He'll review your existing records, organize transactions, reconcile accounts, and set up a chart of accounts tailored to your business.",
    bullets: [
      "Review and organize existing records, receipts, and transactions",
      "Set up accounts and categories matched to your business structure",
      "Reconcile bank and credit card statements; identify discrepancies",
      "Establish a clean baseline for ongoing bookkeeping",
    ],
  },
  {
    number: "02",
    title: "Ongoing Monthly Bookkeeping",
    tagline: "Reliable, consistent books every month.",
    description:
      "Stop worrying about whether your numbers are right. Milton handles all monthly bookkeeping — recording transactions, reconciling accounts, and delivering financial statements so you always know where your business stands.",
    bullets: [
      "Record all income, expenses, and transactions accurately",
      "Reconcile bank and credit card accounts monthly",
      "Generate P&L statements and balance sheets",
      "Monthly review to walk through your numbers",
    ],
  },
  {
    number: "03",
    title: "Compliance & Records Management",
    tagline: "Books that hold up under any review.",
    description:
      "Milton spent decades on the compliance side of state government. He knows exactly what documentation is required, what auditors look for, and how to keep records that stand up to scrutiny.",
    bullets: [
      "Organize records for tax season and compliance requirements",
      "Maintain documentation that holds up under audit or review",
      "Advise on proper record retention policies",
      "Coordinate with your CPA or tax preparer at year-end",
    ],
  },
  {
    number: "04",
    title: "Small Business Financial Consulting",
    tagline: "Understand your numbers in plain English.",
    description:
      "Sometimes you just need someone to sit down with your financials and tell you what they actually mean. Milton reviews your statements, identifies trends and problem areas, and helps you make better decisions about your business.",
    bullets: [
      "Review financial statements and translate them plainly",
      "Identify cash flow issues, cost problems, or growth opportunities",
      "Guidance on QuickBooks setup, budgeting, and financial systems",
      "One-time consultations or ongoing advisory — your choice",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="bg-mg-navy pt-32 pb-20">
        <div className="container-brand">
          <p className="font-sans text-xs uppercase tracking-[0.4em] text-mg-gold mb-4">Services</p>
          <h1 className="font-serif text-display-md md:text-display-lg text-white max-w-2xl">
            What Milton Offers
          </h1>
        </div>
      </section>

      <section className="section-padding bg-mg-slate">
        <div className="container-brand">
          <div className="space-y-6">
            {services.map((service) => (
              <div key={service.number} className="bg-white border border-mg-slate-dark p-8 md:p-10">
                <div className="grid grid-cols-1 md:grid-cols-[4rem_1fr] gap-8">
                  <div>
                    <span className="font-serif text-4xl text-mg-slate-dark">{service.number}</span>
                  </div>
                  <div>
                    <p className="font-sans text-xs uppercase tracking-widest text-mg-green mb-2">
                      {service.tagline}
                    </p>
                    <h2 className="font-serif text-display-sm text-mg-navy mb-4">{service.title}</h2>
                    <p className="font-sans text-base text-mg-muted leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3 font-sans text-sm text-mg-charcoal">
                          <span className="text-mg-green mt-0.5 shrink-0">→</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/contact" className="btn-primary">
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
