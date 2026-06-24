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

export const PROFILE_CARD_INTRO_TEXT =
  "My KommaPunt Bubbles wys wat vir my gewig dra.";

export const PROFILE_OG_TITLE = "My KommaPunt Bubbles";

export const PROFILE_OG_DESCRIPTION =
  "My KommaPunt Bubbles wys wat vir my gewig dra. KommaPunt: ’n gesprek oor standpunte en hoe ons daar beland.";

export const PROFILE_SHARE_TAGLINE =
  "KommaPunt: ’n gesprek oor standpunte en hoe ons daar beland.";

export function getProfileIntroText(): string {
  return PROFILE_CARD_INTRO_TEXT;
}

export function getProfileImageUrl(
  profileImageUrl?: string | null,
): string | null {
  const trimmed = profileImageUrl?.trim();

  if (!trimmed) {
    return null;
  }

  if (
    trimmed.startsWith("https://") ||
    trimmed.startsWith("http://") ||
    trimmed.startsWith("blob:") ||
    trimmed.startsWith("data:image/")
  ) {
    return trimmed;
  }

  return null;
}

/** @deprecated Use getProfileImageUrl */
export function getProfilePhotoUrl(
  profileImageUrl?: string | null,
): string | null {
  return getProfileImageUrl(profileImageUrl);
}
