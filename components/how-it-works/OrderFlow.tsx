const localSteps = [
  {
    number: "01",
    title: "Submit Your Request",
    body: "Fill out the booking form online or call us. Describe what you need — service type, garment, and your preferred timeline. We'll confirm your order within 24 hours.",
  },
  {
    number: "02",
    title: "Drop Off in Walterboro",
    body: "Bring your garment to Janie in Walterboro, SC. We'll confirm the location details when we confirm your booking. Drop-off is by appointment.",
  },
  {
    number: "03",
    title: "Janie Gets to Work",
    body: "Janie does the alteration herself — with the same precision she's brought to every garment for 50+ years. Standard turnaround is 3–5 business days. Rush available.",
  },
  {
    number: "04",
    title: "Pick Up & Pay",
    body: "Pick up your finished garment. Payment is due at pickup — Venmo, Zelle, or cash accepted. That's it. Done right.",
  },
];

const mailInSteps = [
  {
    number: "01",
    title: "Submit Your Request Online",
    body: "Use our booking form to describe your garment, what you need done, and your measurements if applicable. We'll review and confirm with a price quote.",
  },
  {
    number: "02",
    title: "Ship Your Garment",
    body: "Once confirmed, ship your garment to our Walterboro address (provided in your confirmation email). Package it well — include a note with your name and order details inside.",
  },
  {
    number: "03",
    title: "Janie Alters It",
    body: "We'll let you know when it arrives. Janie works her magic. Standard mail-in turnaround is 5–7 business days from receipt of garment.",
  },
  {
    number: "04",
    title: "Pay & Receive",
    body: "Pay via Venmo or Zelle (plus $10 handling fee). We ship your altered garment back to you via USPS or UPS — insured and tracked.",
  },
];

interface FlowProps {
  steps: typeof localSteps;
  label: string;
  accent: "terracotta" | "olive";
}

function FlowColumn({ steps, label, accent }: FlowProps) {
  const accentColor =
    accent === "terracotta"
      ? "border-terracotta text-terracotta"
      : "border-olive text-olive";
  const badgeColor =
    accent === "terracotta" ? "bg-terracotta text-cream" : "bg-olive text-cream";

  return (
    <div>
      <div
        className={`inline-flex items-center gap-2 border ${accentColor} rounded-brand px-4 py-1.5 mb-8`}
      >
        <span className={`w-2 h-2 rounded-full ${badgeColor}`} />
        <span className="font-sans text-xs font-medium tracking-[0.2em] uppercase">
          {label}
        </span>
      </div>
      <div className="space-y-8">
        {steps.map((step) => (
          <div key={step.number} className="flex gap-5">
            <div className="flex-shrink-0">
              <span className="font-serif text-2xl font-light text-charcoal/30">
                {step.number}
              </span>
            </div>
            <div>
              <h3 className="font-serif text-xl font-medium text-charcoal mb-2">
                {step.title}
              </h3>
              <p className="font-sans text-sm text-charcoal/65 leading-relaxed">
                {step.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function OrderFlow() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
      <FlowColumn steps={localSteps} label="Local Drop-Off" accent="terracotta" />
      <div className="hidden lg:block w-px bg-gray self-stretch" />
      <FlowColumn steps={mailInSteps} label="Mail-In Orders" accent="olive" />
    </div>
  );
}
