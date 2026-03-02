interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-12 md:mb-16 ${
        align === "center" ? "text-center" : "text-left"
      }`}
    >
      {label && (
        <span className="inline-block font-sans text-xs uppercase tracking-[0.3em] text-gold mb-4">
          {label}
        </span>
      )}
      <h2
        className={`font-serif text-display-md md:text-display-lg font-semibold text-balance ${
          light ? "text-cream" : "text-cream"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 font-sans text-base md:text-lg max-w-2xl leading-relaxed ${
            align === "center" ? "mx-auto" : ""
          } ${light ? "text-cream-muted/70" : "text-cream-muted/70"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
