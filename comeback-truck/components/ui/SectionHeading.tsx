import MustardDivider from "./MustardDivider";

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const alignClass =
    align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col gap-3 ${alignClass} ${className}`}>
      {label && (
        <>
          <span className="text-ct-mustard uppercase tracking-widest text-xs font-semibold font-sans">
            {label}
          </span>
          <MustardDivider />
        </>
      )}
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-ct-cream uppercase leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-ct-cream-muted text-base md:text-lg mt-1 max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
