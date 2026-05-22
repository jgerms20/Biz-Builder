"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

type MenuItem = { id: string; name: string; price: number };
type MenuSection = { section: string; items: MenuItem[] };

const MENU: MenuSection[] = [
  {
    section: "Hot Dogs",
    items: [
      { id: "hd1", name: "Regular Hot Dog", price: 6 },
      { id: "hd2", name: "Slaw Dog", price: 7 },
      { id: "hd3", name: "Comeback Dog", price: 8 },
      { id: "hd4", name: "Pulled Pork Dog", price: 9 },
      { id: "hd5", name: "Hot Dog Combo (add fries & drink)", price: 3.5 },
    ],
  },
  {
    section: "Sandwiches",
    items: [
      { id: "sw1", name: "BBQ Sandwich", price: 9 },
      { id: "sw2", name: "Pulled Pork Sandwich", price: 10 },
    ],
  },
  {
    section: "Dinner Plates",
    items: [
      { id: "dp1", name: "Fish Plate — 1 Piece (with 2 sides)", price: 10 },
      { id: "dp2", name: "Fish Plate — 2 Pieces (with 2 sides)", price: 13 },
      { id: "dp3", name: "Leg Quarter Plate (with 2 sides)", price: 11 },
      { id: "dp4", name: "Chicken Tenders (with 1 side)", price: 9 },
      { id: "dp5", name: "Fried Rib Plate — 1 Side", price: 13 },
      { id: "dp6", name: "Fried Rib Plate — 2 Sides", price: 15 },
    ],
  },
  {
    section: "Sides",
    items: [
      { id: "si1", name: "Baked Beans", price: 3 },
      { id: "si2", name: "Rice", price: 2 },
      { id: "si3", name: "Green Beans", price: 3 },
      { id: "si4", name: "Mac & Cheese", price: 4 },
      { id: "si5", name: "Fries", price: 4 },
      { id: "si6", name: "Comeback Sauce", price: 1 },
    ],
  },
  {
    section: "Loaded",
    items: [
      { id: "lo1", name: "Loaded Fries with Comeback Sauce", price: 9 },
      { id: "lo2", name: "Loaded Nachos with Comeback Sauce", price: 9 },
    ],
  },
];

type Status = "idle" | "loading" | "success" | "error";

export default function OrderPage() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const orderItems = useMemo(
    () =>
      MENU.flatMap((s) => s.items).filter((item) => (quantities[item.id] ?? 0) > 0),
    [quantities]
  );

  const total = useMemo(
    () =>
      orderItems.reduce(
        (sum, item) => sum + item.price * (quantities[item.id] ?? 0),
        0
      ),
    [orderItems, quantities]
  );

  function adjust(id: string, delta: number) {
    setQuantities((prev) => {
      const next = (prev[id] ?? 0) + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (orderItems.length === 0) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerPhone,
          pickupTime,
          notes,
          items: orderItems.map((i) => ({
            name: i.name,
            qty: quantities[i.id],
            price: i.price,
          })),
        }),
      });
      if (!res.ok) throw new Error("Server error");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  // ── SUCCESS STATE ────────────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <section className="min-h-screen bg-ct-charcoal flex items-center py-20">
        <div className="container-ct w-full">
          <div className="max-w-xl mx-auto text-center">
            <div className="text-ct-mustard text-7xl mb-6 leading-none">✓</div>
            <h1 className="font-display text-4xl md:text-5xl text-ct-cream uppercase mb-4">
              Order Received!
            </h1>
            <p className="text-ct-cream-muted font-sans text-base md:text-lg leading-relaxed mb-8">
              We got your order, {customerName}! We&apos;ll call you at{" "}
              <span className="text-ct-cream">{customerPhone}</span> to confirm.
              See you soon.
            </p>

            {/* Order summary */}
            <div className="bg-ct-surface border border-ct-border rounded p-6 text-left mb-8">
              <h2 className="font-display text-ct-mustard uppercase text-sm tracking-widest mb-4">
                Your Order
              </h2>
              <ul className="divide-y divide-ct-border">
                {orderItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between py-3 gap-4"
                  >
                    <span className="font-sans text-ct-cream text-sm flex-1">
                      {item.name}
                      <span className="text-ct-cream-muted ml-2">
                        × {quantities[item.id]}
                      </span>
                    </span>
                    <span className="font-display text-ct-orange text-sm shrink-0">
                      ${(item.price * (quantities[item.id] ?? 0)).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between pt-4 mt-2 border-t border-ct-border">
                <span className="font-display text-ct-cream uppercase tracking-widest text-sm">
                  Total
                </span>
                <span className="font-display text-ct-orange text-xl">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <Link
              href="/menu"
              className="inline-block font-display tracking-widest text-ct-mustard hover:text-ct-mustard-light transition-colors"
            >
              &larr; VIEW FULL MENU
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // ── MAIN ORDER PAGE ──────────────────────────────────────────────────────────
  return (
    <>
      {/* HERO */}
      <section className="relative bg-ct-black smoke-overlay py-24 md:py-32 overflow-hidden">
        <div className="absolute w-[700px] h-[700px] rounded-full bg-ct-mustard/10 blur-[160px] top-[-250px] left-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="container-ct relative z-10 text-center">
          <span className="inline-block text-ct-mustard uppercase tracking-[0.25em] text-xs md:text-sm font-semibold font-sans mb-6">
            Order Online
          </span>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-ct-cream uppercase leading-tight">
            ORDER{" "}
            <span className="text-ct-orange">NOW</span>
          </h1>
          <p className="text-ct-cream-muted text-base md:text-lg mt-6 max-w-xl mx-auto font-sans">
            Select your items, drop your name and number, and we&apos;ll have it ready.
          </p>
          <p className="text-ct-muted text-sm mt-3 font-sans">
            This is a pickup order. We&apos;ll call to confirm.
          </p>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="bg-ct-charcoal py-16">
        <div className="container-ct">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 items-start">

              {/* ── LEFT: MENU ──────────────────────────────────────────────── */}
              <div className="md:col-span-2 flex flex-col gap-0">
                {MENU.map((section) => (
                  <div key={section.section} className="mb-6">
                    {/* Section header bar */}
                    <div className="bg-ct-mustard px-5 py-3">
                      <h2 className="font-display text-white text-xl md:text-2xl uppercase tracking-widest">
                        {section.section}
                      </h2>
                    </div>

                    {/* Items */}
                    <div className="bg-ct-surface border border-t-0 border-ct-border">
                      {section.items.map((item, idx) => {
                        const qty = quantities[item.id] ?? 0;
                        const isActive = qty > 0;
                        return (
                          <div
                            key={item.id}
                            className={`flex items-center gap-4 px-5 py-4 ${
                              idx !== 0 ? "border-t border-ct-border" : ""
                            } transition-colors ${
                              isActive ? "bg-ct-surface-2" : ""
                            }`}
                          >
                            {/* Item name */}
                            <span
                              className={`flex-1 font-sans text-sm md:text-base leading-snug transition-colors ${
                                isActive ? "text-ct-cream" : "text-ct-cream-muted"
                              }`}
                            >
                              {item.name}
                            </span>

                            {/* Price */}
                            <span
                              className={`font-display text-base md:text-lg shrink-0 transition-colors ${
                                isActive ? "text-ct-orange" : "text-ct-muted"
                              }`}
                            >
                              ${item.price % 1 === 0 ? item.price : item.price.toFixed(2)}
                            </span>

                            {/* Qty controls */}
                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                type="button"
                                onClick={() => adjust(item.id, -1)}
                                disabled={qty === 0}
                                className="w-8 h-8 rounded-full flex items-center justify-center border border-ct-mustard text-ct-mustard font-display text-lg leading-none transition-colors hover:bg-ct-mustard hover:text-ct-black disabled:opacity-30 disabled:cursor-not-allowed"
                                aria-label={`Decrease ${item.name}`}
                              >
                                −
                              </button>
                              <span
                                className={`w-6 text-center font-display text-base tabular-nums transition-colors ${
                                  isActive ? "text-ct-cream" : "text-ct-muted"
                                }`}
                              >
                                {qty}
                              </span>
                              <button
                                type="button"
                                onClick={() => adjust(item.id, 1)}
                                className="w-8 h-8 rounded-full flex items-center justify-center border border-ct-mustard text-ct-mustard font-display text-lg leading-none transition-colors hover:bg-ct-mustard hover:text-ct-black"
                                aria-label={`Increase ${item.name}`}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* ── RIGHT: ORDER SUMMARY (sticky) ───────────────────────────── */}
              <div className="md:col-span-1 md:sticky md:top-6">
                <div className="bg-ct-surface border border-ct-border rounded overflow-hidden">
                  {/* Summary header */}
                  <div className="bg-ct-surface-2 border-b border-ct-border px-5 py-4">
                    <h2 className="font-display text-ct-cream uppercase tracking-widest text-base">
                      Your Order
                    </h2>
                  </div>

                  <div className="px-5 py-4">
                    {/* Item list or empty state */}
                    {orderItems.length === 0 ? (
                      <p className="text-ct-muted font-sans text-sm py-4 text-center leading-relaxed">
                        No items yet — add something from the menu.
                      </p>
                    ) : (
                      <ul className="divide-y divide-ct-border mb-4">
                        {orderItems.map((item) => (
                          <li
                            key={item.id}
                            className="flex items-start justify-between gap-3 py-3"
                          >
                            <div className="flex-1 min-w-0">
                              <span className="font-sans text-ct-cream text-sm leading-snug block">
                                {item.name}
                              </span>
                              <span className="text-ct-cream-muted text-xs font-sans">
                                × {quantities[item.id]}
                              </span>
                            </div>
                            <span className="font-display text-ct-orange text-sm shrink-0">
                              ${(item.price * (quantities[item.id] ?? 0)).toFixed(2)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Total */}
                    {orderItems.length > 0 && (
                      <div className="flex items-center justify-between py-3 border-t border-ct-border mb-4">
                        <span className="font-display text-ct-cream uppercase tracking-widest text-sm">
                          Total
                        </span>
                        <span className="font-display text-ct-orange text-xl">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                    )}

                    {/* Customer info fields */}
                    <div className="flex flex-col gap-3 mt-2">
                      <div>
                        <label className="block text-ct-cream-muted font-sans text-xs uppercase tracking-widest mb-1">
                          Your Name <span className="text-ct-orange">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="First & last name"
                          className="w-full bg-ct-surface-2 border border-ct-border focus:border-ct-mustard outline-none rounded px-3 py-2 text-ct-cream font-sans text-sm placeholder:text-ct-muted transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-ct-cream-muted font-sans text-xs uppercase tracking-widest mb-1">
                          Phone <span className="text-ct-orange">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="803-555-0100"
                          className="w-full bg-ct-surface-2 border border-ct-border focus:border-ct-mustard outline-none rounded px-3 py-2 text-ct-cream font-sans text-sm placeholder:text-ct-muted transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-ct-cream-muted font-sans text-xs uppercase tracking-widest mb-1">
                          When are you picking up?
                        </label>
                        <input
                          type="text"
                          value={pickupTime}
                          onChange={(e) => setPickupTime(e.target.value)}
                          placeholder="e.g. Today around 1pm"
                          className="w-full bg-ct-surface-2 border border-ct-border focus:border-ct-mustard outline-none rounded px-3 py-2 text-ct-cream font-sans text-sm placeholder:text-ct-muted transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-ct-cream-muted font-sans text-xs uppercase tracking-widest mb-1">
                          Notes (optional)
                        </label>
                        <textarea
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          rows={3}
                          placeholder="Allergies, special requests…"
                          className="w-full bg-ct-surface-2 border border-ct-border focus:border-ct-mustard outline-none rounded px-3 py-2 text-ct-cream font-sans text-sm placeholder:text-ct-muted transition-colors resize-none"
                        />
                      </div>
                    </div>

                    {/* Error message */}
                    {status === "error" && (
                      <p className="text-red-400 font-sans text-sm mt-3 text-center">
                        Something went wrong. Please try again or call us at{" "}
                        <a
                          href="tel:8033803309"
                          className="underline hover:text-red-300 transition-colors"
                        >
                          803-380-3309
                        </a>
                        .
                      </p>
                    )}

                    {/* Submit button */}
                    <button
                      type="submit"
                      disabled={status === "loading" || orderItems.length === 0}
                      className="mt-4 w-full bg-ct-orange hover:bg-ct-orange-light disabled:opacity-40 disabled:cursor-not-allowed font-display tracking-widest text-white text-base uppercase px-6 py-4 rounded transition-colors"
                    >
                      {status === "loading" ? "PLACING ORDER…" : "PLACE ORDER"}
                    </button>

                    <p className="text-ct-muted font-sans text-xs text-center mt-3 leading-relaxed">
                      We&apos;ll call to confirm your pickup time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
