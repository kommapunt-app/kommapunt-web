import { getPublicProfileUrl } from "@/lib/site-url";
import {
  PROFILE_OG_TITLE,
  PROFILE_SHARE_HEADLINE,
  PROFILE_SHARE_TAGLINE,
} from "@/lib/profile-card";

export const PROFILE_SHARE_UNSUPPORTED_MESSAGE =
  "Direkte deel werk nie op hierdie browser nie. Gebruik eerder Kopieer skakel.";

export function getProfileShareText(profileId: string): string {
  return `${PROFILE_SHARE_HEADLINE}

${PROFILE_SHARE_TAGLINE}

Ontdek jou eie Bubbles:
${getPublicProfileUrl(profileId)}`;
}

/** @deprecated Use getProfileShareText(profileId) */
export function getResultsProfileShareText(profileId: string): string {
  return getProfileShareText(profileId);
}

export function getWhatsAppShareUrl(text: string): string {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

export function getEmailShareUrl(profileId: string): string {
  const subject = PROFILE_OG_TITLE;
  const body = getProfileShareText(profileId);

  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function openEmailShare(profileId: string): void {
  if (typeof window === "undefined") {
    return;
  }

  window.location.href = getEmailShareUrl(profileId);
}

/** @deprecated Use getEmailShareUrl(profileId) */
export function getResultsEmailShareUrl(_name: string, profileId: string): string {
  return getEmailShareUrl(profileId);
}

export async function copyTextToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // fall through to legacy copy
    }
  }

  if (typeof document === "undefined") {
    return false;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();

  try {
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    document.body.removeChild(textarea);
  }
}

export async function copyProfileShareText(profileId: string): Promise<boolean> {
  return copyTextToClipboard(getProfileShareText(profileId));
}

/** @deprecated Use copyProfileShareText(profileId) */
export async function copyProfileUrl(profileId: string): Promise<boolean> {
  return copyProfileShareText(profileId);
}

export function canUseNativeShare(): boolean {
  return typeof navigator !== "undefined" && typeof navigator.share === "function";
}

export async function shareProfileUrl(
  profileId: string,
): Promise<"shared" | "unsupported" | "cancelled"> {
  if (!canUseNativeShare()) {
    return "unsupported";
  }

  const text = getProfileShareText(profileId);

  try {
    await navigator.share({
      title: PROFILE_OG_TITLE,
      text,
    });
    return "shared";
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return "cancelled";
    }

    throw error;
  }
}
