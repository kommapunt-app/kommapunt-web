"use client";

import { useState } from "react";
import Link from "next/link";
import { getBubbleFontSize } from "@/lib/bubbles";
import { VALUE_GUIDE, VALUE_GUIDE_DETAIL_LABELS, type ValueConflict } from "@/lib/values-guide";

interface ValueTensionDiagramProps {
  currentValueName: string;
  conflicts: ValueConflict[];
}

function resolveValueHref(name: string): string | undefined {
  const match = VALUE_GUIDE.find(
    (entry) => entry.nameAf.toLowerCase() === name.toLowerCase(),
  );
  return match ? `/waardes/${match.id}` : undefined;
}

function TensionBubble({
  name,
  href,
  variant,
}: {
  name: string;
  href?: string;
  variant: "current" | "opposing";
}) {
  const bubbleClass = `flex aspect-square w-[5.5rem] shrink-0 flex-col items-center justify-center rounded-full border-4 border-komma-black px-2 py-2 text-center shadow-[4px_4px_0_0_#000] sm:w-24 ${
    variant === "current"
      ? "bg-komma-yellow"
      : "bg-[#F5F5F0] transition-colors hover:bg-white"
  }`;

  const label = (
    <p className={`font-extrabold text-komma-black ${getBubbleFontSize(name)}`}>
      {name}
    </p>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`${bubbleClass} hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#FF1493]`}
      >
        {label}
      </Link>
    );
  }

  return <div className={bubbleClass}>{label}</div>;
}

export function ValueTensionDiagram({
  currentValueName,
  conflicts,
}: ValueTensionDiagramProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  if (conflicts.length === 0) return null;

  return (
    <section className="rounded-2xl border-4 border-komma-black bg-white p-5 sm:p-6">
      <h2 className="mb-5 text-sm font-extrabold uppercase tracking-wide text-komma-black/55 sm:text-base">
        {VALUE_GUIDE_DETAIL_LABELS.valueTension}
      </h2>

      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-center sm:gap-3">
        <TensionBubble name={currentValueName} variant="current" />

        <div
          aria-hidden
          className="flex shrink-0 items-center justify-center text-komma-black sm:px-1"
        >
          <svg
            viewBox="0 0 48 24"
            className="h-6 w-12 text-komma-pink sm:h-7 sm:w-14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 12H44M44 12L36 7M44 12L36 17M4 12L12 7M4 12L12 17"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:max-w-md sm:gap-2.5">
          {conflicts.map((conflict) => (
            <TensionBubble
              key={conflict.name}
              name={conflict.name}
              href={resolveValueHref(conflict.name)}
              variant="opposing"
            />
          ))}
        </div>
      </div>

      <p className="mt-5 text-sm leading-relaxed text-komma-black/70 sm:text-base">
        {VALUE_GUIDE_DETAIL_LABELS.valueTensionHelper}
      </p>

      <ul className="mt-4 space-y-2">
        {conflicts.map((conflict, index) => {
          const isOpen = expandedIndex === index;

          return (
            <li key={conflict.name}>
              <button
                type="button"
                onClick={() => setExpandedIndex(isOpen ? null : index)}
                className="w-full rounded-xl border-2 border-komma-black/15 bg-[#F5F5F0] px-4 py-3 text-left transition-colors hover:border-komma-black/30 hover:bg-white"
                aria-expanded={isOpen}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="text-sm font-extrabold text-komma-black sm:text-base">
                    {conflict.name}
                  </span>
                  <span className="text-lg font-extrabold leading-none text-komma-black/40">
                    {isOpen ? "−" : "+"}
                  </span>
                </span>
                {isOpen ? (
                  <p className="mt-2 text-sm leading-relaxed text-komma-black/75 sm:text-base">
                    {conflict.reason}
                  </p>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
