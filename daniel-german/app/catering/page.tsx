import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import GoldDivider from "@/components/ui/GoldDivider";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

export const metadata: Metadata = {
  title: "Catering Services",
  description:
    "Upscale catering by Chef Daniel German for corporate events, celebrations, and gatherings of any scale. Starting from $65 per person.",
};

const cateringTypes = [
  {
    title: "Corporate Events",
    description:
      "From executive luncheons to company-wide celebrations, DG Creations delivers polished, professional catering that reflects the caliber of your organization.",
    features: [
      "Custom menus aligned with event theme",
      "Buffet or plated service options",
      "Dietary accommodation for all attendees",
      "Professional service staff available",
      "Setup and breakdown included",
    ],
  },
  {
    title: "Social Celebrations",
    description:
      "Weddings, milestone birthdays, engagement parties, holidays — every celebration deserves food that matches the significance of the moment.",
    features: [
      "Personalized tasting sessions",
      "Multi-course plated dinners",
      "Cocktail hour and passed hors d&apos;oeuvres",
      "Custom dessert tables",
      "Bar and beverage coordination",
    ],
  },
  {
    title: "Intimate Gatherings",
    description:
      "Smaller events that still demand exceptional food — dinner parties, book clubs, wine tastings, and gatherings of close friends.",
    features: [
      "Family-style or individual plating",
      "Interactive food stations",
      "Wine and food pairing options",
      "Flexible menu sizing",
      "Personal service by Chef Daniel",
    ],
  },
];

export default function CateringPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-section bg-dg-black">
        <div className="container-brand">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="inline-block font-sans text-xs uppercase tracking-[0.3em] text-gold mb-4">
                Catering
              </span>
              <h1 className="font-serif text-display-lg md:text-display-xl font-semibold text-cream mb-6">
                Elevated Events,
                <br />
                <span className="text-gold">Flawless Execution</span>
              </h1>
              <p className="font-sans text-base text-cream-muted/70 leading-relaxed mb-6">
                DG Creations catering is not your typical buffet line. It is a
                full-service culinary production — thoughtfully designed menus,
                impeccable presentation, and seamless coordination that lets you
                focus on your guests while Chef Daniel focuses on the food.
              </p>
              <div className="flex items-center gap-4 mb-8">
                <span className="font-sans text-sm text-gold font-medium">
                  From $65 per person
                </span>
                <span className="w-px h-4 bg-dg-border" />
                <span className="font-sans text-xs text-cream-muted/50 uppercase tracking-wider">
                  Depends on menu and scale
                </span>
              </div>
              <Link
                href="/inquire"
                className="inline-flex px-8 py-3.5 bg-gold text-dg-black text-sm font-sans font-semibold tracking-wider uppercase hover:bg-gold-light transition-all duration-300"
              >
                Request a Quote
              </Link>
            </div>
            <div>
              <ImagePlaceholder
                label="Catering Event Setup"
                aspectRatio="aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      <GoldDivider className="py-2 bg-dg-black" />

      {/* Catering Types */}
      <section className="py-section bg-dg-black">
        <div className="container-brand">
          <SectionHeading
            label="Our Catering Services"
            title="For Every Occasion"
            subtitle="Whether your event is for 20 or 200, the standard of excellence remains the same."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {cateringTypes.map((type) => (
              <div
                key={type.title}
                className="bg-dg-surface border border-dg-border hover:border-gold/20 transition-all duration-500 p-8"
              >
                <h3 className="font-serif text-xl md:text-2xl text-cream mb-3">
                  {type.title}
                </h3>
                <p className="font-sans text-sm text-cream-muted/60 leading-relaxed mb-6">
                  {type.description}
                </p>
                <ul className="space-y-2.5">
                  {type.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 font-sans text-sm text-cream-muted/50"
                    >
                      <span className="w-1 h-1 bg-gold rounded-full mt-2 shrink-0" />
                      <span dangerouslySetInnerHTML={{ __html: feature }} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-section bg-dg-surface border-y border-dg-border/50">
        <div className="container-brand">
          <SectionHeading
            label="The DG Difference"
            title="What Sets Us Apart"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Chef-Driven",
                desc: "Every menu is designed and executed by Chef Daniel personally — not delegated to a line cook.",
              },
              {
                title: "Fully Custom",
                desc: "No preset packages. Your event gets a menu built from scratch based on your vision and budget.",
              },
              {
                title: "Presentation First",
                desc: "Food is visual. Every platter, every station, every plate is styled for maximum impact.",
              },
              {
                title: "Turnkey Service",
                desc: "From sourcing to setup to cleanup — we handle every detail so you can be present with your guests.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
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

      {/* Gallery */}
      <section className="py-section bg-dg-black">
        <div className="container-brand">
          <SectionHeading
            label="Past Events"
            title="Catering in Action"
            subtitle="A selection of setups, presentations, and moments from past catering events."
          />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {[
              "Buffet Display",
              "Plated Service",
              "Cocktail Hour",
              "Dessert Table",
              "Corporate Lunch",
              "Event Styling",
            ].map((label) => (
              <ImagePlaceholder
                key={label}
                label={label}
                aspectRatio="aspect-[3/2]"
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-section bg-gradient-burgundy border-t border-burgundy-light/20">
        <div className="container-brand text-center">
          <h2 className="font-serif text-display-md font-semibold text-cream mb-4">
            Planning an Event?
          </h2>
          <p className="font-sans text-base text-cream/70 max-w-lg mx-auto mb-10">
            Tell us about your occasion — guest count, venue, and vision — and
            we will create a custom catering proposal.
          </p>
          <Link
            href="/inquire"
            className="inline-flex px-10 py-4 bg-gold text-dg-black text-sm font-sans font-semibold tracking-wider uppercase hover:bg-gold-light transition-all duration-300"
          >
            Request a Catering Quote
          </Link>
        </div>
      </section>
    </>
  );
}
