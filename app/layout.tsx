import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Janie Bell's Alterations — Walterboro, South Carolina",
    template: "%s | Janie Bell's Alterations",
  },
  description:
    "Expert alterations, hemming, tailoring, and custom sewing by Janie Bell Daniels in Walterboro, South Carolina. Fifty years of perfect fit. Local drop-off and mail-in orders welcome.",
  keywords: [
    "alterations Walterboro SC",
    "seamstress Walterboro",
    "hemming South Carolina",
    "tailoring Colleton County",
    "custom sewing Walterboro",
    "dress alterations SC",
    "mail-in alterations",
    "Janie Bell alterations",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Janie Bell's Alterations",
    title: "Janie Bell's Alterations — Walterboro, South Carolina",
    description:
      "Expert alterations, hemming, and custom sewing. Fifty years of perfect fit.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Janie Bell's Alterations",
    description:
      "Expert alterations, hemming, and custom sewing in Walterboro, SC. Fifty years of perfect fit.",
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
