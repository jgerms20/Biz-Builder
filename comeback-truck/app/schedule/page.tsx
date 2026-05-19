import type { Metadata } from "next";
import Link from "next/link";
import MustardDivider from "@/components/ui/MustardDivider";

export const metadata: Metadata = {
  title: "Schedule",
  description:
    "Upcoming locations and events for The Comeback Truck — public markets, festivals, and private bookings around Columbia, SC and the Midlands.",
};

// Update this array to add/remove upcoming events
const upcomingEvents = [
  {
    date: "Sat, Apr 12",
    time: "11 AM – 7 PM",
    location: "Soda City Market — Main St, Columbia",
    type: "Public" as const,
  },
  {
    date: "Sat, Apr 19",
    time: "6 PM – 10 PM",
    location: "Private Event — Forest Acres",
    type: "Private" as const,
  },
  {
    date: "Sat, Apr 26",
    time: "12 PM – 8 PM",
    location: "Columbia Food Truck Friday",
    type: "Public" as const,
  },
  {
    date: "Sun, May 4",
    time: "1 PM – 6 PM",
    location: "Riverbanks Block Party",
    type: "Public" as const,
  },
  {
    date: "Sat, May 10",
    time: "5 PM – 9 PM",
    location: "Catering — Lake Murray Wedding",
    type: "Private" as const,
  },
];

function TypePill({ type }: { type: "Public" | "Private" }) {
  const styles =
    type === "Public"
      ? "bg-ct-mustard/15 text-ct-mustard border-ct-mustard/40"
      : "bg-ct-red/15 text-ct-red border-ct-red/40";
  return (
    <span
      className={`inline-block px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider border ${styles}`}
    >
      {type}
    </span>
  );
}

export default function SchedulePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-ct-black smoke-overlay py-24 md:py-32 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-ct-mustard/10 blur-[140px] top-[-200px] left-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="container-ct relative z-10 text-center">
          <span className="text-ct-mustard uppercase tracking-widest text-xs md:text-sm font-semibold font-sans">
            Where To Find Us
          </span>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-ct-cream uppercase leading-tight mt-6">
            On The <span className="text-ct-mustard">Road</span>
          </h1>
          <MustardDivider className="mx-auto mt-8" />
          <p className="text-ct-cream-muted text-base md:text-lg mt-6 max-w-2xl mx-auto">
            Upcoming events and locations. Schedule updated regularly.
          </p>
        </div>
      </section>

      {/* EVENTS LIST */}
      <section className="bg-ct-charcoal py-20 md:py-24">
        <div className="container-ct">
          <div className="flex flex-col items-start mb-10">
            <span className="text-ct-mustard uppercase tracking-widest text-xs font-semibold font-sans">
              Coming Up
            </span>
            <MustardDivider className="mt-3" />
            <h2 className="font-display text-3xl md:text-5xl text-ct-cream uppercase leading-tight mt-3">
              Upcoming Events
            </h2>
          </div>

          {/* Desktop: table-like rows */}
          <div className="hidden md:block">
            <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-ct-border text-ct-mustard uppercase tracking-widest text-xs font-semibold">
              <div className="col-span-3">Date</div>
              <div className="col-span-3">Time</div>
              <div className="col-span-4">Location</div>
              <div className="col-span-2 text-right">Type</div>
            </div>

            {upcomingEvents.map((event, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 gap-4 px-6 py-5 border-b border-ct-border bg-ct-surface/40 hover:bg-ct-surface transition-colors items-center"
              >
                <div className="col-span-3 font-display text-ct-mustard text-xl">
                  {event.date}
                </div>
                <div className="col-span-3 text-ct-cream-muted text-sm">
                  {event.time}
                </div>
                <div className="col-span-4 font-display text-ct-cream text-base uppercase">
                  {event.location}
                </div>
                <div className="col-span-2 text-right">
                  <TypePill type={event.type} />
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: stacked cards */}
          <div className="md:hidden flex flex-col gap-4">
            {upcomingEvents.map((event, idx) => (
              <div
                key={idx}
                className="bg-ct-surface border border-ct-border p-5 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-ct-mustard text-xl">
                    {event.date}
                  </span>
                  <TypePill type={event.type} />
                </div>
                <p className="text-ct-cream-muted text-sm">{event.time}</p>
                <p className="font-display text-ct-cream text-base uppercase">
                  {event.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPDATES */}
      <section className="bg-ct-black py-20 md:py-24">
        <div className="container-ct">
          <div className="bg-ct-surface border border-ct-mustard/30 p-8 md:p-12">
            <h2 className="font-display text-3xl md:text-4xl text-ct-cream uppercase leading-tight">
              Want to know where we&apos;ll be next?
            </h2>
            <p className="text-ct-cream-muted mt-4">
              Three ways to stay in the loop:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-ct-surface-2 border border-ct-border p-6 hover:border-ct-mustard transition-colors">
                <div className="text-ct-mustard text-3xl mb-3">📷</div>
                <h3 className="font-display text-ct-cream text-lg uppercase mb-2">
                  Follow on Instagram
                </h3>
                <a
                  href="https://www.instagram.com/_thecomebacktruck/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ct-mustard hover:text-ct-mustard-light transition-colors text-sm"
                >
                  @_thecomebacktruck
                </a>
              </div>

              <div className="bg-ct-surface-2 border border-ct-border p-6 hover:border-ct-mustard transition-colors">
                <div className="text-ct-mustard text-3xl mb-3">📞</div>
                <h3 className="font-display text-ct-cream text-lg uppercase mb-2">
                  Call Us
                </h3>
                <a
                  href="tel:8033803309"
                  className="text-ct-mustard hover:text-ct-mustard-light transition-colors text-sm"
                >
                  803-380-3309
                </a>
              </div>

              <div className="bg-ct-surface-2 border border-ct-border p-6 hover:border-ct-mustard transition-colors">
                <div className="text-ct-mustard text-3xl mb-3">📅</div>
                <h3 className="font-display text-ct-cream text-lg uppercase mb-2">
                  Book Us
                </h3>
                <Link
                  href="/book"
                  className="text-ct-mustard hover:text-ct-mustard-light transition-colors text-sm"
                >
                  Have a date in mind? &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
