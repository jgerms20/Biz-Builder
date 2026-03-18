import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
    year: "Age 13",
    label: "The Beginning",
    title: "Highway 55 Burgers",
    description:
      "At just thirteen, Daniel stepped into his first commercial kitchen. The fast pace, the heat, the rhythm of a working line — it all clicked immediately. This is where the foundation was laid.",
    imageLabel: "First Kitchen Job",
  },
  {
    year: "High School",
    label: "Building Heat",
    title: "Rio's Brazilian Steakhouse",
    description:
      "Working alongside experienced grill masters at a Brazilian churrascaria, Daniel developed an early understanding of fire, protein, and the art of tableside service.",
    imageLabel: "Rio's Brazilian Steakhouse",
  },
  {
    year: "Pre-College",
    label: "Going Pro",
    title: "Carolina Ale House",
    description:
      "Before heading to culinary school, Daniel sharpened his skills in a high-volume kitchen, building the discipline and speed that professional cooking demands.",
    imageLabel: "Carolina Ale House Kitchen",
  },
  {
    year: "While at JWU",
    label: "Leveling Up",
    title: "Luxury Hotel Kitchen",
    description:
      "While pursuing his degrees, Daniel trained in a luxury hotel kitchen — an environment where precision, plating, and consistency are not optional.",
    imageLabel: "Hotel Kitchen Training",
  },
  {
    year: "Education",
    label: "The Foundation",
    title: "Johnson & Wales University",
    description:
      "Dual degrees in Culinary Arts and Culinary Nutrition from one of the most respected culinary programs in the country. The academic rigor and hands-on training that built everything that followed.",
    imageLabel: "Johnson & Wales University",
  },
  {
    year: "Post-Grad",
    label: "The Craft",
    title: "Private Dining",
    description:
      "After graduating, Daniel discovered that the most meaningful culinary moments happen in intimate settings — private homes, small gatherings, personal celebrations where the chef and the guest connect.",
    imageLabel: "Private Dining Experience",
  },
  {
    year: "Today",
    label: "The Vision",
    title: "DG Creations",
    description:
      "A full-service culinary brand offering private dining experiences, bespoke catering, and personalized meal preparation. Every plate, a creation.",
    imageLabel: "DG Creations — Today",
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
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/images/chef-daniel.jpg"
                  alt="Chef Daniel German — Private Chef"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
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

          <div className="max-w-5xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={milestone.title}>
                {/* Mobile: vertical stacked layout */}
                <div className="md:hidden flex gap-6 pb-12">
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-3 h-3 bg-gold rotate-45 mt-1 shrink-0" />
                    {index < milestones.length - 1 && (
                      <div className="w-px flex-1 bg-dg-border mt-1" />
                    )}
                  </div>
                  <div className="flex-1 space-y-3 pb-2">
                    <div>
                      <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold/70">
                        {milestone.label}
                      </span>
                      <span className="font-sans text-xs uppercase tracking-[0.2em] text-gold ml-3">
                        {milestone.year}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl text-cream">{milestone.title}</h3>
                    <p className="font-sans text-sm text-cream-muted/60 leading-relaxed">
                      {milestone.description}
                    </p>
                    <ImagePlaceholder label={milestone.imageLabel} aspectRatio="aspect-[16/10]" />
                  </div>
                </div>

                {/* Desktop: alternating left/right layout */}
                <div className="hidden md:grid md:grid-cols-[1fr_3rem_1fr] gap-x-8 pb-16 items-start">
                  {/* Left column — text on even, image on odd */}
                  <div className={index % 2 === 0 ? "text-right pr-4" : "pr-4"}>
                    {index % 2 === 0 ? (
                      <div>
                        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold/70 block mb-1">
                          {milestone.label}
                        </span>
                        <span className="font-sans text-xs uppercase tracking-[0.2em] text-gold block mb-3">
                          {milestone.year}
                        </span>
                        <h3 className="font-serif text-2xl text-cream mb-3">{milestone.title}</h3>
                        <p className="font-sans text-sm text-cream-muted/60 leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    ) : (
                      <ImagePlaceholder label={milestone.imageLabel} aspectRatio="aspect-[16/10]" />
                    )}
                  </div>

                  {/* Center — diamond + connecting line */}
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 bg-gold rotate-45 shrink-0" />
                    {index < milestones.length - 1 && (
                      <div className="w-px flex-1 bg-dg-border mt-1" style={{ minHeight: "4rem" }} />
                    )}
                  </div>

                  {/* Right column — image on even, text on odd */}
                  <div className="pl-4">
                    {index % 2 === 0 ? (
                      <ImagePlaceholder label={milestone.imageLabel} aspectRatio="aspect-[16/10]" />
                    ) : (
                      <div>
                        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold/70 block mb-1">
                          {milestone.label}
                        </span>
                        <span className="font-sans text-xs uppercase tracking-[0.2em] text-gold block mb-3">
                          {milestone.year}
                        </span>
                        <h3 className="font-serif text-2xl text-cream mb-3">{milestone.title}</h3>
                        <p className="font-sans text-sm text-cream-muted/60 leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    )}
                  </div>
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
