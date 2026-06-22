"use client";

import { useCallback, useState } from "react";
import { BubblesAxisExplorer } from "@/components/BubblesAxisExplorer";
import { BubblesWhatSection } from "@/components/BubblesWhatSection";
import { ValueGuideDetailModal } from "@/components/ValueGuideDetailModal";
import { ValuePosterModal } from "@/components/ValuePosterModal";
import { BUBBLES_BIB_SCROLL_MARGIN_CLASS } from "@/lib/bubbles-bib";
import { getValueGuideById } from "@/lib/values-guide";
import {
  checkValuePosterExists,
  getValuePosterSrc,
} from "@/lib/value-posters";

export function WaardesPageContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [posterValueId, setPosterValueId] = useState<string | null>(null);
  const [detailValueId, setDetailValueId] = useState<string | null>(null);

  const handleValueSelect = useCallback(async (valueId: string) => {
    const hasPoster = await checkValuePosterExists(valueId);

    if (hasPoster) {
      setDetailValueId(null);
      setPosterValueId(valueId);
      return;
    }

    setPosterValueId(null);
    setDetailValueId(valueId);
  }, []);

  const handleClosePoster = useCallback(() => {
    setPosterValueId(null);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setDetailValueId(null);
  }, []);

  const posterValue = posterValueId ? getValueGuideById(posterValueId) : null;
  const detailValue = detailValueId
    ? (getValueGuideById(detailValueId) ?? null)
    : null;
  const posterSrc = posterValueId ? getValuePosterSrc(posterValueId) : "";

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
          />
        </section>
      </div>

      <ValuePosterModal
        open={posterValueId !== null}
        posterSrc={posterSrc}
        valueNameAf={posterValue?.nameAf ?? ""}
        onClose={handleClosePoster}
      />

      <ValueGuideDetailModal value={detailValue} onClose={handleCloseDetail} />
    </div>
  );
}
