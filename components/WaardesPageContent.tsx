"use client";

import { useCallback, useState } from "react";
import { ValuePosterModal } from "@/components/ValuePosterModal";
import { ValuesCategoryCards } from "@/components/ValuesCategoryCards";
import { ValuesGuideBrowse } from "@/components/ValuesGuideBrowse";
import { getValueGuideById } from "@/lib/values-guide";
import { getValuePosterSrc } from "@/lib/value-poster-map";

export function WaardesPageContent() {
  const [posterValueId, setPosterValueId] = useState<string | null>(null);

  const handleOpenPoster = useCallback((valueId: string) => {
    setPosterValueId(valueId);
  }, []);

  const handleClosePoster = useCallback(() => {
    setPosterValueId(null);
  }, []);

  const value = posterValueId ? getValueGuideById(posterValueId) : null;
  const posterSrc = posterValueId ? getValuePosterSrc(posterValueId) : null;

  return (
    <>
      <ValuesCategoryCards onOpenPoster={handleOpenPoster} />
      <ValuesGuideBrowse onOpenPoster={handleOpenPoster} />
      <ValuePosterModal
        open={posterValueId !== null && posterSrc !== null}
        posterSrc={posterSrc ?? ""}
        valueNameAf={value?.nameAf ?? ""}
        onClose={handleClosePoster}
      />
    </>
  );
}
