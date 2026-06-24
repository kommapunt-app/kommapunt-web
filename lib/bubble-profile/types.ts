import type { AgeGroup, ProvinceOption } from "@/lib/bubble-profile/demographics";

export type RankedValueRecord = {
  id: string;
  rank: number;
  score: number;
  nameAf: string;
  nameEn: string;
  category: string;
};

export type BubbleProfileContact = {
  name: string;
  email: string;
  yearOfBirth: number;
  ageGroup: AgeGroup;
  province: ProvinceOption;
};

export type StoredBubbleProfile = BubbleProfileContact & {
  profileId?: string;
};

export type BubbleProfileRecord = BubbleProfileContact & {
  rankedValues: RankedValueRecord[];
  top5Values: string[];
  top10Values: string[];
  scores: Record<string, number> | null;
};

export type BubbleProfileRequest = {
  name: string;
  email: string;
  yearOfBirth: number;
  ageGroup: AgeGroup;
  province: ProvinceOption;
  rankedValues: RankedValueRecord[];
  top5Values: string[];
  top10Values: string[];
  scores: Record<string, number> | null;
};

/** Wire format for POST /api/bubble-profile */
export type BubbleProfileApiPayload = {
  name: string;
  email: string;
  year_of_birth: number;
  age_group: AgeGroup;
  province: ProvinceOption;
  ranked_values: RankedValueRecord[];
  top_5_values: string[];
  top_10_values: string[];
  scores: Record<string, number> | null;
};

export type BubbleProfileResponse = {
  ok: boolean;
  message: string;
  profileId?: string;
};

export const STORAGE_KEY_BUBBLE_PROFILE = "komma_bubble_profile";
