import { calculateAgeFromDateOfBirth, deriveAgeGroupFromAge } from "@/lib/bubble-profile/date-of-birth";
import { isValidAgeGroup } from "@/lib/bubble-profile/demographics";

type ProfileAgeSource = {
  date_of_birth?: string | null;
  dateOfBirth?: string | null;
  age_group?: string | null;
  ageGroup?: string | null;
};

/**
 * Prefer date_of_birth for analytics; fall back to stored age_group for legacy profiles.
 */
export function resolveProfileAgeGroup(profile: ProfileAgeSource): string | null {
  const dateOfBirth = profile.date_of_birth ?? profile.dateOfBirth ?? null;

  if (dateOfBirth?.trim()) {
    const age = calculateAgeFromDateOfBirth(dateOfBirth.trim());

    if (age !== null && age >= 13) {
      return deriveAgeGroupFromAge(age);
    }
  }

  const storedAgeGroup = profile.age_group ?? profile.ageGroup ?? null;

  if (storedAgeGroup && isValidAgeGroup(storedAgeGroup)) {
    return storedAgeGroup;
  }

  return storedAgeGroup?.trim() || null;
}
