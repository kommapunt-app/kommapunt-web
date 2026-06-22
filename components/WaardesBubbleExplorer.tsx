"use client";

import { useMemo, useState } from "react";
import { ExplorerBubble } from "@/components/ExplorerBubble";
import {
  VALUE_GUIDE,
  VALUE_GUIDE_CATEGORIES,
  groupValuesGuideByCategory,
  searchValueGuide,
  type ValueGuideCategory,
  type ValueGuideCategoryId,
  type ValueGuideEntry,
} from "@/lib/values-guide";
import {
  formatValueCount,
  getCategoryOrbitRadius,
  getExplorerMinHeight,
  getOrbitOffset,
  getValueOrbitPosition,
} from "@/lib/waardes-explorer-layout";

type ExplorerPhase = "hub" | "groups" | "values";

interface WaardesBubbleExplorerProps {
  searchQuery: string;
  onValueSelect: (valueId: string) => void;
}

const GROUPED_VALUES = groupValuesGuideByCategory(VALUE_GUIDE);

function CentreCategory({
  category,
  valueCount,
}: {
  category: ValueGuideCategory;
  valueCount: number;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <ExplorerBubble
        label={category.labelAf}
        size="group"
        active
        interactive={false}
        ariaLabel={category.labelAf}
      />
      <p className="text-sm font-bold text-komma-black/70 sm:text-base">
        {formatValueCount(valueCount)}
      </p>
    </div>
  );
}

export function WaardesBubbleExplorer({
  searchQuery,
  onValueSelect,
}: WaardesBubbleExplorerProps) {
  const [phase, setPhase] = useState<ExplorerPhase>("hub");
  const [selectedCategoryId, setSelectedCategoryId] =
    useState<ValueGuideCategoryId | null>(null);

  const normalizedQuery = searchQuery.trim();
  const isSearchActive = normalizedQuery.length > 0;

  const searchResults = useMemo(
    () => searchValueGuide(normalizedQuery, "all"),
    [normalizedQuery],
  );

  const selectedGroup = useMemo(
    () => GROUPED_VALUES.find((group) => group.category.id === selectedCategoryId),
    [selectedCategoryId],
  );

  const activeCategory = selectedGroup?.category ?? null;
  const categoryValues = selectedGroup?.values ?? [];
  const visibleValues = isSearchActive ? searchResults : categoryValues;

  function handleHubClick() {
    if (isSearchActive) {
      return;
    }

    if (phase === "hub") {
      setPhase("groups");
      return;
    }

    setPhase("hub");
    setSelectedCategoryId(null);
  }

  function handleGroupClick(categoryId: ValueGuideCategoryId) {
    if (isSearchActive) {
      return;
    }

    setSelectedCategoryId(categoryId);
    setPhase("values");
  }

  function handleBackToGroups() {
    setPhase("groups");
    setSelectedCategoryId(null);
  }

  function handleValueClick(value: ValueGuideEntry) {
    onValueSelect(value.id);
  }

  const showHubCentre =
    phase === "hub" ||
    phase === "groups" ||
    isSearchActive;
  const showCategoryOrbit = phase === "groups" && !isSearchActive;
  const showValueOrbit =
    (phase === "values" && !isSearchActive) ||
    (isSearchActive && searchResults.length > 0);

  const levelKey = isSearchActive
    ? `search-${normalizedQuery}`
    : `${phase}-${selectedCategoryId ?? "none"}`;

  const hintText = isSearchActive
    ? searchResults.length > 0
      ? `${searchResults.length} Bubble${searchResults.length === 1 ? "" : "s"} gevind`
      : "Geen Bubbles gevind nie. Probeer 'n ander soekterm."
    : phase === "hub"
      ? "Klik om die waardegroepe oop te maak"
      : phase === "groups"
        ? "Kies 'n groep om die waardes daarin te sien"
        : activeCategory
          ? `Waardes in ${activeCategory.labelAf}`
          : "";

  const desktopMinHeight = getExplorerMinHeight(visibleValues.length);

  return (
    <section aria-label="Bubble verkenner" className="pb-8 sm:pb-12">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-komma-black/70 sm:text-base">
          {hintText}
        </p>

        {phase === "values" && !isSearchActive ? (
          <button
            type="button"
            onClick={handleBackToGroups}
            className="rounded-full border-4 border-komma-black bg-white px-4 py-1.5 text-sm font-extrabold shadow-[3px_3px_0_0_#000] transition-transform hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#FF1493]"
          >
            ← Terug na Groepe
          </button>
        ) : null}
      </div>

      <div
        key={levelKey}
        className="explorer-level-transition mx-auto w-full max-w-5xl"
      >
        {/* Mobile */}
        <div className="flex flex-col items-center gap-8 sm:hidden">
          {phase === "values" && activeCategory && !isSearchActive ? (
            <CentreCategory
              category={activeCategory}
              valueCount={categoryValues.length}
            />
          ) : showHubCentre ? (
            <ExplorerBubble
              label="Die Bubbles"
              size="hub"
              active={phase !== "hub" || isSearchActive}
              onClick={isSearchActive ? undefined : handleHubClick}
              ariaLabel="Die Bubbles — sentrum"
            />
          ) : null}

          {showCategoryOrbit ? (
            <div className="grid w-full max-w-md grid-cols-2 gap-4 px-2">
              {VALUE_GUIDE_CATEGORIES.map((category, index) => (
                <ExplorerBubble
                  key={category.id}
                  label={category.labelAf}
                  size="group"
                  onClick={() => handleGroupClick(category.id)}
                  animationDelayMs={index * 45}
                />
              ))}
            </div>
          ) : null}

          {showValueOrbit ? (
            <div className="flex w-full flex-wrap justify-center gap-3 px-2 pb-4">
              {visibleValues.map((value, index) => (
                <ExplorerBubble
                  key={value.id}
                  label={value.nameAf}
                  sublabel={value.nameEn}
                  size="value"
                  highlighted={isSearchActive}
                  onClick={() => handleValueClick(value)}
                  animationDelayMs={index * 30}
                />
              ))}
            </div>
          ) : null}

          {isSearchActive && searchResults.length === 0 ? (
            <p className="rounded-2xl border-4 border-komma-black bg-white px-5 py-4 text-center text-sm font-semibold shadow-[4px_4px_0_0_#000]">
              Geen Bubbles gevind vir &ldquo;{normalizedQuery}&rdquo;
            </p>
          ) : null}
        </div>

        {/* Desktop */}
        <div
          className={`relative mx-auto hidden w-full sm:block ${desktopMinHeight}`}
        >
          <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            {phase === "values" && activeCategory && !isSearchActive ? (
              <CentreCategory
                category={activeCategory}
                valueCount={categoryValues.length}
              />
            ) : showHubCentre ? (
              <ExplorerBubble
                label="Die Bubbles"
                size="hub"
                active={phase !== "hub" || isSearchActive}
                onClick={isSearchActive ? undefined : handleHubClick}
                ariaLabel="Die Bubbles — sentrum"
              />
            ) : null}
          </div>

          {showCategoryOrbit ? (
            <div className="pointer-events-none absolute inset-0">
              {VALUE_GUIDE_CATEGORIES.map((category, index) => {
                const radius = getCategoryOrbitRadius(
                  VALUE_GUIDE_CATEGORIES.length,
                );
                const { x, y } = getOrbitOffset(
                  index,
                  VALUE_GUIDE_CATEGORIES.length,
                  radius,
                );

                return (
                  <div
                    key={category.id}
                    className="pointer-events-auto absolute left-1/2 top-1/2"
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                  >
                    <ExplorerBubble
                      label={category.labelAf}
                      size="group"
                      onClick={() => handleGroupClick(category.id)}
                      animationDelayMs={index * 50}
                    />
                  </div>
                );
              })}
            </div>
          ) : null}

          {showValueOrbit ? (
            <div className="pointer-events-none absolute inset-0">
              {visibleValues.map((value, index) => {
                const { x, y } = getValueOrbitPosition(
                  index,
                  visibleValues.length,
                );

                return (
                  <div
                    key={value.id}
                    className="pointer-events-auto absolute left-1/2 top-1/2"
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                  >
                    <ExplorerBubble
                      label={value.nameAf}
                      sublabel={value.nameEn}
                      size="value"
                      highlighted={isSearchActive}
                      onClick={() => handleValueClick(value)}
                      animationDelayMs={index * 25}
                    />
                  </div>
                );
              })}
            </div>
          ) : null}

          {isSearchActive && searchResults.length === 0 ? (
            <div className="absolute bottom-0 left-1/2 w-full max-w-md -translate-x-1/2">
              <p className="rounded-2xl border-4 border-komma-black bg-white px-5 py-4 text-center text-sm font-semibold shadow-[4px_4px_0_0_#000]">
                Geen Bubbles gevind vir &ldquo;{normalizedQuery}&rdquo;
              </p>
            </div>
          ) : null}
        </div>
      </div>

      {phase === "hub" && !isSearchActive ? (
        <p className="mt-8 text-center text-sm font-semibold text-komma-black/55 sm:hidden">
          Klik om die waardegroepe oop te maak
        </p>
      ) : null}
    </section>
  );
}
