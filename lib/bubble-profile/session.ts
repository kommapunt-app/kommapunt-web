import { extractYearFromDateOfBirth } from "@/lib/bubble-profile/date-of-birth";
import {
  deriveAgeGroupFromYearOfBirth,
  getDefaultYearOfBirth,
  validateYearOfBirth,
} from "@/lib/bubble-profile/year-of-birth";
import {
  isValidAgeGroup,
  isValidProvince,
  LEGACY_AGE_GROUP_55_PLUS,
  type StoredAgeGroup,
} from "@/lib/bubble-profile/demographics";
import type {
  BubbleProfileContact,
  StoredBubbleProfile,
} from "@/lib/bubble-profile/types";
import { STORAGE_KEY_BUBBLE_PROFILE } from "@/lib/bubble-profile/types";
import { isValidEmail } from "@/lib/share-leads";

function parseStoredProfile(raw: string): StoredBubbleProfile | null {
  try {
    const parsed = JSON.parse(raw) as Partial<StoredBubbleProfile> & {
      dateOfBirth?: string;
      yearOfBirth?: number;
    };

    if (
      !parsed.name?.trim() ||
      !parsed.email?.trim() ||
      !parsed.province ||
      !isValidEmail(parsed.email) ||
      !isValidProvince(parsed.province)
    ) {
      return null;
    }

    const yearFromField = parsed.yearOfBirth;
    const yearFromLegacyDate = parsed.dateOfBirth?.trim()
      ? extractYearFromDateOfBirth(parsed.dateOfBirth.trim())
      : null;
    const yearOfBirth = yearFromField ?? yearFromLegacyDate;

    if (yearOfBirth !== null && yearOfBirth !== undefined) {
      const yearError = validateYearOfBirth(yearOfBirth);

      if (yearError) {
        return null;
      }

      const ageGroup = deriveAgeGroupFromYearOfBirth(yearOfBirth);

      if (!ageGroup) {
        return null;
      }

      const profile: StoredBubbleProfile = {
        name: parsed.name.trim(),
        email: parsed.email.trim(),
        yearOfBirth,
        ageGroup,
        province: parsed.province,
      };

      if (typeof parsed.profileId === "string" && parsed.profileId.trim()) {
        profile.profileId = parsed.profileId.trim();
      }

      return profile;
    }

    if (!parsed.ageGroup || !isValidAgeGroup(parsed.ageGroup)) {
      return null;
    }

    const legacyAgeGroup = parsed.ageGroup as StoredAgeGroup;

    const legacyProfile: StoredBubbleProfile = {
      name: parsed.name.trim(),
      email: parsed.email.trim(),
      yearOfBirth: getDefaultYearOfBirth(),
      ageGroup:
        legacyAgeGroup === LEGACY_AGE_GROUP_55_PLUS
          ? "65+"
          : (legacyAgeGroup as BubbleProfileContact["ageGroup"]),
      province: parsed.province,
    };

    if (typeof parsed.profileId === "string" && parsed.profileId.trim()) {
      legacyProfile.profileId = parsed.profileId.trim();
    }

    return legacyProfile;
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

export function buildBubbleProfileContact(
  contact: Partial<BubbleProfileContact>,
): { contact: BubbleProfileContact } | { error: string } {
  if (!contact.name?.trim()) {
    return { error: "Naam is verplig." };
  }

  if (!contact.email?.trim()) {
    return { error: "E-pos is verplig." };
  }

  if (!isValidEmail(contact.email)) {
    return { error: "Voer 'n geldige e-posadres in." };
  }

  const yearOfBirth = contact.yearOfBirth;

  if (yearOfBirth === undefined || yearOfBirth === null) {
    return { error: "Kies jou geboortajaar." };
  }

  const yearError = validateYearOfBirth(yearOfBirth);

  if (yearError) {
    return { error: yearError };
  }

  const ageGroup = deriveAgeGroupFromYearOfBirth(yearOfBirth);

  if (!ageGroup) {
    return { error: "Jy moet minstens 13 jaar oud wees." };
  }

  if (!contact.province || !isValidProvince(contact.province)) {
    return { error: "Kies jou provinsie." };
  }

  return {
    contact: {
      name: contact.name.trim(),
      email: contact.email.trim(),
      yearOfBirth,
      ageGroup,
      province: contact.province,
    },
  };
}

export function validateBubbleProfileContact(
  contact: Partial<BubbleProfileContact>,
): string | null {
  const result = buildBubbleProfileContact(contact);

  return "error" in result ? result.error : null;
}
