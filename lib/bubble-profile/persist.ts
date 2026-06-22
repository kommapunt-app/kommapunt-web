import { buildBubbleProfileRequest } from "@/lib/bubble-profile/build-payload";
import { saveBubbleProfile } from "@/lib/bubble-profile/api";
import { saveBubbleProfileToSession } from "@/lib/bubble-profile/session";
import type { BubbleProfileContact } from "@/lib/bubble-profile/types";
import type { RankedBubbleResult } from "@/lib/results";

export type PersistBubbleProfileResult = {
  contact: BubbleProfileContact;
  serverSynced: boolean;
  serverMessage?: string;
};

export async function persistBubbleProfile(
  rankedBubbles: RankedBubbleResult[],
  contact: BubbleProfileContact,
): Promise<PersistBubbleProfileResult> {
  saveBubbleProfileToSession(contact);

  try {
    const payload = buildBubbleProfileRequest(rankedBubbles, contact);
    await saveBubbleProfile(payload);
    return { contact, serverSynced: true };
  } catch (error) {
    console.error("[persistBubbleProfile] server sync failed", error);

    return {
      contact,
      serverSynced: false,
      serverMessage:
        error instanceof Error
          ? error.message
          : "Kon nie jou profiel na die bediener stoor nie.",
    };
  }
}
