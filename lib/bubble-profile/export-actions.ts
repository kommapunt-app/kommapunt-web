import type { RefObject } from "react";
import {
  BUBBLE_EXPORT_FILENAME,
  downloadBlob,
  exportBubbleVisualAsPng,
  shareBubbleVisual,
  SHARE_UNSUPPORTED_MESSAGE,
} from "@/lib/share-bubbles";

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

export async function shareBubbleVisualFromRef(
  exportRef: RefObject<HTMLElement | null>,
  photoUrl?: string | null,
): Promise<"shared" | "unsupported"> {
  const element = exportRef.current;

  if (!element) {
    throw new Error("Kon nie jou Bubble-profiel vind nie.");
  }

  const blob = await exportBubbleVisualAsPng(element, photoUrl);
  const result = await shareBubbleVisual(blob);

  if (result === "unsupported") {
    downloadBlob(blob, BUBBLE_EXPORT_FILENAME);
    throw new Error(SHARE_UNSUPPORTED_MESSAGE);
  }

  return result;
}
