"use client";

import { useState, FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  venue: string;
  duration: string;
  notes: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  eventType: "",
  eventDate: "",
  venue: "",
  duration: "",
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
    if (!formData.venue.trim()) return "Event location / venue is required.";
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
    "w-full bg-ng-surface-2 border border-ng-border rounded px-4 py-3 text-ng-cream placeholder-ng-muted focus:outline-none focus:border-ng-amber transition-colors text-sm";
  const labelClass = "block text-ng-muted text-xs uppercase tracking-wide mb-1.5 font-semibold";

  if (success) {
    return (
      <div className="bg-ng-surface-2 border border-ng-amber/30 rounded-lg p-10 text-center">
        <div className="text-ng-amber text-5xl mb-4">✓</div>
        <h3 className="font-display text-2xl text-ng-cream mb-2 uppercase">
          Booking Request Sent!
        </h3>
        <p className="text-ng-muted">
          Nicholas will be in touch within 24–48 hours.
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
            Full Name <span className="text-ng-amber">*</span>
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
            Email Address <span className="text-ng-amber">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className={labelClass}>
          Phone Number <span className="text-ng-amber">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          value={formData.phone}
          onChange={handleChange}
          placeholder="(555) 000-0000"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="eventType" className={labelClass}>
            Event Type <span className="text-ng-amber">*</span>
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
            <option value="Jazz Gig / Ensemble">Jazz Gig / Ensemble</option>
            <option value="Church / Worship Service">Church / Worship Service</option>
            <option value="Wedding">Wedding</option>
            <option value="Corporate Event">Corporate Event</option>
            <option value="Private Party">Private Party</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="eventDate" className={labelClass}>
            Event Date <span className="text-ng-amber">*</span>
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
        <label htmlFor="venue" className={labelClass}>
          Event Location / Venue <span className="text-ng-amber">*</span>
        </label>
        <input
          id="venue"
          name="venue"
          type="text"
          required
          value={formData.venue}
          onChange={handleChange}
          placeholder="Venue name, city, or address"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="duration" className={labelClass}>
          Expected Duration
        </label>
        <select
          id="duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          className={`${inputClass} cursor-pointer`}
        >
          <option value="">Select duration…</option>
          <option value="1-2 hours">1–2 hours</option>
          <option value="2-4 hours">2–4 hours</option>
          <option value="Half day (4-6 hours)">Half day (4–6 hours)</option>
          <option value="Full day / Multiple sets">Full day / Multiple sets</option>
        </select>
      </div>

      <div>
        <label htmlFor="notes" className={labelClass}>
          Additional Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          value={formData.notes}
          onChange={handleChange}
          placeholder="Tell Nicholas about your event, musical preferences, or any special requests…"
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-ng-amber hover:bg-ng-amber-light text-ng-black font-display font-semibold uppercase tracking-widest py-4 rounded transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm"
      >
        {loading ? "Sending…" : "Send Booking Request"}
      </button>
    </form>
  );
}
