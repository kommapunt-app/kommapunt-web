"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import {
  canUseNativeShare,
  copyProfileShareText,
  getEmailShareUrl,
  getProfileShareText,
  getWhatsAppShareUrl,
  PROFILE_SHARE_UNSUPPORTED_MESSAGE,
  shareProfileUrl,
} from "@/lib/profile-sharing";

interface ProfileShareActionsProps {
  profileId: string;
  personName: string;
  compact?: boolean;
}

export function ProfileShareActions({
  profileId,
  personName,
  compact = false,
}: ProfileShareActionsProps) {
  const [isBusy, setIsBusy] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const shareText = getProfileShareText(profileId);
  const whatsAppUrl = getWhatsAppShareUrl(shareText);
  const emailUrl = getEmailShareUrl(profileId);
  const showNativeShare = canUseNativeShare();

  async function handleCopyLink() {
    setIsBusy(true);
    setError(null);
    setFeedback(null);

    try {
      const copied = await copyProfileShareText(profileId);
      setFeedback(copied ? "Skakel gekopieer." : "Kon nie skakel kopieer nie.");
    } finally {
      setIsBusy(false);
    }
  }

  async function handleNativeShare() {
    setIsBusy(true);
    setError(null);
    setFeedback(null);

    try {
      const result = await shareProfileUrl(profileId);

      if (result === "unsupported") {
        const copied = await copyProfileShareText(profileId);
        setFeedback(
          copied
            ? PROFILE_SHARE_UNSUPPORTED_MESSAGE.replace(
                "Kopieer skakel",
                "Skakel is na knipbord gekopieer",
              )
            : PROFILE_SHARE_UNSUPPORTED_MESSAGE,
        );
      } else if (result === "shared") {
        setFeedback("Profiel gedeel.");
      }
    } catch (shareError) {
      setError(
        shareError instanceof Error
          ? shareError.message
          : "Kon nie profiel deel nie.",
      );
    } finally {
      setIsBusy(false);
    }
  }

  const buttonClass = compact
    ? "w-full px-5 py-3 text-sm sm:w-auto sm:text-base"
    : "w-full px-6 py-4 text-base sm:w-auto sm:text-lg";

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <div className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
        <Button
          onClick={handleCopyLink}
          disabled={isBusy}
          className={buttonClass}
        >
          Kopieer skakel
        </Button>

        <Button
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
        >
          WhatsApp
        </Button>

        <Button
          href={emailUrl}
          variant="secondary"
          className={buttonClass}
        >
          E-pos
        </Button>

        {showNativeShare ? (
          <Button
            variant="secondary"
            onClick={handleNativeShare}
            disabled={isBusy}
            className={buttonClass}
          >
            Deel
          </Button>
        ) : null}
      </div>

      {feedback ? (
        <p className="max-w-3xl text-center text-sm font-semibold text-komma-black/70">
          {feedback}
        </p>
      ) : null}

      {error ? (
        <p className="max-w-3xl text-center text-sm font-semibold text-komma-pink">
          {error}
        </p>
      ) : null}
    </div>
  );
}
