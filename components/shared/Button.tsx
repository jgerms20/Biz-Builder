import Link from "next/link";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-terracotta text-cream hover:bg-terracotta-dark border border-terracotta hover:border-terracotta-dark",
  secondary:
    "bg-olive text-cream hover:bg-olive-light border border-olive hover:border-olive-light",
  outline:
    "bg-transparent text-charcoal border border-charcoal hover:bg-charcoal hover:text-cream",
  ghost:
    "bg-transparent text-terracotta hover:text-terracotta-dark border border-transparent",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm tracking-wide",
  md: "px-6 py-3 text-sm tracking-wider",
  lg: "px-8 py-4 text-base tracking-wider",
};

export default function Button({
  href,
  onClick,
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  className = "",
  children,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-sans font-medium transition-colors duration-200 uppercase tracking-widest rounded-brand";
  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${
    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
  } ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
