"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export function VisitorPass({
  fullName,
  company,
  referenceNumber,
}: {
  fullName: string;
  company: string;
  referenceNumber: string;
}) {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  useEffect(() => {
    QRCode.toDataURL(referenceNumber, { width: 220, margin: 1, color: { dark: "#071D3A", light: "#FFFFFF" } })
      .then(setQrDataUrl)
      .catch(() => setQrDataUrl(null));
  }, [referenceNumber]);

  function downloadPass() {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = `${referenceNumber}-visitor-pass.png`;
    link.click();
  }

  return (
    <div className="mx-auto max-w-sm overflow-hidden rounded-xl border border-grey-light bg-white shadow-md">
      <div className="bg-navy-dark px-6 py-4 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-green">Trade Visitor Pass</p>
        <p className="mt-1 text-sm font-semibold text-white">{siteConfig.eventName}</p>
      </div>
      <div className="flex flex-col items-center gap-3 px-6 py-6">
        {qrDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={qrDataUrl} alt={`QR code for visitor pass ${referenceNumber}`} width={180} height={180} />
        ) : (
          <div className="flex h-[180px] w-[180px] items-center justify-center rounded bg-grey-light text-xs text-grey-medium">
            Generating QR code…
          </div>
        )}
        <p className="text-center font-heading text-lg font-bold text-navy-dark">{fullName}</p>
        <p className="text-center text-sm text-grey-medium">{company}</p>
        <p className="text-center text-xs font-mono tracking-wide text-grey-medium">{referenceNumber}</p>
        <p className="text-center text-xs text-grey-medium">
          {siteConfig.dates.display} · {siteConfig.venue.city}
        </p>
        <Button size="sm" variant="outline" onClick={downloadPass} className="mt-2">
          <Download className="h-4 w-4" /> Download Pass
        </Button>
      </div>
    </div>
  );
}
