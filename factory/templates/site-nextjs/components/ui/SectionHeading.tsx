interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = "left",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={`flex flex-col ${alignment}`}>
      {label && (
        <span className="font-sans text-xs uppercase tracking-[0.2em] text-brand-strong mb-3">
          {label}
        </span>
      )}
      <h2 className="font-display text-display-sm md:text-display-md text-ink">{title}</h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">{subtitle}</p>
      )}
    </div>
  );
}
