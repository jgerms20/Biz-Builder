import { serviceCategories, mailInFee } from "@/lib/services";

export default function PricingTable() {
  return (
    <div className="space-y-12">
      {serviceCategories.map((category) => (
        <div key={category.id} id={category.id}>
          <div className="mb-6">
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal">
              {category.title}
            </h2>
            <p className="font-sans text-sm text-charcoal/60 mt-1 leading-relaxed">
              {category.description}
            </p>
          </div>

          <div className="border border-gray rounded-brand overflow-hidden">
            {category.items.map((item, i) => (
              <div
                key={item.name}
                className={`flex items-center justify-between px-6 py-4 ${
                  i % 2 === 0 ? "bg-cream" : "bg-cream-dark"
                } ${i < category.items.length - 1 ? "border-b border-gray" : ""}`}
              >
                <div>
                  <p className="font-sans text-sm text-charcoal">{item.name}</p>
                  {item.note && (
                    <p className="font-sans text-xs text-charcoal/50 mt-0.5">
                      {item.note}
                    </p>
                  )}
                </div>
                <p className="font-serif text-lg font-medium text-terracotta ml-8 flex-shrink-0">
                  {item.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Mail-in fee note */}
      <div className="bg-olive text-cream rounded-brand p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-gold mb-2">
              Mail-In Orders
            </p>
            <h3 className="font-serif text-xl font-medium text-cream">
              {mailInFee.label}
            </h3>
            <p className="font-sans text-sm text-cream/70 mt-1 max-w-md">
              {mailInFee.note}
            </p>
          </div>
          <p className="font-serif text-2xl font-medium text-gold flex-shrink-0">
            {mailInFee.amount}
          </p>
        </div>
      </div>

      <div className="bg-cream-dark border border-gray rounded-brand p-6">
        <p className="font-sans text-sm text-charcoal/70">
          <strong className="font-medium text-charcoal">Not sure about pricing?</strong>{" "}
          Describe your garment and what you need done — we&apos;ll confirm the price before
          we start. No surprises.{" "}
          <a
            href="/book"
            className="text-terracotta hover:text-terracotta-dark underline underline-offset-2"
          >
            Submit a request →
          </a>
        </p>
      </div>
    </div>
  );
}
