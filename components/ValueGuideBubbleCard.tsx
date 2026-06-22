"use client";

import Link from "next/link";
import type { ValueGuideEntry } from "@/lib/values-guide";
import { getBubbleFontSize } from "@/lib/bubbles";
import { hasValuePoster } from "@/lib/value-poster-map";

interface ValueGuideBubbleCardProps {
  value: ValueGuideEntry;
  onOpenPoster?: (valueId: string) => void;
}

const cardClassName =
  "group flex aspect-square w-[8.75rem] flex-col items-center justify-center rounded-full border-4 border-komma-black bg-[#F5F5F0] px-3 py-3 text-center shadow-[4px_4px_0_0_#000] transition-all hover:-translate-y-1 hover:bg-white hover:shadow-[5px_5px_0_0_#FF1493] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-komma-pink sm:w-[9.75rem] sm:px-4 sm:py-4";

export function ValueGuideBubbleCard({
  value,
  onOpenPoster,
}: ValueGuideBubbleCardProps) {
  const content = (
    <>
      <p
        className={`font-extrabold text-komma-black ${getBubbleFontSize(value.nameAf)}`}
      >
        {value.nameAf}
      </p>
      <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-komma-black/45 sm:text-xs">
        {value.nameEn}
      </p>
      <p className="mt-2 line-clamp-3 px-1 text-[10px] leading-snug text-komma-black/70 sm:text-[11px]">
        {value.definitionAf}
      </p>
    </>
  );

  if (hasValuePoster(value.id) && onOpenPoster) {
    return (
      <button
        type="button"
        onClick={() => onOpenPoster(value.id)}
        className={cardClassName}
      >
        {content}
      </button>
    );
  }

  return (
    <Link href={`/waardes/${value.id}`} className={cardClassName}>
      {content}
    </Link>
  );
}
