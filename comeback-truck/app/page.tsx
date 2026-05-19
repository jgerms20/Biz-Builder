import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import MustardDivider from "@/components/ui/MustardDivider";

const foodCategories = [
  {
    title: "BBQ Ribs",
    description: "Slow-smoked, fall-off-the-bone, Carolina-style.",
    filename: "food-ribs.jpg",
  },
  {
    title: "Loaded Fries",
    description: "Chili cheese fries with all the fixins.",
    filename: "food-fries.jpg",
  },
  {
    title: "Pulled Pork",
    description: "Tender pulled pork with our mustard sauce.",
    filename: "food-pulled-pork.jpg",
  },
  {
    title: "Fried Fish",
    description: "Crispy battered catfish with crinkle fries.",
    filename: "food-fish.jpg",
  },
];

export default function HomePage() {
  return (
    <>
      {/* SECTION 1: HERO */}
      <section className="relative min-h-screen bg-ct-black smoke-overlay flex items-center overflow-hidden">
        {/* Mustard glow */}
        <div className="absolute w-[800px] h-[800px] rounded-full bg-ct-mustard/15 blur-[150px] top-[-200px] left-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="container-ct relative z-10 py-24 md:py-32 w-full">
          <div className="flex flex-col items-center text-center">
            <span className="text-ct-mustard uppercase tracking-widest text-xs md:text-sm font-semibold font-sans mb-6">
              Brigman German &middot; Columbia, SC
            </span>

            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-ct-cream uppercase leading-none tracking-tight">
              <span className="block">The Comeback</span>
              <span className="block text-ct-mustard">Truck</span>
            </h1>

            <div className="h-1 w-24 bg-ct-mustard my-8" />

            <p className="font-display text-2xl md:text-3xl text-ct-cream-muted uppercase tracking-wide max-w-3xl">
              Food So Good You&apos;ll Come Back
            </p>

            <a
              href="tel:8033803309"
              className="font-display text-2xl md:text-3xl text-ct-cream hover:text-ct-mustard transition-colors mt-8"
            >
              803-380-3309
            </a>

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
            title="Real Southern BBQ"
            subtitle="Slow-smoked meats, fresh sides, and the Carolina mustard sauce that gives the truck its name."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {foodCategories.map((item) => (
              <div
                key={item.title}
                className="bg-ct-surface border border-ct-border hover:border-ct-mustard transition-colors flex flex-col"
              >
                <div className="aspect-square bg-ct-surface-2 border-b border-dashed border-ct-border flex items-center justify-center">
                  <span className="text-ct-mustard text-xs font-mono">
                    {item.filename}
                  </span>
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

      {/* SECTION 3: ABOUT TEASER */}
      <section className="bg-ct-black py-20 md:py-28">
        <div className="container-ct">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="flex flex-col gap-4">
              <span className="text-ct-mustard uppercase tracking-widest text-xs font-semibold font-sans">
                Meet The Owner
              </span>
              <MustardDivider />
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-ct-cream uppercase leading-tight">
                Brigman German Built This
              </h2>
              <p className="text-ct-cream-muted leading-relaxed mt-2">
                Brigman German started The Comeback Truck out of one belief — the
                best food in South Carolina shouldn&apos;t be locked behind
                restaurant doors. Carolina BBQ, slow-smoked meats, and real
                comfort food brought directly to where people gather.
              </p>
              <p className="text-ct-cream-muted leading-relaxed">
                Born and raised in the Carolinas, Brigman has spent years dialing
                in his ribs, his sauces, and that mustard glaze that keeps people
                rolling up window-side for one more plate.
              </p>
              <Link
                href="/about"
                className="font-display tracking-widest text-ct-mustard hover:text-ct-mustard-light transition-colors mt-4 inline-block"
              >
                READ HIS STORY &rarr;
              </Link>
            </div>

            <div className="aspect-[4/5] bg-ct-surface border border-dashed border-ct-border flex items-center justify-center">
              <span className="text-ct-mustard text-xs font-mono">
                brigman-portrait.jpg
              </span>
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
                href="https://www.instagram.com/_thecomebacktruck/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-lg text-ct-cream hover:text-ct-mustard transition-colors"
              >
                @_thecomebacktruck
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
            <span className="text-ct-mustard">Next Event?</span>
          </h2>
          <p className="text-ct-cream-muted text-base md:text-lg mt-6 max-w-2xl mx-auto">
            Weddings &middot; Corporate events &middot; Birthday parties &middot;
            Block parties &middot; Tailgates
          </p>
          <Link
            href="/book"
            className="inline-block bg-ct-mustard hover:bg-ct-mustard-light text-ct-black font-display tracking-widest text-lg px-10 py-5 rounded transition-colors mt-10"
          >
            BOOK THE TRUCK
          </Link>
        </div>
      </section>
    </>
  );
}
