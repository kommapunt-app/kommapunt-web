"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BubblesAxisExplorer } from "@/components/BubblesAxisExplorer";
import { ValueGuideDetailModal } from "@/components/ValueGuideDetailModal";
import { getValueGuideById } from "@/lib/values-guide";

export function DieBubblesPageContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [detailValueId, setDetailValueId] = useState<string | null>(null);
  const [focusValueId, setFocusValueId] = useState<string | null>(null);

  useEffect(() => {
    const valueId = searchParams.get("value");

    if (!valueId || !getValueGuideById(valueId)) {
      return;
    }

    setFocusValueId(valueId);
    setDetailValueId(valueId);

    const scrollTimer = window.setTimeout(() => {
      document.getElementById(`value-bubble-${valueId}`)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }, 350);

    return () => {
      window.clearTimeout(scrollTimer);
    };
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
    <>
      <section className="overflow-visible rounded-[2rem] border-4 border-komma-black bg-white p-5 shadow-[6px_6px_0_0_#000] sm:p-8 lg:p-10">
        <BubblesAxisExplorer
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          onValueSelect={handleValueSelect}
          focusValueId={focusValueId}
        />
      </section>

      <ValueGuideDetailModal value={detailValue} onClose={handleCloseDetail} />
    </>
  );
}
