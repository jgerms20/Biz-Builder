import Link from "next/link";
import ImagePlaceholder from "./ImagePlaceholder";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  imageLabel?: string;
  priceHint?: string;
}

export default function ServiceCard({
  title,
  description,
  href,
  imageLabel,
  priceHint,
}: ServiceCardProps) {
  return (
    <div className="group bg-dg-surface border border-dg-border hover:border-gold/20 transition-all duration-500">
      <ImagePlaceholder
        label={imageLabel || title}
        aspectRatio="aspect-[16/10]"
      />
      <div className="p-6 md:p-8">
        <h3 className="font-serif text-xl md:text-2xl text-cream mb-3 group-hover:text-gold transition-colors duration-300">
          {title}
        </h3>
        <p className="font-sans text-sm text-cream-muted/60 leading-relaxed mb-4">
          {description}
        </p>
        {priceHint && (
          <p className="font-sans text-xs text-gold/70 uppercase tracking-wider mb-4">
            {priceHint}
          </p>
        )}
        <Link
          href={href}
          className="inline-flex items-center gap-2 font-sans text-sm text-gold hover:text-gold-light transition-colors duration-300 tracking-wide"
        >
          Learn More
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
