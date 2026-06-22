"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BubblesAxisExplorer } from "@/components/BubblesAxisExplorer";
import { BubblesWhatSection } from "@/components/BubblesWhatSection";
import { ValueGuideDetailModal } from "@/components/ValueGuideDetailModal";
import { BUBBLES_BIB_SCROLL_MARGIN_CLASS } from "@/lib/bubbles-bib";
import { getValueGuideById } from "@/lib/values-guide";

export function WaardesPageContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [detailValueId, setDetailValueId] = useState<string | null>(null);
  const [focusValueId, setFocusValueId] = useState<string | null>(null);

  useEffect(() => {
    const valueId = searchParams.get("value");

    if (!valueId || !getValueGuideById(valueId)) {
      return;
    }

    const mapSection = document.getElementById("die-bubbles");

    if (mapSection) {
      mapSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    setFocusValueId(valueId);
    setDetailValueId(valueId);
  }, [searchParams]);

  const handleValueSelect = useCallback((valueId: string) => {
    setDetailValueId(valueId);
    setFocusValueId(valueId);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setDetailValueId(null);
  }, []);

  const detailValue = detailValueId
    ? (getValueGuideById(detailValueId) ?? null)
    : null;

  return (
    <div className="overflow-visible">
      <div className="space-y-12 sm:space-y-16 lg:space-y-20">
        <div
          id="wat-is-bubbles"
          className={BUBBLES_BIB_SCROLL_MARGIN_CLASS}
        >
          <BubblesWhatSection />
        </div>

        <section
          id="die-bubbles"
          className={`${BUBBLES_BIB_SCROLL_MARGIN_CLASS} rounded-[2rem] border-4 border-komma-black bg-white p-5 shadow-[6px_6px_0_0_#000] sm:p-8 lg:p-10`}
        >
          <h2 className="mb-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Die Bubbles
          </h2>
          <p className="mb-6 max-w-none text-base leading-relaxed text-komma-black/80 sm:mb-8 sm:text-lg lg:max-w-6xl">
            Kies &rsquo;n waardegroep en sien waar sy waardes op die waardekaart lê
            &mdash; tussen Ek en Ons, Stabiliteit en Verandering. Klik op &rsquo;n
            waarde om meer inligting oor daardie waarde te sien.
          </p>

          <BubblesAxisExplorer
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            onValueSelect={handleValueSelect}
            focusValueId={focusValueId}
          />
        </section>
      </div>

      <ValueGuideDetailModal value={detailValue} onClose={handleCloseDetail} />
    </div>
  );
}
