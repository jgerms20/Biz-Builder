interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  const textColor = light ? "text-cream" : "text-charcoal";
  const eyebrowColor = light ? "text-gold" : "text-terracotta";
  const subtitleColor = light ? "text-cream/80" : "text-charcoal-light";

  return (
    <div className={`max-w-2xl ${alignClass} mb-12 md:mb-16`}>
      {eyebrow && (
        <p
          className={`font-sans text-xs font-medium tracking-[0.2em] uppercase mb-3 ${eyebrowColor}`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-serif text-display-sm md:text-display-md font-medium leading-tight ${textColor}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base leading-relaxed ${subtitleColor}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
