import type { RefObject } from "react";
import {
  BUBBLE_EXPORT_FILENAME,
  downloadBlob,
  exportBubbleVisualAsPng,
} from "@/lib/share-bubbles";
import {
  saveShareContactToSession,
  saveShareLead,
  toShareLeadBubbleResults,
} from "@/lib/share-contact-session";
import type { ShareContact } from "@/lib/share-leads";
import type { RankedBubbleResult } from "@/lib/results";

type ShareDownloadOptions = {
  contact: ShareContact;
  rankedBubbles: RankedBubbleResult[];
  exportRef: RefObject<HTMLElement | null>;
  photoUrl?: string | null;
  skipLeadSave?: boolean;
};

export async function saveLeadAndDownloadBubbles({
  contact,
  rankedBubbles,
  exportRef,
  photoUrl = null,
  skipLeadSave = false,
}: ShareDownloadOptions): Promise<void> {
  if (!skipLeadSave) {
    await saveShareLead({
      name: contact.name,
      email: contact.email,
      bubbleResults: toShareLeadBubbleResults(rankedBubbles),
    });
    saveShareContactToSession(contact);
  }

  const element = exportRef.current;

  if (!element) {
    throw new Error("Kon nie jou Bubble-profiel vind nie.");
  }

  const blob = await exportBubbleVisualAsPng(element, photoUrl);
  downloadBlob(blob, BUBBLE_EXPORT_FILENAME);
}
