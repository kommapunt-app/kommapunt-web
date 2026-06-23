"use client";

import type { ComparisonType } from "@/lib/profile-comparison/types";
import { COMPARISON_TYPE_DEFINITIONS } from "@/lib/profile-comparison/comparison-types";

interface ComparisonTypePickerProps {
  selectedType: ComparisonType;
  onSelect: (comparisonType: ComparisonType) => void;
  disabled?: boolean;
}

export function ComparisonTypePicker({
  selectedType,
  onSelect,
  disabled = false,
}: ComparisonTypePickerProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {COMPARISON_TYPE_DEFINITIONS.map((entry) => {
        const isSelected = selectedType === entry.id;

        return (
          <button
            key={entry.id}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(entry.id)}
            className={`rounded-[1.75rem] border-4 border-komma-black p-5 text-left shadow-[4px_4px_0_0_#000] transition-transform ${
              isSelected
                ? "bg-komma-pink -translate-y-0.5 shadow-[5px_5px_0_0_#000]"
                : "bg-white hover:-translate-y-0.5 hover:bg-komma-yellow"
            } ${disabled ? "cursor-not-allowed opacity-70" : ""}`.trim()}
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <h3 className="text-lg font-extrabold">{entry.label}</h3>
              {!entry.available ? (
                <span className="rounded-full border-2 border-komma-black bg-komma-yellow px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide">
                  Binnekort
                </span>
              ) : null}
            </div>
            <p className="text-sm font-semibold leading-relaxed text-komma-black/70">
              {entry.description}
            </p>
            <p className="mt-3 text-xs font-bold uppercase tracking-wide text-komma-black/45">
              {entry.leftLabel} ↔ {entry.rightLabel}
            </p>
          </button>
        );
      })}
    </div>
  );
}
