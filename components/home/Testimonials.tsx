const testimonials = [
  {
    quote:
      "She hemmed three pairs of pants in under an hour. The finish was cleaner than anything I've ever gotten from a dry cleaner or tailor. This woman is the real thing.",
    author: "Community Member",
    location: "Walterboro, SC",
    placeholder: true,
  },
  {
    quote:
      "My daughter's prom dress needed serious work — taken in, straps adjusted, hem raised. Janie made it look custom-made. She cried when she tried it on.",
    author: "Local Mother",
    location: "Colleton County, SC",
    placeholder: true,
  },
  {
    quote:
      "I shipped a suit from Atlanta that didn't fit right off the rack. Got it back perfectly tailored. Worth every penny and the shipping cost twice over.",
    author: "Mail-In Customer",
    location: "Atlanta, GA",
    placeholder: true,
  },
];

export default function Testimonials() {
  return (
    <section className="py-section bg-cream">
      <div className="container-brand">
        <div className="text-center mb-12 md:mb-16">
          <p className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-terracotta mb-3">
            What People Say
          </p>
          <h2 className="font-serif text-display-sm md:text-display-md font-medium text-charcoal">
            Testimonials
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-cream-dark p-8 rounded-brand border border-gray relative"
            >
              {t.placeholder && (
                <div className="absolute top-3 right-3">
                  <span className="font-sans text-[10px] tracking-wider uppercase text-charcoal/30 bg-gray px-2 py-1 rounded">
                    Placeholder
                  </span>
                </div>
              )}
              <svg
                className="w-8 h-8 text-terracotta/30 mb-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="font-serif text-lg font-light text-charcoal leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="border-t border-gray pt-4">
                <p className="font-sans text-sm font-medium text-charcoal">
                  {t.author}
                </p>
                <p className="font-sans text-xs text-charcoal/50 mt-0.5">
                  {t.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center font-sans text-xs text-charcoal/40 mt-8">
          Add real testimonials by editing <code className="bg-gray px-1 rounded">components/home/Testimonials.tsx</code>
        </p>
      </div>
    </section>
  );
}
