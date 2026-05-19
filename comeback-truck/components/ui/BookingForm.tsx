"use client";

import { useState, FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  location: string;
  guests: string;
  serviceStyle: string;
  notes: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  eventType: "",
  eventDate: "",
  location: "",
  guests: "",
  serviceStyle: "",
  notes: "",
};

export default function BookingForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = (): string | null => {
    if (!formData.name.trim()) return "Full name is required.";
    if (!formData.email.trim()) return "Email address is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return "Please enter a valid email address.";
    if (!formData.phone.trim()) return "Phone number is required.";
    if (!formData.eventType) return "Please select an event type.";
    if (!formData.eventDate) return "Event date is required.";
    if (!formData.location.trim()) return "Event location is required.";
    return null;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = (await res.json()) as { success: boolean; error?: string };
      if (json.success) {
        setSuccess(true);
        setFormData(initialFormData);
      } else {
        setError(json.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-ct-surface-2 border border-ct-border rounded px-4 py-3 text-ct-cream placeholder-ct-muted focus:outline-none focus:border-ct-mustard transition-colors text-sm";
  const labelClass =
    "block text-ct-cream-muted text-xs uppercase tracking-wide mb-1.5 font-semibold";

  if (success) {
    return (
      <div className="bg-ct-surface-2 border border-ct-mustard/40 rounded-lg p-10 text-center">
        <div className="text-ct-mustard text-6xl mb-4">✓</div>
        <h3 className="font-display text-3xl text-ct-cream mb-3 uppercase">
          We Got You!
        </h3>
        <p className="text-ct-cream-muted">
          Brigman will be in touch within 24–48 hours to confirm details.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {error && (
        <div className="bg-red-900/30 border border-red-500/50 rounded px-4 py-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelClass}>
            Full Name <span className="text-ct-mustard">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email Address <span className="text-ct-mustard">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="you@email.com"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className={labelClass}>
          Phone Number <span className="text-ct-mustard">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          value={formData.phone}
          onChange={handleChange}
          placeholder="(803) 000-0000"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="eventType" className={labelClass}>
            Event Type <span className="text-ct-mustard">*</span>
          </label>
          <select
            id="eventType"
            name="eventType"
            required
            value={formData.eventType}
            onChange={handleChange}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="">Select event type…</option>
            <option value="Private Party / Birthday">Private Party / Birthday</option>
            <option value="Wedding">Wedding</option>
            <option value="Corporate Event">Corporate Event</option>
            <option value="Festival / Public Event">Festival / Public Event</option>
            <option value="Block Party / Tailgate">Block Party / Tailgate</option>
            <option value="Catering Only (Drop-off)">Catering Only (Drop-off)</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="eventDate" className={labelClass}>
            Event Date <span className="text-ct-mustard">*</span>
          </label>
          <input
            id="eventDate"
            name="eventDate"
            type="date"
            required
            value={formData.eventDate}
            onChange={handleChange}
            className={`${inputClass} cursor-pointer`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="location" className={labelClass}>
          Event Location / Address <span className="text-ct-mustard">*</span>
        </label>
        <input
          id="location"
          name="location"
          type="text"
          required
          value={formData.location}
          onChange={handleChange}
          placeholder="Venue name, city, or full address"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="guests" className={labelClass}>
            Expected Number of Guests
          </label>
          <select
            id="guests"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="">Select guest count…</option>
            <option value="Under 25">Under 25</option>
            <option value="25–50">25–50</option>
            <option value="50–100">50–100</option>
            <option value="100–200">100–200</option>
            <option value="200+">200+</option>
          </select>
        </div>

        <div>
          <label htmlFor="serviceStyle" className={labelClass}>
            Service Style
          </label>
          <select
            id="serviceStyle"
            name="serviceStyle"
            value={formData.serviceStyle}
            onChange={handleChange}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="">Select service style…</option>
            <option value="Truck on-site serving">Truck on-site serving</option>
            <option value="Drop-off catering">Drop-off catering</option>
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="notes" className={labelClass}>
          Notes / Special Requests
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          value={formData.notes}
          onChange={handleChange}
          placeholder="Tell us about your event, menu preferences, dietary needs, or anything else…"
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-ct-mustard hover:bg-ct-mustard-light text-ct-black font-display tracking-widest py-4 rounded transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-base"
      >
        {loading ? "SENDING…" : "SEND BOOKING REQUEST"}
      </button>
    </form>
  );
}
