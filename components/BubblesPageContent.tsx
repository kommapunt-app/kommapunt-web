"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { BubbleCategorySection } from "@/components/BubbleCategorySection";
import { BubblesHeader } from "@/components/BubblesHeader";
import { Button } from "@/components/Button";
import { IntroBubbleCard } from "@/components/IntroBubbleCard";
import { PageContainer } from "@/components/PageContainer";
import { SelectedBubblesPanel } from "@/components/SelectedBubblesPanel";
import { SelectionCompleteModal } from "@/components/SelectionCompleteModal";
import {
  BUBBLE_LIBRARY,
  getBubblesByIds,
  groupBubblesByCategory,
} from "@/lib/bubbles";
import {
  MAX_BUBBLES,
  MIN_SELECTED_BUBBLES,
  STORAGE_KEY_SELECTED_BUBBLES,
  TOTAL_FLOW_STEPS,
} from "@/lib/constants";
import { PAGE_CONTAINER_CLASS, PAGE_GUTTER_CLASS } from "@/lib/page-layout";

export function BubblesPageContent() {
  const router = useRouter();
  const [showSelection, setShowSelection] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [limitMessage, setLimitMessage] = useState(false);
  const [animatingId, setAnimatingId] = useState<string | null>(null);
  const [lastAddedId, setLastAddedId] = useState<string | null>(null);
  const [activeInfoId, setActiveInfoId] = useState<string | null>(null);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const selectedBubbles = useMemo(
    () => getBubblesByIds(selectedIds),
    [selectedIds],
  );

  const filteredBubbles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return BUBBLE_LIBRARY;
    }

    return BUBBLE_LIBRARY.filter(
      (bubble) =>
        bubble.nameAf.toLowerCase().includes(query) ||
        bubble.nameEn.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  const categoryGroups = useMemo(
    () => groupBubblesByCategory(filteredBubbles),
    [filteredBubbles],
  );

  useEffect(() => {
    if (!animatingId) {
      return;
    }

    const timer = window.setTimeout(() => setAnimatingId(null), 450);

    return () => window.clearTimeout(timer);
  }, [animatingId]);

  useEffect(() => {
    if (!lastAddedId) {
      return;
    }

    const timer = window.setTimeout(() => setLastAddedId(null), 500);

    return () => window.clearTimeout(timer);
  }, [lastAddedId]);

  function handleToggle(id: string) {
    setSelectedIds((current) => {
      if (current.includes(id)) {
        setLimitMessage(false);
        setAnimatingId(null);
        setLastAddedId(null);
        return current.filter((item) => item !== id);
      }

      if (current.length >= MAX_BUBBLES) {
        setLimitMessage(true);
        return current;
      }

      const next = [...current, id];

      if (next.length === MAX_BUBBLES) {
        setShowCompleteModal(true);
      }

      setLimitMessage(false);
      setAnimatingId(id);
      setLastAddedId(id);
      return next;
    });
  }

  function handleAtLimitAttempt() {
    setLimitMessage(true);
  }

  function handleRemove(id: string) {
    setLimitMessage(false);
    setShowCompleteModal(false);
    setAnimatingId(null);
    setLastAddedId(null);
    setSelectedIds((current) => current.filter((item) => item !== id));
  }

  function handleNext() {
    if (selectedIds.length < MIN_SELECTED_BUBBLES) {
      return;
    }

    localStorage.setItem(
      STORAGE_KEY_SELECTED_BUBBLES,
      JSON.stringify(selectedIds),
    );
    router.push("/sort");
  }

  const canProceed = selectedIds.length >= MIN_SELECTED_BUBBLES;
  const selectedCount = selectedIds.length;
  const isSelectionComplete = selectedCount === MAX_BUBBLES;

  return (
    <>
      <BubblesHeader step={1} totalSteps={TOTAL_FLOW_STEPS} />

      <main className={`flex-1 ${showSelection ? "pb-20" : "pb-16"}`}>
        {!showSelection ? (
          <PageContainer
            outerClassName="flex min-h-[calc(100vh-5rem)] items-center py-12"
          >
            <IntroBubbleCard onUnderstand={() => setShowSelection(true)} />
          </PageContainer>
        ) : (
          <PageContainer outerClassName="py-8 sm:py-12">
              <div className="mb-8 max-w-xl">
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                  Kies jou Bubbles
                </h1>
                <p className="mt-3 text-base font-semibold leading-snug text-komma-black/75 sm:text-lg">
                  Wat is vir jou belangrik? Wat dra gewig? Wat is jou waardes?
                </p>
              </div>

              <div className="grid gap-8 lg:grid-cols-[minmax(260px,300px)_1fr] lg:items-start lg:gap-10">
                <SelectedBubblesPanel
                  selectedBubbles={selectedBubbles}
                  onRemove={handleRemove}
                  lastAddedId={lastAddedId}
                  isComplete={isSelectionComplete}
                />

                <div className="min-w-0">
                  <div className="relative mb-8">
                    <label htmlFor="bubble-search" className="sr-only">
                      Soek &rsquo;n Bubble
                    </label>
                    <input
                      id="bubble-search"
                      type="search"
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder="Soek 'n Bubble…"
                      className="w-full rounded-full border-4 border-komma-black bg-[#FFFEF5] px-6 py-3.5 text-base font-medium shadow-[4px_4px_0_0_#000] outline-none transition-shadow placeholder:text-komma-black/40 focus:shadow-[6px_6px_0_0_#FF1493] sm:text-lg"
                    />
                  </div>

                  {limitMessage && (
                    <div
                      role="status"
                      className="mb-6 rounded-2xl border-4 border-komma-black bg-komma-pink px-5 py-4 text-center font-bold text-white shadow-[4px_4px_0_0_#000]"
                    >
                      Hou dit by {MAX_BUBBLES}. Die moeilike keuses kom nou.
                    </div>
                  )}

                  {categoryGroups.length === 0 ? (
                    <p className="py-12 text-center text-lg font-semibold text-komma-black/60">
                      Geen Bubbles gevind vir &ldquo;{searchQuery}&rdquo;.
                    </p>
                  ) : (
                    <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:gap-5 lg:mx-0 lg:grid lg:snap-none lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0 xl:grid-cols-6">
                      {categoryGroups.map(({ category, bubbles }) => (
                        <BubbleCategorySection
                          key={category.id}
                          category={category}
                          bubbles={bubbles}
                          selectedIds={selectedIds}
                          animatingId={animatingId}
                          activeInfoId={activeInfoId}
                          atLimit={isSelectionComplete}
                          onAtLimitAttempt={handleAtLimitAttempt}
                          onInfoOpen={setActiveInfoId}
                          onInfoClose={() => setActiveInfoId(null)}
                          onToggle={handleToggle}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
          </PageContainer>
        )}
      </main>

      {showSelection && (
        <div
          className={`fixed inset-x-0 bottom-0 z-50 border-t-4 border-komma-black ${PAGE_GUTTER_CLASS} ${
            isSelectionComplete
              ? "bg-komma-pink py-2 text-white sm:py-2.5"
              : "bg-komma-yellow py-2.5 sm:py-3"
          }`}
        >
          <div className={`${PAGE_CONTAINER_CLASS} flex items-center justify-between gap-3`}>
            <p
              className={`shrink-0 font-bold ${
                isSelectionComplete
                  ? "text-xs text-white/90 sm:text-sm"
                  : "text-sm sm:text-base"
              }`}
            >
              {isSelectionComplete ? (
                <span className="text-white">
                  ✓ {MAX_BUBBLES} van {MAX_BUBBLES} gekies
                </span>
              ) : (
                <>
                  <span className="text-komma-pink">{selectedCount}</span>
                  <span className="text-komma-black/70">
                    {" "}
                    van {MAX_BUBBLES} gekies
                  </span>
                </>
              )}
            </p>

            <Button
              onClick={handleNext}
              disabled={!canProceed}
              className={`shrink px-4 py-2 text-xs sm:px-6 sm:py-2.5 sm:text-sm disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-50 ${
                isSelectionComplete
                  ? "!border-2 !border-white/80 !bg-transparent !text-white !shadow-none hover:!-translate-y-0 hover:!bg-white/10 hover:!shadow-none active:!shadow-none"
                  : "disabled:shadow-[4px_4px_0_0_#FF1493]"
              }`}
            >
              {canProceed
                ? "Volgende: Wat dra meer gewig?"
                : `Kies ${MAX_BUBBLES} Bubbles`}
            </Button>
          </div>
        </div>
      )}

      <SelectionCompleteModal
        open={showCompleteModal}
        onBeginRanking={handleNext}
        onReview={() => setShowCompleteModal(false)}
      />
    </>
  );
}
