import BookingForm from "@/components/ui/BookingForm";
import AmberDivider from "@/components/ui/AmberDivider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Nicholas",
  description:
    "Book Nicholas German for your event — jazz gigs, gospel worship, weddings, corporate events, and private parties in Columbia, SC and surrounding areas.",
};

export default function BookPage() {
  return (
    <>
      {/* ── PAGE HERO ── */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-stage overflow-hidden pt-16">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-ng-amber/10 blur-[120px] top-0 left-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="relative container-ng text-center z-10 py-16">
          <p className="text-ng-amber uppercase tracking-[0.3em] text-xs font-semibold font-sans mb-4">
            Booking
          </p>
          <h1 className="font-display font-bold text-5xl md:text-7xl text-white uppercase leading-none mb-4">
            BOOK NICHOLAS
          </h1>
          <p className="font-display text-lg md:text-xl text-ng-amber tracking-widest uppercase">
            Let&apos;s bring the groove to your event.
          </p>
        </div>
      </section>

      {/* ── BOOKING SECTION ── */}
      <section className="py-20 bg-ng-black">
        <div className="container-ng">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form — 60% */}
            <div className="lg:col-span-3">
              <div className="mb-8">
                <span className="text-ng-amber uppercase tracking-widest text-xs font-semibold font-sans block mb-3">
                  Send a Request
                </span>
                <AmberDivider className="mb-4" />
                <p className="text-ng-muted text-sm leading-relaxed">
                  Fill out the form below and Nicholas will get back to you within 24–48 hours to confirm availability and discuss details.
                </p>
              </div>
              <BookingForm />
            </div>

            {/* Sidebar — 40% */}
            <div className="lg:col-span-2">
              <div className="bg-ng-surface-2 border border-ng-border rounded-lg p-8 sticky top-24">
                <h3 className="font-display font-bold text-xl text-ng-amber uppercase tracking-widest mb-6">
                  Booking Info
                </h3>

                <div className="space-y-5">
                  <div>
                    <p className="text-ng-amber text-xs uppercase tracking-widest font-semibold font-sans mb-1">
                      Response Time
                    </p>
                    <p className="text-ng-cream text-sm">Within 24–48 hours</p>
                  </div>

                  <div>
                    <p className="text-ng-amber text-xs uppercase tracking-widest font-semibold font-sans mb-1">
                      Service Area
                    </p>
                    <p className="text-ng-cream text-sm">
                      Columbia, SC &amp; surrounding areas. Travel available.
                    </p>
                  </div>

                  <div>
                    <p className="text-ng-amber text-xs uppercase tracking-widest font-semibold font-sans mb-1">
                      Availability
                    </p>
                    <p className="text-ng-cream text-sm">
                      Check availability for your event date — submit a request to get started.
                    </p>
                  </div>

                  <div>
                    <p className="text-ng-amber text-xs uppercase tracking-widest font-semibold font-sans mb-1">
                      Genres
                    </p>
                    <p className="text-ng-cream text-sm">
                      Jazz · Gospel · Live Events · Weddings
                    </p>
                  </div>

                  <div>
                    <p className="text-ng-amber text-xs uppercase tracking-widest font-semibold font-sans mb-1">
                      Contact
                    </p>
                    <p className="text-ng-muted text-sm">
                      For urgent inquiries, please use the booking form above.
                    </p>
                  </div>
                </div>

                <div className="border-t border-ng-border mt-6 pt-6">
                  <p className="text-ng-muted text-xs uppercase tracking-widest font-semibold font-sans mb-3">
                    Follow the Groove
                  </p>
                  <p className="text-ng-muted text-sm">
                    Social media links coming soon.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
