interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  className = "",
  align = "left",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center items-center" : "items-start";
  return (
    <div className={`flex flex-col gap-3 ${alignClass} ${className}`}>
      {label && (
        <span className="font-sans text-xs uppercase tracking-[0.3em] text-mg-green">
          {label}
        </span>
      )}
      <h2 className="font-serif text-display-sm md:text-display-md text-mg-navy">{title}</h2>
      {subtitle && (
        <p className="font-sans text-base text-mg-muted max-w-2xl">{subtitle}</p>
      )}
    </div>
  );
}
