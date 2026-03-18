"use client";

import { useState } from "react";

const inquiryTypes = [
  "Bookkeeping Setup",
  "Bookkeeping Cleanup",
  "Ongoing Monthly Bookkeeping",
  "Compliance & Records Review",
  "Small Business Financial Consulting",
  "QuickBooks Setup",
  "Other",
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    inquiryType: "",
    businessName: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-mg-green/10 border border-mg-green/30 p-8 text-center">
        <p className="font-serif text-2xl text-mg-navy mb-2">Message Received</p>
        <p className="font-sans text-sm text-mg-muted">
          Thank you for reaching out. Milton will be in touch within 1–2 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block font-sans text-xs uppercase tracking-widest text-mg-muted mb-2">
            What can Milton help with? *
          </label>
          <select
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleChange}
            required
            className="w-full border border-mg-slate-dark bg-white px-4 py-3 font-sans text-sm text-mg-charcoal focus:outline-none focus:border-mg-navy"
          >
            <option value="">Select an option</option>
            {inquiryTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-sans text-xs uppercase tracking-widest text-mg-muted mb-2">
            Business Name
          </label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="Your business name (if applicable)"
            className="w-full border border-mg-slate-dark bg-white px-4 py-3 font-sans text-sm focus:outline-none focus:border-mg-navy"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block font-sans text-xs uppercase tracking-widest text-mg-muted mb-2">
            Your Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Full name"
            className="w-full border border-mg-slate-dark bg-white px-4 py-3 font-sans text-sm focus:outline-none focus:border-mg-navy"
          />
        </div>
        <div>
          <label className="block font-sans text-xs uppercase tracking-widest text-mg-muted mb-2">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your@email.com"
            className="w-full border border-mg-slate-dark bg-white px-4 py-3 font-sans text-sm focus:outline-none focus:border-mg-navy"
          />
        </div>
      </div>

      <div>
        <label className="block font-sans text-xs uppercase tracking-widest text-mg-muted mb-2">
          Phone
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="(555) 000-0000"
          className="w-full border border-mg-slate-dark bg-white px-4 py-3 font-sans text-sm focus:outline-none focus:border-mg-navy"
        />
      </div>

      <div>
        <label className="block font-sans text-xs uppercase tracking-widest text-mg-muted mb-2">
          Tell Milton about your situation *
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Briefly describe your business and what you need help with..."
          className="w-full border border-mg-slate-dark bg-white px-4 py-3 font-sans text-sm focus:outline-none focus:border-mg-navy resize-none"
        />
      </div>

      {status === "error" && (
        <p className="font-sans text-sm text-red-600">
          Something went wrong. Please try again or email directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full md:w-auto disabled:opacity-50"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
