"use client";

import { useMemo, useState } from "react";
import { BubbleCategoryIcon } from "@/components/BubbleCategoryIcon";
import { CircularBubbleRing } from "@/components/CircularBubbleRing";
import { ExplorerBubble } from "@/components/ExplorerBubble";
import { BUBBLE_CATEGORIES } from "@/lib/bubbles";
import {
  VALUE_GUIDE,
  groupValuesGuideByBubbleCategory,
  searchValueGuide,
  type ValueGuideEntry,
} from "@/lib/values-guide";
import type { BubbleCategory, BubbleCategoryId } from "@/lib/bubbles";
import { formatValueCount } from "@/lib/waardes-explorer-layout";

interface WaardesBubbleExplorerProps {
  searchQuery: string;
  onValueSelect: (valueId: string) => void;
}

const GROUPED_VALUES = groupValuesGuideByBubbleCategory(VALUE_GUIDE);

function GroupCentreBubble({
  category,
  valueCount,
  interactive = false,
}: {
  category: BubbleCategory;
  valueCount: number;
  interactive?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <ExplorerBubble
        label={category.label}
        size="group"
        active
        interactive={interactive}
        icon={<BubbleCategoryIcon categoryId={category.id} />}
        ariaLabel={category.label}
      />
      <p className="text-sm font-bold text-komma-black/70 sm:text-base">
        {formatValueCount(valueCount)}
      </p>
    </div>
  );
}

function ExplorerPanel({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-[2rem] border-4 border-komma-black bg-white p-4 shadow-[6px_6px_0_0_#000] sm:p-6 ${className}`.trim()}
    >
      <h2 className="mb-4 text-center text-sm font-extrabold uppercase tracking-wide text-komma-black/55 sm:mb-6 sm:text-base">
        {title}
      </h2>
      {children}
    </section>
  );
}

function EmptyRightPanel() {
  return (
    <div className="flex min-h-[20rem] flex-col items-center justify-center px-4 text-center sm:min-h-[26rem]">
      <p className="max-w-sm text-base font-bold leading-relaxed text-komma-black/65 sm:text-lg">
        <span className="hidden lg:inline">
          Kies &rsquo;n groep aan die linkerkant om sy waardes te sien.
        </span>
        <span className="lg:hidden">
          Kies &rsquo;n groep hier bo om sy waardes te sien.
        </span>
      </p>
    </div>
  );
}

function SearchResultsRing({
  values,
  onValueClick,
  compact = false,
}: {
  values: ValueGuideEntry[];
  onValueClick: (value: ValueGuideEntry) => void;
  compact?: boolean;
}) {
  return (
    <CircularBubbleRing
      compact={compact}
      itemCount={values.length}
      ringKind="value"
      getItemKey={(index) => values[index]?.id ?? `search-${index}`}
      center={
        <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full border-4 border-komma-black bg-komma-yellow px-3 text-center shadow-[4px_4px_0_0_#000] sm:h-32 sm:w-32">
          <span className="text-2xl font-extrabold text-komma-black sm:text-3xl">
            {values.length}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wide text-komma-black/60 sm:text-xs">
            gevind
          </span>
        </div>
      }
      renderItem={(index) => {
        const value = values[index];

        if (!value) {
          return null;
        }

        return (
          <ExplorerBubble
            label={value.nameAf}
            sublabel={value.nameEn}
            size="value"
            highlighted
            onClick={() => onValueClick(value)}
            animationDelayMs={index * 20}
          />
        );
      }}
    />
  );
}

export function WaardesBubbleExplorer({
  searchQuery,
  onValueSelect,
}: WaardesBubbleExplorerProps) {
  const [selectedCategoryId, setSelectedCategoryId] =
    useState<BubbleCategoryId | null>(null);

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

  const categoryValues = selectedGroup?.values ?? [];

  const rightPanelKey = isSearchActive
    ? `search-${normalizedQuery}`
    : `group-${selectedCategoryId ?? "none"}`;

  const hintText = isSearchActive
    ? searchResults.length > 0
      ? `${searchResults.length} Bubble${searchResults.length === 1 ? "" : "s"} gevind`
      : "Geen Bubbles gevind nie. Probeer 'n ander soekterm."
    : selectedGroup
      ? `Waardes in ${selectedGroup.category.label}`
      : "Kies 'n groep om die waardes daarin te sien";

  function handleGroupClick(categoryId: BubbleCategoryId) {
    setSelectedCategoryId(categoryId);
  }

  function handleValueClick(value: ValueGuideEntry) {
    onValueSelect(value.id);
  }

  return (
    <section aria-label="Bubble verkenner" className="pb-10 sm:pb-14">
      <p className="mb-6 text-sm font-semibold text-komma-black/70 sm:text-base">
        {hintText}
      </p>

      {/* Desktop: two-panel layout */}
      <div className="hidden gap-6 lg:grid lg:grid-cols-2">
        <ExplorerPanel title="Die Bubbles">
          <CircularBubbleRing
            itemCount={BUBBLE_CATEGORIES.length}
            ringKind="category"
            getItemKey={(index) => BUBBLE_CATEGORIES[index]?.id ?? `cat-${index}`}
            center={
              <ExplorerBubble
                label="Die Bubbles"
                size="hub"
                active={selectedCategoryId !== null}
                interactive={false}
                ariaLabel="Die Bubbles — sentrum"
              />
            }
            renderItem={(index) => {
              const category = BUBBLE_CATEGORIES[index];

              if (!category) {
                return null;
              }

              return (
                <ExplorerBubble
                  label={category.label}
                  size="group"
                  icon={<BubbleCategoryIcon categoryId={category.id} />}
                  active={selectedCategoryId === category.id}
                  onClick={() => handleGroupClick(category.id)}
                  animationDelayMs={index * 45}
                />
              );
            }}
          />
        </ExplorerPanel>

        <ExplorerPanel title={isSearchActive ? "Soekresultate" : "Waardes"}>
          <div key={rightPanelKey} className="explorer-level-transition">
            {isSearchActive ? (
              searchResults.length > 0 ? (
                <SearchResultsRing
                  values={searchResults}
                  onValueClick={handleValueClick}
                />
              ) : (
                <div className="flex min-h-[26rem] items-center justify-center px-4">
                  <p className="rounded-2xl border-4 border-komma-black bg-[#F5F5F0] px-5 py-4 text-center text-sm font-semibold shadow-[4px_4px_0_0_#000] sm:text-base">
                    Geen Bubbles gevind vir &ldquo;{normalizedQuery}&rdquo;
                  </p>
                </div>
              )
            ) : selectedGroup ? (
              <CircularBubbleRing
                itemCount={categoryValues.length}
                ringKind="value"
                getItemKey={(index) => categoryValues[index]?.id ?? `val-${index}`}
                center={
                  <GroupCentreBubble
                    category={selectedGroup.category}
                    valueCount={categoryValues.length}
                  />
                }
                renderItem={(index) => {
                  const value = categoryValues[index];

                  if (!value) {
                    return null;
                  }

                  return (
                    <ExplorerBubble
                      label={value.nameAf}
                      sublabel={value.nameEn}
                      size="value"
                      onClick={() => handleValueClick(value)}
                      animationDelayMs={index * 25}
                    />
                  );
                }}
              />
            ) : (
              <EmptyRightPanel />
            )}
          </div>
        </ExplorerPanel>
      </div>

      {/* Mobile + tablet: stacked panels */}
      <div className="flex flex-col gap-8 lg:hidden">
        <ExplorerPanel title="Die Bubbles">
          <CircularBubbleRing
            compact
            itemCount={BUBBLE_CATEGORIES.length}
            ringKind="category"
            getItemKey={(index) => BUBBLE_CATEGORIES[index]?.id ?? `cat-${index}`}
            center={
              <ExplorerBubble
                label="Die Bubbles"
                size="hub"
                active={selectedCategoryId !== null}
                interactive={false}
                ariaLabel="Die Bubbles — sentrum"
              />
            }
            renderItem={(index) => {
              const category = BUBBLE_CATEGORIES[index];

              if (!category) {
                return null;
              }

              return (
                <ExplorerBubble
                  label={category.label}
                  size="group"
                  icon={<BubbleCategoryIcon categoryId={category.id} />}
                  active={selectedCategoryId === category.id}
                  onClick={() => handleGroupClick(category.id)}
                  animationDelayMs={index * 40}
                />
              );
            }}
          />
        </ExplorerPanel>

        <ExplorerPanel title={isSearchActive ? "Soekresultate" : "Waardes"}>
          <div key={rightPanelKey} className="explorer-level-transition">
            {isSearchActive ? (
              searchResults.length > 0 ? (
                <SearchResultsRing
                  compact
                  values={searchResults}
                  onValueClick={handleValueClick}
                />
              ) : (
                <p className="rounded-2xl border-4 border-komma-black bg-[#F5F5F0] px-5 py-4 text-center text-sm font-semibold shadow-[4px_4px_0_0_#000]">
                  Geen Bubbles gevind vir &ldquo;{normalizedQuery}&rdquo;
                </p>
              )
            ) : selectedGroup ? (
              <CircularBubbleRing
                compact
                itemCount={categoryValues.length}
                ringKind="value"
                getItemKey={(index) => categoryValues[index]?.id ?? `val-${index}`}
                center={
                  <GroupCentreBubble
                    category={selectedGroup.category}
                    valueCount={categoryValues.length}
                  />
                }
                renderItem={(index) => {
                  const value = categoryValues[index];

                  if (!value) {
                    return null;
                  }

                  return (
                    <ExplorerBubble
                      label={value.nameAf}
                      sublabel={value.nameEn}
                      size="value"
                      onClick={() => handleValueClick(value)}
                      animationDelayMs={index * 20}
                    />
                  );
                }}
              />
            ) : (
              <EmptyRightPanel />
            )}
          </div>
        </ExplorerPanel>
      </div>
    </section>
  );
}
