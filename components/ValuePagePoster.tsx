"use client";

import { useState } from "react";
import { PosterThumbnailImage } from "@/components/PosterThumbnailImage";
import { ValuePosterModal } from "@/components/ValuePosterModal";
import {
  getValuePosterFullSrc,
  getValuePosterThumbnailSrc,
} from "@/lib/value-poster-images";

interface ValuePagePosterProps {
  valueId: string;
  valueNameAf: string;
}

export function ValuePagePoster({
  valueId,
  valueNameAf,
}: ValuePagePosterProps) {
  const [open, setOpen] = useState(false);
  const fullSrc = getValuePosterFullSrc(valueId);
  const thumbnailSrc = getValuePosterThumbnailSrc(valueId);

  return (
    <>
      <section className="rounded-2xl border-4 border-komma-black bg-white p-5 shadow-[4px_4px_0_0_#000] sm:p-6">
        <h2 className="mb-4 text-sm font-extrabold uppercase tracking-wide text-komma-black/55 sm:text-base">
          🖼️ Bubbleblad
        </h2>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group mx-auto block w-full max-w-sm overflow-hidden rounded-[1.25rem] border-4 border-komma-black bg-[#F5F5F0] p-3 shadow-[4px_4px_0_0_#000] transition-all hover:-translate-y-0.5 hover:border-komma-pink hover:shadow-[5px_5px_0_0_#FF1493] sm:p-4"
          aria-label={`Vergroot ${valueNameAf} Bubbleblad`}
        >
          <PosterThumbnailImage
            thumbnailSrc={thumbnailSrc}
            fullSrc={fullSrc}
            alt={`${valueNameAf} Bubbleblad`}
            className="mx-auto aspect-[3/4] w-full max-w-[280px] object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </button>

        <p className="mt-3 text-center text-sm font-semibold text-komma-black/60">
          Klik om te vergroot
        </p>
      </section>

      <ValuePosterModal
        open={open}
        fullSrc={fullSrc}
        valueNameAf={valueNameAf}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
