export default function TikTokSection() {
  return (
    <section className="py-section-sm bg-cream-dark">
      <div className="container-brand">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-terracotta mb-3">
            Follow Along
          </p>
          <h2 className="font-serif text-display-sm md:text-3xl font-medium text-charcoal mb-4">
            Watch Janie Work
          </h2>
          <p className="font-sans text-base text-charcoal/70 leading-relaxed mb-8">
            See the craft in real time — 50+ years of mastery, one stitch at a
            time. Follow on TikTok for behind-the-scenes from the sewing room.
          </p>

          {/* TikTok embed placeholder */}
          <div className="bg-charcoal/5 border-2 border-dashed border-charcoal/20 rounded-brand p-12 mb-8">
            <svg
              className="w-12 h-12 mx-auto text-charcoal/20 mb-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.28 8.28 0 004.84 1.54V6.75a4.84 4.84 0 01-1.07-.06z" />
            </svg>
            <p className="font-sans text-sm text-charcoal/40 tracking-wide uppercase">
              TikTok embed coming soon
            </p>
            <p className="font-sans text-xs text-charcoal/30 mt-2">
              Replace this block with your TikTok embed code
            </p>
          </div>

          <a
            href="https://www.tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-charcoal text-cream font-sans text-xs font-medium tracking-[0.2em] uppercase px-8 py-4 hover:bg-charcoal-light transition-colors rounded-brand"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.28 8.28 0 004.84 1.54V6.75a4.84 4.84 0 01-1.07-.06z" />
            </svg>
            Follow on TikTok
          </a>
        </div>
      </div>
    </section>
  );
}
