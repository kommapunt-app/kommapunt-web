"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { BUBBLE_CATEGORIES, type BubbleValue } from "@/lib/bubbles";
import { Button } from "./Button";

interface BubbleSelectModalProps {
  open: boolean;
  bubble: BubbleValue;
  selected: boolean;
  selectionDisabled?: boolean;
  onSelect: () => void;
  onCancel: () => void;
  onAtLimitAttempt?: () => void;
}

export function BubbleSelectModal({
  open,
  bubble,
  selected,
  selectionDisabled = false,
  onSelect,
  onCancel,
  onAtLimitAttempt,
}: BubbleSelectModalProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onCancel();
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onCancel]);

  if (!open || typeof document === "undefined") {
    return null;
  }

  const categoryLabel = BUBBLE_CATEGORIES.find(
    (category) => category.id === bubble.category,
  )?.label;

  function handlePrimaryClick() {
    if (!selected && selectionDisabled) {
      onAtLimitAttempt?.();
      return;
    }

    onSelect();
  }

  const titleId = `bubble-select-modal-${bubble.id}`;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-komma-black/45"
        aria-label="Kanselleer"
        onClick={onCancel}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex max-h-[85vh] w-full max-w-[420px] flex-col overflow-hidden rounded-2xl border-4 border-komma-black bg-[#FFFEF5] shadow-[6px_6px_0_0_#000]"
      >
        <div className="overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
          {categoryLabel ? (
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-komma-black/50">
              {categoryLabel}
            </p>
          ) : null}

          <div className="mb-1.5 flex items-start gap-2">
            <span
              className="mt-1.5 size-2 shrink-0 rounded-full border-2 border-komma-black bg-komma-pink"
              aria-hidden="true"
            />
            <div className="min-w-0">
              <h2
                id={titleId}
                className="text-lg font-extrabold leading-tight text-komma-black sm:text-xl"
              >
                {bubble.nameAf}
              </h2>
              <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-komma-black/45 sm:text-sm">
                {bubble.nameEn}
              </p>
            </div>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-komma-black/80 sm:text-base">
            {bubble.descriptionAf}
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-3 border-t-4 border-komma-black bg-[#FFFEF5] px-5 py-4 sm:px-6">
          <Button
            onClick={handlePrimaryClick}
            className="w-full px-6 py-4 text-base"
          >
            {selected ? "Verwyder Bubble" : "Kies hierdie Bubble"}
          </Button>
          <Button
            variant="secondary"
            onClick={onCancel}
            className="w-full px-6 py-4 text-base"
          >
            Kanselleer
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
