import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import GoldDivider from "@/components/ui/GoldDivider";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

export const metadata: Metadata = {
  title: "Menus",
  description:
    "Explore DG Creations menu offerings: brunch, lunch, dinner, dessert bundles, and seasonal menus. Every dish crafted by Chef Daniel German.",
};

const menuCategories = [
  {
    id: "brunch",
    title: "Brunch",
    subtitle: "Late Morning Luxury",
    description:
      "Elevated brunch offerings that blend comfort with sophistication. From savory egg preparations to artisanal pastries, each brunch menu is designed to start the day with intention.",
    sampleDishes: [
      "Truffle Scrambled Eggs with Chive Cr\u00e8me Fra\u00eeche",
      "Brioche French Toast with Caramelized Stone Fruit",
      "Smoked Salmon Benedict with Hollandaise",
      "Shakshuka with Harissa and Fresh Herbs",
      "House-Made Granola with Seasonal Compote",
      "Fresh-Pressed Juices and Craft Mimosa Bar",
    ],
  },
  {
    id: "lunch",
    title: "Lunch",
    subtitle: "Midday Refinement",
    description:
      "Light yet substantial, lunch menus are designed for business gatherings, daytime events, or leisurely afternoon affairs. Clean flavors, beautiful presentation.",
    sampleDishes: [
      "Seared Ahi Tuna Nicoise with Quail Egg",
      "Roasted Beet and Burrata Salad with Pistachio",
      "Pan-Seared Halibut with Citrus Beurre Blanc",
      "Heirloom Tomato Gazpacho with Basil Oil",
      "Grilled Lamb Chops with Mint Gremolata",
      "Artisanal Cheese and Charcuterie Board",
    ],
  },
  {
    id: "dinner",
    title: "Dinner",
    subtitle: "The Main Event",
    description:
      "The centerpiece of the DG Creations experience. Multi-course dinner menus designed to take guests on a culinary journey — from amuse-bouche to the final petit four.",
    sampleDishes: [
      "Lobster Bisque with Cognac Cream",
      "Wagyu Beef Tartare with Truffle Aioli",
      "Pan-Roasted Duck Breast with Cherry Reduction",
      "Herb-Crusted Rack of Lamb with Rosemary Jus",
      "Miso-Glazed Chilean Sea Bass",
      "Dark Chocolate Souffl\u00e9 with Gold Leaf",
    ],
  },
  {
    id: "dessert",
    title: "Dessert Bundles",
    subtitle: "Sweet Finales",
    description:
      "Dessert is not an afterthought — it is the crescendo. Standalone dessert bundles perfect for celebrations, or as the final chapter of a full dining experience.",
    sampleDishes: [
      "Cr\u00e8me Br\u00fbl\u00e9e Trio — Vanilla, Lavender, Espresso",
      "Deconstructed Tiramisu with Mascarpone Foam",
      "Seasonal Fruit Tart with Pastry Cream",
      "Chocolate Fondant with Salted Caramel",
      "Passion Fruit Panna Cotta",
      "Artisanal Petit Fours Collection",
    ],
  },
  {
    id: "seasonal",
    title: "Seasonal Menus",
    subtitle: "Nature\u2019s Calendar",
    description:
      "Menus that change with the seasons, celebrating peak ingredients at their most vibrant. Spring blossoms, summer abundance, autumn warmth, and winter comfort — each season tells its own story.",
    sampleDishes: [
      "Spring: Pea and Mint Risotto with Pecorino",
      "Spring: Grilled Asparagus with Poached Egg",
      "Summer: Heirloom Tomato Caprese with Burrata",
      "Autumn: Butternut Squash Velouté with Sage",
      "Autumn: Braised Short Rib with Root Vegetables",
      "Winter: Truffle Risotto with Aged Parmesan",
    ],
  },
];

export default function MenusPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-section bg-dg-black">
        <div className="container-brand text-center">
          <span className="inline-block font-sans text-xs uppercase tracking-[0.3em] text-gold mb-4">
            Our Menus
          </span>
          <h1 className="font-serif text-display-lg md:text-display-xl font-semibold text-cream mb-6">
            Curated with
            <br />
            <span className="text-gold">Intention</span>
          </h1>
          <p className="font-sans text-base md:text-lg text-cream-muted/70 max-w-2xl mx-auto leading-relaxed">
            Every menu is a starting point — a canvas that Chef Daniel
            customizes to your preferences, dietary needs, and the story you
            want your meal to tell.
          </p>
        </div>
      </section>

      <GoldDivider className="py-2 bg-dg-black" />

      {/* Menu Categories */}
      <section className="py-section bg-dg-black">
        <div className="container-brand space-y-20 md:space-y-28">
          {menuCategories.map((category, index) => (
            <div key={category.id} id={category.id}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
                {/* Image */}
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <ImagePlaceholder
                    label={`${category.title} Menu`}
                    aspectRatio="aspect-[4/3]"
                  />
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <span className="inline-block font-sans text-xs uppercase tracking-[0.3em] text-gold mb-2">
                    {category.subtitle}
                  </span>
                  <h2 className="font-serif text-display-sm md:text-display-md font-semibold text-cream mb-4">
                    {category.title}
                  </h2>
                  <p className="font-sans text-sm text-cream-muted/70 leading-relaxed mb-8">
                    {category.description}
                  </p>

                  {/* Sample Dishes */}
                  <div>
                    <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-cream-muted/40 mb-4">
                      Sample Dishes
                    </h3>
                    <ul className="space-y-3">
                      {category.sampleDishes.map((dish) => (
                        <li
                          key={dish}
                          className="flex items-start gap-3 font-sans text-sm text-cream-muted/60"
                        >
                          <span className="w-1 h-1 bg-gold rounded-full mt-2 shrink-0" />
                          {dish}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {index < menuCategories.length - 1 && (
                <GoldDivider className="mt-20 md:mt-28" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Note */}
      <section className="py-section bg-dg-surface border-y border-dg-border/50">
        <div className="container-brand text-center">
          <SectionHeading
            label="A Note on Our Menus"
            title="Fully Customizable"
            subtitle="The menus shown here are representative samples. Every DG Creations experience features a menu designed specifically for you — your preferences, dietary restrictions, and vision guide every decision."
          />
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            {[
              "Gluten-Free",
              "Dairy-Free",
              "Vegan",
              "Vegetarian",
              "Keto",
              "Halal",
              "Kosher",
              "Allergy-Sensitive",
            ].map((badge) => (
              <span
                key={badge}
                className="px-4 py-1.5 border border-dg-border text-xs font-sans text-cream-muted/50 uppercase tracking-wider"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-section bg-gradient-burgundy border-t border-burgundy-light/20">
        <div className="container-brand text-center">
          <h2 className="font-serif text-display-md font-semibold text-cream mb-4">
            Ready to Design Your Menu?
          </h2>
          <p className="font-sans text-base text-cream/70 max-w-lg mx-auto mb-10">
            Share your preferences and Chef Daniel will create a bespoke menu
            tailored to your event.
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
