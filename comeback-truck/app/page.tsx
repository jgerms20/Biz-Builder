import Link from "next/link";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import MustardDivider from "@/components/ui/MustardDivider";

const foodCategories = [
  {
    title: "Loaded Dogs",
    description: "Chili cheese dogs, slaw dogs, comeback dogs — piled high and served hot.",
    image: "/images/IMG_9502.jpeg",
    alt: "Chili cheese dog with crinkle fries and coleslaw",
  },
  {
    title: "Handhelds",
    description: "BBQ and pulled pork sandwiches loaded with flavor on a toasted bun.",
    image: "/images/IMG_9489.jpeg",
    alt: "Pulled pork BBQ sandwich on white plate",
  },
  {
    title: "Loaded Fries",
    description: "Comeback Sauce poured hot — four cheeses, peppers, pork sausage on crispy fries.",
    image: "/images/IMG_9503.jpeg",
    alt: "Loaded fries smothered in comeback cheese sauce",
  },
  {
    title: "Dinner Plates",
    description: "Leg quarter, fish, ribs, chicken tenders — full plates with your choice of sides.",
    image: "/images/IMG_9505.jpeg",
    alt: "Leg quarter dinner plate with mac and cheese and potato salad",
  },
];

export default function HomePage() {
  return (
    <>
      {/* SECTION 1: HERO */}
      <section className="relative min-h-screen bg-ct-black smoke-overlay flex items-center overflow-hidden">
        {/* Hero background image */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/IMG_9501.jpeg"
            alt="The Comeback Truck food"
            fill
            className="object-cover opacity-20"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ct-black/80 via-ct-black/60 to-ct-black/90" />
        </div>

        {/* Mustard glow */}
        <div className="absolute w-[800px] h-[800px] rounded-full bg-ct-mustard/10 blur-[150px] top-[-200px] left-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="container-ct relative z-10 py-24 md:py-32 w-full">
          <div className="flex flex-col items-center text-center">
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-ct-cream uppercase leading-none tracking-tight">
              <span className="block">The Comeback</span>
              <span className="block text-ct-orange">Truck</span>
            </h1>

            <div className="h-1 w-24 bg-ct-mustard my-8" />

            <p className="font-display text-2xl md:text-3xl text-ct-cream-muted uppercase tracking-wide max-w-3xl">
              Soul Food That Brings You Back
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Link
                href="/menu"
                className="bg-ct-mustard hover:bg-ct-mustard-light text-ct-black font-display tracking-widest text-base px-8 py-4 rounded transition-colors"
              >
                VIEW MENU
              </Link>
              <Link
                href="/book"
                className="border-2 border-ct-mustard text-ct-cream hover:bg-ct-mustard hover:text-ct-black font-display tracking-widest text-base px-8 py-4 rounded transition-colors"
              >
                BOOK US FOR YOUR EVENT
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHAT WE SERVE */}
      <section className="bg-ct-charcoal py-20 md:py-28">
        <div className="container-ct">
          <SectionHeading
            label="What's Cooking"
            title="Real Soul Food"
            subtitle="Loaded dogs, handhelds, dinner plates, and loaded sides — soul food brought straight to you."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {foodCategories.map((item) => (
              <div
                key={item.title}
                className="bg-ct-surface border border-ct-border hover:border-ct-mustard transition-colors flex flex-col overflow-hidden group"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-ct-black/20" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-ct-cream text-xl uppercase mb-2">
                    {item.title}
                  </h3>
                  <p className="text-ct-cream-muted text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Link
              href="/menu"
              className="font-display tracking-widest text-base text-ct-mustard hover:text-ct-mustard-light transition-colors"
            >
              VIEW FULL MENU &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 3: MEET THE OWNER */}
      <section className="bg-ct-black py-20 md:py-28">
        <div className="container-ct">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="flex flex-col gap-4">
              <span className="text-ct-mustard uppercase tracking-widest text-xs font-semibold font-sans">
                Meet The Owner
              </span>
              <MustardDivider />
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-ct-cream uppercase leading-tight">
                Lorenzo Dykes, Owner
              </h2>
              <p className="text-ct-cream-muted leading-relaxed mt-2">
                Lorenzo Dykes founded The Comeback Truck in 2020 with one idea in
                mind — his community needed real soul food. Coming out of the Covid
                pandemic, he saw a gap: quality comfort food was hard to find and
                even harder to access. Lorenzo had always had a passion for cooking,
                and he saw an opportunity to serve.
              </p>
              <p className="text-ct-cream-muted leading-relaxed">
                The name says it all. Lorenzo built this truck around a promise:
                every plate of loaded fries, every dinner special, every catered
                event would be cooked with the same love he puts into food for his
                own family. Soul food, done right, brought to where people are.
              </p>
              <Link
                href="/about"
                className="font-display tracking-widest text-ct-mustard hover:text-ct-mustard-light transition-colors mt-4 inline-block"
              >
                READ THE STORY &rarr;
              </Link>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <Image
                src="/images/IMG_9491.jpeg"
                alt="The Comeback Truck food — BBQ sandwich plate with fries and coleslaw"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ct-black/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: WHERE TO FIND US */}
      <section className="bg-ct-charcoal py-20 md:py-28">
        <div className="container-ct">
          <SectionHeading
            label="Find The Truck"
            title="Catch Us On The Road"
            subtitle="Schedules change. Stay in the loop so you don't miss us."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
            {/* Current Location */}
            <div className="bg-ct-surface border border-ct-border hover:border-ct-mustard transition-colors p-8 flex flex-col items-center text-center">
              <div className="text-ct-mustard text-4xl mb-4">📍</div>
              <h3 className="font-display text-ct-cream text-xl uppercase mb-3">
                Current Location
              </h3>
              <p className="text-ct-cream-muted text-sm leading-relaxed mb-4">
                Check Instagram for today&apos;s spot — we move around the
                Midlands.
              </p>
              <Link
                href="/schedule"
                className="font-display tracking-widest text-ct-mustard hover:text-ct-mustard-light transition-colors text-sm"
              >
                VIEW SCHEDULE &rarr;
              </Link>
            </div>

            {/* Phone */}
            <div className="bg-ct-surface border border-ct-border hover:border-ct-mustard transition-colors p-8 flex flex-col items-center text-center">
              <div className="text-ct-mustard text-4xl mb-4">📞</div>
              <h3 className="font-display text-ct-cream text-xl uppercase mb-3">
                Call Us
              </h3>
              <a
                href="tel:8033803309"
                className="font-display text-2xl text-ct-cream hover:text-ct-mustard transition-colors"
              >
                803-380-3309
              </a>
            </div>

            {/* Instagram */}
            <div className="bg-ct-surface border border-ct-border hover:border-ct-mustard transition-colors p-8 flex flex-col items-center text-center">
              <div className="text-ct-mustard text-4xl mb-4">📷</div>
              <h3 className="font-display text-ct-cream text-xl uppercase mb-3">
                Instagram
              </h3>
              <a
                href="https://www.instagram.com/the.comeback.truck/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-lg text-ct-cream hover:text-ct-mustard transition-colors"
              >
                @the.comeback.truck
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: BIG CTA */}
      <section className="relative bg-ct-black overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-heat opacity-20 pointer-events-none" />
        <div className="absolute w-[600px] h-[600px] rounded-full bg-ct-red/20 blur-[120px] top-1/2 left-0 -translate-y-1/2 pointer-events-none" />
        <div className="absolute w-[600px] h-[600px] rounded-full bg-ct-mustard/20 blur-[120px] top-1/2 right-0 -translate-y-1/2 pointer-events-none" />

        <div className="container-ct relative z-10 text-center">
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-ct-cream uppercase leading-tight">
            Want Us At Your
            <br />
            <span className="text-ct-orange">Next Event?</span>
          </h2>
          <p className="text-ct-cream-muted text-base md:text-lg mt-6 max-w-2xl mx-auto">
            Weddings &middot; Corporate events &middot; Birthday parties &middot;
            Block parties &middot; Tailgates
          </p>
          <Link
            href="/book"
            className="inline-block bg-ct-orange hover:bg-ct-orange-light text-white font-display tracking-widest text-lg px-10 py-5 rounded transition-colors mt-10"
          >
            BOOK THE TRUCK
          </Link>
        </div>
      </section>
    </>
  );
}
