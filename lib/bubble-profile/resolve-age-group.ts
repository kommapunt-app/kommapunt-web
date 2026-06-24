import {
  calculateAgeFromDateOfBirth,
  deriveAgeGroupFromDateOfBirth,
} from "@/lib/bubble-profile/date-of-birth";
import { isValidAgeGroup } from "@/lib/bubble-profile/demographics";
import {
  calculateAgeFromYearOfBirth,
  deriveAgeGroupFromAge,
  parseYearOfBirthInput,
} from "@/lib/bubble-profile/year-of-birth";

type ProfileAgeSource = {
  year_of_birth?: number | null;
  yearOfBirth?: number | null;
  date_of_birth?: string | null;
  dateOfBirth?: string | null;
  age_group?: string | null;
  ageGroup?: string | null;
};

/**
 * Prefer year_of_birth, then legacy date_of_birth, then stored age_group.
 */
export function resolveProfileAgeGroup(profile: ProfileAgeSource): string | null {
  const yearOfBirth = parseYearOfBirthInput(
    profile.year_of_birth ?? profile.yearOfBirth,
  );

  if (yearOfBirth !== null) {
    const age = calculateAgeFromYearOfBirth(yearOfBirth);

    if (age !== null && age >= 13) {
      return deriveAgeGroupFromAge(age);
    }
  }

  const dateOfBirth = profile.date_of_birth ?? profile.dateOfBirth ?? null;

  if (dateOfBirth?.trim()) {
    const derived = deriveAgeGroupFromDateOfBirth(dateOfBirth.trim());

    if (derived) {
      return derived;
    }

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
