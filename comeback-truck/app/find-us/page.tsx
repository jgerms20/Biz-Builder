import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Find Us",
  description:
    "Find The Comeback Truck serving all of South Carolina, the Charlotte NC metro area, and Northern Georgia. Check our Instagram for daily location updates.",
};

const scCities = [
  "Columbia",
  "Charleston",
  "Greenville",
  "Myrtle Beach",
  "Spartanburg",
  "Rock Hill",
  "Florence",
  "Aiken",
  "Sumter",
  "Orangeburg",
];

const charlotteCities = [
  "Charlotte",
  "Concord",
  "Gastonia",
  "Monroe",
  "Fort Mill",
  "Rock Hill",
];

const georgiaCities = [
  "Augusta (border area)",
  "Athens",
  "Gainesville",
  "Cumming",
  "Dahlonega",
];

export default function FindUsPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-ct-black smoke-overlay py-24 md:py-32 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-ct-mustard/10 blur-[140px] top-[-200px] left-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="container-ct relative z-10 text-center">
          <span className="text-ct-mustard uppercase tracking-widest text-xs md:text-sm font-semibold font-sans">
            Location
          </span>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-ct-cream uppercase leading-tight mt-6">
            CATCH THE
            <br />
            <span className="text-ct-mustard">COMEBACK TRUCK</span>
          </h1>
        </div>
      </section>

      {/* TODAY'S SPOT */}
      <section className="bg-ct-charcoal py-20 md:py-24">
        <div className="container-ct">
          <div className="bg-ct-mustard p-0.5 rounded-lg">
            <div className="bg-ct-black rounded-md p-8 md:p-12 text-center">
              <span className="text-ct-mustard uppercase tracking-widest text-xs font-semibold font-sans">
                Today&apos;s Spot
              </span>
              <h2 className="font-display text-3xl md:text-5xl text-ct-cream uppercase mt-4 leading-tight">
                Where We&apos;re Parked Right Now
              </h2>
              <p className="text-ct-cream-muted text-base md:text-lg mt-6 max-w-2xl mx-auto">
                Check our Instagram for today&apos;s location — we update daily.{" "}
                <a
                  href="https://www.instagram.com/the.comeback.truck/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ct-mustard font-semibold"
                >
                  @the.comeback.truck
                </a>
              </p>
              <a
                href="tel:8033803309"
                className="inline-block font-display text-3xl md:text-4xl text-ct-cream hover:text-ct-mustard transition-colors mt-8"
              >
                803-380-3309
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MAP + SERVICE AREA */}
      <section className="bg-ct-black py-20 md:py-24">
        <div className="container-ct">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {/* Map */}
            <div className="overflow-hidden rounded border border-ct-border min-h-[380px]">
              <iframe
                title="The Comeback Truck Service Area — South Carolina"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-83.35%2C31.99%2C-78.54%2C35.22&layer=mapnik"
                className="w-full h-full min-h-[380px] rounded border border-ct-border"
                loading="lazy"
              />
            </div>

            {/* Service info */}
            <div className="flex flex-col gap-4">
              <span className="text-ct-mustard uppercase tracking-widest text-xs font-semibold font-sans">
                Service Area
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-ct-cream uppercase leading-tight">
                South Carolina + Beyond
              </h2>
              <p className="text-ct-cream-muted leading-relaxed mt-2">
                Based in Columbia, SC — but we roll wherever the food is needed.
                The Comeback Truck serves all of South Carolina, the Charlotte,
                NC metro area, and Northern Georgia. No community too far for
                good soul food.
              </p>

              {/* South Carolina */}
              <div className="mt-4">
                <p className="text-ct-mustard text-sm uppercase tracking-wide font-semibold mb-3">
                  South Carolina (Primary)
                </p>
                <div className="flex flex-wrap gap-2">
                  {scCities.map((city) => (
                    <span
                      key={city}
                      className="bg-ct-surface border border-ct-border text-ct-cream-muted text-xs px-3 py-1.5 rounded uppercase tracking-wide"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>

              {/* Charlotte, NC */}
              <div className="mt-4">
                <p className="text-ct-cream text-sm uppercase tracking-wide font-semibold mb-3">
                  Charlotte, NC Area
                </p>
                <div className="flex flex-wrap gap-2">
                  {charlotteCities.map((city) => (
                    <span
                      key={city}
                      className="bg-ct-surface border border-ct-border text-ct-cream-muted text-xs px-3 py-1.5 rounded uppercase tracking-wide"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>

              {/* Northern Georgia */}
              <div className="mt-4">
                <p className="text-ct-cream text-sm uppercase tracking-wide font-semibold mb-3">
                  Northern Georgia
                </p>
                <div className="flex flex-wrap gap-2">
                  {georgiaCities.map((city) => (
                    <span
                      key={city}
                      className="bg-ct-surface border border-ct-border text-ct-cream-muted text-xs px-3 py-1.5 rounded uppercase tracking-wide"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-ct-cream-muted text-sm leading-relaxed mt-4">
                Available for events statewide and regional. Mileage rates may
                apply for events over 100 miles from Columbia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT OPTIONS */}
      <section className="bg-ct-charcoal py-20 md:py-24">
        <div className="container-ct">
          <div className="flex flex-col items-center text-center mb-12">
            <span className="text-ct-mustard uppercase tracking-widest text-xs font-semibold font-sans">
              Get In Touch
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-ct-cream uppercase leading-tight mt-4">
              Reach Out
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Call */}
            <a
              href="tel:8033803309"
              className="bg-ct-surface border border-ct-border hover:border-ct-mustard transition-colors p-8 text-center rounded"
            >
              <h3 className="font-display text-ct-cream text-xl uppercase mb-3">
                Call Us
              </h3>
              <p className="font-display text-2xl text-ct-cream">
                803-380-3309
              </p>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/the.comeback.truck/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-ct-surface border border-ct-border hover:border-ct-mustard transition-colors p-8 text-center rounded"
            >
              <h3 className="font-display text-ct-cream text-xl uppercase mb-3">
                Follow on Instagram
              </h3>
              <p className="font-display text-lg text-ct-cream">
                @the.comeback.truck
              </p>
            </a>

            {/* Book Event */}
            <Link
              href="/book"
              className="bg-ct-surface border border-ct-border hover:border-ct-mustard transition-colors p-8 text-center rounded"
            >
              <h3 className="font-display text-ct-cream text-xl uppercase mb-3">
                Book an Event
              </h3>
              <p className="font-display text-lg text-ct-cream">
                Send Request &rarr;
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
