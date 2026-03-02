import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import GoldDivider from "@/components/ui/GoldDivider";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

export const metadata: Metadata = {
  title: "Meal Prep Services",
  description:
    "Chef-crafted, nutritionally balanced meal prep by Daniel German. Weekly and monthly plans starting from $250/week. Personalized to your dietary needs.",
};

const plans = [
  {
    name: "Essential",
    meals: "4 meals per week",
    price: "$250",
    period: "per week",
    description:
      "Perfect for supplementing your week with chef-quality meals. Ideal for busy professionals who want elevated lunches or dinners without the effort.",
    includes: [
      "4 individually portioned meals",
      "Rotating weekly menu",
      "Nutritional information provided",
      "Eco-friendly packaging",
      "Weekly delivery",
    ],
  },
  {
    name: "Standard",
    meals: "5 meals per week",
    price: "$325",
    period: "per week",
    description:
      "The most popular plan. Five days of chef-prepared meals that cover your weekday dinners or a mix of lunch and dinner throughout the week.",
    includes: [
      "5 individually portioned meals",
      "Personalized menu preferences",
      "Macro-balanced options available",
      "Dietary restriction accommodation",
      "Flexible delivery scheduling",
    ],
    featured: true,
  },
  {
    name: "Premium",
    meals: "7 meals per week",
    price: "$450",
    period: "per week",
    description:
      "Full-week coverage for those who want restaurant-quality food every single day. Complete nutritional optimization with variety and balance.",
    includes: [
      "7 individually portioned meals",
      "Full dietary customization",
      "Snack and side add-ons available",
      "Priority scheduling",
      "Direct communication with Chef Daniel",
      "Monthly menu consultation",
    ],
  },
];

export default function MealPrepPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-section bg-dg-black">
        <div className="container-brand text-center">
          <span className="inline-block font-sans text-xs uppercase tracking-[0.3em] text-gold mb-4">
            Meal Preparation
          </span>
          <h1 className="font-serif text-display-lg md:text-display-xl font-semibold text-cream mb-6">
            Chef-Crafted Meals,
            <br />
            <span className="text-gold">Delivered Weekly</span>
          </h1>
          <p className="font-sans text-base md:text-lg text-cream-muted/70 max-w-2xl mx-auto leading-relaxed">
            Nutrition meets artistry. Chef Daniel prepares personalized,
            restaurant-quality meals tailored to your dietary needs and taste
            preferences — delivered fresh to your door.
          </p>
        </div>
      </section>

      <GoldDivider className="py-2 bg-dg-black" />

      {/* Plans */}
      <section className="py-section bg-dg-black">
        <div className="container-brand">
          <SectionHeading
            label="Weekly Plans"
            title="Choose Your Plan"
            subtitle="Each plan is fully customizable. Dietary restrictions, flavor preferences, and nutritional goals are all considered."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-dg-surface border transition-all duration-500 p-8 flex flex-col ${
                  plan.featured
                    ? "border-gold/40 shadow-[0_0_40px_-10px_rgba(201,168,92,0.15)]"
                    : "border-dg-border hover:border-gold/20"
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold text-dg-black text-[10px] font-sans font-semibold uppercase tracking-[0.2em]">
                    Most Popular
                  </span>
                )}

                <div className="mb-6">
                  <h3 className="font-serif text-2xl text-cream mb-1">
                    {plan.name}
                  </h3>
                  <p className="font-sans text-xs text-cream-muted/50 uppercase tracking-wider">
                    {plan.meals}
                  </p>
                </div>

                <div className="mb-6">
                  <span className="font-serif text-display-sm text-gold">
                    {plan.price}
                  </span>
                  <span className="font-sans text-sm text-cream-muted/40 ml-2">
                    {plan.period}
                  </span>
                </div>

                <p className="font-sans text-sm text-cream-muted/60 leading-relaxed mb-6">
                  {plan.description}
                </p>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 font-sans text-sm text-cream-muted/50"
                    >
                      <span className="w-1 h-1 bg-gold rounded-full mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/inquire"
                  className={`inline-flex justify-center px-6 py-3 text-sm font-sans tracking-wider uppercase transition-all duration-300 ${
                    plan.featured
                      ? "bg-gold text-dg-black font-semibold hover:bg-gold-light"
                      : "bg-gold/10 border border-gold/30 text-gold hover:bg-gold/20 hover:border-gold/50"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Meal Prep Works */}
      <section className="py-section bg-dg-surface border-y border-dg-border/50">
        <div className="container-brand">
          <SectionHeading
            label="How It Works"
            title="Your Weekly Meal Prep Process"
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Consult",
                desc: "Share your dietary needs, preferences, allergies, and nutritional goals.",
              },
              {
                step: "02",
                title: "Menu Design",
                desc: "Chef Daniel designs a rotating weekly menu tailored to your profile.",
              },
              {
                step: "03",
                title: "Preparation",
                desc: "Meals are freshly prepared using premium ingredients, portioned and packaged.",
              },
              {
                step: "04",
                title: "Delivery",
                desc: "Fresh meals delivered to your door on your preferred day, ready to heat and enjoy.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <span className="inline-block font-serif text-3xl text-gold/30 mb-3">
                  {item.step}
                </span>
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

      {/* The Nutritional Edge */}
      <section className="py-section bg-dg-black">
        <div className="container-brand">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <ImagePlaceholder
                label="Meal Prep Spread"
                aspectRatio="aspect-[4/3]"
              />
            </div>
            <div>
              <span className="inline-block font-sans text-xs uppercase tracking-[0.3em] text-gold mb-4">
                The Nutritional Edge
              </span>
              <h2 className="font-serif text-display-sm md:text-display-md font-semibold text-cream mb-6">
                Flavor Meets Function
              </h2>
              <div className="space-y-4 font-sans text-sm text-cream-muted/70 leading-relaxed">
                <p>
                  With a degree in Culinary Nutrition from Johnson &amp; Wales
                  University, Chef Daniel brings a rare expertise to meal
                  preparation. Every meal is designed to deliver optimal
                  nutrition without sacrificing the flavors and textures that
                  make food enjoyable.
                </p>
                <p>
                  Whether you are training for performance, managing a health
                  condition, or simply want to eat better — DG Creations meal
                  prep is crafted with your specific goals in mind.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 mt-6">
                {[
                  "Macro-Balanced",
                  "Allergen-Aware",
                  "Performance Nutrition",
                  "Weight Management",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 border border-dg-border text-xs font-sans text-cream-muted/50 uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-section bg-gradient-burgundy border-t border-burgundy-light/20">
        <div className="container-brand text-center">
          <h2 className="font-serif text-display-md font-semibold text-cream mb-4">
            Start Eating Better Today
          </h2>
          <p className="font-sans text-base text-cream/70 max-w-lg mx-auto mb-10">
            Tell us about your dietary needs and schedule, and we will design
            your personalized meal prep plan.
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
