import Link from "next/link";

export default function StoryPreview() {
  return (
    <section className="py-section bg-cream">
      <div className="container-brand">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-terracotta mb-6">
            The Story
          </p>
          <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl font-light text-charcoal leading-relaxed mb-8">
            &ldquo;She&apos;s been sewing her entire life — not as a hobby, but
            as a gift. For her community, her church, her family. Now it&apos;s
            time the work was valued the way it always deserved to be.&rdquo;
          </blockquote>
          <p className="font-sans text-sm text-charcoal/50 tracking-wider uppercase mb-10">
            — Joshua Daniels, Janie&apos;s grandson
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-terracotta" />
              <p className="font-sans text-sm text-charcoal/70">
                76 years young, Walterboro, SC
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-terracotta" />
              <p className="font-sans text-sm text-charcoal/70">
                Serving Colleton County &amp; beyond
              </p>
            </div>
          </div>
          <div className="mt-10">
            <Link
              href="/about"
              className="font-sans text-sm font-medium tracking-[0.15em] uppercase text-terracotta hover:text-terracotta-dark transition-colors border-b border-terracotta/40 pb-0.5 hover:border-terracotta"
            >
              Meet Janie →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
