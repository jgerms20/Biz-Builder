import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import AmberDivider from "@/components/ui/AmberDivider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Nicholas German's experience spans jazz ensembles, gospel and church worship, weddings, corporate events, and private parties across Columbia, SC.",
};

interface PerformanceStyle {
  number: string;
  title: string;
  description: string;
  expectations: string[];
  imagePlaceholder: string;
  imageAlt: string;
  reverse: boolean;
}

const performanceStyles: PerformanceStyle[] = [
  {
    number: "01",
    title: "JAZZ ENSEMBLES",
    description:
      "Nicholas has performed with jazz groups across Columbia, SC and beyond. His jazz drumming is rooted in tradition — swing, bebop, and cool jazz — while remaining open to modern fusion. He listens, responds, and elevates every musician around him.",
    expectations: [
      "Swing & brush technique",
      "Dynamic control and restraint",
      "Responsive ensemble listening",
      "Bebop to modern jazz",
    ],
    imagePlaceholder: "jazz-performance.jpg",
    imageAlt: "Nicholas German performing with a jazz ensemble",
    reverse: false,
  },
  {
    number: "02",
    title: "GOSPEL & WORSHIP",
    description:
      "Music and faith intersect deeply for Nicholas. He has served as a worship drummer in church settings, bringing both technical skill and spiritual presence to every service. Whether supporting a choir or leading rhythmic worship, he understands the unique demands of sacred music.",
    expectations: [
      "Spirit-led performance",
      "Choir and band coordination",
      "Contemporary and traditional gospel",
      "Sunday services to large productions",
    ],
    imagePlaceholder: "church-worship.jpg",
    imageAlt: "Nicholas German performing at a church worship service",
    reverse: true,
  },
  {
    number: "03",
    title: "LIVE EVENTS & WEDDINGS",
    description:
      "For weddings, corporate events, and private parties, Nicholas brings the energy that moves people. He&apos;s equally comfortable as part of a full band or leading a stripped-down duo setup — always reading the room and delivering exactly what the moment calls for.",
    expectations: [
      "Wedding ceremony & reception",
      "Corporate event entertainment",
      "Private party performances",
      "Band or solo setup available",
    ],
    imagePlaceholder: "live-event.jpg",
    imageAlt: "Nicholas German performing at a live event",
    reverse: false,
  },
];

export default function ExperiencePage() {
  return (
    <>
      {/* ── PAGE HERO ── */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-stage overflow-hidden pt-16">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-ng-amber/10 blur-[120px] top-0 left-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="relative container-ng text-center z-10 py-16">
          <p className="text-ng-amber uppercase tracking-[0.3em] text-xs font-semibold font-sans mb-4">
            Experience
          </p>
          <h1 className="font-display font-bold text-5xl md:text-7xl text-white uppercase leading-none mb-4">
            EVERY STAGE, EVERY GENRE
          </h1>
          <p className="font-display text-lg md:text-xl text-ng-amber tracking-widest uppercase">
            Versatile. Adaptive. Groove-driven.
          </p>
        </div>
      </section>

      {/* ── PERFORMANCE STYLES ── */}
      {performanceStyles.map((style, index) => (
        <section
          key={style.number}
          className={`py-20 ${index % 2 === 0 ? "bg-ng-black" : "bg-ng-surface"}`}
        >
          <div className="container-ng">
            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${
                style.reverse ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Text */}
              <div className={`flex flex-col gap-6 ${style.reverse ? "md:order-2" : "md:order-1"}`}>
                <div>
                  <span className="font-display font-bold text-5xl text-ng-amber/20 block mb-2">
                    {style.number}
                  </span>
                  <h2 className="font-display font-bold text-4xl md:text-5xl text-ng-cream uppercase leading-tight">
                    {style.title}
                  </h2>
                  <AmberDivider className="mt-4" />
                </div>
                <p className="text-ng-muted leading-relaxed">{style.description}</p>

                <div>
                  <p className="text-ng-amber uppercase tracking-widest text-xs font-semibold font-sans mb-3">
                    What to Expect
                  </p>
                  <ul className="space-y-2">
                    {style.expectations.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-ng-muted text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-ng-amber flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Image placeholder */}
              <div className={style.reverse ? "md:order-1" : "md:order-2"}>
                <div className="aspect-[4/3] bg-ng-surface-2 rounded-lg border border-dashed border-ng-border flex items-center justify-center">
                  <span className="text-ng-amber/50 text-sm font-sans text-center px-4">
                    {style.imagePlaceholder}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── BOOKING CTA ── */}
      <section className="relative py-24 bg-gradient-stage overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-ng-amber/10 blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="relative container-ng text-center z-10">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-ng-cream uppercase mb-4">
            BRING NICHOLAS TO YOUR STAGE
          </h2>
          <p className="text-ng-muted max-w-md mx-auto mb-8">
            Ready to book? Get in touch and let&apos;s make something great together.
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
