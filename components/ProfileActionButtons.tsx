"use client";

import { Button } from "@/components/Button";
import {
  ProfileActionButtonLabel,
} from "@/components/profile/ProfileActionIcons";
import { KOMMA_COFFEE_URL } from "@/lib/constants/coffee";
import {
  copyProfileShareText,
  getProfileShareText,
  getWhatsAppShareUrl,
  openEmailShare,
} from "@/lib/profile-sharing";

interface ProfileActionButtonsProps {
  profileSaved: boolean;
  profileId?: string | null;
  profileUrl?: string | null;
  personName?: string | null;
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
  profileId = null,
  profileUrl = null,
  isBusy,
  isMobile,
  onDownload,
  onShare,
  actionError = null,
  saveHelperMessage = null,
}: ProfileActionButtonsProps) {
  const downloadLabel = isMobile ? "Stoor na Fotos" : "Laai af";
  const busyLabel = "Besig…";
  const canShareProfile = profileSaved && Boolean(profileId);

  async function handleCopyLink() {
    if (!profileId) {
      return;
    }

    await copyProfileShareText(profileId);
  }

  function handleEmailShare() {
    if (!profileId) {
      return;
    }

    openEmailShare(profileId);
  }

  const shareText = profileId ? getProfileShareText(profileId) : "";

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
          {profileUrl ? (
            <>
              Jou publieke profiel:{" "}
              <a
                href={profileUrl}
                className="underline decoration-komma-pink decoration-2 underline-offset-2"
              >
                {profileUrl.replace("https://", "")}
              </a>
            </>
          ) : (
            "Jou profiel is gestoor. Jy kan nou aflaai, deel, of ondersteun."
          )}
        </p>
      )}

      <div className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
        <Button
          onClick={onDownload}
          disabled={!profileSaved || isBusy}
          className={profileSaved ? unlockedButtonClass : lockedButtonClass}
        >
          {isBusy ? (
            busyLabel
          ) : (
            <ProfileActionButtonLabel icon="download" tone="light">
              {downloadLabel}
            </ProfileActionButtonLabel>
          )}
        </Button>

        <Button
          variant="secondary"
          onClick={onShare}
          disabled={!canShareProfile || isBusy}
          className={canShareProfile ? unlockedButtonClass : lockedButtonClass}
        >
          <ProfileActionButtonLabel icon="share" tone="dark">
            Deel
          </ProfileActionButtonLabel>
        </Button>

        {canShareProfile ? (
          <>
            <Button
              variant="secondary"
              onClick={handleCopyLink}
              disabled={isBusy}
              className={unlockedButtonClass}
            >
              <ProfileActionButtonLabel icon="link" tone="dark">
                Kopieer skakel
              </ProfileActionButtonLabel>
            </Button>

            <Button
              href={getWhatsAppShareUrl(shareText)}
              target="_blank"
              rel="noopener noreferrer"
              className={unlockedButtonClass}
            >
              <ProfileActionButtonLabel icon="whatsapp" tone="light">
                WhatsApp
              </ProfileActionButtonLabel>
            </Button>

            <Button
              variant="secondary"
              onClick={handleEmailShare}
              className={unlockedButtonClass}
            >
              <ProfileActionButtonLabel icon="email" tone="dark">
                E-pos
              </ProfileActionButtonLabel>
            </Button>
          </>
        ) : null}

        {profileSaved ? (
          <Button
            href={KOMMA_COFFEE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={unlockedButtonClass}
          >
            <ProfileActionButtonLabel icon="coffee" tone="light">
              Koop KommaPunt ’n koffie
            </ProfileActionButtonLabel>
          </Button>
        ) : (
          <Button disabled className={lockedButtonClass}>
            <ProfileActionButtonLabel icon="coffee" tone="light">
              Koop KommaPunt ’n koffie
            </ProfileActionButtonLabel>
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
