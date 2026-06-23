"use client";

import { hasValuePoster } from "@/data/value-posters";

interface ValueMapBubbleTooltipProps {
  nameAf: string;
  nameEn: string;
  groupLabel: string;
  valueId: string;
}

export function ValueMapBubbleTooltip({
  nameAf,
  nameEn,
  groupLabel,
  valueId,
}: ValueMapBubbleTooltipProps) {
  const hasPoster = hasValuePoster(valueId);

  return (
    <div
      className="pointer-events-none absolute bottom-[calc(100%+0.5rem)] left-1/2 z-50 hidden w-max max-w-[14rem] -translate-x-1/2 rounded-2xl border-4 border-komma-black bg-white px-3.5 py-3 text-center shadow-[4px_4px_0_0_#000] opacity-0 transition-opacity duration-150 md:block md:group-hover:opacity-100"
      role="tooltip"
    >
      <p className="text-sm font-extrabold leading-tight text-komma-black">
        {nameAf}
      </p>
      <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-komma-black/45">
        {nameEn}
      </p>
      <p className="mt-2 text-[11px] font-bold leading-snug text-komma-black/70">
        {groupLabel}
      </p>
      <p className="mt-2 text-[10px] font-extrabold uppercase tracking-wide text-komma-pink">
        {hasPoster ? "Klik om plakkaat te sien" : "Klik om meer te sien"}
      </p>
    </div>
  );
}
