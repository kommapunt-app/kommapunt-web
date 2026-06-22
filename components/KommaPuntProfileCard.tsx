"use client";

import { forwardRef } from "react";
import { ProfileFingerprintIllustration } from "@/components/ProfileFingerprintIllustration";
import { TopFiveBubbleVisual } from "@/components/TopFiveBubbleVisual";
import {
  KOMMA_PUNT_MARK_SRC,
  PROFILE_CARD_QR_CODE_SRC,
  PROFILE_CARD_QUOTE,
  PROFILE_CARD_TITLE,
} from "@/lib/profile-card";
import type { RankedBubbleResult } from "@/lib/results";

interface KommaPuntProfileCardProps {
  personName: string;
  rankedBubbles: RankedBubbleResult[];
  photoUrl?: string | null;
  onPhotoChange?: (url: string | null) => void;
  photoUploadEnabled?: boolean;
  className?: string;
}

export const KommaPuntProfileCard = forwardRef<
  HTMLDivElement,
  KommaPuntProfileCardProps
>(function KommaPuntProfileCard(
  {
    personName,
    rankedBubbles,
    photoUrl = null,
    onPhotoChange,
    photoUploadEnabled = false,
    className = "",
  },
  ref,
) {
  return (
    <div
      ref={ref}
      className={`w-full overflow-visible rounded-[2rem] border-4 border-komma-black bg-komma-yellow p-5 shadow-[6px_6px_0_0_#FF1493] sm:p-7 ${className}`.trim()}
    >
      <header className="mb-5 text-center sm:mb-6">
        <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-komma-black/55 sm:text-sm">
          {PROFILE_CARD_TITLE}
        </p>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-komma-black sm:text-3xl">
          {personName}
        </h2>
      </header>

      <div className="border-t-4 border-komma-black/15 pt-5 sm:pt-6">
        <TopFiveBubbleVisual
          rankedBubbles={rankedBubbles}
          photoUrl={photoUrl}
          onPhotoChange={onPhotoChange}
          photoUploadEnabled={photoUploadEnabled}
          centerCircleFill="#D4D4D4"
          colorScheme="demo"
          frameless
          className="max-w-none"
          ariaLabel={`${personName} se top 5 Bubbles`}
        />
      </div>

      <footer className="mt-6 overflow-visible border-t-4 border-komma-black/15 pt-6 sm:mt-7 sm:pt-7">
        <div className="grid grid-cols-1 items-end gap-6 overflow-visible sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-5 md:gap-6 lg:gap-8">
          <div className="-translate-y-[50px] flex justify-center overflow-visible sm:justify-start">
            <ProfileFingerprintIllustration className="h-[4.75rem] w-auto sm:h-[5.25rem] md:h-[5.75rem]" />
          </div>

          <figure className="min-w-0 overflow-visible text-center sm:text-left">
            <blockquote className="translate-x-[10px] text-[0.9375rem] font-extrabold leading-snug text-komma-black sm:text-base md:text-lg">
              {PROFILE_CARD_QUOTE.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </blockquote>
            <figcaption className="-translate-y-[5px] translate-x-[10px] mt-3 text-xs font-semibold text-komma-black/45 sm:text-sm">
              — {PROFILE_CARD_QUOTE.author}
            </figcaption>
          </figure>

          <div className="flex shrink-0 flex-row items-end justify-end gap-2 overflow-visible sm:gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PROFILE_CARD_QR_CODE_SRC}
              alt="Kies jou eie bubbles — QR-kode"
              width={400}
              height={520}
              className="block h-auto w-[11rem] max-w-none shrink-0 translate-y-[10px] object-contain sm:w-[12rem]"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={KOMMA_PUNT_MARK_SRC}
              alt="KommaPunt"
              width={512}
              height={120}
              className="block h-6 w-auto max-w-none shrink-0 object-contain pb-0.5 sm:h-7"
            />
          </div>
        </div>
      </footer>
    </div>
  );
});
