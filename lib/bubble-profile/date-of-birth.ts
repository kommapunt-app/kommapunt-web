import type { AgeGroup } from "@/lib/bubble-profile/demographics";

const ISO_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

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

export function formatDateForInput(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getMaxDateOfBirthInput(referenceDate = new Date()): string {
  const today = new Date(referenceDate);
  today.setHours(0, 0, 0, 0);

  const maxBirthDate = new Date(today);
  maxBirthDate.setFullYear(maxBirthDate.getFullYear() - 13);

  return formatDateForInput(maxBirthDate);
}

export function getMinDateOfBirthInput(referenceDate = new Date()): string {
  const minBirthDate = new Date(referenceDate);
  minBirthDate.setHours(0, 0, 0, 0);
  minBirthDate.setFullYear(minBirthDate.getFullYear() - 120);

  return formatDateForInput(minBirthDate);
}

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

export function deriveAgeGroupFromDateOfBirth(
  dateOfBirth: string,
  referenceDate = new Date(),
): AgeGroup | null {
  const age = calculateAgeFromDateOfBirth(dateOfBirth, referenceDate);

  if (age === null || age < 13) {
    return null;
  }

  return deriveAgeGroupFromAge(age);
}

export function validateDateOfBirth(
  dateOfBirth: string,
  referenceDate = new Date(),
): string | null {
  const birthDate = parseIsoDate(dateOfBirth);

  if (!birthDate) {
    return "Kies 'n geldige geboortedatum.";
  }

  const today = new Date(referenceDate);
  today.setHours(0, 0, 0, 0);
  birthDate.setHours(0, 0, 0, 0);

  if (birthDate > today) {
    return "Geboortedatum kan nie in die toekoms wees nie.";
  }

  const age = calculateAgeFromDateOfBirth(dateOfBirth, referenceDate);

  if (age === null || age < 13) {
    return "Jy moet minstens 13 jaar oud wees.";
  }

  return null;
}

export function isValidDateOfBirth(
  dateOfBirth: string,
  referenceDate = new Date(),
): boolean {
  return validateDateOfBirth(dateOfBirth, referenceDate) === null;
}
