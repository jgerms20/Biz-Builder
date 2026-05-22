import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "The full Comeback Truck menu — loaded dogs, handhelds, loaded sides, dinner plates, and more. Soul food made fresh and served hot.",
};

const loadedDogs = [
  {
    name: "Classic Loaded Dog",
    desc: "All-beef dog, house chili, cheddar, mustard, onions",
    price: "$8",
  },
  {
    name: "BBQ Bacon Dog",
    desc: "All-beef dog, BBQ sauce, crispy bacon, cheddar, jalapeños",
    price: "$9",
  },
  {
    name: "The Comeback Dog",
    desc: "All-beef dog, chili, cheese sauce, coleslaw, special sauce",
    price: "$10",
  },
];

const handhelds = [
  {
    name: "Pulled Pork Sandwich",
    desc: "Slow-smoked pulled pork, coleslaw, pickles on a brioche bun",
    price: "$10",
  },
  {
    name: "BBQ Chicken Sandwich",
    desc: "Grilled or fried chicken, BBQ sauce, pickles, slaw",
    price: "$10",
  },
  {
    name: "Catfish Po'Boy",
    desc: "Crispy fried catfish, lettuce, tomato, remoulade",
    price: "$11",
  },
];

const loadedSides = [
  {
    name: "Chili Cheese Fries",
    desc: "Crinkle fries, house chili, cheddar, scallions",
    price: "$8",
  },
  {
    name: "Loaded Nachos",
    desc: "Tortilla chips, chili, cheese sauce, jalapeños, sour cream",
    price: "$8",
  },
  {
    name: "Loaded Mac",
    desc: "Creamy mac & cheese topped with pulled pork and BBQ drizzle",
    price: "$9",
  },
];

const sides = [
  { name: "Crinkle Fries", price: "$4" },
  { name: "Mac & Cheese", price: "$5" },
  { name: "Coleslaw", price: "$3" },
  { name: "Collard Greens", price: "$4" },
  { name: "Potato Salad", price: "$4" },
  { name: "Corn Bread", price: "$2" },
];

const dinner = [
  {
    name: "Rib Plate",
    desc: "Slow-smoked ribs with two sides of your choice",
    price: "$15",
  },
  {
    name: "Fried Fish Plate",
    desc: "Crispy fried catfish with two sides of your choice",
    price: "$13",
  },
  {
    name: "Stuffed Meatloaf Plate",
    desc: "House meatloaf, glazed and finished hot, with two sides",
    price: "$12",
  },
  {
    name: "BBQ Chicken Plate",
    desc: "Half chicken, BBQ sauce, with two sides of your choice",
    price: "$13",
  },
];

const otherExtra = [
  { name: "Bottled Water", price: "$2" },
  { name: "Canned Soda", price: "$2" },
  { name: "Lemonade", price: "$3" },
  { name: "Extra Sauce", price: "$1" },
  { name: "Extra Side", price: "$4" },
];

export default function MenuPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-ct-black py-24 md:py-32 overflow-hidden">
        <div className="absolute w-[700px] h-[700px] rounded-full bg-ct-mustard/10 blur-[160px] top-[-250px] left-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="container-ct relative z-10 text-center">
          <span className="inline-block text-ct-mustard uppercase tracking-[0.25em] text-xs md:text-sm font-semibold font-sans mb-6">
            The Menu
          </span>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-ct-cream uppercase leading-tight">
            THE FULL{" "}
            <span className="text-ct-orange">SPREAD</span>
          </h1>
          <p className="text-ct-cream-muted text-base md:text-lg mt-6 max-w-xl mx-auto font-sans">
            Made fresh. Served hot. Soul food done right.
          </p>
        </div>
      </section>

      {/* COMBO CALLOUT BANNER */}
      <div className="bg-ct-orange py-4 px-6">
        <p className="text-center font-display text-white text-base md:text-xl uppercase tracking-wide">
          Make it a Combo!{" "}
          <span className="font-sans font-semibold normal-case tracking-normal text-white/90">
            Add fries &amp; a drink for $3.50
          </span>
        </p>
      </div>

      {/* SECTION: LOADED DOGS */}
      <section className="bg-ct-charcoal py-0">
        <div className="container-ct py-0 px-0">
          {/* Section Header Bar */}
          <div className="bg-ct-mustard px-6 md:px-10 py-4">
            <h2 className="font-display text-white text-2xl md:text-3xl uppercase tracking-widest">
              Loaded Dogs
            </h2>
          </div>
          {/* Items */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ct-border">
            {loadedDogs.map((item) => (
              <div
                key={item.name}
                className="bg-ct-charcoal px-6 py-8 flex flex-col gap-2"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-ct-cream text-lg md:text-xl uppercase leading-snug flex-1">
                    {item.name}
                  </h3>
                  <span className="font-display text-ct-orange text-xl md:text-2xl shrink-0">
                    {item.price}
                  </span>
                </div>
                <p className="text-ct-cream-muted font-sans text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: HANDHELDS */}
      <section className="bg-ct-black py-0">
        <div className="container-ct py-0 px-0">
          <div className="bg-ct-mustard px-6 md:px-10 py-4">
            <h2 className="font-display text-white text-2xl md:text-3xl uppercase tracking-widest">
              Handhelds
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ct-border">
            {handhelds.map((item) => (
              <div
                key={item.name}
                className="bg-ct-black px-6 py-8 flex flex-col gap-2"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-ct-cream text-lg md:text-xl uppercase leading-snug flex-1">
                    {item.name}
                  </h3>
                  <span className="font-display text-ct-orange text-xl md:text-2xl shrink-0">
                    {item.price}
                  </span>
                </div>
                <p className="text-ct-cream-muted font-sans text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: LOADED SIDES */}
      <section className="bg-ct-charcoal py-0">
        <div className="container-ct py-0 px-0">
          <div className="bg-ct-mustard px-6 md:px-10 py-4">
            <h2 className="font-display text-white text-2xl md:text-3xl uppercase tracking-widest">
              Loaded Sides
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ct-border">
            {loadedSides.map((item) => (
              <div
                key={item.name}
                className="bg-ct-charcoal px-6 py-8 flex flex-col gap-2"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-ct-cream text-lg md:text-xl uppercase leading-snug flex-1">
                    {item.name}
                  </h3>
                  <span className="font-display text-ct-orange text-xl md:text-2xl shrink-0">
                    {item.price}
                  </span>
                </div>
                <p className="text-ct-cream-muted font-sans text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: SIDES */}
      <section className="bg-ct-black py-0">
        <div className="container-ct py-0 px-0">
          <div className="bg-ct-mustard px-6 md:px-10 py-4">
            <h2 className="font-display text-white text-2xl md:text-3xl uppercase tracking-widest">
              Sides
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-ct-border">
            {sides.map((item) => (
              <div
                key={item.name}
                className="bg-ct-black px-6 py-6 flex items-center justify-between gap-4"
              >
                <span className="font-display text-ct-cream text-base md:text-lg uppercase leading-snug">
                  {item.name}
                </span>
                <span className="font-display text-ct-orange text-lg md:text-xl shrink-0">
                  {item.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: DINNER */}
      <section className="bg-ct-charcoal py-0">
        <div className="container-ct py-0 px-0">
          <div className="bg-ct-mustard px-6 md:px-10 py-4">
            <h2 className="font-display text-white text-2xl md:text-3xl uppercase tracking-widest">
              Dinner
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ct-border">
            {dinner.map((item) => (
              <div
                key={item.name}
                className="bg-ct-charcoal px-6 py-8 flex flex-col gap-2"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-ct-cream text-lg md:text-xl uppercase leading-snug flex-1">
                    {item.name}
                  </h3>
                  <span className="font-display text-ct-orange text-xl md:text-2xl shrink-0">
                    {item.price}
                  </span>
                </div>
                <p className="text-ct-cream-muted font-sans text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: OTHER & EXTRA */}
      <section className="bg-ct-black py-0">
        <div className="container-ct py-0 px-0">
          <div className="bg-ct-mustard px-6 md:px-10 py-4">
            <h2 className="font-display text-white text-2xl md:text-3xl uppercase tracking-widest">
              Other &amp; Extra
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-ct-border">
            {otherExtra.map((item) => (
              <div
                key={item.name}
                className="bg-ct-black px-5 py-6 flex flex-col items-center gap-1 text-center"
              >
                <span className="font-display text-ct-cream text-sm md:text-base uppercase leading-snug">
                  {item.name}
                </span>
                <span className="font-display text-ct-orange text-base md:text-lg">
                  {item.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATERING BANNER */}
      <section className="bg-ct-orange py-8 px-6">
        <div className="container-ct text-center">
          <p className="font-display text-white text-xl md:text-3xl uppercase tracking-wide leading-snug">
            Catering &amp; Events Available!
          </p>
          <p className="font-sans text-white/90 text-base md:text-lg mt-2">
            Call or message us —{" "}
            <a
              href="tel:8033803309"
              className="underline underline-offset-2 hover:text-white transition-colors"
            >
              803-380-3309
            </a>
          </p>
        </div>
      </section>

      {/* ORDER NOTE */}
      <section className="bg-ct-black py-10">
        <div className="container-ct text-center">
          <p className="text-ct-muted font-sans text-sm max-w-2xl mx-auto leading-relaxed">
            Menu and pricing subject to change. Follow{" "}
            <a
              href="https://www.instagram.com/the.comeback.truck"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ct-mustard hover:text-ct-cream transition-colors"
            >
              @the.comeback.truck
            </a>{" "}
            on Instagram for daily specials and updates.
          </p>
        </div>
      </section>
    </>
  );
}
