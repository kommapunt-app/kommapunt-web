"use client";

import { ComparisonValueMapOverlay } from "@/components/vergelyk/ComparisonValueMapOverlay";
import type { ProfileComparisonRecord } from "@/lib/profile-comparison/types";

interface ComparisonResultsViewProps {
  comparison: ProfileComparisonRecord;
}

export function ComparisonResultsView({ comparison }: ComparisonResultsViewProps) {
  const { result, leftSide, rightSide } = comparison;

  return (
    <div className="flex flex-col gap-8 sm:gap-10">
      <section className="rounded-[2rem] border-4 border-komma-black bg-komma-pink p-6 text-center shadow-[6px_6px_0_0_#000] sm:p-8">
        <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-komma-black/60">
          Similarity score
        </p>
        <p className="mt-2 text-5xl font-extrabold tracking-tight sm:text-6xl">
          {result.similarityScore}%
        </p>
        <p className="mt-3 text-sm font-semibold text-komma-black/75 sm:text-base">
          {leftSide.label} ↔ {rightSide.label}
        </p>
      </section>

      <section className="rounded-[2rem] border-4 border-komma-black bg-white p-6 shadow-[4px_4px_0_0_#000] sm:p-8">
        <h3 className="text-xl font-extrabold sm:text-2xl">Gedeelde top waardes</h3>
        {result.sharedTopValues.length > 0 ? (
          <ul className="mt-4 flex flex-col gap-3">
            {result.sharedTopValues.map((value) => (
              <li
                key={value.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border-4 border-komma-black bg-komma-yellow px-4 py-3 shadow-[3px_3px_0_0_#000]"
              >
                <div>
                  <p className="font-extrabold">{value.nameAf}</p>
                  <p className="text-xs font-semibold uppercase tracking-wide text-komma-black/45">
                    {value.nameEn}
                  </p>
                </div>
                <p className="text-sm font-bold">
                  #{value.leftRank} / #{value.rightRank}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm font-semibold text-komma-black/70">
            Geen gedeelde top-10 waardes gevind nie.
          </p>
        )}
      </section>

      <section className="rounded-[2rem] border-4 border-komma-black bg-white p-6 shadow-[4px_4px_0_0_#000] sm:p-8">
        <h3 className="text-xl font-extrabold sm:text-2xl">Grootste waarde-verskille</h3>
        {result.biggestDifferences.length > 0 ? (
          <ul className="mt-4 flex flex-col gap-3">
            {result.biggestDifferences.map((value) => (
              <li
                key={`${value.id}-${value.side}`}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border-4 border-komma-black bg-[#FFFEF5] px-4 py-3 shadow-[3px_3px_0_0_#000]"
              >
                <div>
                  <p className="font-extrabold">{value.nameAf}</p>
                  <p className="text-xs font-semibold uppercase tracking-wide text-komma-black/45">
                    Hoër by {value.side === "left" ? leftSide.label : rightSide.label}
                  </p>
                </div>
                <p className="text-sm font-bold">
                  #{value.rank}
                  {value.otherRank ? ` vs #${value.otherRank}` : " vs buite top 10"}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm font-semibold text-komma-black/70">
            Geen groot verskille in top waardes nie.
          </p>
        )}
      </section>

      <ComparisonValueMapOverlay
        points={result.valueMapOverlay}
        leftLabel={leftSide.label}
        rightLabel={rightSide.label}
      />

      <section className="rounded-[2rem] border-4 border-dashed border-komma-black bg-white p-6 shadow-[4px_4px_0_0_#000] sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full border-4 border-komma-black bg-komma-yellow text-lg font-extrabold">
            AI
          </div>
          <div>
            <h3 className="text-xl font-extrabold sm:text-2xl">
              AI-gesprekinsigte
            </h3>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-komma-black/70 sm:text-base">
              Binnekort: outomatiese gesprek-aanwysers gebaseer op julle gedeelde
              waardes en verskille. Hierdie afdeling is deel van die premium
              raamwerk maar nog nie geïmplementeer nie.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
