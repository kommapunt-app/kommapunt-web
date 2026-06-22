"use client";

import { useCallback, useState } from "react";
import { ValueGuideDetailModal } from "@/components/ValueGuideDetailModal";
import { ValuePosterModal } from "@/components/ValuePosterModal";
import { ValuesGuideIntro } from "@/components/ValuesGuideIntro";
import { WaardesBubbleExplorer } from "@/components/WaardesBubbleExplorer";
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
    <>
      <label className="mb-8 block sm:mb-10">
        <span className="sr-only">Soek vir &apos;n Bubble</span>
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Soek vir 'n Bubble..."
          className="w-full rounded-2xl border-4 border-komma-black bg-white px-5 py-4 text-base font-semibold shadow-[4px_4px_0_0_#000] outline-none transition-shadow placeholder:text-komma-black/40 focus:shadow-[5px_5px_0_0_#FF1493] sm:text-lg"
        />
      </label>

      <ValuesGuideIntro />

      <WaardesBubbleExplorer
        searchQuery={searchQuery}
        onValueSelect={handleValueSelect}
      />

      <ValuePosterModal
        open={posterValueId !== null}
        posterSrc={posterSrc}
        valueNameAf={posterValue?.nameAf ?? ""}
        onClose={handleClosePoster}
      />

      <ValueGuideDetailModal
        value={detailValue}
        onClose={handleCloseDetail}
      />
    </>
  );
}
