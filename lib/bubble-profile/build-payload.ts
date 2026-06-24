import { STORAGE_KEY_BUBBLE_SCORES } from "@/lib/constants";
import { parseStoredJson, type BubbleScores } from "@/lib/compare";
import type {
  BubbleProfileApiPayload,
  BubbleProfileRequest,
  RankedValueRecord,
} from "@/lib/bubble-profile/types";
import type { RankedBubbleResult } from "@/lib/results";

export function toRankedValueRecords(
  results: RankedBubbleResult[],
): RankedValueRecord[] {
  return results.map((item) => ({
    id: item.id,
    rank: item.rank,
    score: item.score,
    nameAf: item.bubble.nameAf,
    nameEn: item.bubble.nameEn,
    category: item.bubble.category,
  }));
}

export function loadScoresFromStorage(): Record<string, number> | null {
  if (typeof window === "undefined") {
    return null;
  }

  const scores = parseStoredJson<BubbleScores>(
    localStorage.getItem(STORAGE_KEY_BUBBLE_SCORES),
  );

  return scores ?? null;
}

export function buildBubbleProfileRequest(
  results: RankedBubbleResult[],
  contact: Pick<
    BubbleProfileRequest,
    "name" | "email" | "yearOfBirth" | "ageGroup" | "province"
  >,
): BubbleProfileRequest {
  const rankedValues = toRankedValueRecords(results);

  return {
    name: contact.name.trim(),
    email: contact.email.trim(),
    yearOfBirth: contact.yearOfBirth,
    ageGroup: contact.ageGroup,
    province: contact.province,
    rankedValues,
    top5Values: rankedValues.slice(0, 5).map((item) => item.nameAf),
    top10Values: rankedValues.slice(0, 10).map((item) => item.nameAf),
    scores: loadScoresFromStorage(),
  };
}

export function toBubbleProfileApiPayload(
  request: BubbleProfileRequest,
): BubbleProfileApiPayload {
  return {
    name: request.name,
    email: request.email,
    year_of_birth: request.yearOfBirth,
    age_group: request.ageGroup,
    province: request.province,
    ranked_values: request.rankedValues,
    top_5_values: request.top5Values,
    top_10_values: request.top10Values,
    scores: request.scores,
  };
}
