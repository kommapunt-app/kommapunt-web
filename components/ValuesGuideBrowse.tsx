"use client";

import { useMemo, useState, type ReactNode } from "react";
import { ValueGuideBubbleCard } from "@/components/ValueGuideBubbleCard";
import {
  ALL_VALUES_FILTER_LABEL,
  VALUE_GUIDE_CATEGORIES,
  groupValuesGuideByCategory,
  searchValueGuide,
  type ValueGuideCategoryFilter,
} from "@/lib/values-guide";

export function ValuesGuideBrowse() {
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] =
    useState<ValueGuideCategoryFilter>("all");

  const filteredValues = useMemo(
    () => searchValueGuide(query, categoryFilter),
    [query, categoryFilter],
  );

  const groupedValues = useMemo(
    () => groupValuesGuideByCategory(filteredValues),
    [filteredValues],
  );

  return (
    <div>
      <h2 className="mb-6 text-2xl font-extrabold tracking-tight sm:mb-8 sm:text-3xl">
        Verken alle waardes
      </h2>

      <div className="mb-8 space-y-5 sm:mb-10">
        <label className="block">
          <span className="sr-only">Soek waardes</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Soek 'n waarde..."
            className="w-full rounded-2xl border-4 border-komma-black bg-white px-5 py-4 text-base font-semibold shadow-[4px_4px_0_0_#000] outline-none transition-shadow placeholder:text-komma-black/40 focus:shadow-[5px_5px_0_0_#FF1493] sm:text-lg"
          />
        </label>

        <div className="-mx-1 overflow-x-auto px-1 pb-1">
          <div className="flex w-max min-w-full gap-2 sm:flex-wrap sm:gap-3">
            <CategoryFilterButton
              active={categoryFilter === "all"}
              onClick={() => setCategoryFilter("all")}
            >
              {ALL_VALUES_FILTER_LABEL}
            </CategoryFilterButton>

            {VALUE_GUIDE_CATEGORIES.map((category) => (
              <CategoryFilterButton
                key={category.id}
                active={categoryFilter === category.id}
                onClick={() => setCategoryFilter(category.id)}
              >
                {category.labelAf}
              </CategoryFilterButton>
            ))}
          </div>
        </div>
      </div>

      {groupedValues.length === 0 ? (
        <div className="rounded-[2rem] border-4 border-komma-black bg-[#F5F5F0] px-6 py-10 text-center shadow-[6px_6px_0_0_#000] sm:px-8">
          <p className="text-lg font-extrabold sm:text-xl">
            Geen waardes gevind nie.
          </p>
          <p className="mt-2 text-sm font-semibold text-komma-black/65 sm:text-base">
            Probeer &apos;n ander soekterm of kies &apos;n ander kategorie.
          </p>
        </div>
      ) : (
        <div className="space-y-12 sm:space-y-14">
          {groupedValues.map(({ category, values }) => (
            <section key={category.id}>
              <div className="mb-6 flex flex-col items-center gap-2 sm:mb-8">
                <h3 className="text-center text-xl font-extrabold tracking-tight sm:text-2xl">
                  {category.labelAf}
                </h3>
                <p className="max-w-xl text-center text-sm font-semibold text-komma-black/60 sm:text-base">
                  {category.summaryAf}
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
                {values.map((value) => (
                  <ValueGuideBubbleCard key={value.id} value={value} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

function CategoryFilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full border-4 border-komma-black px-4 py-2 text-sm font-extrabold shadow-[3px_3px_0_0_#000] transition-transform hover:-translate-y-0.5 sm:px-5 sm:py-2.5 sm:text-base ${
        active
          ? "bg-komma-pink text-white shadow-[4px_4px_0_0_#000]"
          : "bg-white hover:shadow-[4px_4px_0_0_#FF1493]"
      }`}
    >
      {children}
    </button>
  );
}
