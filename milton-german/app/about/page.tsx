import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "About Milton",
  description:
    "Meet Milton German — 30+ years of South Carolina government accounting, Newberry College accounting degree, now helping small businesses get their books right.",
};

const credentials = [
  {
    title: "Newberry College",
    sub: "Bachelor of Science — Accounting",
    desc: "Formal accounting education with a focus on financial systems, reporting, and analysis.",
  },
  {
    title: "SC State Government",
    sub: "30+ Years — Financial & Compliance",
    desc: "Decades managing state-level finances, budgets, and compliance for South Carolina agencies.",
  },
  {
    title: "DHHS — Compliance",
    sub: "Dept. of Health & Human Services",
    desc: "Specialized compliance and records management experience at one of South Carolina's largest state agencies.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-mg-navy pt-32 pb-20">
        <div className="container-brand">
          <p className="font-sans text-xs uppercase tracking-[0.4em] text-mg-gold mb-4">About</p>
          <h1 className="font-serif text-display-md md:text-display-lg text-white max-w-2xl">
            Thirty Years of Getting It Right
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-white">
        <div className="container-brand">
          <div className="max-w-3xl">
            <p className="font-sans text-lg text-mg-charcoal leading-relaxed mb-6">
              Milton German has spent over three decades in South Carolina state government, most
              recently working compliance and financial management for the Department of Health and
              Human Services. He&rsquo;s seen what happens when records aren&rsquo;t kept straight,
              and he&rsquo;s seen what it takes to fix them. That institutional knowledge
              isn&rsquo;t just something he picked up — it&rsquo;s in his bones.
            </p>
            <p className="font-sans text-base text-mg-muted leading-relaxed mb-6">
              When he started helping small business owners get their books right, he realized
              something: most of them don&rsquo;t need a fancy accountant or a big firm. They need
              someone steady and trustworthy who actually understands their numbers and can explain
              them in plain English. Someone who&rsquo;ll set things up properly and then stick
              around to keep them that way.
            </p>
            <p className="font-sans text-base text-mg-muted leading-relaxed mb-6">
              He holds an accounting degree from Newberry College and brings that formal training
              together with real-world experience managing budgets, tracking compliance, and solving
              problems under pressure. He knows what auditors look for. He knows what catches up
              with you later if you don&rsquo;t get it right now. And he knows that a small
              business owner&rsquo;s time is better spent growing the business, not wrestling with
              receipts and reconciliations.
            </p>
            <p className="font-sans text-base text-mg-muted leading-relaxed mb-10">
              Milton&rsquo;s not interested in being flashy or overselling what he does.
              He&rsquo;s interested in getting your numbers clean, keeping them accurate, and
              making sure you understand where you stand. That&rsquo;s the service small business
              owners in South Carolina need. That&rsquo;s what he delivers.
            </p>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="section-padding-sm bg-mg-slate">
        <div className="container-brand">
          <SectionHeading label="Background" title="Credentials &amp; Experience" className="mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {credentials.map((cred) => (
              <div key={cred.title} className="bg-white border border-mg-slate-dark p-8">
                <p className="font-sans text-xs uppercase tracking-widest text-mg-green mb-2">
                  {cred.sub}
                </p>
                <h3 className="font-serif text-xl text-mg-navy mb-3">{cred.title}</h3>
                <p className="font-sans text-sm text-mg-muted leading-relaxed">{cred.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-mg-navy">
        <div className="container-brand text-center">
          <h2 className="font-serif text-display-sm text-white mb-6">
            Ready to Work Together?
          </h2>
          <p className="font-sans text-base text-white/60 mb-8 max-w-lg mx-auto">
            Reach out and tell Milton a bit about your business. He&rsquo;ll let you know how he
            can help.
          </p>
          <Link href="/contact" className="btn-primary">
            Get Started
          </Link>
        </div>
      </section>
    </>
  );
}
