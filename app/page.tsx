import Hero from "@/components/home/Hero";
import StoryPreview from "@/components/home/StoryPreview";
import ServicesGrid from "@/components/home/ServicesGrid";
import HowItWorksPreview from "@/components/home/HowItWorksPreview";
import Testimonials from "@/components/home/Testimonials";
import TikTokSection from "@/components/home/TikTokSection";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />
      <StoryPreview />
      <ServicesGrid />
      <HowItWorksPreview />
      <Testimonials />
      <TikTokSection />

      {/* CTA Banner */}
      <section className="py-16 bg-terracotta">
        <div className="container-brand text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-cream mb-4">
            Ready for a perfect fit?
          </h2>
          <p className="font-sans text-base text-cream/80 mb-8 max-w-md mx-auto">
            Local to Walterboro or shipping from across the country — Janie
            handles it all.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center justify-center bg-cream text-terracotta font-sans text-xs font-medium tracking-[0.2em] uppercase px-8 py-4 hover:bg-cream-dark transition-colors rounded-brand"
            >
              Book an Alteration
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-cream/50 text-cream font-sans text-xs font-medium tracking-[0.2em] uppercase px-8 py-4 hover:border-cream hover:bg-cream/10 transition-colors rounded-brand"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
