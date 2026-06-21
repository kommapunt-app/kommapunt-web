import type { BubbleProfileContact } from "@/lib/bubble-profile/types";
import { STORAGE_KEY_BUBBLE_PROFILE } from "@/lib/bubble-profile/types";
import {
  isValidAgeGroup,
  isValidProvince,
  isValidRace,
} from "@/lib/bubble-profile/demographics";
import { isValidEmail } from "@/lib/share-leads";

export function loadBubbleProfileFromSession(): BubbleProfileContact | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY_BUBBLE_PROFILE);

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as Partial<BubbleProfileContact>;

    if (
      !parsed.name?.trim() ||
      !parsed.email?.trim() ||
      !parsed.ageGroup ||
      !parsed.race ||
      !parsed.province ||
      !isValidEmail(parsed.email) ||
      !isValidAgeGroup(parsed.ageGroup) ||
      !isValidRace(parsed.race) ||
      !isValidProvince(parsed.province)
    ) {
      return null;
    }

    return {
      name: parsed.name.trim(),
      email: parsed.email.trim(),
      ageGroup: parsed.ageGroup,
      race: parsed.race,
      province: parsed.province,
    };
  } catch {
    return null;
  }
}

export function saveBubbleProfileToSession(contact: BubbleProfileContact) {
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

  if (!contact.race || !isValidRace(contact.race)) {
    return "Kies jou bevolkingsgroep.";
  }

  if (!contact.province || !isValidProvince(contact.province)) {
    return "Kies jou provinsie.";
  }

  return null;
}
