"use client";

import { useEffect } from "react";
import { Button } from "./Button";

interface SelectionCompleteModalProps {
  open: boolean;
  onBeginRanking: () => void;
  onReview: () => void;
}

export function SelectionCompleteModal({
  open,
  onBeginRanking,
  onReview,
}: SelectionCompleteModalProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onReview();
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onReview]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-5 py-8 sm:px-8">
      <div
        className="absolute inset-0 bg-komma-black/45"
        aria-hidden="true"
        onClick={onReview}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="selection-complete-title"
        className="relative w-full max-w-lg rounded-[2rem] border-4 border-komma-black bg-komma-yellow p-6 shadow-[8px_8px_0_0_#FF1493] sm:p-8"
      >
        <div
          className="mb-5 flex size-14 items-center justify-center rounded-full border-4 border-komma-black bg-komma-pink text-2xl shadow-[4px_4px_0_0_#000] sm:mb-6 sm:size-16 sm:text-3xl"
          aria-hidden="true"
        >
          ✓
        </div>

        <h2
          id="selection-complete-title"
          className="text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl"
        >
          Kom ons sorteer jou Bubbles!
        </h2>

        <div className="mt-4 space-y-3 text-base font-semibold leading-relaxed text-komma-black/85 sm:mt-5 sm:text-lg">
          <p>Jy het die waardes gekies wat vir jou belangrik is.</p>
          <p>Nou kom die interessante deel.</p>
          <p>Watter een dra meer gewig wanneer twee goeie dinge bots?</p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:mt-10">
          <Button
            onClick={onBeginRanking}
            className="w-full px-6 py-4 text-base sm:text-lg"
          >
            Begin rangskik
          </Button>
          <Button
            variant="secondary"
            onClick={onReview}
            className="w-full px-6 py-4 text-base sm:text-lg"
          >
            Kies ander Bubbles
          </Button>
        </div>
      </div>
    </div>
  );
}
