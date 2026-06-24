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

export const PROFILE_CENTER_FALLBACK_SRC = "/komma-logo-mark.png";

/** @deprecated Use PROFILE_CENTER_FALLBACK_SRC */
export const PROFILE_CARD_CENTER_LOGO_SRC = PROFILE_CENTER_FALLBACK_SRC;

export const PROFILE_CARD_INTRO_TEXT =
  "My KommaPunt Bubbles wys wat vir my gewig dra.";

export const PROFILE_OG_TITLE = "My KommaPunt Bubbles";

export const PROFILE_OG_DESCRIPTION =
  "My KommaPunt Bubbles wys wat vir my gewig dra. KommaPunt: ’n gesprek oor standpunte en hoe ons daar beland.";

export const PROFILE_SHARE_TAGLINE =
  "KommaPunt: ’n gesprek oor standpunte en hoe ons daar beland.";

export type ProfileImageSource = {
  profileImageUrl?: string | null;
  profile_image_url?: string | null;
};

function isValidProfileImageUrl(value: string): boolean {
  return (
    value.startsWith("https://") ||
    value.startsWith("http://") ||
    value.startsWith("blob:") ||
    value.startsWith("data:image/") ||
    value.startsWith("/")
  );
}

export function getProfileImage(
  profile?: ProfileImageSource | string | null,
): string {
  if (typeof profile === "string") {
    const trimmed = profile.trim();

    if (trimmed && isValidProfileImageUrl(trimmed)) {
      return trimmed;
    }

    return PROFILE_CENTER_FALLBACK_SRC;
  }

  const url = (
    profile?.profileImageUrl ??
    profile?.profile_image_url ??
    ""
  ).trim();

  if (url && isValidProfileImageUrl(url)) {
    return url;
  }

  return PROFILE_CENTER_FALLBACK_SRC;
}

export function getAbsoluteProfileImageUrl(
  profile: ProfileImageSource | string | null | undefined,
  siteUrl: string,
): string {
  const src = getProfileImage(profile);
  return src.startsWith("/") ? `${siteUrl}${src}` : src;
}

export function getProfileIntroText(): string {
  return PROFILE_CARD_INTRO_TEXT;
}

/** Returns only a user-uploaded image URL, or null when absent. */
export function getUploadedProfileImageUrl(
  profileImageUrl?: string | null,
): string | null {
  const trimmed = profileImageUrl?.trim();

  if (!trimmed || trimmed === PROFILE_CENTER_FALLBACK_SRC) {
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

/** @deprecated Use getUploadedProfileImageUrl or getProfileImage */
export function getProfileImageUrl(
  profileImageUrl?: string | null,
): string | null {
  return getUploadedProfileImageUrl(profileImageUrl);
}

/** @deprecated Use getProfileImage */
export function getProfilePhotoUrl(
  profileImageUrl?: string | null,
): string | null {
  return getUploadedProfileImageUrl(profileImageUrl);
}
