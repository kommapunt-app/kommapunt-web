import type { RefObject } from "react";
import {
  copyProfileShareText,
  PROFILE_SHARE_UNSUPPORTED_MESSAGE,
  shareProfileUrl,
} from "@/lib/profile-sharing";
import {
  BUBBLE_EXPORT_FILENAME,
  downloadBlob,
  exportBubbleVisualAsPng,
  IPHONE_PHOTOS_FALLBACK_HELPER,
  saveProfileImageToPhotos,
} from "@/lib/share-bubbles";

export type SaveToPhotosResult = {
  method: "share" | "download";
  helperMessage?: string;
};

export async function downloadBubbleVisual(
  exportRef: RefObject<HTMLElement | null>,
  photoUrl?: string | null,
): Promise<void> {
  const element = exportRef.current;

  if (!element) {
    throw new Error("Kon nie jou Bubble-profiel vind nie.");
  }

  const blob = await exportBubbleVisualAsPng(element, photoUrl);
  downloadBlob(blob, BUBBLE_EXPORT_FILENAME);
}

export async function saveBubbleVisualToPhotos(
  exportRef: RefObject<HTMLElement | null>,
  photoUrl?: string | null,
): Promise<SaveToPhotosResult> {
  const element = exportRef.current;

  if (!element) {
    throw new Error("Kon nie jou Bubble-profiel vind nie.");
  }

  const blob = await exportBubbleVisualAsPng(element, photoUrl);
  const result = await saveProfileImageToPhotos(blob);

  if (result === "shared") {
    return { method: "share" };
  }

  return {
    method: "download",
    helperMessage: IPHONE_PHOTOS_FALLBACK_HELPER,
  };
}

export async function shareBubbleProfileUrl(
  profileId: string,
): Promise<"shared" | "unsupported" | "copied"> {
  const result = await shareProfileUrl(profileId);

  if (result === "shared" || result === "cancelled") {
    return "shared";
  }

  const copied = await copyProfileShareText(profileId);

  if (copied) {
    return "copied";
  }

  throw new Error(PROFILE_SHARE_UNSUPPORTED_MESSAGE);
}
