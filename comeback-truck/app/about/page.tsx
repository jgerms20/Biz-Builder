import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import MustardDivider from "@/components/ui/MustardDivider";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Lorenzo Dykes, founder of The Comeback Truck — South Carolina soul food truck serving loaded dogs, dinner plates, and comfort sides at events across the Midlands.",
};

const values = [
  {
    title: "Real Food",
    description:
      "No shortcuts. No microwaves. Real ingredients, real preparation, real soul food — the way it was meant to be made.",
  },
  {
    title: "Carolina Roots",
    description:
      "South Carolina soul food — collards, loaded dogs, dinner plates, comfort sides — served with love and Carolina pride.",
  },
  {
    title: "Community First",
    description:
      "The Comeback Truck was born to serve. Every event, every stop, every plate is about bringing people together over good food.",
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
            The Story Behind
            <br />
            <span className="text-ct-mustard">The Comeback Truck</span>
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
                lorenzo-truck.jpg
              </span>
            </div>

            <div className="flex flex-col gap-4 order-1 md:order-2">
              <span className="text-ct-mustard uppercase tracking-widest text-xs font-semibold font-sans">
                The Owner
              </span>
              <MustardDivider />
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-ct-cream uppercase leading-tight">
                Meet Lorenzo Dykes
              </h2>

              <p className="text-ct-cream-muted leading-relaxed mt-2">
                Lorenzo Dykes founded The Comeback Truck in 2020 — and it
                wasn&apos;t a business plan that started it, it was a feeling.
                Coming out of the Covid pandemic, Lorenzo saw his community
                hurting. Restaurants were closed, people were home, and quality
                soul food was nowhere to be found. Lorenzo had always had a
                passion for cooking. He decided to put that passion to work.
              </p>
              <p className="text-ct-cream-muted leading-relaxed">
                He started the truck because he saw a need: people in South
                Carolina needed real comfort food, served fresh, brought to
                where they were. Not just food — soul food. The kind that tastes
                like home, that makes you slow down, that brings people together
                around a plate.
              </p>
              <p className="text-ct-cream-muted leading-relaxed">
                The name came naturally. Lorenzo built every menu item around
                one standard: it had to be good enough that you&apos;d come back
                for more. Loaded dogs, dinner plates, loaded sides — every item
                on the menu is something Lorenzo personally perfected. That&apos;s
                the promise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BUSINESS PARTNERSHIP */}
      <section className="bg-ct-black py-20 md:py-28">
        <div className="container-ct">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="flex flex-col gap-4">
              <span className="text-ct-mustard uppercase tracking-widest text-xs font-semibold font-sans">
                The Team
              </span>
              <MustardDivider />
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-ct-cream uppercase leading-tight">
                Lorenzo &amp; Brigman
              </h2>

              <p className="text-ct-cream-muted leading-relaxed mt-2">
                Behind every great food truck is a great team. Brigman German
                partnered with Lorenzo to help build The Comeback Truck into
                what it is today — handling operations, logistics, and making
                sure the truck rolls out ready to serve.
              </p>
              <p className="text-ct-cream-muted leading-relaxed">
                Together, Lorenzo and Brigman bring different strengths to the
                table. Lorenzo handles the food — the recipes, the quality, the
                soul of every plate. Brigman handles the business side, keeping
                everything running so Lorenzo can focus on what he does best:
                cooking food that makes people come back.
              </p>
            </div>

            <div className="aspect-[4/5] bg-ct-surface border border-dashed border-ct-border flex items-center justify-center">
              <span className="text-ct-mustard text-xs font-mono">
                brigman-partner.jpg
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-ct-charcoal py-20 md:py-28">
        <div className="container-ct">
          <SectionHeading
            label="The Promise"
            title="What We Stand For"
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
            Taste What Keeps
            <br />
            <span className="text-ct-orange">People Coming Back</span>
          </h2>
          <p className="text-ct-cream-muted text-base md:text-lg mt-6 max-w-2xl mx-auto">
            See the full spread of what we&apos;re cooking up.
          </p>
          <Link
            href="/menu"
            className="inline-block bg-ct-orange hover:opacity-90 text-white font-display tracking-widest text-lg px-10 py-5 rounded transition-opacity mt-10"
          >
            VIEW THE MENU
          </Link>
        </div>
      </section>
    </>
  );
}
