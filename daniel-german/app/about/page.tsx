import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import GoldDivider from "@/components/ui/GoldDivider";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

export const metadata: Metadata = {
  title: "About Chef Daniel German",
  description:
    "Learn about Chef Daniel German, a Johnson & Wales University graduate in Culinary Arts and Culinary Nutrition. The story behind DG Creations.",
};

const milestones = [
  {
    year: "Education",
    title: "Johnson & Wales University",
    description:
      "Dual degrees in Culinary Arts and Culinary Nutrition, building the foundation for a career defined by both artistry and wellness.",
  },
  {
    year: "Training",
    title: "Professional Kitchens",
    description:
      "Years of experience in high-end restaurants and professional kitchens, refining techniques and developing a signature style.",
  },
  {
    year: "Evolution",
    title: "Private Dining",
    description:
      "Transition to private chef work, discovering that the most meaningful culinary moments happen in intimate settings.",
  },
  {
    year: "Today",
    title: "DG Creations",
    description:
      "A full-service culinary brand offering private dining experiences, bespoke catering, and personalized meal preparation.",
  },
];

const values = [
  {
    title: "Ingredient Integrity",
    description:
      "Every dish begins with sourcing the finest ingredients. Seasonal, local when possible, and always of the highest quality.",
  },
  {
    title: "Intentional Design",
    description:
      "Plating is not decoration — it is communication. Every visual element on the plate serves the story of the dish.",
  },
  {
    title: "Personal Connection",
    description:
      "Cooking for someone is an act of care. Understanding dietary needs, preferences, and desires is where the experience begins.",
  },
  {
    title: "Nutritional Excellence",
    description:
      "With a degree in Culinary Nutrition, Daniel ensures that extraordinary flavor and optimal nutrition are never at odds.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-section bg-dg-black">
        <div className="container-brand">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="inline-block font-sans text-xs uppercase tracking-[0.3em] text-gold mb-4">
                The Chef Behind the Creations
              </span>
              <h1 className="font-serif text-display-lg md:text-display-xl font-semibold text-cream mb-6">
                Daniel
                <br />
                <span className="text-gold">German</span>
              </h1>
              <div className="space-y-4 font-sans text-sm text-cream-muted/70 leading-relaxed">
                <p>
                  For Daniel German, cooking has never been just a profession
                  &mdash; it is a calling. A graduate of Johnson &amp; Wales
                  University with dual degrees in Culinary Arts and Culinary
                  Nutrition, Daniel brings a rare combination of artistic vision
                  and nutritional expertise to every plate he creates.
                </p>
                <p>
                  His journey from professional kitchens to private dining was
                  born from a simple realization: the most memorable meals happen
                  in personal spaces, among people who matter. DG Creations is
                  the culmination of that belief &mdash; a culinary practice
                  dedicated to crafting intimate, unforgettable dining
                  experiences.
                </p>
                <p>
                  Whether it is a candlelit dinner for two, a weekend culinary
                  retreat, or a corporate event for hundreds, Daniel approaches
                  each engagement with the same philosophy: every plate should
                  tell a story, and every meal should be a memory worth keeping.
                </p>
              </div>
            </div>
            <div>
              <ImagePlaceholder
                label="Chef Daniel German — Portrait"
                aspectRatio="aspect-[3/4]"
              />
            </div>
          </div>
        </div>
      </section>

      <GoldDivider className="py-4 bg-dg-black" />

      {/* Journey / Timeline */}
      <section className="py-section bg-dg-black">
        <div className="container-brand">
          <SectionHeading
            label="The Journey"
            title="From Classroom to Kitchen to Your Table"
            subtitle="A career built on education, experience, and an unrelenting pursuit of culinary excellence."
          />

          <div className="max-w-3xl mx-auto space-y-0">
            {milestones.map((milestone, index) => (
              <div key={milestone.title} className="relative flex gap-8">
                {/* Timeline line */}
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-gold rotate-45 shrink-0 mt-1" />
                  {index < milestones.length - 1 && (
                    <div className="w-px flex-1 bg-dg-border" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-12">
                  <span className="inline-block font-sans text-xs uppercase tracking-[0.2em] text-gold mb-2">
                    {milestone.year}
                  </span>
                  <h3 className="font-serif text-xl md:text-2xl text-cream mb-2">
                    {milestone.title}
                  </h3>
                  <p className="font-sans text-sm text-cream-muted/60 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-section bg-dg-surface border-y border-dg-border/50">
        <div className="container-brand">
          <SectionHeading
            label="Philosophy"
            title="What Guides Every Dish"
            subtitle="The principles that define the DG Creations experience."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="p-8 bg-dg-black/50 border border-dg-border hover:border-gold/20 transition-all duration-500"
              >
                <h3 className="font-serif text-xl text-cream mb-3">
                  {value.title}
                </h3>
                <p className="font-sans text-sm text-cream-muted/60 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Behind the Scenes */}
      <section className="py-section bg-dg-black">
        <div className="container-brand">
          <SectionHeading
            label="Behind the Scenes"
            title="In the Kitchen"
            subtitle="A glimpse into the preparation, precision, and passion that goes into every DG Creations experience."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ImagePlaceholder
              label="Prep Work"
              aspectRatio="aspect-[4/5]"
            />
            <ImagePlaceholder
              label="Plating"
              aspectRatio="aspect-[4/5]"
            />
            <ImagePlaceholder
              label="Final Touch"
              aspectRatio="aspect-[4/5]"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-section bg-gradient-burgundy border-t border-burgundy-light/20">
        <div className="container-brand text-center">
          <h2 className="font-serif text-display-md font-semibold text-cream mb-4">
            Let&apos;s Create Together
          </h2>
          <p className="font-sans text-base text-cream/70 max-w-lg mx-auto mb-10">
            Ready to experience what Chef Daniel can create for your next
            occasion? Start with an inquiry.
          </p>
          <Link
            href="/inquire"
            className="inline-flex px-10 py-4 bg-gold text-dg-black text-sm font-sans font-semibold tracking-wider uppercase hover:bg-gold-light transition-all duration-300"
          >
            Start Your Inquiry
          </Link>
        </div>
      </section>
    </>
  );
}
