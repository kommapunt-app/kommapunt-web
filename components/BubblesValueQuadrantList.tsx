"use client";

import { useMemo } from "react";
import { groupValuesByQuadrant } from "@/lib/axis-bubble-layout";
import { BUBBLES_AXIS_QUADRANTS } from "@/lib/bubbles-bib";
import type { ValueGuideEntry } from "@/lib/values-guide";

interface BubblesValueQuadrantListProps {
  values: ValueGuideEntry[];
  highlightedIds?: Set<string>;
  onValueSelect: (valueId: string) => void;
  emptyMessage?: string;
}

export function BubblesValueQuadrantList({
  values,
  highlightedIds,
  onValueSelect,
  emptyMessage = "Kies \u2019n groep hier bo om waardes op die kaart te sien.",
}: BubblesValueQuadrantListProps) {
  const grouped = useMemo(() => groupValuesByQuadrant(values), [values]);

  if (values.length === 0) {
    return (
      <div className="rounded-2xl border-4 border-dashed border-komma-black/25 bg-komma-yellow/40 px-4 py-8 text-center">
        <p className="text-sm font-bold leading-relaxed text-komma-black/65 sm:text-base">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-extrabold tracking-tight sm:text-xl">
        Waardes in hierdie groep
      </h3>

      {BUBBLES_AXIS_QUADRANTS.map((quadrant) => {
        const quadrantValues = grouped.get(quadrant.position) ?? [];

        if (quadrantValues.length === 0) {
          return null;
        }

        return (
          <section
            key={quadrant.id}
            className="rounded-2xl border-4 border-komma-black bg-white p-4 shadow-[4px_4px_0_0_#000] sm:p-5"
          >
            <div className="mb-3 border-b-4 border-komma-black/10 pb-3">
              <p className="text-xs font-extrabold uppercase tracking-wide text-komma-pink sm:text-sm">
                {quadrant.title}
              </p>
              <p className="mt-1 text-sm font-bold leading-snug text-komma-black/75">
                {quadrant.label}
              </p>
            </div>

            <ul className="space-y-2">
              {quadrantValues.map((value) => {
                const isHighlighted = highlightedIds?.has(value.id) ?? false;

                return (
                  <li key={value.id}>
                    <button
                      type="button"
                      onClick={() => onValueSelect(value.id)}
                      className={[
                        "w-full rounded-xl border-4 border-komma-black px-4 py-3.5 text-left shadow-[3px_3px_0_0_#000] transition-all active:translate-y-0.5 active:shadow-[2px_2px_0_0_#000]",
                        isHighlighted
                          ? "bg-komma-yellow ring-4 ring-komma-pink ring-offset-2 ring-offset-white"
                          : "bg-[#F5F5F0] hover:-translate-y-0.5 hover:bg-white hover:shadow-[4px_4px_0_0_#FF1493]",
                      ].join(" ")}
                    >
                      <span className="block text-base font-extrabold text-komma-black">
                        {value.nameAf}
                      </span>
                      <span className="mt-0.5 block text-sm font-semibold text-komma-black/55">
                        {value.nameEn}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
