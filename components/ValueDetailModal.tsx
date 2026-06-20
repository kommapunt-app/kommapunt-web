"use client";

import { useEffect } from "react";
import type { ValueLibraryEntry } from "@/lib/value-library";
import { VALUE_DETAIL_HEADINGS } from "@/lib/value-detail-labels";

interface ValueDetailModalProps {
  value: ValueLibraryEntry | null;
  onClose: () => void;
}

export function ValueDetailModal({ value, onClose }: ValueDetailModalProps) {
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

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center px-4 py-6 sm:items-center sm:px-6 sm:py-8">
      <button
        type="button"
        className="absolute inset-0 bg-komma-black/45"
        aria-label="Sluit waarde"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="value-detail-title"
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[2rem] border-4 border-komma-black bg-komma-yellow p-5 shadow-[6px_6px_0_0_#000] sm:p-7"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Sluit"
          className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full border-4 border-komma-black bg-[#F5F5F0] text-xl font-extrabold shadow-[3px_3px_0_0_#000] transition-transform hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#FF1493] sm:right-5 sm:top-5"
        >
          ×
        </button>

        <div className="mb-5 pr-12">
          <h2
            id="value-detail-title"
            className="text-3xl font-extrabold tracking-tight sm:text-4xl"
          >
            {value.nameAf}
          </h2>
          <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-komma-black/50 sm:text-base">
            {value.nameEn}
          </p>
        </div>

        <div className="space-y-5">
          <section>
            <p className="text-base font-semibold leading-relaxed text-komma-black/85 sm:text-lg">
              {value.definitionAf}
            </p>
          </section>

          <section className="rounded-2xl border-4 border-komma-black bg-[#F5F5F0] p-4 sm:p-5">
            <h3 className="mb-2 text-sm font-extrabold uppercase tracking-wide text-komma-black/55 sm:text-base">
              {VALUE_DETAIL_HEADINGS.whenImportant}
            </h3>
            <p className="text-sm leading-relaxed text-komma-black/85 sm:text-base">
              {value.whenBigAf}
            </p>
          </section>

          <section className="rounded-2xl border-4 border-komma-black bg-white p-4 sm:p-5">
            <h3 className="mb-2 text-sm font-extrabold uppercase tracking-wide text-komma-black/55 sm:text-base">
              {VALUE_DETAIL_HEADINGS.strength}
            </h3>
            <p className="text-sm leading-relaxed text-komma-black/85 sm:text-base">
              {value.strengthAf}
            </p>
          </section>

          <section className="rounded-2xl border-4 border-komma-black bg-komma-pink/10 p-4 sm:p-5">
            <h3 className="mb-2 text-sm font-extrabold uppercase tracking-wide text-komma-black/55 sm:text-base">
              {VALUE_DETAIL_HEADINGS.redFlags}
            </h3>
            <p className="text-sm leading-relaxed text-komma-black/85 sm:text-base">
              {value.dangerAf}
            </p>
          </section>

          <section>
            <h3 className="mb-3 text-sm font-extrabold uppercase tracking-wide text-komma-black/55 sm:text-base">
              Vrae om oor te dink
            </h3>
            <ul className="space-y-2.5">
              {value.questionsAf.map((question) => (
                <li
                  key={question}
                  className="flex gap-3 rounded-2xl border-4 border-komma-black bg-white px-4 py-3 text-sm leading-relaxed shadow-[3px_3px_0_0_#000] sm:text-base"
                >
                  <span
                    className="mt-1.5 size-2 shrink-0 rounded-full border-2 border-komma-black bg-komma-pink"
                    aria-hidden="true"
                  />
                  <span>{question}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
