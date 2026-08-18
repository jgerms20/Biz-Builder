import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-brand grid gap-8 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-lg text-ink">{{BUSINESS_NAME}}</p>
          <p className="mt-2 text-sm text-ink-muted">{{TAGLINE}}</p>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-widest text-ink-muted">Explore</span>
          <Link href="/about" className="text-sm text-ink-muted hover:text-ink">About</Link>
          <Link href="/offerings" className="text-sm text-ink-muted hover:text-ink">Offerings</Link>
          <Link href="{{CTA_HREF}}" className="text-sm text-ink-muted hover:text-ink">{{CTA_LABEL}}</Link>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-widest text-ink-muted">Contact</span>
          <p className="text-sm text-ink-muted">{{LOCATION}}</p>
          <p className="text-sm text-ink-muted">{{PHONE}}</p>
          <p className="text-sm text-ink-muted">{{EMAIL}}</p>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-brand flex flex-col items-center justify-between gap-2 py-4 text-xs text-ink-muted md:flex-row">
          <span>&copy; {year} {{BUSINESS_NAME}}</span>
          <span>Built with Biz Builder</span>
        </div>
      </div>
    </footer>
  );
}
