"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BubblesAxisExplorer } from "@/components/BubblesAxisExplorer";
import { PosterViewerModal } from "@/components/PosterViewerModal";
import { ValueGuideDetailModal } from "@/components/ValueGuideDetailModal";
import { getValuePosterById } from "@/data/value-posters";
import { VALUE_MAP_FOCUS_DURATION_MS } from "@/lib/value-map-navigation";
import { getValueGuideById } from "@/lib/values-guide";

export function DieBubblesPageContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [detailValueId, setDetailValueId] = useState<string | null>(null);
  const [activePosterId, setActivePosterId] = useState<string | null>(null);
  const [focusValueId, setFocusValueId] = useState<string | null>(null);
  const [pulsingValueId, setPulsingValueId] = useState<string | null>(null);
  const [showFocusLabel, setShowFocusLabel] = useState(false);

  useEffect(() => {
    const valueId = searchParams.get("value");

    if (!valueId || !getValueGuideById(valueId)) {
      return;
    }

    setFocusValueId(valueId);
    setPulsingValueId(valueId);
    setShowFocusLabel(true);
    setDetailValueId(null);
    setActivePosterId(null);

    const mapSection = document.getElementById("waardekaart-explorer");

    if (mapSection) {
      window.setTimeout(() => {
        mapSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 80);
    }

    const focusTimer = window.setTimeout(() => {
      setPulsingValueId(null);
      setShowFocusLabel(false);
    }, VALUE_MAP_FOCUS_DURATION_MS);

    return () => {
      window.clearTimeout(focusTimer);
    };
  }, [searchParams]);

  const handleValueSelect = useCallback((valueId: string) => {
    setFocusValueId(valueId);
    setPulsingValueId(null);
    setShowFocusLabel(false);

    const poster = getValuePosterById(valueId);

    if (poster) {
      setActivePosterId(valueId);
      setDetailValueId(null);
      return;
    }

    setActivePosterId(null);
    setDetailValueId(valueId);
  }, []);

  const handleClosePoster = useCallback(() => {
    setActivePosterId(null);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setDetailValueId(null);
  }, []);

  const detailValue = detailValueId
    ? (getValueGuideById(detailValueId) ?? null)
    : null;

  const activePoster = activePosterId
    ? getValuePosterById(activePosterId)
    : null;

  return (
    <>
      <section
        id="waardekaart-explorer"
        className="overflow-visible rounded-[2rem] border-4 border-komma-black bg-white p-5 shadow-[6px_6px_0_0_#000] sm:p-8 lg:p-10"
      >
        <BubblesAxisExplorer
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          onValueSelect={handleValueSelect}
          focusValueId={focusValueId}
          pulsingValueId={pulsingValueId}
          showFocusLabel={showFocusLabel}
        />
      </section>

      <PosterViewerModal
        open={activePoster !== null}
        poster={activePoster}
        onClose={handleClosePoster}
      />

      <ValueGuideDetailModal value={detailValue} onClose={handleCloseDetail} />
    </>
  );
}
