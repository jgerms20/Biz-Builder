import Link from "next/link";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import GoldDivider from "@/components/ui/GoldDivider";
import ServiceCard from "@/components/ui/ServiceCard";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-dg-black">
          <div className="absolute inset-0 bg-gradient-to-b from-dg-black/50 via-transparent to-dg-black" />
          <Image
            src="/images/chef-daniel.jpg"
            alt="Chef Daniel German at work"
            fill
            className="object-cover opacity-30"
            priority
            quality={85}
            sizes="100vw"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 container-brand text-center pt-20">
          <div className="max-w-3xl mx-auto">
            <span className="inline-block font-sans text-xs uppercase tracking-[0.4em] text-gold mb-6 animate-shimmer">
              Private Chef &middot; Private Dining &middot; Catering
            </span>

            <h1 className="font-serif text-display-lg md:text-display-xl font-semibold text-cream mb-6">
              Every Plate,
              <br />
              <span className="text-gold">a Creation</span>
            </h1>

            <p className="font-sans text-base md:text-lg text-cream-muted/70 max-w-xl mx-auto leading-relaxed mb-10">
              Intimate dining experiences crafted with precision, passion, and a
              deep respect for ingredients. Chef Daniel German brings the
              restaurant to you.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/inquire"
                className="inline-flex px-8 py-3.5 bg-gold text-dg-black text-sm font-sans font-semibold tracking-wider uppercase hover:bg-gold-light transition-all duration-300"
              >
                Begin Your Experience
              </Link>
              <Link
                href="/experiences"
                className="inline-flex px-8 py-3.5 border border-cream/20 text-cream text-sm font-sans tracking-wider uppercase hover:border-gold/50 hover:text-gold transition-all duration-300"
              >
                View Experiences
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-cream-muted/40">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-gold/40 to-transparent" />
        </div>
      </section>

      {/* Introduction */}
      <section className="py-section bg-dg-black">
        <div className="container-brand">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/images/chef-daniel.jpg"
                  alt="Chef Daniel German"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            <div>
              <span className="inline-block font-sans text-xs uppercase tracking-[0.3em] text-gold mb-4">
                The Chef
              </span>
              <h2 className="font-serif text-display-md font-semibold text-cream mb-6">
                Culinary Artistry,
                <br />
                Delivered to You
              </h2>
              <div className="space-y-4 font-sans text-sm text-cream-muted/70 leading-relaxed">
                <p>
                  Chef Daniel German is a Johnson &amp; Wales University
                  graduate, holding degrees in both Culinary Arts and Culinary
                  Nutrition. His approach transcends traditional cooking &mdash;
                  every dish is designed as an experience, every meal a narrative.
                </p>
                <p>
                  From intimate dinners for two to lavish multi-day retreats,
                  Daniel brings Michelin-level precision to the privacy and
                  comfort of your own space.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 font-sans text-sm text-gold hover:text-gold-light transition-colors duration-300 tracking-wide"
                >
                  Read His Story
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GoldDivider className="py-4 bg-dg-black" />

      {/* Services Overview */}
      <section className="py-section bg-dg-black">
        <div className="container-brand">
          <SectionHeading
            label="What We Offer"
            title="Tailored Culinary Services"
            subtitle="Whether it is an intimate dinner, a grand celebration, or your weekly meals, every offering is crafted with the same exacting standard."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <ServiceCard
              title="Private Dining"
              description="An exclusive, multi-course dining experience in the comfort of your home. From a single evening to multi-day retreats."
              href="/experiences"
              imageLabel="Private Dining Experience"
              priceHint="From $150 per person"
            />
            <ServiceCard
              title="Catering"
              description="Elegant catering for corporate events, celebrations, and gatherings of any scale. Custom menus, flawless execution."
              href="/catering"
              imageLabel="Catering Service"
              priceHint="From $65 per person"
            />
            <ServiceCard
              title="Meal Prep"
              description="Chef-crafted, nutritionally balanced meals prepared and delivered weekly. Fuel your life with restaurant-quality food."
              href="/meal-prep"
              imageLabel="Meal Prep Service"
              priceHint="From $250 per week"
            />
          </div>
        </div>
      </section>

      {/* Philosophy Strip */}
      <section className="py-section bg-dg-surface border-y border-dg-border/50">
        <div className="container-brand text-center">
          <span className="inline-block font-sans text-xs uppercase tracking-[0.3em] text-gold mb-6">
            Our Philosophy
          </span>
          <blockquote className="font-serif text-display-sm md:text-display-md text-cream font-light italic max-w-3xl mx-auto">
            &ldquo;Food is not just sustenance &mdash; it is memory, it is art,
            it is the language of care. I cook so that every bite tells a
            story.&rdquo;
          </blockquote>
          <p className="mt-6 font-sans text-sm text-gold/70 uppercase tracking-[0.2em]">
            &mdash; Chef Daniel German
          </p>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-section bg-dg-black">
        <div className="container-brand">
          <SectionHeading
            label="Portfolio"
            title="A Taste of What Awaits"
            subtitle="Moments captured from private dining experiences, events, and behind-the-scenes preparation."
          />

          {/* Gallery grid - real photos for first 4, placeholders for last 4 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { src: "/images/food-pasta.jpg", alt: "Pan-seared shrimp pasta" },
              { src: "/images/food-pork.jpg", alt: "Pork chop with fruit salsa" },
              { src: "/images/food-salad.jpg", alt: "Seasonal garden salad" },
              { src: "/images/food-seafood.jpg", alt: "Seared scallops and octopus" },
            ].map((img) => (
              <div key={img.alt} className="relative aspect-square overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
            {["Ingredients", "Wine Pairing", "Private Event", "Final Presentation"].map((label) => (
              <ImagePlaceholder
                key={label}
                label={label}
                aspectRatio="aspect-square"
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-section bg-gradient-burgundy border-t border-burgundy-light/20">
        <div className="container-brand text-center">
          <h2 className="font-serif text-display-md md:text-display-lg font-semibold text-cream mb-4">
            Ready to Create Something
            <br />
            <span className="text-gold">Extraordinary?</span>
          </h2>
          <p className="font-sans text-base text-cream/70 max-w-lg mx-auto mb-10">
            Every experience begins with a conversation. Share your vision, and
            Chef Daniel will craft something unforgettable.
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
