import type { AgeGroup } from "@/lib/bubble-profile/demographics";

const MIN_AGE = 13;
const MAX_AGE = 100;

/** Typical demographic centre (~35 years old) for default picker position. */
const DEFAULT_AGE = 35;

export function getMinYearOfBirth(referenceDate = new Date()): number {
  return referenceDate.getFullYear() - MAX_AGE;
}

export function getMaxYearOfBirth(referenceDate = new Date()): number {
  return referenceDate.getFullYear() - MIN_AGE;
}

export function getDefaultYearOfBirth(referenceDate = new Date()): number {
  const year = referenceDate.getFullYear() - DEFAULT_AGE;
  const min = getMinYearOfBirth(referenceDate);
  const max = getMaxYearOfBirth(referenceDate);

  return Math.min(max, Math.max(min, year));
}

export function getYearOfBirthOptions(referenceDate = new Date()): number[] {
  const min = getMinYearOfBirth(referenceDate);
  const max = getMaxYearOfBirth(referenceDate);
  const years: number[] = [];

  for (let year = max; year >= min; year -= 1) {
    years.push(year);
  }

  return years;
}

export function calculateAgeFromYearOfBirth(
  yearOfBirth: number,
  referenceDate = new Date(),
): number | null {
  if (!Number.isInteger(yearOfBirth)) {
    return null;
  }

  const age = referenceDate.getFullYear() - yearOfBirth;

  if (age < MIN_AGE || age > MAX_AGE) {
    return null;
  }

  return age;
}

export function deriveAgeGroupFromAge(age: number): AgeGroup {
  if (age <= 17) {
    return "13-17";
  }

  if (age <= 24) {
    return "18-24";
  }

  if (age <= 34) {
    return "25-34";
  }

  if (age <= 44) {
    return "35-44";
  }

  if (age <= 54) {
    return "45-54";
  }

  if (age <= 64) {
    return "55-64";
  }

  return "65+";
}

export function deriveAgeGroupFromYearOfBirth(
  yearOfBirth: number,
  referenceDate = new Date(),
): AgeGroup | null {
  const age = calculateAgeFromYearOfBirth(yearOfBirth, referenceDate);

  if (age === null) {
    return null;
  }

  return deriveAgeGroupFromAge(age);
}

export function validateYearOfBirth(
  yearOfBirth: number,
  referenceDate = new Date(),
): string | null {
  if (!Number.isInteger(yearOfBirth)) {
    return "Kies 'n geldige geboortajaar.";
  }

  const min = getMinYearOfBirth(referenceDate);
  const max = getMaxYearOfBirth(referenceDate);

  if (yearOfBirth < min || yearOfBirth > max) {
    return "Kies 'n geldige geboortajaar.";
  }

  const age = calculateAgeFromYearOfBirth(yearOfBirth, referenceDate);

  if (age === null || age < MIN_AGE) {
    return "Jy moet minstens 13 jaar oud wees.";
  }

  return null;
}

export function isValidYearOfBirth(
  yearOfBirth: number,
  referenceDate = new Date(),
): boolean {
  return validateYearOfBirth(yearOfBirth, referenceDate) === null;
}

export function parseYearOfBirthInput(value: unknown): number | null {
  if (typeof value === "number" && Number.isInteger(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value.trim());

    if (Number.isInteger(parsed)) {
      return parsed;
    }
  }

  return null;
}
