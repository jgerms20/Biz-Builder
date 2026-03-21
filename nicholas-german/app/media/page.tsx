import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media",
  description:
    "Photos and videos of Nicholas German performing — jazz ensembles, gospel worship, and live events in Columbia, SC.",
};

const galleryImages = [
  { filename: "nicholas-live-1.jpg", label: "Live Performance" },
  { filename: "nicholas-live-2.jpg", label: "Live Performance" },
  { filename: "nicholas-jazz.jpg", label: "Jazz Ensemble" },
  { filename: "nicholas-church.jpg", label: "Church Worship" },
  { filename: "nicholas-kit.jpg", label: "Behind the Kit" },
  { filename: "nicholas-portrait.jpg", label: "Portrait" },
];

const videoPlaceholders = [
  { label: "Jazz Performance — Coming Soon" },
  { label: "Worship Set — Coming Soon" },
];

export default function MediaPage() {
  return (
    <>
      {/* ── PAGE HERO ── */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-stage overflow-hidden pt-16">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-ng-amber/10 blur-[120px] top-0 left-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="relative container-ng text-center z-10 py-16">
          <p className="text-ng-amber uppercase tracking-[0.3em] text-xs font-semibold font-sans mb-4">
            Media
          </p>
          <h1 className="font-display font-bold text-5xl md:text-7xl text-white uppercase leading-none">
            SEE &amp; HEAR THE GROOVE
          </h1>
        </div>
      </section>

      {/* ── PHOTO GALLERY ── */}
      <section className="py-20 bg-ng-black">
        <div className="container-ng">
          <div className="mb-12 text-center">
            <SectionHeading label="Gallery" title="PHOTOS" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img) => (
              <div
                key={img.filename}
                className="aspect-square bg-ng-surface-2 rounded-lg border border-dashed border-ng-border flex flex-col items-center justify-center gap-2 p-4"
              >
                <span className="text-ng-amber/60 text-xs font-sans text-center">
                  {img.filename}
                </span>
                <span className="text-ng-muted text-xs font-sans">{img.label}</span>
              </div>
            ))}
          </div>

          <p className="text-center text-ng-muted text-sm mt-8">
            Photos coming soon — contact Nicholas for press kit
          </p>
        </div>
      </section>

      {/* ── VIDEO ── */}
      <section className="py-20 bg-ng-surface">
        <div className="container-ng">
          <div className="mb-12 text-center">
            <SectionHeading label="Video" title="VIDEO" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videoPlaceholders.map((video) => (
              <div
                key={video.label}
                className="relative aspect-video bg-ng-surface-2 rounded-lg border border-ng-border hover:border-ng-amber transition-colors cursor-pointer flex flex-col items-center justify-center gap-4"
              >
                {/* TODO: Replace with YouTube embed: <iframe src="https://www.youtube.com/embed/VIDEO_ID" ... /> */}
                <div className="w-16 h-16 rounded-full bg-ng-amber/10 border border-ng-amber/30 flex items-center justify-center">
                  <span className="text-ng-amber text-2xl ml-1">▶</span>
                </div>
                <p className="text-ng-muted text-sm font-sans text-center px-4">{video.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRESS KIT CTA ── */}
      <section className="py-20 bg-ng-black border-t border-ng-border">
        <div className="container-ng text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-ng-cream uppercase mb-4">
            NEED MORE?
          </h2>
          <p className="text-ng-muted max-w-md mx-auto mb-8">
            Interested in media or booking? Reach out for a full press kit.
          </p>
          <Link
            href="/book"
            className="inline-block bg-ng-amber hover:bg-ng-amber-light text-ng-black font-display font-semibold uppercase tracking-widest px-10 py-5 rounded transition-colors text-sm"
          >
            Request Press Kit
          </Link>
        </div>
      </section>
    </>
  );
}
