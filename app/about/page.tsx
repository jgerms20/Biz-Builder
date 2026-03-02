import type { Metadata } from "next";
import Link from "next/link";
import ImagePlaceholder from "@/components/shared/ImagePlaceholder";

export const metadata: Metadata = {
  title: "About Janie",
  description:
    "Meet Janie Bell Daniels — 76-year-old master seamstress in Walterboro, South Carolina. Fifty years of alterations, custom sewing, and garments made right.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream-dark py-20 md:py-28">
        <div className="container-brand">
          <div className="max-w-2xl">
            <p className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-terracotta mb-4">
              About
            </p>
            <h1 className="font-serif text-display-md md:text-display-lg font-medium text-charcoal leading-tight">
              Meet Janie Bell
            </h1>
            <p className="font-serif text-xl italic text-charcoal/60 mt-3">
              Master Seamstress. Walterboro, South Carolina.
            </p>
          </div>
        </div>
      </section>

      {/* Main story */}
      <section className="py-section bg-cream">
        <div className="container-brand">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Image */}
            <div className="sticky top-24">
              <ImagePlaceholder
                label="Portrait of Janie Bell"
                aspectRatio="portrait"
                className="w-full"
              />
              <div className="mt-4 flex gap-4">
                <ImagePlaceholder
                  label="Janie at work"
                  aspectRatio="square"
                  className="w-full"
                />
                <ImagePlaceholder
                  label="Close-up: hands and fabric"
                  aspectRatio="square"
                  className="w-full"
                />
              </div>
            </div>

            {/* Story */}
            <div>
              <div className="prose-brand">
                <p className="font-serif text-2xl text-charcoal leading-relaxed mb-8">
                  Janie Bell Daniels has been sewing since before most
                  professional tailors were born.
                </p>

                <p className="font-sans text-base text-charcoal/70 leading-loose mb-6">
                  At 76, she lives and works in Walterboro, South Carolina —
                  deep in Colleton County, in the heart of the Lowcountry. For
                  decades, she&apos;s been the person her community turns to when
                  a garment needs to be right. Church clothes, prom dresses,
                  work pants, wedding suits — she&apos;s touched all of it.
                </p>

                <p className="font-sans text-base text-charcoal/70 leading-loose mb-6">
                  She learned to sew the way most masters learn their craft —
                  young, by watching, by doing, by refusing to accept anything
                  that wasn&apos;t done correctly. Over the years, she developed
                  a speed and precision that most tailors would spend a lifetime
                  chasing. She can hem and resize a pair of pants — 36x36 down
                  to 34x34 — in under 30 minutes. Clean. Professional. Done.
                </p>

                <p className="font-sans text-base text-charcoal/70 leading-loose mb-6">
                  For most of that time, she&apos;s done this work for nearly
                  nothing — for her church, her neighbors, her family. A few
                  dollars here. A favor there. The way people with real skill
                  often end up being asked to give it away.
                </p>

                <div className="bg-cream-dark border-l-4 border-terracotta p-6 my-8">
                  <p className="font-serif text-xl italic text-charcoal leading-relaxed">
                    &ldquo;The skill was always there. The infrastructure
                    wasn&apos;t. That&apos;s what we&apos;re building now.&rdquo;
                  </p>
                  <p className="font-sans text-sm text-charcoal/50 mt-3 tracking-wide uppercase">
                    — Joshua Daniels, Janie&apos;s grandson
                  </p>
                </div>

                <p className="font-sans text-base text-charcoal/70 leading-loose mb-6">
                  That changes now. Janie Bell&apos;s Alterations is a real
                  business, built around the real work she has always done —
                  with pricing that reflects the craft, and a system that lets
                  her keep doing what she loves without worrying about the
                  digital side of things.
                </p>

                <p className="font-sans text-base text-charcoal/70 leading-loose mb-8">
                  Janie does the sewing. Her grandson Joshua manages the
                  website, the bookings, and the business from Los Angeles.
                  She&apos;s in Walterboro doing what she&apos;s always done —
                  only now, she gets paid what she deserves.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 border-t border-gray pt-8 mb-10">
                <div>
                  <p className="font-serif text-3xl md:text-4xl font-medium text-charcoal">50+</p>
                  <p className="font-sans text-xs tracking-wider uppercase text-charcoal/50 mt-1">
                    Years Sewing
                  </p>
                </div>
                <div>
                  <p className="font-serif text-3xl md:text-4xl font-medium text-charcoal">30</p>
                  <p className="font-sans text-xs tracking-wider uppercase text-charcoal/50 mt-1">
                    Min. Avg. Hem
                  </p>
                </div>
                <div>
                  <p className="font-serif text-3xl md:text-4xl font-medium text-charcoal">76</p>
                  <p className="font-sans text-xs tracking-wider uppercase text-charcoal/50 mt-1">
                    Years Young
                  </p>
                </div>
              </div>

              <Link
                href="/book"
                className="inline-flex items-center justify-center bg-terracotta text-cream font-sans text-xs font-medium tracking-[0.2em] uppercase px-8 py-4 hover:bg-terracotta-dark transition-colors rounded-brand"
              >
                Book an Alteration
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Craft */}
      <section className="py-section bg-olive text-cream">
        <div className="container-brand max-w-3xl mx-auto text-center">
          <p className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-gold mb-4">
            The Craft
          </p>
          <h2 className="font-serif text-display-sm md:text-display-md font-medium text-cream mb-6">
            This is Lowcountry work.
          </h2>
          <p className="font-sans text-base text-cream/70 leading-loose mb-6">
            Walterboro is the seat of Colleton County in the South Carolina
            Lowcountry. It&apos;s a place with deep roots — in craft, in community,
            in the kind of knowledge that gets passed down through generations.
            Janie&apos;s sewing is part of that tradition.
          </p>
          <p className="font-sans text-base text-cream/70 leading-loose">
            When you send a garment to Janie Bell&apos;s, you&apos;re not sending it to
            a shop. You&apos;re sending it to someone who treats your clothes like
            her own — with the same care she&apos;s brought to every piece of fabric
            that&apos;s come through her hands.
          </p>
        </div>
      </section>
    </>
  );
}
