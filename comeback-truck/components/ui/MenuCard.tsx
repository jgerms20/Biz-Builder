interface MenuCardProps {
  number: string;
  title: string;
  description: string;
  price: string;
  className?: string;
}

export default function MenuCard({
  number,
  title,
  description,
  price,
  className = "",
}: MenuCardProps) {
  return (
    <div
      className={`bg-ct-surface border border-ct-border p-6 hover:border-ct-mustard transition-colors flex flex-col h-full ${className}`}
    >
      <div className="flex items-baseline justify-between mb-3">
        <span className="font-display text-ct-mustard text-xl">{number}</span>
        <span className="font-display text-ct-mustard text-2xl">{price}</span>
      </div>
      <h3 className="font-display text-ct-cream text-xl md:text-2xl uppercase leading-tight mb-2">
        {title}
      </h3>
      <p className="font-sans text-ct-cream-muted text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
