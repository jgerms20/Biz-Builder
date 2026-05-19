import type { Metadata } from "next";
import Link from "next/link";
import MustardDivider from "@/components/ui/MustardDivider";

export const metadata: Metadata = {
  title: "Find Us",
  description:
    "Find The Comeback Truck around Columbia, SC and the Midlands — service area, contact info, and how to book us for your event.",
};

const serviceCities = [
  "West Columbia",
  "Forest Acres",
  "Lexington",
  "Cayce",
  "Irmo",
  "Lake Murray",
  "Camden",
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
            Catch The
            <br />
            <span className="text-ct-mustard">Comeback Truck</span>
          </h1>
          <MustardDivider className="mx-auto mt-8" />
        </div>
      </section>

      {/* TODAY'S LOCATION */}
      <section className="bg-ct-charcoal py-20 md:py-24">
        <div className="container-ct">
          <div className="bg-gradient-mustard p-1 rounded-lg">
            <div className="bg-ct-black rounded-md p-8 md:p-12 text-center">
              <span className="text-ct-mustard uppercase tracking-widest text-xs font-semibold font-sans">
                Today&apos;s Spot
              </span>
              <h2 className="font-display text-3xl md:text-5xl text-ct-cream uppercase mt-4 leading-tight">
                Where We&apos;re Parked Right Now
              </h2>
              <p className="text-ct-cream-muted text-base md:text-lg mt-6 max-w-2xl mx-auto">
                Check our Instagram for today&apos;s location.{" "}
                <a
                  href="https://www.instagram.com/_thecomebacktruck/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ct-mustard hover:text-ct-mustard-light transition-colors font-semibold"
                >
                  @_thecomebacktruck
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

      {/* SERVICE AREA */}
      <section className="bg-ct-black py-20 md:py-24">
        <div className="container-ct">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
            {/* Map placeholder */}
            <div className="bg-ct-surface border border-dashed border-ct-border min-h-[320px] flex items-center justify-center rounded">
              <div className="text-center px-6">
                <div className="text-ct-mustard text-5xl mb-3">🗺️</div>
                <p className="text-ct-mustard font-mono text-sm">
                  Map placeholder — Columbia, SC area
                </p>
              </div>
            </div>

            {/* Service info */}
            <div className="flex flex-col gap-4">
              <span className="text-ct-mustard uppercase tracking-widest text-xs font-semibold font-sans">
                Service Area
              </span>
              <MustardDivider />
              <h2 className="font-display text-3xl md:text-4xl text-ct-cream uppercase leading-tight">
                Columbia, SC + Midlands
              </h2>
              <p className="text-ct-cream-muted leading-relaxed mt-2">
                We&apos;re based in Columbia, SC (803 area code) and roll
                through the Midlands serving public events and private
                bookings. Available for events within 100 miles of Columbia.
              </p>
              <div className="mt-4">
                <p className="text-ct-cream-muted text-sm uppercase tracking-wide font-semibold mb-3">
                  Areas We Serve:
                </p>
                <div className="flex flex-wrap gap-2">
                  {serviceCities.map((city) => (
                    <span
                      key={city}
                      className="bg-ct-surface border border-ct-border text-ct-cream-muted text-xs px-3 py-1.5 rounded uppercase tracking-wide"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>
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
            <MustardDivider className="mt-3" />
            <h2 className="font-display text-3xl md:text-5xl text-ct-cream uppercase leading-tight mt-3">
              Reach Out
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Call */}
            <a
              href="tel:8033803309"
              className="bg-ct-surface border border-ct-border hover:border-ct-mustard transition-colors p-8 flex flex-col items-center text-center group"
            >
              <div className="text-ct-mustard text-5xl mb-4 group-hover:scale-110 transition-transform">
                📞
              </div>
              <h3 className="font-display text-ct-cream text-xl uppercase mb-3">
                Call Us
              </h3>
              <p className="font-display text-2xl text-ct-cream group-hover:text-ct-mustard transition-colors">
                803-380-3309
              </p>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/_thecomebacktruck/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-ct-surface border border-ct-border hover:border-ct-mustard transition-colors p-8 flex flex-col items-center text-center group"
            >
              <div className="text-ct-mustard text-5xl mb-4 group-hover:scale-110 transition-transform">
                📷
              </div>
              <h3 className="font-display text-ct-cream text-xl uppercase mb-3">
                Follow on IG
              </h3>
              <p className="font-display text-lg text-ct-cream group-hover:text-ct-mustard transition-colors">
                @_thecomebacktruck
              </p>
            </a>

            {/* Book */}
            <Link
              href="/book"
              className="bg-ct-surface border border-ct-border hover:border-ct-mustard transition-colors p-8 flex flex-col items-center text-center group"
            >
              <div className="text-ct-mustard text-5xl mb-4 group-hover:scale-110 transition-transform">
                📅
              </div>
              <h3 className="font-display text-ct-cream text-xl uppercase mb-3">
                Book For Event
              </h3>
              <p className="font-display text-lg text-ct-cream group-hover:text-ct-mustard transition-colors">
                Send Request &rarr;
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
