import { deriveAgeGroupFromDateOfBirth, isValidDateOfBirth } from "@/lib/bubble-profile/date-of-birth";
import {
  isValidAgeGroup,
  isValidProvince,
} from "@/lib/bubble-profile/demographics";
import type {
  BubbleProfileRequest,
  RankedValueRecord,
} from "@/lib/bubble-profile/types";
import { isValidEmail } from "@/lib/share-leads";

function isValidRankedValues(value: unknown): value is RankedValueRecord[] {
  if (!Array.isArray(value) || value.length === 0) {
    return false;
  }

  return value.every(
    (item) =>
      item &&
      typeof item === "object" &&
      typeof item.id === "string" &&
      typeof item.rank === "number" &&
      typeof item.score === "number" &&
      typeof item.nameAf === "string" &&
      typeof item.nameEn === "string" &&
      typeof item.category === "string",
  );
}

function isValidStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((item) => typeof item === "string" && item.trim().length > 0)
  );
}

function isValidScores(value: unknown): value is Record<string, number> | null {
  if (value === null) {
    return true;
  }

  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  return Object.values(value).every((score) => typeof score === "number");
}

type BubbleProfileBody = Record<string, unknown>;

export function validateBubbleProfileRequest(
  body: unknown,
): BubbleProfileRequest | null {
  if (!body || typeof body !== "object") {
    return null;
  }

  const payload = body as BubbleProfileBody;
  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const dateOfBirthRaw = payload.date_of_birth ?? payload.dateOfBirth;
  const province = payload.province;
  const rankedValues = payload.ranked_values ?? payload.rankedValues;
  const top5Values = payload.top_5_values ?? payload.top5Values;
  const top10Values = payload.top_10_values ?? payload.top10Values;
  const scores = payload.scores ?? null;

  if (
    !name ||
    !email ||
    !isValidEmail(email) ||
    typeof dateOfBirthRaw !== "string" ||
    !isValidDateOfBirth(dateOfBirthRaw) ||
    typeof province !== "string" ||
    !isValidProvince(province) ||
    !isValidRankedValues(rankedValues) ||
    !isValidStringArray(top5Values) ||
    !isValidStringArray(top10Values) ||
    !isValidScores(scores)
  ) {
    return null;
  }

  const dateOfBirth = dateOfBirthRaw.trim();
  const ageGroup = deriveAgeGroupFromDateOfBirth(dateOfBirth);

  if (!ageGroup || !isValidAgeGroup(ageGroup)) {
    return null;
  }

  return {
    name,
    email,
    dateOfBirth,
    ageGroup,
    province,
    rankedValues,
    top5Values,
    top10Values,
    scores,
  };
}
