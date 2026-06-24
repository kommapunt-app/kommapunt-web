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
  "Die KommaPunt Bubbles wys wat belangrik is vir my.";

export const PROFILE_SHARE_HEADLINE =
  "My KommaPunt Bubbles wys wat belangrik is vir my.";

export const PROFILE_SHARE_TAGLINE =
  "KommaPunt: ’n gesprek oor standpunte en hoe ons daar beland.";

export const PROFILE_OG_TITLE = "My KommaPunt Bubbles";

/** Open Graph / WhatsApp share title for profile links. */
export const PROFILE_OG_SHARE_TITLE = PROFILE_SHARE_HEADLINE;

/** Open Graph / WhatsApp share description for profile links. */
export const PROFILE_OG_SHARE_DESCRIPTION = PROFILE_SHARE_TAGLINE;

export const PROFILE_OG_DESCRIPTION = `${PROFILE_SHARE_HEADLINE} ${PROFILE_SHARE_TAGLINE}`;

export const PROFILE_OG_IMAGE_ALT = "KommaPunt Logo";

export const PROFILE_OG_LOGO_IMAGE = {
  url: PROFILE_CENTER_FALLBACK_SRC,
  width: 460,
  height: 384,
  alt: PROFILE_OG_IMAGE_ALT,
} as const;

export const PROFILE_OG_CARD_IMAGE = {
  width: 1200,
  height: 630,
  alt: PROFILE_OG_TITLE,
} as const;

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

/** Centre circle image for profile cards — user upload when present, logo otherwise. */
export function getProfileCenterImageSrc(photoUrl?: string | null): string {
  const uploaded = getUploadedProfileImageUrl(photoUrl);

  if (uploaded) {
    return uploaded;
  }

  const trimmed = photoUrl?.trim();

  if (
    trimmed &&
    trimmed.startsWith("/") &&
    trimmed !== PROFILE_CENTER_FALLBACK_SRC
  ) {
    return trimmed;
  }

  return PROFILE_CENTER_FALLBACK_SRC;
}

export function getProfileOpenGraphImages(): Array<{
  url: string;
  width: number;
  height: number;
  alt: string;
}> {
  return [
    {
      url: PROFILE_OG_LOGO_IMAGE.url,
      width: PROFILE_OG_LOGO_IMAGE.width,
      height: PROFILE_OG_LOGO_IMAGE.height,
      alt: PROFILE_OG_LOGO_IMAGE.alt,
    },
  ];
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
