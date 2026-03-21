import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import AmberDivider from "@/components/ui/AmberDivider";

export const metadata = {
  title: "Nicholas German — Percussionist | Columbia, SC",
  description:
    "Professional drummer and percussionist Nicholas German is based in Columbia, SC. Available for jazz gigs, gospel worship, weddings, corporate events, and private parties.",
};

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-stage overflow-hidden">
        {/* Spotlight glow */}
        <div className="absolute w-[600px] h-[600px] rounded-full bg-ng-amber/10 blur-[120px] top-0 left-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="relative container-ng text-center pt-20 pb-16 z-10">
          <p className="text-ng-amber uppercase tracking-[0.3em] text-xs font-semibold font-sans mb-6">
            Percussionist · Columbia, SC
          </p>

          <h1 className="font-display font-bold text-6xl md:text-8xl text-white uppercase leading-none mb-4">
            Nicholas German
          </h1>

          <p className="font-display text-xl md:text-2xl text-ng-amber tracking-widest uppercase mb-8">
            The Rhythm Behind the Music
          </p>

          <div className="flex justify-center mb-8">
            <AmberDivider className="w-16" />
          </div>

          <p className="text-ng-muted max-w-lg mx-auto text-base md:text-lg leading-relaxed mb-10">
            From jazz ensembles to gospel worship, Nicholas brings precision, soul, and groove to every stage. Based in Columbia, SC — available for bookings.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="bg-ng-amber hover:bg-ng-amber-light text-ng-black font-display font-semibold uppercase tracking-widest px-8 py-4 rounded transition-colors text-sm"
            >
              Book Nicholas
            </Link>
            <Link
              href="/media"
              className="border border-ng-amber text-ng-cream hover:text-ng-amber font-display font-semibold uppercase tracking-widest px-8 py-4 rounded transition-colors text-sm"
            >
              See His Work
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-ng-surface border-y border-ng-amber/20">
        <div className="container-ng py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-ng-border">
            {[
              { value: "10+", label: "Years Playing" },
              { value: "3+", label: "Genres Mastered" },
              { value: "Columbia, SC", label: "Home Base" },
              { value: "Coastal Carolina", label: "Alumni" },
            ].map((stat) => (
              <div key={stat.label} className="text-center px-4">
                <div className="font-display font-bold text-3xl text-ng-amber mb-1">
                  {stat.value}
                </div>
                <div className="text-ng-muted text-sm font-sans">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT HE BRINGS ── */}
      <section className="py-20 bg-ng-black">
        <div className="container-ng">
          <div className="mb-14 text-center">
            <SectionHeading label="Services" title="THE FULL SPECTRUM" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                number: "01",
                title: "Jazz Ensembles",
                body: "Sophisticated timing, melodic improvisation, and years of ensemble experience. Nicholas reads the room and elevates every performance.",
              },
              {
                number: "02",
                title: "Gospel & Worship",
                body: "From intimate Sunday services to full worship productions, Nicholas brings spirit and precision to every beat.",
              },
              {
                number: "03",
                title: "Live Events",
                body: "Weddings, corporate events, private parties — Nicholas delivers the energy your event needs.",
              },
            ].map((card) => (
              <div
                key={card.number}
                className="bg-ng-surface-2 border border-ng-border hover:border-ng-amber transition-colors rounded-lg p-8 flex flex-col gap-4"
              >
                <span className="font-display font-bold text-4xl text-ng-amber/40">
                  {card.number}
                </span>
                <h3 className="font-display font-semibold text-xl text-ng-cream uppercase">
                  {card.title}
                </h3>
                <p className="text-ng-muted text-sm leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT TEASER ── */}
      <section className="py-20 bg-ng-surface">
        <div className="container-ng">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image placeholder */}
            <div className="aspect-[4/5] bg-ng-surface-2 rounded-lg border border-dashed border-ng-border flex items-center justify-center">
              <span className="text-ng-amber/50 text-sm font-sans text-center px-4">
                nicholas-main.jpg
              </span>
            </div>

            {/* Text */}
            <div className="flex flex-col gap-6">
              <div>
                <span className="text-ng-amber uppercase tracking-widest text-xs font-semibold font-sans block mb-3">
                  About Nicholas
                </span>
                <AmberDivider className="mb-5" />
                <h2 className="font-display font-bold text-4xl md:text-5xl text-ng-cream uppercase leading-tight">
                  A LIFETIME OF RHYTHM
                </h2>
              </div>
              <p className="text-ng-muted leading-relaxed">
                Nicholas German&apos;s journey with percussion began in high school, where a pair of drumsticks and a snare drum sparked a lifelong calling. From those early rehearsals to the stages of Coastal Carolina University and the sacred spaces of church worship, Nicholas has spent his life immersed in rhythm.
              </p>
              <p className="text-ng-muted leading-relaxed">
                Today, he performs with jazz ensembles across Columbia, SC — blending tradition with creativity, and always leaving audiences moved.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center text-ng-amber hover:text-ng-amber-light font-display font-semibold uppercase tracking-wider text-sm transition-colors self-start"
              >
                His Full Story →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section className="py-20 bg-ng-black">
        <div className="container-ng text-center max-w-3xl mx-auto">
          <div className="font-display font-bold text-8xl text-ng-amber/30 leading-none mb-2">
            &ldquo;
          </div>
          <blockquote className="text-ng-cream text-xl md:text-2xl leading-relaxed italic mb-6">
            Nicholas doesn&apos;t just keep time — he tells a story. Every show he&apos;s played with us has been unforgettable.
          </blockquote>
          <p className="text-ng-muted text-sm uppercase tracking-widest font-semibold">
            — Jazz Ensemble Director, Columbia, SC
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-24 bg-gradient-stage overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-ng-amber/10 blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="relative container-ng text-center z-10">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-ng-cream uppercase mb-4">
            READY TO SET THE GROOVE?
          </h2>
          <p className="text-ng-muted max-w-xl mx-auto mb-8 leading-relaxed">
            Available for jazz gigs, church worship, weddings, and events across Columbia, SC and beyond.
          </p>
          <Link
            href="/book"
            className="inline-block bg-ng-amber hover:bg-ng-amber-light text-ng-black font-display font-semibold uppercase tracking-widest px-10 py-5 rounded transition-colors text-sm"
          >
            Book Nicholas for Your Event
          </Link>
        </div>
      </section>
    </>
  );
}
