"use client";

import { axisToPercent } from "@/lib/value-axis-map";
import type { ValueMapOverlayPoint } from "@/lib/profile-comparison/types";

interface ComparisonValueMapOverlayProps {
  points: ValueMapOverlayPoint[];
  leftLabel: string;
  rightLabel: string;
}

const PRESENCE_STYLES = {
  shared: "bg-komma-yellow border-komma-black",
  left_only: "bg-komma-pink border-komma-black",
  right_only: "bg-white border-komma-black",
} as const;

export function ComparisonValueMapOverlay({
  points,
  leftLabel,
  rightLabel,
}: ComparisonValueMapOverlayProps) {
  return (
    <section className="rounded-[2rem] border-4 border-komma-black bg-[#FFFEF5] p-5 shadow-[4px_4px_0_0_#000] sm:p-7">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-extrabold sm:text-2xl">Value Map-oorleg</h3>
        <div className="flex flex-wrap gap-2 text-xs font-bold">
          <span className="rounded-full border-2 border-komma-black bg-komma-pink px-3 py-1">
            {leftLabel}
          </span>
          <span className="rounded-full border-2 border-komma-black bg-white px-3 py-1">
            {rightLabel}
          </span>
          <span className="rounded-full border-2 border-komma-black bg-komma-yellow px-3 py-1">
            Gedeel
          </span>
        </div>
      </div>

      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border-4 border-komma-black bg-komma-yellow">
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-komma-black/15" />
          <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 bg-komma-black/15" />
          <p className="absolute left-3 top-3 text-xs font-extrabold uppercase tracking-wide text-komma-black/45">
            Verandering
          </p>
          <p className="absolute bottom-3 left-3 text-xs font-extrabold uppercase tracking-wide text-komma-black/45">
            Stabiliteit
          </p>
          <p className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-extrabold uppercase tracking-wide text-komma-black/45">
            Ons
          </p>
          <p className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-extrabold uppercase tracking-wide text-komma-black/45">
            Ek
          </p>
        </div>

        {points.map((point) => {
          const position = axisToPercent(point.axisX, point.axisY);

          return (
            <div
              key={point.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${position.left}%`, top: `${position.top}%` }}
            >
              <div
                className={`flex size-10 items-center justify-center rounded-full border-4 text-[10px] font-extrabold shadow-[2px_2px_0_0_#000] sm:size-12 sm:text-xs ${PRESENCE_STYLES[point.presence]}`}
                title={point.nameAf}
              >
                {point.leftRank ?? point.rightRank ?? "•"}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
