"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

interface ProfileQrCodeProps {
  url: string;
  className?: string;
}

export function ProfileQrCode({ url, className = "" }: ProfileQrCodeProps) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    QRCode.toDataURL(url, {
      width: 220,
      margin: 1,
      color: {
        dark: "#000000",
        light: "#FFFF00",
      },
    })
      .then((value) => {
        if (!cancelled) {
          setDataUrl(value);
        }
      })
      .catch((error) => {
        console.error("[ProfileQrCode] failed", error);
      });

    return () => {
      cancelled = true;
    };
  }, [url]);

  if (!dataUrl) {
    return (
      <div
        className={`size-[220px] animate-pulse rounded-2xl border-4 border-komma-black bg-white/60 ${className}`.trim()}
        aria-hidden
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={dataUrl}
      alt="QR-kode vir profielskakel"
      width={220}
      height={220}
      className={`block rounded-2xl border-4 border-komma-black bg-komma-yellow shadow-[4px_4px_0_0_#000] ${className}`.trim()}
    />
  );
}
