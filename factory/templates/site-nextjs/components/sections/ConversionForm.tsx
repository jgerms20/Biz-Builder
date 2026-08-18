"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function ConversionForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/{{CONVERSION_ROUTE}}", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-md border border-line bg-surface p-8 text-center">
        <p className="font-display text-2xl text-ink">{{SUCCESS_HEADING}}</p>
        <p className="mt-2 text-sm text-ink-muted">{{SUCCESS_BODY}}</p>
      </div>
    );
  }

  const field =
    "w-full border border-line bg-bg px-4 py-3 text-sm text-ink rounded-md focus:outline-none focus:border-brand";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className={field}
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
        placeholder="Your name"
      />
      <input
        className={field}
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        required
        placeholder="Email"
      />
      <input
        className={field}
        type="tel"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone (optional)"
      />
      <textarea
        className={`${field} resize-none`}
        name="message"
        value={form.message}
        onChange={handleChange}
        required
        rows={5}
        placeholder="How can we help?"
      />
      {status === "error" && (
        <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
      )}
      <button type="submit" disabled={status === "loading"} className="btn-primary disabled:opacity-50">
        {status === "loading" ? "Sending…" : "{{CTA_LABEL}}"}
      </button>
    </form>
  );
}
