"use client";

import { useEffect } from "react";
import { TopFiveBubbleVisual } from "@/components/TopFiveBubbleVisual";
import {
  EXAMPLE_PROFILE_DISCLAIMER,
  type ExampleProfile,
} from "@/lib/example-profiles";

interface ExampleProfileModalProps {
  profile: ExampleProfile | null;
  onClose: () => void;
}

export function ExampleProfileModal({ profile, onClose }: ExampleProfileModalProps) {
  useEffect(() => {
    if (!profile) {
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
  }, [profile, onClose]);

  if (!profile) {
    return null;
  }

  const topFive = profile.rankedBubbles.slice(0, 5);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8 sm:px-6">
      <button
        type="button"
        className="absolute inset-0 bg-komma-black/45"
        aria-label="Sluit modal"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="example-profile-modal-title"
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

        <h2
          id="example-profile-modal-title"
          className="mb-5 pr-12 text-center text-2xl font-extrabold tracking-tight sm:text-3xl"
        >
          {profile.name}
        </h2>

        <TopFiveBubbleVisual
          rankedBubbles={profile.rankedBubbles}
          photoUrl={profile.photoSrc || null}
          ariaLabel={`${profile.name} se top 5 Bubbles`}
          className="max-w-none"
          colorScheme="demo"
          frameless
        />

        <div className="mt-6">
          <h3 className="mb-3 text-sm font-extrabold uppercase tracking-wide text-komma-black/55 sm:text-base">
            Top 5 Bubbles
          </h3>

          <ol className="flex flex-col gap-2.5">
            {topFive.map((item) => (
              <li
                key={item.id}
                className={`flex items-center gap-3 rounded-2xl border-4 border-komma-black px-3 py-2.5 shadow-[3px_3px_0_0_#000] sm:px-4 sm:py-3 ${
                  item.rank === 1 ? "bg-komma-pink/15" : "bg-[#F5F5F0]"
                }`}
              >
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full border-4 border-komma-black text-sm font-extrabold sm:size-9 sm:text-base ${
                    item.rank === 1
                      ? "bg-komma-pink text-komma-black"
                      : "bg-white text-komma-black"
                  }`}
                >
                  {item.rank}
                </span>

                <div className="min-w-0">
                  <p className="text-sm font-extrabold leading-tight sm:text-base">
                    {item.bubble.nameAf}
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-komma-black/45 sm:text-xs">
                    {item.bubble.nameEn}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-5 text-center text-xs leading-relaxed text-komma-black/55 sm:text-sm">
            {EXAMPLE_PROFILE_DISCLAIMER}
          </p>
        </div>
      </div>
    </div>
  );
}
