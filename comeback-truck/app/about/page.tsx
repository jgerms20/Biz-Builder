import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import MustardDivider from "@/components/ui/MustardDivider";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Brigman German, owner of The Comeback Truck — South Carolina BBQ food truck slow-smoking ribs, pulled pork, and Carolina mustard sauce for events across the Midlands.",
};

const values = [
  {
    title: "Real Food",
    description:
      "No shortcuts. No microwaves. Slow-smoked meats, fresh sides, real ingredients.",
  },
  {
    title: "Carolina Roots",
    description:
      "South Carolina BBQ — mustard sauce, smoked low and slow, served with love.",
  },
  {
    title: "Good Vibes",
    description:
      "When the truck rolls up, it's a party. Music, smiles, plates that disappear fast.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-ct-black smoke-overlay py-24 md:py-32 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-ct-mustard/10 blur-[140px] top-[-200px] left-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="container-ct relative z-10 text-center">
          <span className="text-ct-mustard uppercase tracking-widest text-xs md:text-sm font-semibold font-sans">
            About
          </span>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-ct-cream uppercase leading-tight mt-6">
            Rolling Out The Best
            <br />
            <span className="text-ct-mustard">BBQ in SC</span>
          </h1>
          <MustardDivider className="mx-auto mt-8" />
        </div>
      </section>

      {/* THE STORY */}
      <section className="bg-ct-charcoal py-20 md:py-28">
        <div className="container-ct">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="aspect-[4/5] bg-ct-surface border border-dashed border-ct-border flex items-center justify-center order-2 md:order-1">
              <span className="text-ct-mustard text-xs font-mono">
                brigman-truck.jpg
              </span>
            </div>

            <div className="flex flex-col gap-4 order-1 md:order-2">
              <span className="text-ct-mustard uppercase tracking-widest text-xs font-semibold font-sans">
                The Story
              </span>
              <MustardDivider />
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-ct-cream uppercase leading-tight">
                Meet Brigman
              </h2>

              <p className="text-ct-cream-muted leading-relaxed mt-2">
                Brigman German started The Comeback Truck out of one belief —
                that the best food in South Carolina shouldn&apos;t be locked
                behind restaurant doors. Real BBQ. Real comfort food. Brought
                directly to where people gather.
              </p>
              <p className="text-ct-cream-muted leading-relaxed">
                Born and raised in the Carolinas, Brigman spent years perfecting
                his craft — slow-smoking ribs, building the perfect chili cheese
                fry, and dialing in that signature Carolina mustard sauce that
                makes you stop mid-bite.
              </p>
              <p className="text-ct-cream-muted leading-relaxed">
                The name says it all: Food So Good You&apos;ll Come Back.
                That&apos;s not a marketing line — that&apos;s the promise.
                Every plate, every event, every catering job is built around the
                moment someone takes their first bite and immediately wants
                more.
              </p>
              <p className="text-ct-cream-muted leading-relaxed">
                Today, The Comeback Truck rolls through Columbia, SC and the
                surrounding areas — serving private events, festivals, parties,
                and anywhere hungry people gather. Catch us on the road or bring
                us to your next event.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-ct-black py-20 md:py-28">
        <div className="container-ct">
          <SectionHeading
            label="The Promise"
            title="What We Stand For"
            subtitle="Three things we never compromise on, no matter how busy the truck gets."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
            {values.map((value, idx) => (
              <div
                key={value.title}
                className="bg-ct-surface border border-ct-border hover:border-ct-mustard transition-colors p-8 flex flex-col"
              >
                <span className="font-display text-ct-mustard text-3xl mb-3">
                  0{idx + 1}
                </span>
                <h3 className="font-display text-ct-cream text-2xl uppercase mb-3">
                  {value.title}
                </h3>
                <p className="text-ct-cream-muted text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-ct-black overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-heat opacity-15 pointer-events-none" />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-ct-mustard/15 blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="container-ct relative z-10 text-center">
          <h2 className="font-display text-4xl md:text-6xl text-ct-cream uppercase leading-tight">
            Taste The <span className="text-ct-mustard">Difference</span>
          </h2>
          <p className="text-ct-cream-muted text-base md:text-lg mt-6 max-w-2xl mx-auto">
            See the full spread of what we&apos;re cooking up.
          </p>
          <Link
            href="/menu"
            className="inline-block bg-ct-mustard hover:bg-ct-mustard-light text-ct-black font-display tracking-widest text-lg px-10 py-5 rounded transition-colors mt-10"
          >
            VIEW THE MENU
          </Link>
        </div>
      </section>
    </>
  );
}
