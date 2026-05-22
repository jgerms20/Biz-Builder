import type { Metadata } from "next";
import BookingForm from "@/components/ui/BookingForm";
import MustardDivider from "@/components/ui/MustardDivider";

export const metadata: Metadata = {
  title: "Book Us",
  description:
    "Book The Comeback Truck for your next event — weddings, corporate events, birthdays, block parties, and catering across Columbia, SC and the Midlands.",
};

export default function BookPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-ct-black smoke-overlay py-24 md:py-32 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-ct-mustard/10 blur-[140px] top-[-200px] left-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="container-ct relative z-10 text-center">
          <span className="text-ct-mustard uppercase tracking-widest text-xs md:text-sm font-semibold font-sans">
            Bookings
          </span>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-ct-cream uppercase leading-tight mt-6">
            Book The <span className="text-ct-mustard">Truck</span>
          </h1>
          <MustardDivider className="mx-auto mt-8" />
          <p className="text-ct-cream-muted text-base md:text-lg mt-6 max-w-2xl mx-auto">
            Bring The Comeback Truck to your next event.
          </p>
        </div>
      </section>

      {/* FORM + SIDEBAR */}
      <section className="bg-ct-charcoal py-20 md:py-24">
        <div className="container-ct">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-ct-surface border border-ct-border rounded-lg p-6 md:p-10">
                <h2 className="font-display text-2xl md:text-3xl text-ct-cream uppercase mb-2">
                  Tell Us About Your Event
                </h2>
                <p className="text-ct-cream-muted text-sm mb-8">
                  Fill this out and Brigman will reach back within 24–48 hours.
                </p>
                <BookingForm />
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-2">
              <div className="bg-ct-surface border border-ct-border rounded-lg p-6 md:p-8 flex flex-col gap-6 sticky top-24">
                <div>
                  <h3 className="text-ct-mustard uppercase tracking-widest text-xs font-semibold font-sans">
                    Booking Info
                  </h3>
                  <MustardDivider className="mt-3" />
                </div>

                <div>
                  <p className="text-ct-cream-muted text-xs uppercase tracking-wide font-semibold mb-1">
                    Response Time
                  </p>
                  <p className="text-ct-cream text-sm">Within 24–48 hours</p>
                </div>

                <div>
                  <p className="text-ct-cream-muted text-xs uppercase tracking-wide font-semibold mb-1">
                    Service Area
                  </p>
                  <p className="text-ct-cream text-sm">
                    Columbia, SC + 100 mile radius
                  </p>
                </div>

                <div>
                  <p className="text-ct-cream-muted text-xs uppercase tracking-wide font-semibold mb-1">
                    Group Size
                  </p>
                  <p className="text-ct-cream text-sm">
                    We can serve groups from 25 to 500+
                  </p>
                </div>

                <div>
                  <p className="text-ct-cream-muted text-xs uppercase tracking-wide font-semibold mb-1">
                    Lead Time
                  </p>
                  <p className="text-ct-cream text-sm">
                    Book 2+ weeks ahead when possible
                  </p>
                </div>

                <div className="border-t border-ct-border pt-6">
                  <p className="text-ct-cream-muted text-xs uppercase tracking-wide font-semibold mb-2">
                    Phone
                  </p>
                  <a
                    href="tel:8033803309"
                    className="font-display text-2xl text-ct-cream hover:text-ct-mustard transition-colors"
                  >
                    803-380-3309
                  </a>
                </div>

                <div>
                  <p className="text-ct-cream-muted text-xs uppercase tracking-wide font-semibold mb-2">
                    Instagram
                  </p>
                  <a
                    href="https://www.instagram.com/the.comeback.truck/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ct-mustard hover:text-ct-mustard-light transition-colors text-sm"
                  >
                    @the.comeback.truck
                  </a>
                </div>

                <div className="border-t border-ct-border pt-6">
                  <p className="font-display text-ct-mustard text-lg md:text-xl uppercase leading-tight">
                    Soul Food That
                    <br />
                    Brings You Back
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
