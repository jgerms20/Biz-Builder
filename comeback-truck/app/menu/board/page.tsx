import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import QRCodeBlock from "@/components/ui/QRCodeBlock";

export const metadata: Metadata = {
  title: "Menu Board",
  description:
    "The Comeback Truck full price menu — dogs, plates, fried plates, sides, drinks, and add-ons.",
};

export default function MenuBoardPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thecomebacktruck.com";

  return (
    <>
      {/* HERO */}
      <section className="bg-ct-black pt-24 pb-10">
        <div className="container-ct text-center">
          <span className="text-ct-mustard uppercase tracking-[0.25em] text-xs font-semibold font-sans">
            The Comeback Truck
          </span>
          <h1 className="font-display text-4xl md:text-6xl text-ct-cream uppercase mt-4 leading-tight">
            Our <span className="text-ct-orange">Menu</span>
          </h1>
          <p className="text-ct-cream-muted text-sm mt-3 font-sans">
            All prices shown. Updated regularly.
          </p>
        </div>
      </section>

      {/* MENU IMAGE */}
      <section className="bg-ct-black pb-16">
        <div className="container-ct">
          <div className="max-w-2xl mx-auto">
            {/* Decorative border */}
            <div className="bg-ct-mustard p-1 rounded-sm">
              <div className="relative w-full rounded-sm overflow-hidden">
                <Image
                  src="/images/menu-board.png"
                  alt="The Comeback Truck full menu with prices"
                  width={816}
                  height={1088}
                  className="w-full h-auto"
                  priority
                  quality={90}
                />
              </div>
            </div>

            {/* Note below menu */}
            <p className="text-ct-muted text-xs text-center mt-4 font-sans">
              Menu and pricing subject to change. Call{" "}
              <a href="tel:8033803309" className="text-ct-mustard hover:text-ct-mustard-light transition-colors">
                803-380-3309
              </a>{" "}
              to confirm availability.
            </p>
          </div>
        </div>
      </section>

      {/* QR + ORDER CTA */}
      <section className="bg-ct-charcoal py-16">
        <div className="container-ct">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
            {/* QR to this page */}
            <div className="text-center">
              <p className="font-sans text-ct-cream-muted text-xs uppercase tracking-widest mb-4">
                Share this menu
              </p>
              <QRCodeBlock
                url={`${siteUrl}/menu/board`}
                label="Scan to view menu"
                size={180}
              />
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-40 bg-ct-border" />

            {/* Order / call CTAs */}
            <div className="text-center flex flex-col items-center gap-4">
              <p className="font-display text-ct-cream text-2xl md:text-3xl uppercase">
                Ready to Order?
              </p>
              <Link
                href="/order"
                className="bg-ct-orange hover:bg-ct-orange-light text-white font-display tracking-widest px-8 py-4 uppercase transition-colors w-full text-center"
              >
                Order Online
              </Link>
              <a
                href="tel:8033803309"
                className="border-2 border-ct-mustard text-ct-mustard hover:bg-ct-mustard hover:text-ct-black font-display tracking-widest px-8 py-4 uppercase transition-colors w-full text-center"
              >
                Call 803-380-3309
              </a>
              <Link
                href="/menu"
                className="text-ct-muted hover:text-ct-cream-muted text-sm font-sans transition-colors"
              >
                ← Back to full menu
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
