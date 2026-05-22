import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Schedule",
  description:
    "Upcoming events and locations for The Comeback Truck — public markets, festivals, and private bookings across Columbia, SC and the Southeast.",
};

type EventType = "Public" | "Private";

interface ScheduleEvent {
  day: number; // day of month (May)
  date: string;
  time: string;
  location: string;
  type: EventType;
  desc: string;
}

const upcomingEvents: ScheduleEvent[] = [
  {
    day: 24,
    date: "Sat, May 24",
    time: "11 AM – 6 PM",
    location: "Soda City Market — Main St, Columbia, SC",
    type: "Public",
    desc: "One of Columbia's best outdoor markets. Come find the truck!",
  },
  {
    day: 25,
    date: "Sun, May 25",
    time: "5 PM – 9 PM",
    location: "Private Event — Forest Acres",
    type: "Private",
    desc: "Private catering event. Contact us to book yours.",
  },
  {
    day: 31,
    date: "Sat, May 31",
    time: "12 PM – 8 PM",
    location: "Food Truck Friday — Columbia",
    type: "Public",
    desc: "Monthly food truck gathering downtown.",
  },
];

// June events don't appear on the May calendar grid but show in detail cards
const allUpcomingEvents = [
  ...upcomingEvents,
  {
    day: 0,
    date: "Sat, Jun 7",
    time: "11 AM – 5 PM",
    location: "Greenville Saturday Market — Greenville, SC",
    type: "Public" as EventType,
    desc: "Expanding to the Upstate! Catch us in Greenville.",
  },
  {
    day: 0,
    date: "Sat, Jun 14",
    time: "4 PM – 9 PM",
    location: "Catering — Charlotte, NC Area",
    type: "Private" as EventType,
    desc: "Private catering in the Queen City. Inquire about your event.",
  },
  {
    day: 0,
    date: "Sat, Jun 21",
    time: "12 PM – 7 PM",
    location: "Myrtle Beach Food Festival — Myrtle Beach, SC",
    type: "Public" as EventType,
    desc: "Down at the beach! Come see us at the coast.",
  },
];

// May 2026 starts on Friday (index 5 in 0=Sun week)
// Week 1: Apr 26(Sun)…Apr 30(Thu), May 1(Fri), May 2(Sat)
// We'll build the grid as an array of day numbers (null = fill day from prev/next month)
type CalendarDay = { dayNum: number | null; currentMonth: boolean };

function buildMayCalendar(): CalendarDay[][] {
  // May 1 2026 = Friday = column index 5
  const startOffset = 5;
  const daysInMay = 31;

  const cells: CalendarDay[] = [];

  // Fill leading days from April (April has 30 days)
  for (let i = 0; i < startOffset; i++) {
    cells.push({ dayNum: 30 - startOffset + 1 + i, currentMonth: false });
  }

  // May days
  for (let d = 1; d <= daysInMay; d++) {
    cells.push({ dayNum: d, currentMonth: true });
  }

  // Fill trailing days to complete 5 rows (35 cells total)
  const trailing = 35 - cells.length;
  for (let d = 1; d <= trailing; d++) {
    cells.push({ dayNum: d, currentMonth: false });
  }

  // Split into weeks
  const weeks: CalendarDay[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

const calendarWeeks = buildMayCalendar();
const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Map day number → event for quick lookup
const eventByDay = new Map<number, ScheduleEvent>();
upcomingEvents.forEach((e) => eventByDay.set(e.day, e));

function TypePill({ type }: { type: EventType }) {
  const styles =
    type === "Public"
      ? "bg-ct-mustard text-ct-black"
      : "bg-ct-orange text-white";
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider ${styles}`}
    >
      {type}
    </span>
  );
}

function EventDot({ type }: { type: EventType }) {
  return (
    <span
      className={`block w-2 h-2 rounded-full flex-shrink-0 ${
        type === "Public" ? "bg-ct-mustard" : "bg-ct-orange"
      }`}
    />
  );
}

export default function SchedulePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-ct-black smoke-overlay py-28 md:py-36 overflow-hidden">
        <div className="absolute w-[700px] h-[700px] rounded-full bg-ct-mustard/10 blur-[160px] top-[-250px] left-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="container-ct relative z-10 text-center">
          <span className="text-ct-mustard uppercase tracking-widest text-xs md:text-sm font-semibold font-sans">
            Schedule
          </span>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-ct-cream uppercase leading-tight mt-5">
            WHERE WE&apos;LL{" "}
            <span className="text-ct-mustard">BE</span>
          </h1>
          <div className="w-16 h-1 bg-ct-mustard mx-auto mt-8" />
          <p className="text-ct-cream-muted text-base md:text-lg mt-6 max-w-xl mx-auto">
            Updated regularly. Follow us on Instagram for same-day location
            updates.
          </p>
        </div>
      </section>

      {/* ── CALENDAR SECTION ── */}
      <section className="bg-ct-charcoal py-20 md:py-28">
        <div className="container-ct">
          {/* Section heading */}
          <div className="mb-10">
            <span className="text-ct-mustard uppercase tracking-widest text-xs font-semibold font-sans">
              May 2026
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-ct-cream uppercase leading-tight mt-2">
              Upcoming Events
            </h2>
            <div className="w-12 h-1 bg-ct-mustard mt-4" />
          </div>

          {/* Calendar grid */}
          <div className="overflow-x-auto">
            <div className="min-w-[560px]">
              {/* Day-of-week header */}
              <div className="grid grid-cols-7 border border-ct-border border-b-0">
                {DAYS_OF_WEEK.map((d) => (
                  <div
                    key={d}
                    className="bg-ct-surface-2 border-r last:border-r-0 border-ct-border px-2 py-2 text-center text-ct-mustard text-[11px] uppercase tracking-widest font-semibold"
                  >
                    {d}
                  </div>
                ))}
              </div>

              {/* Calendar rows */}
              {calendarWeeks.map((week, wIdx) => (
                <div
                  key={wIdx}
                  className="grid grid-cols-7 border border-ct-border border-b-0 last:border-b"
                >
                  {week.map((cell, cIdx) => {
                    const event =
                      cell.currentMonth && cell.dayNum
                        ? eventByDay.get(cell.dayNum)
                        : undefined;
                    return (
                      <div
                        key={cIdx}
                        className={`bg-ct-surface border-r last:border-r-0 border-ct-border min-h-[72px] md:min-h-[88px] p-2 flex flex-col gap-1.5 ${
                          !cell.currentMonth ? "opacity-30" : ""
                        }`}
                      >
                        {/* Day number */}
                        <span
                          className={`text-xs font-semibold leading-none ${
                            event
                              ? event.type === "Public"
                                ? "text-ct-mustard"
                                : "text-ct-orange"
                              : cell.currentMonth
                              ? "text-ct-cream-muted"
                              : "text-ct-cream-muted/40"
                          }`}
                        >
                          {cell.dayNum}
                        </span>

                        {/* Event indicator */}
                        {event && (
                          <div className="flex items-start gap-1 mt-0.5">
                            <EventDot type={event.type} />
                            <span
                              className={`text-[10px] leading-tight font-medium line-clamp-2 ${
                                event.type === "Public"
                                  ? "text-ct-mustard"
                                  : "text-ct-orange"
                              }`}
                            >
                              {event.location.split(" — ")[0]}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <span className="block w-2.5 h-2.5 rounded-full bg-ct-mustard" />
              <span className="text-ct-cream-muted text-xs">Public Event</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="block w-2.5 h-2.5 rounded-full bg-ct-orange" />
              <span className="text-ct-cream-muted text-xs">
                Private / Catering
              </span>
            </div>
          </div>

          {/* ── Event Detail Cards ── */}
          <div className="mt-16">
            <h3 className="font-display text-2xl md:text-3xl text-ct-cream uppercase mb-8">
              Event Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {allUpcomingEvents.map((event, idx) => {
                const isPublic = event.type === "Public";
                const accentColor = isPublic
                  ? "text-ct-mustard"
                  : "text-ct-orange";
                const borderAccent = isPublic
                  ? "border-t-ct-mustard"
                  : "border-t-ct-orange";
                return (
                  <div
                    key={idx}
                    className={`bg-ct-surface border border-ct-border border-t-2 ${borderAccent} p-6 flex flex-col gap-3`}
                  >
                    {/* Date */}
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className={`font-display text-xl uppercase leading-tight ${accentColor}`}
                      >
                        {event.date}
                      </span>
                      <TypePill type={event.type} />
                    </div>

                    {/* Time */}
                    <p className="text-ct-cream-muted text-sm">{event.time}</p>

                    {/* Location */}
                    <p className="font-display text-ct-cream text-sm uppercase leading-snug">
                      {event.location}
                    </p>

                    {/* Divider */}
                    <div className="border-t border-ct-border pt-3">
                      <p className="text-ct-cream-muted text-sm leading-relaxed">
                        {event.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── REGION TAGS ── */}
      <section className="bg-ct-black py-20 md:py-28">
        <div className="container-ct">
          <span className="text-ct-mustard uppercase tracking-widest text-xs font-semibold font-sans">
            Service Areas
          </span>
          <h2 className="font-display text-3xl md:text-5xl text-ct-cream uppercase leading-tight mt-2 mb-10">
            We Roll Across The Southeast
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* South Carolina */}
            <div className="bg-ct-surface border border-ct-mustard/40 p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-1 h-8 bg-ct-mustard flex-shrink-0" />
                <h3 className="font-display text-ct-mustard text-xl uppercase tracking-wide">
                  South Carolina
                </h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {[
                  "Columbia",
                  "Charleston",
                  "Greenville",
                  "Myrtle Beach",
                  "Spartanburg",
                  "Rock Hill",
                  "Florence",
                  "Aiken",
                ].map((city) => (
                  <li
                    key={city}
                    className="bg-ct-mustard/10 border border-ct-mustard/30 text-ct-mustard text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-sm"
                  >
                    {city}
                  </li>
                ))}
              </ul>
            </div>

            {/* North Carolina */}
            <div className="bg-ct-surface border border-ct-border p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-1 h-8 bg-ct-cream/40 flex-shrink-0" />
                <h3 className="font-display text-ct-cream text-xl uppercase tracking-wide">
                  North Carolina
                </h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {["Charlotte", "Concord", "Gastonia", "Monroe"].map((city) => (
                  <li
                    key={city}
                    className="bg-ct-surface-2 border border-ct-border text-ct-cream-muted text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-sm"
                  >
                    {city}
                  </li>
                ))}
              </ul>
            </div>

            {/* Georgia */}
            <div className="bg-ct-surface border border-ct-border p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-1 h-8 bg-ct-cream/40 flex-shrink-0" />
                <h3 className="font-display text-ct-cream text-xl uppercase tracking-wide">
                  Georgia
                </h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {["Augusta", "Athens", "Gainesville"].map((city) => (
                  <li
                    key={city}
                    className="bg-ct-surface-2 border border-ct-border text-ct-cream-muted text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-sm"
                  >
                    {city}
                  </li>
                ))}
              </ul>
              <p className="text-ct-cream-muted/60 text-[11px] mt-3 leading-relaxed">
                N. Georgia corridor
              </p>
            </div>
          </div>

          <p className="text-ct-cream-muted text-sm mt-8 max-w-2xl leading-relaxed">
            Available for events across South Carolina and surrounding states.
            Mileage fee may apply for distances over 100 miles from Columbia, SC.
          </p>
        </div>
      </section>

      {/* ── STAY IN THE LOOP ── */}
      <section className="bg-ct-charcoal py-20 md:py-28">
        <div className="container-ct">
          <div className="text-center mb-12">
            <span className="text-ct-mustard uppercase tracking-widest text-xs font-semibold font-sans">
              Stay In The Loop
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-ct-cream uppercase leading-tight mt-2">
              Never Miss The Truck
            </h2>
            <div className="w-12 h-1 bg-ct-mustard mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/the.comeback.truck/"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-ct-surface border border-ct-border hover:border-ct-mustard transition-colors p-7 flex flex-col items-center text-center gap-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8 text-ct-mustard"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
              <h3 className="font-display text-ct-cream text-lg uppercase">
                Follow on Instagram
              </h3>
              <span className="text-ct-mustard text-sm group-hover:text-ct-mustard transition-colors">
                @the.comeback.truck
              </span>
            </a>

            {/* Phone */}
            <a
              href="tel:8033803309"
              className="group bg-ct-surface border border-ct-border hover:border-ct-mustard transition-colors p-7 flex flex-col items-center text-center gap-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8 text-ct-mustard"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
              </svg>
              <h3 className="font-display text-ct-cream text-lg uppercase">
                Call Us
              </h3>
              <span className="text-ct-mustard text-sm">803-380-3309</span>
            </a>

            {/* Book */}
            <Link
              href="/book"
              className="group bg-ct-surface border border-ct-border hover:border-ct-mustard transition-colors p-7 flex flex-col items-center text-center gap-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8 text-ct-mustard"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <h3 className="font-display text-ct-cream text-lg uppercase">
                Book Us
              </h3>
              <span className="text-ct-mustard text-sm group-hover:underline">
                Reserve a date &rarr;
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
