"use client";

import { Button } from "@/components/Button";
import { KOMMA_COFFEE_URL } from "@/lib/constants/coffee";

interface ProfileActionButtonsProps {
  profileSaved: boolean;
  isBusy: boolean;
  isMobile: boolean;
  onDownload: () => void;
  onShare: () => void;
  actionError?: string | null;
  saveHelperMessage?: string | null;
}

const lockedButtonClass =
  "w-full px-6 py-4 text-base opacity-45 cursor-not-allowed sm:w-auto sm:text-lg";

const unlockedButtonClass = "w-full px-6 py-4 text-base sm:w-auto sm:text-lg";

export function ProfileActionButtons({
  profileSaved,
  isBusy,
  isMobile,
  onDownload,
  onShare,
  actionError = null,
  saveHelperMessage = null,
}: ProfileActionButtonsProps) {
  const downloadLabel = isMobile ? "Stoor na Fotos" : "Laai af";
  const busyLabel = isMobile ? "Besig…" : "Besig…";

  return (
    <div className="flex w-full max-w-3xl flex-col items-center gap-3">
      {!profileSaved ? (
        <p className="text-center text-sm font-extrabold text-komma-black/70 sm:text-base">
          Ontsluit jou profiel om{" "}
          {isMobile ? "na Fotos te stoor" : "af te laai"}, te deel, of KommaPunt
          &apos;n koppie koffie te koop.
        </p>
      ) : (
        <p className="text-center text-sm font-extrabold text-komma-black sm:text-base">
          Jou profiel is gestoor. Jy kan nou{" "}
          {isMobile ? "na Fotos stoor" : "aflaai"}, deel, of ondersteun.
        </p>
      )}

      <div className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
        <Button
          onClick={onDownload}
          disabled={!profileSaved || isBusy}
          className={profileSaved ? unlockedButtonClass : lockedButtonClass}
        >
          {isBusy ? busyLabel : downloadLabel}
        </Button>

        <Button
          variant="secondary"
          onClick={onShare}
          disabled={!profileSaved || isBusy}
          className={profileSaved ? unlockedButtonClass : lockedButtonClass}
        >
          Deel
        </Button>

        {profileSaved ? (
          <Button
            href={KOMMA_COFFEE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={unlockedButtonClass}
          >
            Koop KommaPunt koffie
          </Button>
        ) : (
          <Button disabled className={lockedButtonClass}>
            Koop KommaPunt koffie
          </Button>
        )}
      </div>

      {saveHelperMessage ? (
        <p className="max-w-3xl text-center text-sm font-semibold leading-relaxed text-komma-black/70">
          {saveHelperMessage}
        </p>
      ) : null}

      {actionError ? (
        <p className="max-w-3xl text-center text-sm font-semibold text-komma-pink">
          {actionError}
        </p>
      ) : null}
    </div>
  );
}
