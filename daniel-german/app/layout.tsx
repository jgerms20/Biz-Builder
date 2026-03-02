import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "DG Creations by Daniel German — Private Chef & Dining Experiences",
    template: "%s | DG Creations",
  },
  description:
    "Elevated private dining experiences, bespoke catering, and personalized meal preparation by Chef Daniel German. Johnson & Wales trained. Every plate, a creation.",
  keywords: [
    "private chef",
    "private dining experience",
    "personal chef",
    "catering",
    "meal prep",
    "bespoke dining",
    "Daniel German",
    "DG Creations",
    "culinary experience",
    "upscale catering",
    "private dinner party",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "DG Creations",
    title: "DG Creations by Daniel German — Private Chef & Dining Experiences",
    description:
      "Elevated private dining experiences, bespoke catering, and personalized meal preparation by Chef Daniel German.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DG Creations by Daniel German",
    description:
      "Elevated private dining experiences, bespoke catering, and personalized meal prep. Every plate, a creation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
