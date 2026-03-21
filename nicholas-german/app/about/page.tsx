import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import AmberDivider from "@/components/ui/AmberDivider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Nicholas German — drummer, percussionist, and Columbia, SC musician with experience in jazz, gospel, church worship, and live events.",
};

export default function AboutPage() {
  return (
    <>
      {/* ── PAGE HERO ── */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-stage overflow-hidden pt-16">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-ng-amber/10 blur-[120px] top-0 left-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="relative container-ng text-center z-10 py-16">
          <p className="text-ng-amber uppercase tracking-[0.3em] text-xs font-semibold font-sans mb-4">
            About
          </p>
          <h1 className="font-display font-bold text-5xl md:text-7xl text-white uppercase leading-none mb-4">
            THE MAN BEHIND THE KIT
          </h1>
          <p className="font-display text-lg md:text-xl text-ng-amber tracking-widest uppercase">
            Drummer · Percussionist · Columbia, SC
          </p>
        </div>
      </section>

      {/* ── STORY ── */}
      <section className="py-20 bg-ng-black">
        <div className="container-ng">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Text */}
            <div className="flex flex-col gap-6 order-2 md:order-1">
              <SectionHeading
                label="His Story"
                title="BUILT ON RHYTHM"
                align="left"
              />
              <p className="text-ng-muted leading-relaxed">
                Nicholas German discovered his passion for percussion early, picking up drumsticks in high school where he developed his foundational skills and performance instincts. The discipline of marching in a band, the thrill of a live performance, and the craft of keeping perfect time — it all started there.
              </p>
              <p className="text-ng-muted leading-relaxed">
                He went on to hone his craft at Coastal Carolina University, where he studied music and performed with collegiate ensembles — deepening his technical range and musical intuition. College opened up new genres and new challenges, and Nicholas rose to meet every one of them.
              </p>
              <p className="text-ng-muted leading-relaxed">
                His faith has always been intertwined with his music. Nicholas has spent years as a drummer in church worship settings, learning to play with sensitivity and intentionality. Sacred music demands something different — restraint, presence, and genuine spirit. Nicholas brings all of it.
              </p>
              <p className="text-ng-muted leading-relaxed">
                Today, Nicholas performs with jazz ensembles across Columbia, SC, blending tradition with creativity on stages from intimate clubs to large venues. Every gig is a new conversation — between musicians, between the music and the audience, between the past and the present moment.
              </p>
            </div>

            {/* Image placeholder */}
            <div className="order-1 md:order-2">
              <div className="aspect-[4/5] bg-ng-surface-2 rounded-lg border border-dashed border-ng-border flex items-center justify-center">
                <span className="text-ng-amber/50 text-sm font-sans text-center px-4">
                  nicholas-portrait.jpg
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CREDENTIAL CARDS ── */}
      <section className="py-20 bg-ng-surface">
        <div className="container-ng">
          <div className="mb-12 text-center">
            <SectionHeading label="Background" title="THE JOURNEY" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                number: "01",
                title: "High School",
                body: "Built his foundation in HS bands, developing timing, discipline, and stage presence. Early performances shaped a performer who thrives under pressure.",
              },
              {
                number: "02",
                title: "Coastal Carolina University",
                body: "College percussion studies and ensemble performance. Refined technique, music theory, and the ability to adapt across diverse musical contexts.",
              },
              {
                number: "03",
                title: "Church & Worship",
                body: "Years of worship drumming — sensitivity, spirit, and precise dynamics. Nicholas understands how music serves the moment and the congregation.",
              },
              {
                number: "04",
                title: "Jazz Ensembles",
                body: "Active in Columbia&apos;s jazz scene, performing with ensembles and small groups. From swing to modern jazz, Nicholas brings musicality and deep listening.",
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

      {/* ── THE KIT ── */}
      <section className="py-20 bg-ng-black">
        <div className="container-ng">
          <div className="mb-12 text-center">
            <SectionHeading label="Gear" title="WHAT HE PLAYS" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              "Drum Kit (Full Acoustic)",
              "Electronic Percussion",
              "Hand Percussion",
              "Brushes & Mallets",
              "Jazz Trap Set",
            ].map((item) => (
              <div
                key={item}
                className="bg-ng-surface-2 border border-ng-border rounded-lg px-5 py-6 text-center"
              >
                <div className="w-2 h-2 rounded-full bg-ng-amber mx-auto mb-3" />
                <p className="text-ng-cream text-sm font-sans font-medium leading-tight">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-ng-surface border-t border-ng-border">
        <div className="container-ng text-center">
          <div className="flex justify-center mb-6">
            <AmberDivider />
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-ng-cream uppercase mb-4">
            LET&apos;S MAKE MUSIC TOGETHER
          </h2>
          <p className="text-ng-muted max-w-md mx-auto mb-8">
            Ready to bring Nicholas to your stage? Reach out and let&apos;s talk about your event.
          </p>
          <Link
            href="/book"
            className="inline-block bg-ng-amber hover:bg-ng-amber-light text-ng-black font-display font-semibold uppercase tracking-widest px-10 py-5 rounded transition-colors text-sm"
          >
            Book Nicholas
          </Link>
        </div>
      </section>
    </>
  );
}
