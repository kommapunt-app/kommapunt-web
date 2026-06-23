import { getPublicProfileUrl } from "@/lib/site-url";
import { KOMMA_SHARE_CAPTION } from "@/lib/share-bubbles";

export const PROFILE_SHARE_UNSUPPORTED_MESSAGE =
  "Direkte deel werk nie op hierdie browser nie. Gebruik eerder Kopieer skakel.";

export function getProfileShareCaption(name: string): string {
  return `${name} se Komma. Bubbles profiel.

Komma. 'n Gesprek oor standpunte en hoe ons daar beland.`;
}

export function getResultsProfileShareText(profileId: string): string {
  return `${KOMMA_SHARE_CAPTION}\n\n${getPublicProfileUrl(profileId)}`;
}

export function getProfileShareText(name: string, profileId: string): string {
  return `${getProfileShareCaption(name)}\n\n${getPublicProfileUrl(profileId)}`;
}

export function getWhatsAppShareUrl(text: string): string {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

export function getEmailShareUrl(name: string, profileId: string): string {
  const subject = `${name} se Bubbles | KommaPunt`;
  const body = getProfileShareText(name, profileId);

  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function getResultsEmailShareUrl(name: string, profileId: string): string {
  const subject = `${name} se Bubbles | KommaPunt`;
  const body = getResultsProfileShareText(profileId);

  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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

export async function copyProfileUrl(profileId: string): Promise<boolean> {
  return copyTextToClipboard(getPublicProfileUrl(profileId));
}

export function canUseNativeShare(): boolean {
  return typeof navigator !== "undefined" && typeof navigator.share === "function";
}

export async function shareProfileUrl(
  profileId: string,
  name: string,
): Promise<"shared" | "unsupported" | "cancelled"> {
  if (!canUseNativeShare()) {
    return "unsupported";
  }

  const url = getPublicProfileUrl(profileId);
  const text = getProfileShareCaption(name);

  try {
    await navigator.share({
      title: `${name} se Bubbles | KommaPunt`,
      text,
      url,
    });
    return "shared";
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return "cancelled";
    }

    throw error;
  }
}
