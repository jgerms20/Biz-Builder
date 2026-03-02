interface ImagePlaceholderProps {
  label?: string;
  aspectRatio?: "square" | "portrait" | "landscape" | "wide" | "hero";
  className?: string;
}

const aspectClasses = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/9]",
  hero: "aspect-[5/4] md:aspect-[4/3]",
};

export default function ImagePlaceholder({
  label = "Photo",
  aspectRatio = "landscape",
  className = "",
}: ImagePlaceholderProps) {
  return (
    <div
      className={`${aspectClasses[aspectRatio]} bg-gray-dark/40 border border-gray-dark flex flex-col items-center justify-center rounded-brand ${className}`}
    >
      <svg
        className="w-10 h-10 text-charcoal/30 mb-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <p className="text-xs font-sans text-charcoal/40 tracking-wider uppercase">
        {label}
      </p>
      <p className="text-xs font-sans text-charcoal/25 mt-1">
        Add photo here
      </p>
    </div>
  );
}
