import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";

/* Offerings + stats are injected by the renderer from the SiteSpec. */
const offerings: { title: string; blurb: string; price?: string }[] = [
  /* {{OFFERINGS}} */
];
const stats: { value: string; label: string }[] = [
  /* {{STATS}} */
];

export default function HomePage() {
  return (
    <>
      {/* Hero — editorial, asymmetric, not a centered three-card template */}
      <section className="border-b border-line">
        <div className="container-brand grid gap-10 py-20 md:grid-cols-[1.3fr_1fr] md:py-section md:items-end">
          <div>
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-brand-strong">
              {{HERO_EYEBROW}}
            </span>
            <h1 className="mt-5 font-display text-display-md md:text-display-lg text-ink">
              {{HERO_HEADLINE}}
            </h1>
          </div>
          <div>
            <p className="text-lg leading-relaxed text-ink-muted">{{HERO_SUBHEAD}}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="{{CTA_HREF}}" className="btn-primary">{{CTA_LABEL}}</Link>
              <Link href="/offerings" className="btn-outline">See what we offer</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      {stats.length > 0 && (
        <section className="border-b border-line bg-surface">
          <div className="container-brand grid grid-cols-2 gap-8 py-10 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-display-sm text-brand">{s.value}</p>
                <p className="mt-1 text-sm text-ink-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Offerings */}
      <section className="section-padding">
        <div className="container-brand">
          <SectionHeading
            label="What we do"
            title="{{BUSINESS_NAME}}"
            subtitle="{{TAGLINE}}"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {offerings.map((o) => (
              <div key={o.title} className="border border-line bg-surface p-6 rounded-lg">
                <h3 className="font-display text-xl text-ink">{o.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{o.blurb}</p>
                {o.price && <p className="mt-4 font-display text-lg text-brand">{o.price}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA band */}
      <section className="border-t border-line bg-surface2">
        <div className="container-brand flex flex-col items-start gap-4 py-16 md:flex-row md:items-center md:justify-between">
          <h2 className="font-display text-display-sm text-ink">Ready when you are.</h2>
          <Link href="{{CTA_HREF}}" className="btn-primary">{{CTA_LABEL}}</Link>
        </div>
      </section>
    </>
  );
}
