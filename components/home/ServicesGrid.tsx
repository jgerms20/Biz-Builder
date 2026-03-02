import Link from "next/link";

const services = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M4 6h16M4 10h16M4 14h8" />
      </svg>
    ),
    title: "Hemming",
    description:
      "Pants, dresses, skirts — hemmed to your exact length with a clean, professional finish.",
    price: "From $18",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 4V20M8 8l4-4 4 4M8 16l4 4 4-4" />
      </svg>
    ),
    title: "Tapering",
    description:
      "Slim and shape pants, shirts, or jackets so they fit the way they were meant to.",
    price: "From $35",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: "Taking In & Letting Out",
    description:
      "Waist, sides, sleeves — adjusted to fit your body, not the other way around.",
    price: "From $28",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Dress & Formal Wear",
    description:
      "Wedding dresses, bridesmaids, church best, prom — handled with the care they deserve.",
    price: "From $30",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
    title: "Repairs & Mending",
    description:
      "Ripped seams, broken zippers, worn fabric — restored so you can keep wearing what you love.",
    price: "From $15",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: "Mail-In Orders",
    description:
      "Not local? Ship your garment to Walterboro. Janie alters it, ships it back. Nationwide.",
    price: "+$10 handling",
  },
];

export default function ServicesGrid() {
  return (
    <section className="py-section bg-cream-dark">
      <div className="container-brand">
        <div className="text-center mb-12 md:mb-16">
          <p className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-terracotta mb-3">
            What We Do
          </p>
          <h2 className="font-serif text-display-sm md:text-display-md font-medium text-charcoal">
            Services
          </h2>
          <p className="mt-4 text-base text-charcoal/70 max-w-lg mx-auto">
            Every service is handled by Janie herself — with the same attention
            to detail she&apos;s brought to every garment for over 50 years.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-cream p-8 rounded-brand border border-gray hover:border-terracotta/40 transition-colors group"
            >
              <div className="text-terracotta mb-4">{service.icon}</div>
              <h3 className="font-serif text-xl font-medium text-charcoal mb-2 group-hover:text-terracotta transition-colors">
                {service.title}
              </h3>
              <p className="font-sans text-sm text-charcoal/60 leading-relaxed mb-4">
                {service.description}
              </p>
              <p className="font-sans text-sm font-medium text-terracotta tracking-wide">
                {service.price}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/services"
            className="inline-flex items-center justify-center border border-charcoal text-charcoal font-sans text-xs font-medium tracking-[0.2em] uppercase px-8 py-4 hover:bg-charcoal hover:text-cream transition-colors rounded-brand"
          >
            Full Price List →
          </Link>
        </div>
      </div>
    </section>
  );
}
