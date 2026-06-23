import { buildBubbleProfileRequest } from "@/lib/bubble-profile/build-payload";
import { saveBubbleProfile } from "@/lib/bubble-profile/api";
import {
  loadBubbleProfileFromSession,
  saveBubbleProfileToSession,
} from "@/lib/bubble-profile/session";
import type {
  BubbleProfileContact,
  StoredBubbleProfile,
} from "@/lib/bubble-profile/types";
import type { RankedBubbleResult } from "@/lib/results";

export type PersistBubbleProfileResult = {
  contact: BubbleProfileContact;
  profileId?: string;
  serverSynced: boolean;
  serverMessage?: string;
};

export async function persistBubbleProfile(
  rankedBubbles: RankedBubbleResult[],
  contact: BubbleProfileContact,
): Promise<PersistBubbleProfileResult> {
  const existingProfile = loadBubbleProfileFromSession();
  const storedContact: StoredBubbleProfile = {
    ...contact,
    profileId: existingProfile?.profileId,
  };

  if (existingProfile?.profileId) {
    saveBubbleProfileToSession(storedContact);
    console.log("[bubble-profile] reused existing profileId", {
      profileId: existingProfile.profileId,
    });
    return {
      contact,
      profileId: existingProfile.profileId,
      serverSynced: true,
    };
  }

  try {
    const payload = buildBubbleProfileRequest(rankedBubbles, contact);
    const response = await saveBubbleProfile(payload);
    const profileId = response.profileId?.trim();

    if (profileId) {
      saveBubbleProfileToSession({ ...contact, profileId });
    } else {
      saveBubbleProfileToSession(contact);
    }

    return {
      contact,
      profileId,
      serverSynced: true,
    };
  } catch (error) {
    console.error("[bubble-profile] failed", error);
    saveBubbleProfileToSession(contact);

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
