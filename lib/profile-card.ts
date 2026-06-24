export const PROFILE_CARD_QUOTE = {
  lines: [
    "Values are like fingerprints.",
    "Nobody's are the same,",
    "but you leave them all over",
    "everything you do.",
  ],
  author: "Elvis Presley",
} as const;

export const PROFILE_CARD_TITLE = "KommaPunt Profiel";

export const KOMMA_PUNT_MARK_SRC = "/kommapunt-card-logo.png";

export const PROFILE_CARD_FINGERPRINT_SRC = "/profile-fingerprint.png";

export const PROFILE_CARD_QR_CODE_SRC = "/profile-card-qr-sticker.png";

export const PROFILE_CARD_CENTER_LOGO_SRC = KOMMA_PUNT_MARK_SRC;

export function getProfileIntroText(name: string): string {
  const firstName = name.trim().split(/\s+/)[0] || name.trim();

  return `Hier is wat vir ${firstName} die meeste gewig dra.`;
}

export function getProfilePhotoUrl(
  photoUrl?: string | null,
): string | null {
  if (photoUrl?.trim()) {
    return photoUrl;
  }

  return null;
}
