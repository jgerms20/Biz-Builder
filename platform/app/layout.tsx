import type { Metadata, Viewport } from "next";
import Nav from "@/components/Nav";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Biz Builder",
    template: "%s · Biz Builder",
  },
  description:
    "Private operating console for a portfolio of small businesses — track every build from concept to growth, generate starter kits, and scan for new opportunities.",
  applicationName: "Biz Builder",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#08090B",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-ink text-chalk antialiased font-sans">
        <Nav />
        <main className="min-h-screen pt-14">{children}</main>
      </body>
    </html>
  );
}
