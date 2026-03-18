import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Milton German Bookkeeping — South Carolina Small Business Accounting",
};

const services = [
  {
    icon: "📒",
    title: "Monthly Bookkeeping",
    description:
      "Accurate, consistent books every month. Transaction categorization, reconciliation, and financial statements delivered on schedule.",
  },
  {
    icon: "🔧",
    title: "Bookkeeping Setup & Cleanup",
    description:
      "Start fresh or fix what's broken. Milton organizes your records, reconciles your accounts, and builds a system that works.",
  },
  {
    icon: "⚖️",
    title: "Compliance & Records",
    description:
      "Government-grade record-keeping. Milton knows what auditors look for — because that was his job for over 30 years.",
  },
  {
    icon: "📊",
    title: "Financial Consulting",
    description:
      "Understand your numbers. Milton translates your financials into plain English and helps you make better business decisions.",
  },
];

const stats = [
  { value: "30+", label: "Years of Experience" },
  { value: "SC", label: "State Government Background" },
  { value: "DHHS", label: "Compliance Expertise" },
  { value: "NC", label: "Newberry College Accounting" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-mg-navy min-h-[90vh] flex items-center pt-16">
        <div className="container-brand py-section">
          <div className="max-w-3xl">
            <p className="font-sans text-xs uppercase tracking-[0.4em] text-mg-gold mb-6">
              South Carolina · Small Business Accounting
            </p>
            <h1 className="font-serif text-display-lg md:text-display-xl text-white mb-6 leading-[1.05]">
              Your Books.<br />Done Right.
            </h1>
            <p className="font-sans text-lg text-white/60 mb-10 max-w-xl leading-relaxed">
              After 30 years keeping South Carolina's finances in order, Milton German now helps
              small businesses do the same. Clean books, reliable records, and peace of mind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn-primary">
                Get Started
              </Link>
              <Link
                href="/services"
                className="btn-outline border-white/30 text-white hover:bg-white hover:text-mg-navy"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-mg-navy-dark border-t border-mg-navy-light">
        <div className="container-brand py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.value} className="text-center">
                <p className="font-serif text-3xl text-mg-gold">{stat.value}</p>
                <p className="font-sans text-xs uppercase tracking-widest text-white/40 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services overview */}
      <section className="section-padding bg-mg-slate">
        <div className="container-brand">
          <SectionHeading
            label="What Milton Does"
            title="Bookkeeping Built for Small Business"
            subtitle="Clean, accurate books aren't just for tax season. They're how you know where your business stands — every month."
            className="mb-14"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div key={service.title} className="bg-white border border-mg-slate-dark p-8">
                <span className="text-3xl mb-4 block">{service.icon}</span>
                <h3 className="font-serif text-xl text-mg-navy mb-3">{service.title}</h3>
                <p className="font-sans text-sm text-mg-muted leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/services" className="btn-outline">
              See All Services
            </Link>
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="section-padding bg-white">
        <div className="container-brand">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading
                label="About Milton"
                title="Thirty Years of Getting It Right"
                className="mb-6"
              />
              <p className="font-sans text-base text-mg-muted leading-relaxed mb-4">
                Milton German spent over three decades in South Carolina state government, most
                recently working compliance and financial management for the Department of Health
                and Human Services. He knows what accurate records look like — and what it costs
                when they aren't.
              </p>
              <p className="font-sans text-base text-mg-muted leading-relaxed mb-8">
                He holds an accounting degree from Newberry College and brings that formal training
                together with real-world experience solving compliance problems at scale. Now he
                puts that expertise to work for small business owners across South Carolina.
              </p>
              <Link href="/about" className="btn-primary">
                Learn More About Milton
              </Link>
            </div>
            <div className="bg-mg-slate border border-mg-slate-dark p-12 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-mg-navy rounded-full flex items-center justify-center mb-6">
                <span className="font-serif text-3xl text-mg-gold">MG</span>
              </div>
              <p className="font-serif text-2xl text-mg-navy mb-2">Milton German</p>
              <p className="font-sans text-xs uppercase tracking-widest text-mg-green mb-6">
                Bookkeeper &amp; Accounting Professional
              </p>
              <p className="font-sans text-sm text-mg-muted italic">
                &ldquo;Most business owners don&rsquo;t need a big firm. They need someone steady
                and trustworthy who actually understands their numbers.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-mg-navy">
        <div className="container-brand text-center">
          <p className="font-sans text-xs uppercase tracking-[0.4em] text-mg-gold mb-4">
            Ready to get started?
          </p>
          <h2 className="font-serif text-display-md text-white mb-6">
            Let&rsquo;s Get Your Books Straight
          </h2>
          <p className="font-sans text-base text-white/60 mb-10 max-w-xl mx-auto">
            Whether you&rsquo;re starting fresh, fixing old records, or need someone to handle the
            month-to-month, Milton is ready to help.
          </p>
          <Link href="/contact" className="btn-primary">
            Schedule a Free Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
