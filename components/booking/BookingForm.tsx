"use client";

import { useState } from "react";

const availableServices = [
  "Hem pants (no cuff)",
  "Hem pants (with cuff)",
  "Shorten shorts",
  "Taper / slim legs",
  "Take in waist",
  "Let out waist",
  "Take in sides (shirt/blouse)",
  "Shorten sleeves",
  "Take in jacket/blazer",
  "Hem dress",
  "Take in dress",
  "Bridal/formal alterations",
  "Repairs & mending",
  "Custom work / other",
];

const garmentTypes = [
  "Pants / Trousers",
  "Jeans",
  "Shorts",
  "Shirt / Blouse",
  "Blazer / Jacket",
  "Dress (casual)",
  "Dress (formal/gown)",
  "Wedding dress",
  "Suit (jacket + pants)",
  "Skirt",
  "Other",
];

interface FormData {
  services: string[];
  garmentType: string;
  garmentDescription: string;
  name: string;
  email: string;
  phone: string;
  deliveryMethod: "local" | "mail-in" | "";
  timeline: "standard" | "rush";
  heardAboutUs: string;
  additionalNotes: string;
}

const initialData: FormData = {
  services: [],
  garmentType: "",
  garmentDescription: "",
  name: "",
  email: "",
  phone: "",
  deliveryMethod: "",
  timeline: "standard",
  heardAboutUs: "",
  additionalNotes: "",
};

const TOTAL_STEPS = 5;

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialData);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function toggleService(service: string) {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  }

  function canAdvance(): boolean {
    switch (step) {
      case 1:
        return formData.services.length > 0;
      case 2:
        return formData.garmentType !== "";
      case 3:
        return (
          formData.name.trim() !== "" &&
          formData.email.trim() !== "" &&
          formData.phone.trim() !== ""
        );
      case 4:
        return formData.deliveryMethod !== "";
      case 5:
        return true;
      default:
        return false;
    }
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed.");
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-16 max-w-lg mx-auto">
        <div className="w-16 h-16 bg-olive/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-olive"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="font-serif text-3xl font-medium text-charcoal mb-3">
          Request Received
        </h2>
        <p className="font-sans text-base text-charcoal/70 leading-relaxed mb-6">
          Thank you, {formData.name}. We&apos;ll review your request and get back to
          you within 24 hours to confirm details and pricing.
        </p>
        <p className="font-sans text-sm text-charcoal/50">
          Questions? Reach us at{" "}
          <a
            href="/contact"
            className="text-terracotta underline underline-offset-2"
          >
            our contact page
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      {/* Progress */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i + 1 <= step ? "bg-terracotta" : "bg-gray"
              }`}
            />
          ))}
        </div>
        <p className="font-sans text-xs text-charcoal/40 tracking-wider uppercase">
          Step {step} of {TOTAL_STEPS}
        </p>
      </div>

      {/* Step 1: Services */}
      {step === 1 && (
        <div>
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal mb-2">
            What do you need done?
          </h2>
          <p className="font-sans text-sm text-charcoal/60 mb-6">
            Select all that apply. You can add details in the next step.
          </p>
          <div className="grid grid-cols-1 gap-2">
            {availableServices.map((service) => (
              <button
                key={service}
                type="button"
                onClick={() => toggleService(service)}
                className={`flex items-center gap-3 w-full text-left px-4 py-3.5 border rounded-brand transition-colors ${
                  formData.services.includes(service)
                    ? "border-terracotta bg-terracotta/5 text-charcoal"
                    : "border-gray hover:border-gray-dark text-charcoal"
                }`}
              >
                <span
                  className={`w-4 h-4 flex-shrink-0 border rounded-sm flex items-center justify-center transition-colors ${
                    formData.services.includes(service)
                      ? "bg-terracotta border-terracotta"
                      : "border-gray-dark"
                  }`}
                >
                  {formData.services.includes(service) && (
                    <svg
                      className="w-3 h-3 text-cream"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </span>
                <span className="font-sans text-sm">{service}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Garment */}
      {step === 2 && (
        <div>
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal mb-2">
            Tell us about the garment.
          </h2>
          <p className="font-sans text-sm text-charcoal/60 mb-6">
            The more detail, the better we can help.
          </p>

          <div className="mb-5">
            <label className="block font-sans text-xs font-medium tracking-[0.1em] uppercase text-charcoal mb-2">
              Garment Type *
            </label>
            <select
              value={formData.garmentType}
              onChange={(e) =>
                setFormData((p) => ({ ...p, garmentType: e.target.value }))
              }
              className="w-full border border-gray rounded-brand px-4 py-3 font-sans text-sm text-charcoal bg-cream focus:border-terracotta focus:outline-none"
            >
              <option value="">Select a garment type...</option>
              {garmentTypes.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-sans text-xs font-medium tracking-[0.1em] uppercase text-charcoal mb-2">
              Description / Details
            </label>
            <textarea
              value={formData.garmentDescription}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  garmentDescription: e.target.value,
                }))
              }
              rows={5}
              placeholder="e.g. 'Dark navy dress pants, need the legs tapered and waist taken in about an inch. The fabric is wool.' — any detail helps."
              className="w-full border border-gray rounded-brand px-4 py-3 font-sans text-sm text-charcoal bg-cream focus:border-terracotta focus:outline-none resize-none"
            />
          </div>
        </div>
      )}

      {/* Step 3: Contact */}
      {step === 3 && (
        <div>
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal mb-2">
            Your contact information.
          </h2>
          <p className="font-sans text-sm text-charcoal/60 mb-6">
            We&apos;ll use this to confirm your order and communicate.
          </p>

          {[
            {
              label: "Full Name",
              key: "name",
              type: "text",
              placeholder: "Your name",
            },
            {
              label: "Email Address",
              key: "email",
              type: "email",
              placeholder: "your@email.com",
            },
            {
              label: "Phone Number",
              key: "phone",
              type: "tel",
              placeholder: "(555) 000-0000",
            },
          ].map(({ label, key, type, placeholder }) => (
            <div key={key} className="mb-5">
              <label className="block font-sans text-xs font-medium tracking-[0.1em] uppercase text-charcoal mb-2">
                {label} *
              </label>
              <input
                type={type}
                value={formData[key as keyof FormData] as string}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, [key]: e.target.value }))
                }
                placeholder={placeholder}
                className="w-full border border-gray rounded-brand px-4 py-3 font-sans text-sm text-charcoal bg-cream focus:border-terracotta focus:outline-none"
              />
            </div>
          ))}
        </div>
      )}

      {/* Step 4: Delivery */}
      {step === 4 && (
        <div>
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal mb-2">
            How will you get us the garment?
          </h2>
          <p className="font-sans text-sm text-charcoal/60 mb-6">
            Local drop-off in Walterboro, or ship it to us from anywhere.
          </p>

          <div className="space-y-4">
            {[
              {
                value: "local",
                title: "Local Drop-Off",
                desc: "Drop off in Walterboro, SC. We'll confirm the location when we confirm your booking.",
              },
              {
                value: "mail-in",
                title: "Mail-In Order",
                desc: "Ship your garment to us. We'll provide the mailing address in your confirmation. +$10 handling fee.",
              },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() =>
                  setFormData((p) => ({
                    ...p,
                    deliveryMethod: opt.value as "local" | "mail-in",
                  }))
                }
                className={`w-full text-left px-5 py-5 border rounded-brand transition-colors ${
                  formData.deliveryMethod === opt.value
                    ? "border-terracotta bg-terracotta/5"
                    : "border-gray hover:border-gray-dark"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`mt-0.5 w-5 h-5 flex-shrink-0 rounded-full border-2 flex items-center justify-center transition-colors ${
                      formData.deliveryMethod === opt.value
                        ? "border-terracotta"
                        : "border-gray-dark"
                    }`}
                  >
                    {formData.deliveryMethod === opt.value && (
                      <div className="w-2.5 h-2.5 rounded-full bg-terracotta" />
                    )}
                  </div>
                  <div>
                    <p className="font-sans text-sm font-medium text-charcoal">
                      {opt.title}
                    </p>
                    <p className="font-sans text-sm text-charcoal/60 mt-0.5">
                      {opt.desc}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 5: Timeline + wrap-up */}
      {step === 5 && (
        <div>
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal mb-2">
            Almost done.
          </h2>
          <p className="font-sans text-sm text-charcoal/60 mb-6">
            A couple last details, then we&apos;ll review your request.
          </p>

          <div className="mb-5">
            <label className="block font-sans text-xs font-medium tracking-[0.1em] uppercase text-charcoal mb-3">
              Timeline
            </label>
            <div className="flex gap-3">
              {[
                { value: "standard", label: "Standard (3–7 days)" },
                { value: "rush", label: "Rush (ASAP)" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() =>
                    setFormData((p) => ({
                      ...p,
                      timeline: opt.value as "standard" | "rush",
                    }))
                  }
                  className={`flex-1 py-3 px-4 border rounded-brand font-sans text-sm transition-colors ${
                    formData.timeline === opt.value
                      ? "border-terracotta bg-terracotta/5 text-charcoal"
                      : "border-gray hover:border-gray-dark text-charcoal"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <label className="block font-sans text-xs font-medium tracking-[0.1em] uppercase text-charcoal mb-2">
              How did you hear about us?
            </label>
            <select
              value={formData.heardAboutUs}
              onChange={(e) =>
                setFormData((p) => ({ ...p, heardAboutUs: e.target.value }))
              }
              className="w-full border border-gray rounded-brand px-4 py-3 font-sans text-sm text-charcoal bg-cream focus:border-terracotta focus:outline-none"
            >
              <option value="">Select...</option>
              <option value="TikTok">TikTok</option>
              <option value="Word of mouth">Word of mouth</option>
              <option value="Google search">Google search</option>
              <option value="Instagram">Instagram</option>
              <option value="Local community">Local community (Walterboro)</option>
              <option value="Friend or family">Friend or family</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block font-sans text-xs font-medium tracking-[0.1em] uppercase text-charcoal mb-2">
              Anything else we should know?
            </label>
            <textarea
              value={formData.additionalNotes}
              onChange={(e) =>
                setFormData((p) => ({ ...p, additionalNotes: e.target.value }))
              }
              rows={4}
              placeholder="Deadlines, specific measurements, questions..."
              className="w-full border border-gray rounded-brand px-4 py-3 font-sans text-sm text-charcoal bg-cream focus:border-terracotta focus:outline-none resize-none"
            />
          </div>

          {/* Summary */}
          <div className="bg-cream-dark border border-gray rounded-brand p-5 mb-6">
            <h3 className="font-sans text-xs font-medium tracking-[0.15em] uppercase text-charcoal/50 mb-3">
              Order Summary
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-sans text-sm text-charcoal/60">Name</span>
                <span className="font-sans text-sm text-charcoal">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-sans text-sm text-charcoal/60">Delivery</span>
                <span className="font-sans text-sm text-charcoal capitalize">
                  {formData.deliveryMethod}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-sans text-sm text-charcoal/60">Timeline</span>
                <span className="font-sans text-sm text-charcoal capitalize">
                  {formData.timeline}
                </span>
              </div>
              <div className="pt-2 border-t border-gray">
                <span className="font-sans text-sm text-charcoal/60">Services</span>
                <ul className="mt-1 space-y-0.5">
                  {formData.services.map((s) => (
                    <li key={s} className="font-sans text-sm text-charcoal">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-brand p-4 mb-4">
              <p className="font-sans text-sm text-red-700">{error}</p>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray">
        <button
          type="button"
          onClick={() => setStep((s) => s - 1)}
          className={`font-sans text-sm text-charcoal/50 hover:text-charcoal transition-colors ${
            step === 1 ? "invisible" : ""
          }`}
        >
          ← Back
        </button>

        {step < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            disabled={!canAdvance()}
            className={`bg-terracotta text-cream font-sans text-xs font-medium tracking-[0.2em] uppercase px-8 py-4 hover:bg-terracotta-dark transition-colors rounded-brand ${
              !canAdvance() ? "opacity-40 cursor-not-allowed" : ""
            }`}
          >
            Continue →
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className={`bg-terracotta text-cream font-sans text-xs font-medium tracking-[0.2em] uppercase px-8 py-4 hover:bg-terracotta-dark transition-colors rounded-brand ${
              submitting ? "opacity-70 cursor-wait" : ""
            }`}
          >
            {submitting ? "Sending..." : "Submit Request"}
          </button>
        )}
      </div>
    </div>
  );
}
