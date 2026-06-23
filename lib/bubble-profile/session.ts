import type {
  BubbleProfileContact,
  StoredBubbleProfile,
} from "@/lib/bubble-profile/types";
import { STORAGE_KEY_BUBBLE_PROFILE } from "@/lib/bubble-profile/types";
import {
  isValidAgeGroup,
  isValidProvince,
} from "@/lib/bubble-profile/demographics";
import { isValidEmail } from "@/lib/share-leads";

function parseStoredProfile(raw: string): StoredBubbleProfile | null {
  try {
    const parsed = JSON.parse(raw) as Partial<StoredBubbleProfile>;

    if (
      !parsed.name?.trim() ||
      !parsed.email?.trim() ||
      !parsed.ageGroup ||
      !parsed.province ||
      !isValidEmail(parsed.email) ||
      !isValidAgeGroup(parsed.ageGroup) ||
      !isValidProvince(parsed.province)
    ) {
      return null;
    }

    const profile: StoredBubbleProfile = {
      name: parsed.name.trim(),
      email: parsed.email.trim(),
      ageGroup: parsed.ageGroup,
      province: parsed.province,
    };

    if (typeof parsed.profileId === "string" && parsed.profileId.trim()) {
      profile.profileId = parsed.profileId.trim();
    }

    return profile;
  } catch {
    return null;
  }
}

export function loadBubbleProfileFromSession(): StoredBubbleProfile | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = sessionStorage.getItem(STORAGE_KEY_BUBBLE_PROFILE);

  if (!raw) {
    return null;
  }

  return parseStoredProfile(raw);
}

export function saveBubbleProfileToSession(contact: StoredBubbleProfile) {
  sessionStorage.setItem(STORAGE_KEY_BUBBLE_PROFILE, JSON.stringify(contact));
}

export function clearBubbleProfileSession() {
  sessionStorage.removeItem(STORAGE_KEY_BUBBLE_PROFILE);
}

export function validateBubbleProfileContact(
  contact: Partial<BubbleProfileContact>,
): string | null {
  if (!contact.name?.trim()) {
    return "Naam is verplig.";
  }

  if (!contact.email?.trim()) {
    return "E-pos is verplig.";
  }

  if (!isValidEmail(contact.email)) {
    return "Voer 'n geldige e-posadres in.";
  }

  if (!contact.ageGroup || !isValidAgeGroup(contact.ageGroup)) {
    return "Kies jou ouderdomsgroep.";
  }

  if (!contact.province || !isValidProvince(contact.province)) {
    return "Kies jou provinsie.";
  }

  return null;
}
