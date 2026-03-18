import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://milton-german.vercel.app"),
  title: {
    template: "%s | Milton German Bookkeeping",
    default: "Milton German Bookkeeping — South Carolina Small Business Accounting",
  },
  description:
    "Professional bookkeeping and accounting services for South Carolina small businesses. 30+ years of government accounting experience. Newberry College accounting degree. Your books, done right.",
  keywords: [
    "bookkeeping South Carolina",
    "small business accounting SC",
    "bookkeeper Walterboro SC",
    "Milton German",
    "QuickBooks SC",
    "business accounting services",
    "compliance accounting",
    "monthly bookkeeping",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Milton German Bookkeeping",
    title: "Milton German Bookkeeping — South Carolina Small Business Accounting",
    description:
      "30+ years of government accounting experience, now helping South Carolina small businesses get their books right.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Milton German Bookkeeping",
    description: "Professional bookkeeping for SC small businesses. Your books, done right.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
