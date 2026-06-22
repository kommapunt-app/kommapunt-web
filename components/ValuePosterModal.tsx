"use client";

import { useEffect } from "react";

interface ValuePosterModalProps {
  open: boolean;
  posterSrc: string;
  valueNameAf: string;
  onClose: () => void;
}

export function ValuePosterModal({
  open,
  posterSrc,
  valueNameAf,
  onClose,
}: ValuePosterModalProps) {
  useEffect(() => {
    if (!open) {
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
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex flex-col sm:items-center sm:justify-center sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-komma-black/75"
        aria-label="Sluit plakkaat"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${valueNameAf} waarde plakkaat`}
        className="relative flex h-full w-full flex-col overflow-hidden bg-[#F5F5F0] sm:h-auto sm:max-h-[92vh] sm:max-w-[1000px] sm:rounded-[2rem] sm:border-4 sm:border-komma-black sm:shadow-[8px_8px_0_0_#FF1493]"
      >
        <div className="sticky top-0 z-10 flex shrink-0 justify-end border-b-4 border-komma-black bg-komma-yellow px-3 py-3 sm:rounded-t-[1.75rem] sm:px-4">
          <button
            type="button"
            onClick={onClose}
            aria-label="Sluit"
            className="flex size-10 items-center justify-center rounded-full border-4 border-komma-black bg-white text-xl font-extrabold shadow-[3px_3px_0_0_#000] transition-transform hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#FF1493]"
          >
            ×
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-2 py-3 sm:px-4 sm:py-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={posterSrc}
            alt={`${valueNameAf} waarde plakkaat`}
            className="mx-auto block h-auto w-full max-w-full shadow-[6px_6px_0_0_#000] sm:shadow-[8px_8px_0_0_#000]"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
