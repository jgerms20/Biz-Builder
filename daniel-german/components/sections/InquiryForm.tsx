"use client";

import { useState, FormEvent } from "react";

const serviceOptions = [
  { value: "private-dining-one-night", label: "Private Dining — One Night" },
  {
    value: "private-dining-multi-weekend",
    label: "Private Dining — Multi-Weekend",
  },
  { value: "private-dining-multi-day", label: "Private Dining — Multi-Day" },
  { value: "catering", label: "Catering" },
  { value: "meal-prep", label: "Meal Prep" },
  { value: "other", label: "Other / Not Sure Yet" },
];

const guestCountOptions = [
  "2-4 guests",
  "5-10 guests",
  "11-25 guests",
  "26-50 guests",
  "51-100 guests",
  "100+ guests",
];

const budgetOptions = [
  "Under $1,000",
  "$1,000 - $2,500",
  "$2,500 - $5,000",
  "$5,000 - $10,000",
  "$10,000+",
  "Flexible / Not sure yet",
];

const inputClasses =
  "w-full bg-dg-surface border border-dg-border text-cream placeholder-cream-muted/30 font-sans text-sm px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors duration-300";

const labelClasses =
  "block font-sans text-xs uppercase tracking-[0.15em] text-cream-muted/60 mb-2";

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    serviceType: "",
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    guestCount: "",
    budgetRange: "",
    location: "",
    dietaryRestrictions: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      setFormData({
        serviceType: "",
        name: "",
        email: "",
        phone: "",
        eventDate: "",
        guestCount: "",
        budgetRange: "",
        location: "",
        dietaryRestrictions: "",
        message: "",
      });
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-6 border border-gold/30 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-gold"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
        <h3 className="font-serif text-display-sm text-cream mb-4">
          Inquiry Received
        </h3>
        <p className="font-sans text-sm text-cream-muted/70 max-w-md mx-auto leading-relaxed">
          Thank you for your interest in DG Creations. Chef Daniel will
          personally review your inquiry and reach out within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Service Type */}
      <div>
        <label htmlFor="serviceType" className={labelClasses}>
          Service Type *
        </label>
        <select
          id="serviceType"
          name="serviceType"
          value={formData.serviceType}
          onChange={handleChange}
          required
          className={inputClasses}
        >
          <option value="">Select a service</option>
          {serviceOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Name and Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your name"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your@email.com"
            className={inputClasses}
          />
        </div>
      </div>

      {/* Phone and Event Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className={labelClasses}>
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="(555) 555-5555"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="eventDate" className={labelClasses}>
            Preferred Date(s)
          </label>
          <input
            type="text"
            id="eventDate"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            placeholder="e.g., March 15, 2026 or flexible"
            className={inputClasses}
          />
        </div>
      </div>

      {/* Guest Count and Budget */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="guestCount" className={labelClasses}>
            Guest Count
          </label>
          <select
            id="guestCount"
            name="guestCount"
            value={formData.guestCount}
            onChange={handleChange}
            className={inputClasses}
          >
            <option value="">Select guest count</option>
            {guestCountOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="budgetRange" className={labelClasses}>
            Budget Range
          </label>
          <select
            id="budgetRange"
            name="budgetRange"
            value={formData.budgetRange}
            onChange={handleChange}
            className={inputClasses}
          >
            <option value="">Select budget range</option>
            {budgetOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Location */}
      <div>
        <label htmlFor="location" className={labelClasses}>
          Event Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="City, state, or full address"
          className={inputClasses}
        />
      </div>

      {/* Dietary Restrictions */}
      <div>
        <label htmlFor="dietaryRestrictions" className={labelClasses}>
          Dietary Restrictions / Allergies
        </label>
        <input
          type="text"
          id="dietaryRestrictions"
          name="dietaryRestrictions"
          value={formData.dietaryRestrictions}
          onChange={handleChange}
          placeholder="e.g., gluten-free, nut allergy, vegan guests"
          className={inputClasses}
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelClasses}>
          Tell Us About Your Vision
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          placeholder="Describe the occasion, any special requests, themes, or anything else Chef Daniel should know..."
          className={`${inputClasses} resize-vertical`}
        />
      </div>

      {/* Error Message */}
      {status === "error" && (
        <div className="p-4 bg-burgundy/20 border border-burgundy/40 text-cream text-sm font-sans">
          {errorMessage}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full py-4 bg-gold text-dg-black text-sm font-sans font-semibold tracking-wider uppercase hover:bg-gold-light transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Sending Inquiry..." : "Submit Inquiry"}
      </button>

      <p className="font-sans text-xs text-cream-muted/30 text-center">
        By submitting this form, you agree to be contacted regarding your
        inquiry. Your information will never be shared with third parties.
      </p>
    </form>
  );
}
