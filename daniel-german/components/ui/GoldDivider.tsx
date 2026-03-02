interface GoldDividerProps {
  className?: string;
}

export default function GoldDivider({ className = "" }: GoldDividerProps) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="block w-12 h-px bg-gold/30" />
      <span className="block w-1.5 h-1.5 bg-gold/50 rotate-45" />
      <span className="block w-12 h-px bg-gold/30" />
    </div>
  );
}
