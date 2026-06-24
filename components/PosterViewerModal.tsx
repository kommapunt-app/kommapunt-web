"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PosterModalImage } from "@/components/PosterModalImage";
import type { ValuePosterEntry } from "@/data/value-posters";
import { trackEvent } from "@/lib/analytics";
import { downloadValuePoster } from "@/lib/value-poster-images";
import { getValueMapUrl } from "@/lib/value-map-navigation";
import { getValuePageUrl } from "@/lib/value-page";

interface PosterViewerModalProps {
  open: boolean;
  poster: ValuePosterEntry | null;
  onClose: () => void;
}

export function PosterViewerModal({
  open,
  poster,
  onClose,
}: PosterViewerModalProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open || !poster) {
    return null;
  }

  const downloadName = `${poster.id}-bubbleblad.png`;

  async function handleDownload() {
    setIsDownloading(true);

    try {
      await downloadValuePoster(poster!.full_image_url, downloadName);
      trackEvent({
        name: "poster_downloaded",
        posterId: poster!.id,
      });
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex flex-col sm:items-center sm:justify-center sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-komma-black/75"
        aria-label="Sluit Bubbleblad"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${poster.name_af} Bubbleblad`}
        className="relative flex h-full w-full flex-col overflow-hidden bg-[#F5F5F0] sm:h-auto sm:max-h-[94vh] sm:max-w-[1040px] sm:rounded-[2rem] sm:border-4 sm:border-komma-black sm:shadow-[8px_8px_0_0_#FF1493]"
      >
        <div className="sticky top-0 z-10 flex shrink-0 items-center justify-between gap-3 border-b-4 border-komma-black bg-komma-yellow px-3 py-3 sm:rounded-t-[1.75rem] sm:px-4">
          <div className="min-w-0">
            <p className="truncate text-lg font-extrabold sm:text-xl">
              {poster.name_af}
            </p>
            <p className="truncate text-sm font-semibold text-komma-black/70">
              {poster.name_en}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Sluit"
            className="flex size-10 shrink-0 items-center justify-center rounded-full border-4 border-komma-black bg-white text-xl font-extrabold shadow-[3px_3px_0_0_#000] transition-transform hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#FF1493]"
          >
            ×
          </button>
        </div>

        <div className="flex min-h-0 flex-1 items-start justify-center overflow-y-auto px-2 py-3 sm:px-4 sm:py-4">
          <PosterModalImage
            src={poster.full_image_url}
            alt={`${poster.name_af} Bubbleblad`}
            className="shadow-[6px_6px_0_0_#000] sm:shadow-[8px_8px_0_0_#000]"
          />
        </div>

        <div className="flex shrink-0 flex-col gap-2 border-t-4 border-komma-black bg-white px-3 py-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:rounded-b-[1.75rem] sm:px-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <Link
              href={getValuePageUrl(poster.id)}
              className="inline-flex items-center justify-center rounded-full border-4 border-komma-black bg-white px-5 py-2.5 text-sm font-extrabold shadow-[3px_3px_0_0_#000] transition-transform hover:-translate-y-0.5 hover:bg-komma-yellow hover:shadow-[4px_4px_0_0_#FF1493] sm:text-base"
            >
              Open waarde-blad
            </Link>

            <Link
              href={getValueMapUrl(poster.id)}
              onClick={() =>
                trackEvent({
                  name: "cta_poster_to_value_map",
                  posterId: poster.id,
                })
              }
              className="inline-flex items-center justify-center rounded-full border-4 border-komma-black bg-white px-5 py-2.5 text-sm font-extrabold shadow-[3px_3px_0_0_#000] transition-transform hover:-translate-y-0.5 hover:bg-komma-yellow hover:shadow-[4px_4px_0_0_#FF1493] sm:text-base"
            >
              📍 Sien waar die waarde inpas
            </Link>
          </div>

          <button
            type="button"
            onClick={handleDownload}
            disabled={isDownloading}
            className="inline-flex items-center justify-center rounded-full border-4 border-komma-black bg-komma-yellow px-5 py-2.5 text-sm font-extrabold shadow-[3px_3px_0_0_#000] transition-transform hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#FF1493] disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
          >
            {isDownloading ? "Besig…" : "Laai af"}
          </button>
        </div>
      </div>
    </div>
  );
}
