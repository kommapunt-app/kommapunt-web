import { deriveAgeGroupFromAge } from "@/lib/bubble-profile/year-of-birth";

const ISO_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

/** Legacy analytics helper — reads stored full birth dates from older profiles. */
export function parseIsoDate(isoDate: string): Date | null {
  const match = isoDate.trim().match(ISO_DATE_PATTERN);

  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

/** Legacy analytics helper — derives age from stored date_of_birth values. */
export function calculateAgeFromDateOfBirth(
  dateOfBirth: string,
  referenceDate = new Date(),
): number | null {
  const birthDate = parseIsoDate(dateOfBirth);

  if (!birthDate) {
    return null;
  }

  const today = new Date(referenceDate);
  today.setHours(0, 0, 0, 0);
  birthDate.setHours(0, 0, 0, 0);

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age -= 1;
  }

  return age;
}

/** Legacy analytics helper — derives age group from stored date_of_birth values. */
export function deriveAgeGroupFromDateOfBirth(
  dateOfBirth: string,
  referenceDate = new Date(),
): ReturnType<typeof deriveAgeGroupFromAge> | null {
  const age = calculateAgeFromDateOfBirth(dateOfBirth, referenceDate);

  if (age === null || age < 13) {
    return null;
  }

  return deriveAgeGroupFromAge(age);
}

/** Extract birth year from a legacy ISO date string. */
export function extractYearFromDateOfBirth(dateOfBirth: string): number | null {
  const birthDate = parseIsoDate(dateOfBirth);

  return birthDate?.getFullYear() ?? null;
}
