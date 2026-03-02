import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import GoldDivider from "@/components/ui/GoldDivider";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

export const metadata: Metadata = {
  title: "Private Dining Experiences",
  description:
    "Exclusive private dining packages by Chef Daniel German. One-night experiences, multi-weekend retreats, and multi-day culinary journeys. Starting from $150 per person.",
};

const experiences = [
  {
    id: "one-night",
    title: "The Evening Experience",
    subtitle: "One Night",
    price: "From $150 per person",
    minGuests: "Minimum 4 guests",
    description:
      "A single evening of culinary excellence. Chef Daniel arrives at your location, transforms your dining space, and delivers a multi-course meal that rivals the finest restaurants — all in the intimacy of your home.",
    features: [
      "Pre-event consultation to design your menu",
      "4 to 7-course tasting menu",
      "Wine and cocktail pairing recommendations",
      "Full setup and table styling",
      "Complete kitchen cleanup",
      "Personalized printed menus for each guest",
    ],
    idealFor:
      "Date nights, anniversaries, birthday celebrations, intimate gatherings",
  },
  {
    id: "multi-weekend",
    title: "The Weekend Retreat",
    subtitle: "Multi-Weekend",
    price: "Custom Quote",
    minGuests: "Flexible group size",
    description:
      "Spread the experience across multiple weekends. Ideal for couples or groups who want to explore different cuisines, techniques, or seasonal menus over successive weekends — each one a unique chapter.",
    features: [
      "2 to 4 weekend sessions",
      "Different themed menu each weekend",
      "Interactive cooking elements optional",
      "Progressive tasting journey",
      "Full service each session",
      "Photography-ready plating",
    ],
    idealFor:
      "Foodie couples, culinary enthusiasts, experiential gift packages, group dining clubs",
  },
  {
    id: "multi-day",
    title: "The Culinary Residency",
    subtitle: "Multi-Day",
    price: "Custom Quote",
    minGuests: "Flexible group size",
    description:
      "The ultimate private dining experience. Chef Daniel embeds with you for multiple consecutive days — handling every meal from breakfast through dinner. Perfect for vacation homes, retreats, and milestone celebrations.",
    features: [
      "2 to 7 consecutive days of service",
      "All meals: breakfast, lunch, dinner",
      "Snacks and provisions throughout the day",
      "Full grocery sourcing and management",
      "Dietary accommodation for all guests",
      "Wine cellar and bar consultation",
      "Dedicated cleanup after every meal",
    ],
    idealFor:
      "Vacation rentals, corporate retreats, family reunions, destination celebrations, wellness retreats",
  },
];

export default function ExperiencesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-section bg-dg-black">
        <div className="container-brand text-center">
          <span className="inline-block font-sans text-xs uppercase tracking-[0.3em] text-gold mb-4">
            Private Dining
          </span>
          <h1 className="font-serif text-display-lg md:text-display-xl font-semibold text-cream mb-6">
            Dining Experiences
            <br />
            <span className="text-gold">Beyond the Ordinary</span>
          </h1>
          <p className="font-sans text-base md:text-lg text-cream-muted/70 max-w-2xl mx-auto leading-relaxed">
            Every private dining experience is designed from the ground up —
            tailored to your space, your guests, and your vision. Choose your
            format, and let Chef Daniel handle the rest.
          </p>
        </div>
      </section>

      <GoldDivider className="py-2 bg-dg-black" />

      {/* Experience Cards */}
      <section className="py-section bg-dg-black">
        <div className="container-brand space-y-16 md:space-y-24">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start"
            >
              {/* Image - alternating sides */}
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <ImagePlaceholder
                  label={exp.title}
                  aspectRatio="aspect-[4/3]"
                />
              </div>

              {/* Content */}
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <span className="inline-block font-sans text-xs uppercase tracking-[0.3em] text-gold mb-2">
                  {exp.subtitle}
                </span>
                <h2 className="font-serif text-display-sm md:text-display-md font-semibold text-cream mb-4">
                  {exp.title}
                </h2>

                {/* Pricing */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-sans text-sm text-gold font-medium">
                    {exp.price}
                  </span>
                  <span className="w-px h-4 bg-dg-border" />
                  <span className="font-sans text-xs text-cream-muted/50 uppercase tracking-wider">
                    {exp.minGuests}
                  </span>
                </div>

                <p className="font-sans text-sm text-cream-muted/70 leading-relaxed mb-6">
                  {exp.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-cream-muted/40 mb-4">
                    What&apos;s Included
                  </h3>
                  <ul className="space-y-2.5">
                    {exp.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 font-sans text-sm text-cream-muted/60"
                      >
                        <span className="w-1 h-1 bg-gold rounded-full mt-2 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ideal For */}
                <p className="font-sans text-xs text-cream-muted/40 mb-8">
                  <span className="text-gold/70 uppercase tracking-wider">
                    Ideal for:
                  </span>{" "}
                  {exp.idealFor}
                </p>

                <Link
                  href="/inquire"
                  className="inline-flex px-8 py-3 bg-gold/10 border border-gold/30 text-gold text-sm font-sans tracking-wider uppercase hover:bg-gold/20 hover:border-gold/50 transition-all duration-300"
                >
                  Inquire About This Experience
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-section bg-dg-surface border-y border-dg-border/50">
        <div className="container-brand">
          <SectionHeading
            label="The Process"
            title="How It Works"
            subtitle="From your first inquiry to the final course, every step is handled with care."
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Inquire",
                desc: "Share your vision, guest count, dietary needs, and preferred dates.",
              },
              {
                step: "02",
                title: "Consult",
                desc: "Chef Daniel personally connects with you to design the perfect menu.",
              },
              {
                step: "03",
                title: "Prepare",
                desc: "All ingredients are sourced, prepped, and your space is transformed.",
              },
              {
                step: "04",
                title: "Experience",
                desc: "Sit back, enjoy, and let every course unfold as a curated moment.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <span className="inline-block font-serif text-3xl text-gold/30 mb-3">
                  {item.step}
                </span>
                <h3 className="font-serif text-lg text-cream mb-2">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-cream-muted/50 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-section bg-gradient-burgundy border-t border-burgundy-light/20">
        <div className="container-brand text-center">
          <h2 className="font-serif text-display-md font-semibold text-cream mb-4">
            Your Experience Starts Here
          </h2>
          <p className="font-sans text-base text-cream/70 max-w-lg mx-auto mb-10">
            No two experiences are alike. Tell us about your occasion, and we
            will craft something extraordinary.
          </p>
          <Link
            href="/inquire"
            className="inline-flex px-10 py-4 bg-gold text-dg-black text-sm font-sans font-semibold tracking-wider uppercase hover:bg-gold-light transition-all duration-300"
          >
            Begin Your Inquiry
          </Link>
        </div>
      </section>
    </>
  );
}
