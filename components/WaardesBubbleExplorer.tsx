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
  getOrbitOffset,
  getOrbitRadius,
} from "@/lib/waardes-explorer-layout";

type ExplorerPhase = "hub" | "groups" | "values";

interface WaardesBubbleExplorerProps {
  searchQuery: string;
  onValueSelect: (valueId: string) => void;
}

const GROUPED_VALUES = groupValuesGuideByCategory(VALUE_GUIDE);

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

  const visibleValues = isSearchActive
    ? searchResults
    : selectedGroup?.values ?? [];

  const activeCategory: ValueGuideCategory | null = isSearchActive
    ? null
    : selectedGroup?.category ?? null;

  function handleHubClick() {
    if (isSearchActive) {
      return;
    }

    if (phase === "hub") {
      setPhase("groups");
      return;
    }

    if (phase === "values") {
      setPhase("groups");
      setSelectedCategoryId(null);
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

  function handleValueClick(value: ValueGuideEntry) {
    onValueSelect(value.id);
  }

  const showGroups =
    !isSearchActive && (phase === "groups" || phase === "values");
  const showValues =
    (isSearchActive && searchResults.length > 0) || phase === "values";

  const orbitGroups =
    phase === "values" && selectedCategoryId
      ? VALUE_GUIDE_CATEGORIES.filter(
          (category) => category.id !== selectedCategoryId,
        )
      : VALUE_GUIDE_CATEGORIES;

  const desktopMinHeight =
    visibleValues.length > 12 ? "min-h-[680px]" : "min-h-[540px]";

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

  return (
    <section
      aria-label="Bubble verkenner"
      className="pb-8 sm:pb-12"
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-komma-black/70 sm:text-base">
          {hintText}
        </p>

        {!isSearchActive && phase !== "hub" ? (
          <button
            type="button"
            onClick={() => {
              setPhase("groups");
              setSelectedCategoryId(null);
            }}
            className="rounded-full border-4 border-komma-black bg-white px-4 py-1.5 text-sm font-extrabold shadow-[3px_3px_0_0_#000] transition-transform hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#FF1493]"
          >
            ← Alle groepe
          </button>
        ) : null}
      </div>

      <div className="mx-auto w-full max-w-5xl">
        {/* Mobile + values/search: stacked layout */}
        <div className="flex flex-col items-center gap-8 sm:hidden">
          {phase === "values" && activeCategory && !isSearchActive ? (
            <ExplorerBubble
              label={activeCategory.labelAf}
              size="group"
              active
              onClick={handleHubClick}
              ariaLabel={`${activeCategory.labelAf} — aktiewe groep`}
            />
          ) : (
            <ExplorerBubble
              label="Die Bubbles"
              size="hub"
              active={phase !== "hub" || isSearchActive}
              onClick={handleHubClick}
              ariaLabel="Die Bubbles — sentrum"
            />
          )}

          {showGroups && phase !== "values" ? (
            <div className="grid w-full max-w-md grid-cols-2 gap-4 px-2">
              {VALUE_GUIDE_CATEGORIES.map((category, index) => (
                <ExplorerBubble
                  key={category.id}
                  label={category.labelAf}
                  size="group"
                  active={selectedCategoryId === category.id}
                  onClick={() => handleGroupClick(category.id)}
                  animationDelayMs={index * 45}
                />
              ))}
            </div>
          ) : null}

          {showValues ? (
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

        {/* Desktop: orbital layout */}
        <div
          className={`relative mx-auto hidden w-full sm:block ${desktopMinHeight}`}
        >
          <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            {phase === "values" && activeCategory && !isSearchActive ? (
              <ExplorerBubble
                label={activeCategory.labelAf}
                size="group"
                active
                onClick={handleHubClick}
                ariaLabel={`${activeCategory.labelAf} — aktiewe groep`}
              />
            ) : (
              <ExplorerBubble
                label="Die Bubbles"
                size="hub"
                active={phase !== "hub" || isSearchActive}
                onClick={handleHubClick}
                ariaLabel="Die Bubbles — sentrum"
              />
            )}
          </div>

          {showGroups ? (
            <div className="pointer-events-none absolute inset-0">
              {orbitGroups.map((category, index) => {
                const { x, y } = getOrbitOffset(
                  index,
                  orbitGroups.length,
                  getOrbitRadius(orbitGroups.length, phase === "values" ? 230 : 200),
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
                      active={selectedCategoryId === category.id}
                      dimmed={phase === "values"}
                      onClick={() => handleGroupClick(category.id)}
                      animationDelayMs={index * 50}
                    />
                  </div>
                );
              })}
            </div>
          ) : null}

          {showValues ? (
            <div className="pointer-events-none absolute inset-0">
              {visibleValues.map((value, index) => {
                const radius = getOrbitRadius(
                  visibleValues.length,
                  isSearchActive ? 230 : 270,
                );
                const { x, y } = getOrbitOffset(
                  index,
                  visibleValues.length,
                  radius,
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
