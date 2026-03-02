import Link from "next/link";
import ImagePlaceholder from "@/components/shared/ImagePlaceholder";

export default function Hero() {
  return (
    <section className="bg-cream-dark overflow-hidden">
      <div className="container-brand">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-20 md:py-28 lg:py-32">
          {/* Text */}
          <div className="order-2 lg:order-1">
            <p className="font-sans text-xs font-medium tracking-[0.25em] uppercase text-terracotta mb-6">
              Walterboro, South Carolina
            </p>
            <h1 className="font-serif text-display-lg md:text-display-xl font-medium text-charcoal leading-tight mb-4">
              Janie Bell&apos;s
              <br />
              <span className="text-terracotta">Alterations</span>
            </h1>
            <p className="font-serif text-xl md:text-2xl italic text-charcoal/70 mb-8">
              Fifty years of perfect fit.
            </p>
            <p className="font-sans text-base md:text-lg text-charcoal/70 leading-relaxed mb-10 max-w-md">
              Master seamstress Janie Bell Daniels has spent a lifetime getting
              garments right — hemming, tailoring, alterations, and custom
              sewing, done with precision and care in the heart of Colleton
              County.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/book"
                className="inline-flex items-center justify-center bg-terracotta text-cream font-sans text-xs font-medium tracking-[0.2em] uppercase px-8 py-4 hover:bg-terracotta-dark transition-colors rounded-brand"
              >
                Book an Alteration
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center border border-charcoal text-charcoal font-sans text-xs font-medium tracking-[0.2em] uppercase px-8 py-4 hover:bg-charcoal hover:text-cream transition-colors rounded-brand"
              >
                See Our Services
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-10 pt-8 border-t border-gray">
              <div className="text-center">
                <p className="font-serif text-3xl font-medium text-charcoal">50+</p>
                <p className="font-sans text-xs tracking-wider uppercase text-charcoal/50 mt-1">Years Experience</p>
              </div>
              <div className="w-px h-10 bg-gray-dark" />
              <div className="text-center">
                <p className="font-serif text-3xl font-medium text-charcoal">30 min</p>
                <p className="font-sans text-xs tracking-wider uppercase text-charcoal/50 mt-1">Avg. Hem Time</p>
              </div>
              <div className="w-px h-10 bg-gray-dark" />
              <div className="text-center">
                <p className="font-serif text-3xl font-medium text-charcoal">Local</p>
                <p className="font-sans text-xs tracking-wider uppercase text-charcoal/50 mt-1">+ Mail-In</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative">
            <ImagePlaceholder
              label="Photo of Janie at work"
              aspectRatio="portrait"
              className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto"
            />
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-2 border-gold/30 rounded-brand hidden lg:block" />
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-terracotta/10 rounded-brand hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
