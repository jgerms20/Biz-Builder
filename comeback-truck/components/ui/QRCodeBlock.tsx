"use client";

import QRCode from "react-qr-code";

interface QRCodeBlockProps {
  url: string;
  label?: string;
  size?: number;
}

export default function QRCodeBlock({
  url,
  label = "Scan to Order",
  size = 160,
}: QRCodeBlockProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <QRCode value={url} size={size} bgColor="#ffffff" fgColor="#0A0E0E" />
      </div>
      <p className="font-sans text-ct-cream-muted text-xs uppercase tracking-widest text-center">
        {label}
      </p>
    </div>
  );
}
