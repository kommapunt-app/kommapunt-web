"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ValueTensionDiagram } from "@/components/ValueTensionDiagram";
import { hasValuePoster } from "@/data/value-posters";
import { getValueMapUrl } from "@/lib/value-map-navigation";
import { getValuePageUrl } from "@/lib/value-page";
import {
  VALUE_GUIDE_DETAIL_LABELS,
  getCategoryById,
  type ValueGuideEntry,
} from "@/lib/values-guide";

interface ValueGuideDetailModalProps {
  value: ValueGuideEntry | null;
  onClose: () => void;
}

export function ValueGuideDetailModal({
  value,
  onClose,
}: ValueGuideDetailModalProps) {
  useEffect(() => {
    if (!value) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [value, onClose]);

  if (!value) {
    return null;
  }

  const category = getCategoryById(value.category);

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center px-4 py-6 sm:items-center sm:px-6 sm:py-8">
      <button
        type="button"
        className="absolute inset-0 bg-komma-black/55"
        aria-label="Sluit waarde"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="value-guide-detail-title"
        className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border-4 border-komma-black bg-komma-yellow p-5 shadow-[8px_8px_0_0_#FF1493] sm:p-7"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Sluit"
          className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full border-4 border-komma-black bg-white text-xl font-extrabold shadow-[3px_3px_0_0_#000] transition-transform hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#FF1493] sm:right-5 sm:top-5"
        >
          ×
        </button>

        <header className="mb-6 pr-12">
          <p className="mb-1 text-xs font-bold uppercase tracking-wide text-komma-black/50 sm:text-sm">
            {category?.labelAf ?? value.category}
          </p>
          <h2
            id="value-guide-detail-title"
            className="text-3xl font-extrabold tracking-tight sm:text-4xl"
          >
            {value.nameAf}
          </h2>
          <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-komma-black/45 sm:text-base">
            {value.nameEn}
          </p>
        </header>

        <div className="space-y-4">
          <section className="rounded-2xl border-4 border-komma-black bg-[#F3F1EC] p-4 sm:p-5">
            <h3 className="mb-2 text-sm font-extrabold uppercase tracking-wide text-komma-black/55">
              {VALUE_GUIDE_DETAIL_LABELS.definition}
            </h3>
            <p className="text-sm leading-relaxed text-komma-black/85 sm:text-base">
              {value.definitionAf}
            </p>
          </section>

          <section className="rounded-2xl border-4 border-komma-black bg-white p-4 sm:p-5">
            <h3 className="mb-2 text-sm font-extrabold uppercase tracking-wide text-komma-black/55">
              {VALUE_GUIDE_DETAIL_LABELS.significance}
            </h3>
            <p className="text-sm leading-relaxed text-komma-black/85 sm:text-base">
              {value.significanceAf}
            </p>
          </section>

          <section className="rounded-2xl border-4 border-komma-black bg-komma-yellow/50 p-4 sm:p-5">
            <h3 className="mb-2 text-sm font-extrabold uppercase tracking-wide text-komma-black/55">
              {VALUE_GUIDE_DETAIL_LABELS.healthyExpression}
            </h3>
            <p className="text-sm leading-relaxed text-komma-black/85 sm:text-base">
              {value.healthyExpressionAf}
            </p>
          </section>

          <section className="rounded-2xl border-4 border-komma-black bg-komma-pink/10 p-4 sm:p-5">
            <h3 className="mb-2 text-sm font-extrabold uppercase tracking-wide text-komma-black/55">
              {VALUE_GUIDE_DETAIL_LABELS.overdoneRisk}
            </h3>
            <p className="text-sm leading-relaxed text-komma-black/85 sm:text-base">
              {value.overdoneRiskAf}
            </p>
          </section>

          <ValueTensionDiagram
            currentValueName={value.nameAf}
            conflicts={value.conflictingValues}
          />

          <section className="rounded-2xl border-4 border-komma-black bg-[#F5F5F0] p-4 shadow-[4px_4px_0_0_#000] sm:p-5">
            <h3 className="mb-2 text-sm font-extrabold uppercase tracking-wide text-komma-black/55">
              {VALUE_GUIDE_DETAIL_LABELS.reflectionQuestion}
            </h3>
            <p className="text-sm font-semibold leading-relaxed text-komma-black/90 sm:text-base">
              {value.reflectionQuestionAf}
            </p>
          </section>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href={getValueMapUrl(value.id)}
              className="inline-flex w-full items-center justify-center rounded-full border-4 border-komma-black bg-white px-6 py-3 text-sm font-extrabold shadow-[3px_3px_0_0_#000] transition-transform hover:-translate-y-0.5 hover:bg-komma-yellow hover:shadow-[4px_4px_0_0_#FF1493] sm:w-auto sm:px-4 sm:py-2"
            >
              📍 Sien waar die waarde inpas
            </Link>

            {hasValuePoster(value.id) ? (
              <Link
                href={`/plakkate?poster=${value.id}`}
                className="inline-flex w-full items-center justify-center rounded-full border-4 border-komma-black bg-komma-yellow px-6 py-3.5 text-base font-extrabold shadow-[4px_4px_0_0_#000] transition-transform hover:-translate-y-0.5 hover:bg-komma-pink hover:text-white hover:shadow-[5px_5px_0_0_#000] sm:w-auto sm:px-8"
              >
                🖼️ Bekyk Bubbleblad
              </Link>
            ) : null}
            <Link
              href={getValuePageUrl(value.id)}
              className="inline-flex w-full items-center justify-center rounded-full border-4 border-komma-black bg-white px-6 py-3 text-sm font-extrabold shadow-[3px_3px_0_0_#000] transition-transform hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#FF1493] sm:w-auto sm:px-4 sm:py-2"
            >
              Open volledige waarde-blad
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
