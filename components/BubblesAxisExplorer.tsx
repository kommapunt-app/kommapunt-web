"use client";

import { useEffect, useMemo, useState } from "react";
import { BubbleCategoryIcon } from "@/components/BubbleCategoryIcon";
import { BubblesValueAxisMap } from "@/components/BubblesValueAxisMap";
import { BubblesValueQuadrantList } from "@/components/BubblesValueQuadrantList";
import { BUBBLE_CATEGORIES, type BubbleCategoryId } from "@/lib/bubbles";
import {
  VALUE_GUIDE,
  getValueGuideById,
  getValueGuideBubbleCategory,
  groupValuesGuideByBubbleCategory,
  searchValueGuide,
} from "@/lib/values-guide";

interface BubblesAxisExplorerProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onValueSelect: (valueId: string) => void;
  focusValueId?: string | null;
  pulsingValueId?: string | null;
  showFocusLabel?: boolean;
}

const GROUPED_VALUES = groupValuesGuideByBubbleCategory(VALUE_GUIDE);

export function BubblesAxisExplorer({
  searchQuery,
  onSearchQueryChange,
  onValueSelect,
  focusValueId = null,
  pulsingValueId = null,
  showFocusLabel = false,
}: BubblesAxisExplorerProps) {
  const [selectedCategoryId, setSelectedCategoryId] =
    useState<BubbleCategoryId | null>(null);

  useEffect(() => {
    if (!focusValueId) {
      return;
    }

    const value = getValueGuideById(focusValueId);

    if (!value) {
      return;
    }

    const categoryId = getValueGuideBubbleCategory(value);

    if (categoryId) {
      setSelectedCategoryId(categoryId);
    }

    const scrollTimer = window.setTimeout(() => {
      document.getElementById(`value-bubble-${focusValueId}`)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }, 450);

    return () => {
      window.clearTimeout(scrollTimer);
    };
  }, [focusValueId]);

  const normalizedQuery = searchQuery.trim();
  const isSearchActive = normalizedQuery.length > 0;

  const searchResults = useMemo(
    () => searchValueGuide(normalizedQuery, "all"),
    [normalizedQuery],
  );

  const selectedGroup = useMemo(
    () =>
      GROUPED_VALUES.find((group) => group.category.id === selectedCategoryId) ??
      null,
    [selectedCategoryId],
  );

  const axisValues = useMemo(() => {
    if (isSearchActive) {
      if (selectedGroup) {
        const groupIds = new Set(
          selectedGroup.values.map((value) => value.id),
        );
        return searchResults.filter((value) => groupIds.has(value.id));
      }

      return searchResults;
    }

    return selectedGroup?.values ?? [];
  }, [isSearchActive, searchResults, selectedGroup]);

  const highlightedIds = useMemo(() => {
    if (!isSearchActive) {
      return undefined;
    }

    return new Set(searchResults.map((value) => value.id));
  }, [isSearchActive, searchResults]);

  const categoryValueCounts = useMemo(
    () =>
      Object.fromEntries(
        GROUPED_VALUES.map((group) => [group.category.id, group.values.length]),
      ) as Record<BubbleCategoryId, number>,
    [],
  );

  const hintText = isSearchActive
    ? searchResults.length > 0
      ? `${searchResults.length} Bubble${searchResults.length === 1 ? "" : "s"} gevind`
      : "Geen Bubbles gevind nie. Probeer \u2019n ander soekterm."
    : selectedGroup
      ? `${selectedGroup.values.length} waardes in ${selectedGroup.category.label}`
      : "Kies \u2019n groep hier bo om waardes op die kaart te sien.";

  const mobileHintText = isSearchActive
    ? searchResults.length > 0
      ? `${searchResults.length} Bubble${searchResults.length === 1 ? "" : "s"} gevind`
      : "Geen Bubbles gevind nie. Probeer \u2019n ander soekterm."
    : selectedGroup
      ? `${selectedGroup.values.length} waardes in ${selectedGroup.category.label}`
      : "Kies \u2019n waardegroep op die kaart om sy waardes te sien.";

  const emptyMessage = isSearchActive
    ? searchResults.length === 0
      ? `Geen Bubbles gevind vir \u201C${normalizedQuery}\u201D`
      : selectedGroup
        ? `Geen resultate in ${selectedGroup.category.label} nie.`
        : "Geen resultate nie."
    : "Kies \u2019n groep hier bo om waardes op die kaart te sien.";

  const mobileEmptyMessage = isSearchActive
    ? searchResults.length === 0
      ? `Geen Bubbles gevind vir \u201C${normalizedQuery}\u201D`
      : selectedGroup
        ? `Geen resultate in ${selectedGroup.category.label} nie.`
        : "Geen resultate nie."
    : "Kies \u2019n waardegroep op die kaart om sy waardes te sien.";

  return (
    <div className="space-y-5 sm:space-y-6">
      <label className="block">
        <span className="sr-only">Soek vir &apos;n Bubble</span>
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => onSearchQueryChange(event.target.value)}
          placeholder="Soek vir 'n Bubble..."
          className="w-full rounded-2xl border-4 border-komma-black bg-komma-yellow px-5 py-3.5 text-base font-semibold shadow-[4px_4px_0_0_#000] outline-none transition-shadow placeholder:text-komma-black/40 focus:bg-white focus:shadow-[5px_5px_0_0_#FF1493] sm:py-4 sm:text-lg"
        />
      </label>

      <div className="hidden space-y-2 md:block">
        <p className="text-xs font-extrabold uppercase tracking-wide text-komma-black/50 sm:text-sm">
          Waardegroepe
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-6 md:gap-1.5 md:overflow-visible md:pb-0 lg:gap-2 [&::-webkit-scrollbar]:hidden">
          {BUBBLE_CATEGORIES.map((category) => {
            const group = GROUPED_VALUES.find(
              (entry) => entry.category.id === category.id,
            );
            const valueCount = group?.values.length ?? 0;
            const isActive = selectedCategoryId === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategoryId(category.id)}
                className={[
                  "flex min-w-[8.5rem] shrink-0 items-center gap-1.5 rounded-full border-4 border-komma-black px-2.5 py-1.5 text-left font-extrabold shadow-[3px_3px_0_0_#000] transition-all sm:min-w-[9rem] sm:gap-2 sm:px-3 sm:py-2 md:min-w-0 md:flex-col md:items-center md:justify-center md:px-2 md:py-2 lg:px-2.5 lg:py-2.5",
                  isActive
                    ? "bg-komma-yellow ring-4 ring-komma-pink ring-offset-2 ring-offset-white"
                    : "bg-white hover:-translate-y-0.5 hover:bg-[#F5F5F0] hover:shadow-[4px_4px_0_0_#FF1493]",
                ].join(" ")}
              >
                <BubbleCategoryIcon
                  categoryId={category.id}
                  className="!h-5 !w-5 sm:!h-6 sm:!w-6 md:!h-7 md:!w-7"
                />
                <span className="min-w-0 md:text-center">
                  <span className="block whitespace-nowrap text-[10px] leading-tight sm:text-xs md:whitespace-normal md:text-[11px] lg:text-xs">
                    {category.label}
                  </span>
                  <span className="block text-[9px] font-bold text-komma-black/45 sm:text-[10px]">
                    {valueCount}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-base font-extrabold leading-snug text-komma-black md:hidden">
        {mobileHintText}
      </p>
      <p className="hidden text-sm font-semibold text-komma-black/70 md:block sm:text-base">
        {hintText}
      </p>

      <div className="w-full overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:thin]">
        <div className="mx-auto min-w-[18rem] w-full max-w-6xl">
          <BubblesValueAxisMap
            values={axisValues}
            highlightedIds={highlightedIds}
            focusedValueId={focusValueId}
            pulsingValueId={pulsingValueId}
            showFocusLabel={showFocusLabel}
            onValueSelect={onValueSelect}
            emptyMessage={emptyMessage}
            selectedCategoryId={selectedCategoryId}
            onCategorySelect={setSelectedCategoryId}
            categoryValueCounts={categoryValueCounts}
          />
          <div className="mt-5 md:hidden">
            <BubblesValueQuadrantList
              values={axisValues}
              highlightedIds={highlightedIds}
              focusedValueId={focusValueId}
              pulsingValueId={pulsingValueId}
              showFocusLabel={showFocusLabel}
              onValueSelect={onValueSelect}
              emptyMessage={mobileEmptyMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
