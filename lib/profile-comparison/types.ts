import type { RankedValueRecord } from "@/lib/bubble-profile/types";

export type ComparisonEntityType = "profile" | "team" | "organisation";

export type ComparisonType =
  | "person_vs_person"
  | "person_vs_partner"
  | "parent_vs_child"
  | "team_vs_team"
  | "organisation_vs_person";

export type ComparisonSide = {
  entityType: ComparisonEntityType;
  entityIds: string[];
  label: string;
};

export type ComparisonProfileSummary = {
  id: string;
  name: string;
  top5Values: string[];
  top10Values: string[];
  rankedValues: RankedValueRecord[];
};

export type SharedTopValue = {
  id: string;
  nameAf: string;
  nameEn: string;
  leftRank: number;
  rightRank: number;
};

export type ValueDifference = {
  id: string;
  nameAf: string;
  nameEn: string;
  side: "left" | "right";
  rank: number;
  otherRank: number | null;
};

export type ValueMapOverlayPoint = {
  id: string;
  nameAf: string;
  category: string;
  axisX: number;
  axisY: number;
  presence: "shared" | "left_only" | "right_only";
  leftRank?: number;
  rightRank?: number;
};

export type ComparisonResult = {
  similarityScore: number;
  sharedTopValues: SharedTopValue[];
  biggestDifferences: ValueDifference[];
  valueMapOverlay: ValueMapOverlayPoint[];
  aiInsights: null;
};

export type ProfileComparisonRecord = {
  id: string;
  comparisonType: ComparisonType;
  status: "draft" | "completed" | "archived";
  initiatorProfileId: string | null;
  leftSide: ComparisonSide;
  rightSide: ComparisonSide;
  similarityScore: number | null;
  result: ComparisonResult;
  metadata: Record<string, unknown>;
  createdAt: string;
};

export type CreateProfileComparisonRequest = {
  comparisonType: ComparisonType;
  initiatorProfileId: string;
  leftProfileId: string;
  rightProfileId: string;
};

export type ProfileComparisonResponse = {
  ok: boolean;
  message: string;
  comparisonId?: string;
  comparison?: ProfileComparisonRecord;
};
