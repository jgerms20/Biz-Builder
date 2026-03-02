import type { Metadata } from "next";
import BookingForm from "@/components/booking/BookingForm";

export const metadata: Metadata = {
  title: "Book an Alteration",
  description:
    "Submit your alteration request to Janie Bell Daniels in Walterboro, SC. Local drop-off and mail-in orders accepted.",
};

export default function BookPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream-dark py-16 md:py-20">
        <div className="container-brand">
          <div className="max-w-xl">
            <p className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-terracotta mb-4">
              Get Started
            </p>
            <h1 className="font-serif text-display-md font-medium text-charcoal leading-tight">
              Book an Alteration
            </h1>
            <p className="font-sans text-base text-charcoal/70 mt-4 leading-relaxed">
              Fill out the form below. We&apos;ll confirm your request within 24
              hours with pricing details. Local drop-off and mail-in both
              welcome.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-section bg-cream">
        <div className="container-brand">
          <BookingForm />
        </div>
      </section>
    </>
  );
}
