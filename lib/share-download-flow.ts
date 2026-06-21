import type { RefObject } from "react";
import { buildBubbleProfileRequest } from "@/lib/bubble-profile/build-payload";
import { saveBubbleProfile } from "@/lib/bubble-profile/api";
import { saveBubbleProfileToSession } from "@/lib/bubble-profile/session";
import type { BubbleProfileContact } from "@/lib/bubble-profile/types";
import {
  BUBBLE_EXPORT_FILENAME,
  downloadBlob,
  exportBubbleVisualAsPng,
} from "@/lib/share-bubbles";
import type { RankedBubbleResult } from "@/lib/results";

type ProfileDownloadOptions = {
  contact: BubbleProfileContact;
  rankedBubbles: RankedBubbleResult[];
  exportRef: RefObject<HTMLElement | null>;
  photoUrl?: string | null;
  skipProfileSave?: boolean;
};

export async function saveProfileAndDownloadBubbles({
  contact,
  rankedBubbles,
  exportRef,
  photoUrl = null,
  skipProfileSave = false,
}: ProfileDownloadOptions): Promise<void> {
  if (!skipProfileSave) {
    const payload = buildBubbleProfileRequest(rankedBubbles, contact);
    await saveBubbleProfile(payload);
    saveBubbleProfileToSession(contact);
  }

  const element = exportRef.current;

  if (!element) {
    throw new Error("Kon nie jou Bubble-profiel vind nie.");
  }

  const blob = await exportBubbleVisualAsPng(element, photoUrl);
  downloadBlob(blob, BUBBLE_EXPORT_FILENAME);
}

/** @deprecated Use saveProfileAndDownloadBubbles */
export const saveLeadAndDownloadBubbles = saveProfileAndDownloadBubbles;
