import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import QRCodeBlock from "@/components/ui/QRCodeBlock";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "The full Comeback Truck menu — loaded dogs, handhelds, loaded sides, dinner plates, and more. Soul food made fresh and served hot.",
};

const loadedDogs = [
  { name: "Regular Hot Dog", desc: "All-beef hot dog, classic style", price: "$6", image: null },
  { name: "Slaw Dog", desc: "All-beef dog topped with house coleslaw", price: "$7", image: null },
  { name: "Comeback Dog", desc: "All-beef dog, chili, 4-cheese comeback sauce, coleslaw", price: "$8", image: "/images/IMG_9507.jpeg" },
  { name: "Pulled Pork Dog", desc: "All-beef dog piled high with smoked pulled pork and BBQ drizzle", price: "$9", image: null },
];

const handhelds = [
  { name: "BBQ Sandwich", desc: "Slow-smoked BBQ on a toasted bun with pickles and sauce", price: "$9", image: "/images/IMG_9489.jpeg" },
  { name: "Pulled Pork Sandwich", desc: "Tender pulled pork, coleslaw, brioche bun", price: "$10", image: "/images/IMG_9501.jpeg" },
];

const dinner = [
  { name: "Fish Plate", desc: "Crispy fried catfish — 1 or 2 pieces, served with 2 sides", price: "$10 / $13", image: "/images/IMG_9508.jpeg" },
  { name: "Leg Quarter Plate", desc: "Juicy fried leg quarter with 2 sides of your choice", price: "$11", image: "/images/IMG_9505.jpeg" },
  { name: "Chicken Tenders", desc: "Hand-battered tenders with 1 side and dipping sauce", price: "$9", image: null },
  { name: "Fried Rib Plate", desc: "Slow-cooked ribs, fried and finished — with 1 or 2 sides", price: "$13 / $15", image: "/images/IMG_9500.jpeg" },
];

const sides = [
  { name: "Baked Beans", price: "$3" },
  { name: "Rice", price: "$2" },
  { name: "Green Beans", price: "$3" },
  { name: "Mac & Cheese", price: "$4" },
  { name: "Fries", price: "$4" },
  { name: "Comeback Sauce", price: "$1" },
];

const loaded = [
  { name: "Loaded Fries", desc: "Crispy fries topped with our signature Comeback Sauce", price: "$9", image: "/images/IMG_9503.jpeg" },
  { name: "Loaded Nachos", desc: "Tortilla chips piled with our signature Comeback Sauce", price: "$9", image: "/images/IMG_9490.jpeg" },
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
            THE FULL <span className="text-ct-orange">SPREAD</span>
          </h1>
          <p className="text-ct-cream-muted text-base md:text-lg mt-6 max-w-xl mx-auto font-sans">
            Made fresh. Served hot. Soul food done right.
          </p>
        </div>
      </section>

      {/* COMBO CALLOUT STRIP */}
      <div className="bg-ct-orange py-4 text-center">
        <p className="font-display text-lg text-white uppercase tracking-wide">
          Make it a Combo! Add fries &amp; a drink for just $3.50
        </p>
      </div>

      {/* SECTION: LOADED DOGS */}
      <section className="bg-ct-charcoal">
        <div className="container-ct px-0">
          <div className="bg-ct-mustard px-6 py-3">
            <h2 className="font-display text-ct-black text-2xl md:text-3xl uppercase">
              Loaded Dogs
            </h2>
          </div>
          {/* Feature photo for hot dogs section */}
          <div className="relative h-48 md:h-64 overflow-hidden">
            <Image
              src="/images/IMG_9492.jpeg"
              alt="Chili cheese dog plate with crinkle fries and coleslaw"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ct-black/70 to-transparent" />
            <div className="absolute inset-0 flex items-center px-6 md:px-10">
              <p className="font-display text-ct-cream text-2xl md:text-3xl uppercase">
                Loaded &amp; Stacked
              </p>
            </div>
          </div>
          <div className="p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {loadedDogs.map((item) => (
                <div
                  key={item.name}
                  className="bg-ct-surface border border-ct-border overflow-hidden flex flex-col group"
                >
                  {item.image && (
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-display text-ct-cream text-lg uppercase">
                      {item.name}
                    </h3>
                    <p className="font-sans text-ct-cream-muted text-sm mt-1 flex-1">
                      {item.desc}
                    </p>
                    <p className="font-display text-ct-orange text-xl mt-3">
                      {item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-ct-mustard text-sm font-sans mt-4">
              ★ Make any dog a combo — add fries &amp; a drink for $3.50
            </p>
          </div>
        </div>
      </section>

      {/* SECTION: HANDHELDS */}
      <section className="bg-ct-black">
        <div className="container-ct px-0">
          <div className="bg-ct-mustard px-6 py-3">
            <h2 className="font-display text-ct-black text-2xl md:text-3xl uppercase">
              Handhelds
            </h2>
          </div>
          <div className="p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {handhelds.map((item) => (
                <div
                  key={item.name}
                  className="bg-ct-surface border border-ct-border overflow-hidden flex flex-col group"
                >
                  {item.image && (
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-display text-ct-cream text-lg uppercase">
                      {item.name}
                    </h3>
                    <p className="font-sans text-ct-cream-muted text-sm mt-1 flex-1">
                      {item.desc}
                    </p>
                    <p className="font-display text-ct-orange text-xl mt-3">
                      {item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: DINNER */}
      <section className="bg-ct-charcoal">
        <div className="container-ct px-0">
          <div className="bg-ct-mustard px-6 py-3">
            <h2 className="font-display text-ct-black text-2xl md:text-3xl uppercase">
              Dinner
            </h2>
          </div>
          <div className="p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dinner.map((item) => (
                <div
                  key={item.name}
                  className="bg-ct-surface border border-ct-border overflow-hidden flex flex-col group"
                >
                  {item.image && (
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-display text-ct-cream text-lg uppercase">
                      {item.name}
                    </h3>
                    <p className="font-sans text-ct-cream-muted text-sm mt-1 flex-1">
                      {item.desc}
                    </p>
                    <p className="font-display text-ct-orange text-xl mt-3">
                      {item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: SIDES */}
      <section className="bg-ct-black">
        <div className="container-ct px-0">
          <div className="bg-ct-mustard px-6 py-3">
            <h2 className="font-display text-ct-black text-2xl md:text-3xl uppercase">
              Sides
            </h2>
          </div>
          {/* Feature photo for sides */}
          <div className="relative h-40 md:h-52 overflow-hidden">
            <Image
              src="/images/IMG_9506.jpeg"
              alt="Sides spread — mac and cheese, green beans, rice"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ct-black/70 to-transparent" />
            <div className="absolute inset-0 flex items-center px-6 md:px-10">
              <p className="font-display text-ct-cream text-xl md:text-2xl uppercase">
                Fresh Made Daily
              </p>
            </div>
          </div>
          <div className="p-6 md:p-10">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {sides.map((item) => (
                <div
                  key={item.name}
                  className="bg-ct-surface border border-ct-border p-4 flex justify-between items-center"
                >
                  <span className="font-sans text-ct-cream text-sm">
                    {item.name}
                  </span>
                  <span className="font-display text-ct-orange">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: LOADED */}
      <section className="bg-ct-charcoal">
        <div className="container-ct px-0">
          <div className="bg-ct-mustard px-6 py-3">
            <h2 className="font-display text-ct-black text-2xl md:text-3xl uppercase">
              Loaded
            </h2>
          </div>
          {/* Feature photo for loaded section */}
          <div className="relative h-48 md:h-64 overflow-hidden">
            <Image
              src="/images/IMG_9504.jpeg"
              alt="Loaded nachos with comeback cheese sauce and jalapeños"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ct-black/70 to-transparent" />
            <div className="absolute inset-0 flex items-center px-6 md:px-10">
              <p className="font-display text-ct-cream text-2xl md:text-3xl uppercase">
                The Comeback Sauce
              </p>
            </div>
          </div>
          <div className="p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {loaded.map((item) => (
                <div
                  key={item.name}
                  className="bg-ct-surface border border-ct-border overflow-hidden flex flex-col group"
                >
                  {item.image && (
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-display text-ct-cream text-lg uppercase">
                      {item.name}
                    </h3>
                    <p className="font-sans text-ct-cream-muted text-sm mt-1 flex-1">
                      {item.desc}
                    </p>
                    <p className="font-display text-ct-orange text-xl mt-3">
                      {item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* COMEBACK SAUCE CALLOUT BOX */}
            <div className="mt-8 border-l-4 border-ct-mustard bg-ct-surface-2 p-6">
              <h3 className="font-display text-ct-cream text-lg uppercase mb-2">
                What is Comeback Sauce?
              </h3>
              <p className="font-sans text-ct-cream-muted text-sm leading-relaxed">
                Our signature cheese sauce — a rich blend of four cheeses,
                secret seasonings, peppers, and pork sausage. Slow-cooked and
                poured hot over your fries or nachos. You&apos;ll understand the
                name after the first bite.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CATERING CTA STRIP */}
      <section className="bg-ct-orange py-8 text-center">
        <div className="container-ct">
          <p className="font-display text-xl md:text-2xl text-white uppercase">
            CATERING &amp; EVENTS AVAILABLE!
          </p>
          <p className="font-sans text-white/90 text-base mt-2">
            Call or message us to book the truck for your event.
          </p>
          <a
            href="tel:8033803309"
            className="font-display text-2xl text-white mt-3 block hover:underline"
          >
            803-380-3309
          </a>
        </div>
      </section>

      {/* ORDER ONLINE CTA */}
      <section className="bg-ct-black py-16">
        <div className="container-ct">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Text + buttons */}
            <div className="text-center md:text-left">
              <h2 className="font-display text-3xl md:text-5xl text-ct-cream uppercase">
                Ready to Order?
              </h2>
              <p className="font-sans text-ct-cream-muted text-base mt-4 max-w-md">
                Place your order online for pickup — or scan the QR code to see the full price menu.
              </p>
              <div className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-4 mt-8">
                <Link
                  href="/order"
                  className="bg-ct-orange hover:bg-ct-orange-light text-white font-display tracking-widest px-8 py-4 uppercase transition-colors"
                >
                  Order Online
                </Link>
                <Link
                  href="/menu/board"
                  className="border-2 border-ct-mustard text-ct-mustard hover:bg-ct-mustard hover:text-ct-black font-display tracking-widest px-8 py-4 uppercase transition-colors"
                >
                  View Price Menu
                </Link>
              </div>
            </div>

            {/* QR Code — links to the menu board sub-page */}
            <div className="shrink-0 text-center">
              <QRCodeBlock
                url={`${process.env.NEXT_PUBLIC_SITE_URL || "https://thecomebacktruck.com"}/menu/board`}
                label="Scan for price menu"
                size={160}
              />
            </div>
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="bg-ct-black py-8 text-center">
        <div className="container-ct">
          <p className="font-sans text-ct-muted text-sm max-w-2xl mx-auto leading-relaxed">
            Menu and pricing subject to change. Follow{" "}
            <a
              href="https://www.instagram.com/the.comeback.truck/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ct-mustard hover:text-ct-cream transition-colors"
            >
              @the.comeback.truck
            </a>{" "}
            on Instagram for daily specials.
          </p>
        </div>
      </section>
    </>
  );
}
