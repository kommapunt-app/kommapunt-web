export type ValueGuideCategoryId =
  | "safety-security"
  | "love-belonging"
  | "esteem"
  | "growth"
  | "self-actualisation";

export type ValueConflict = {
  name: string;
  reason: string;
};

export type ValueGuideEntry = {
  id: string;
  nameAf: string;
  nameEn: string;
  category: ValueGuideCategoryId;
  definitionAf: string;
  significanceAf: string;
  healthyExpressionAf: string;
  overdoneRiskAf: string;
  conflictingValues: ValueConflict[];
  reflectionQuestionAf: string;
};

export type ValueGuideCategory = {
  id: ValueGuideCategoryId;
  labelAf: string;
  labelEn: string;
  summaryAf: string;
  exampleValueIds: string[];
};

export type ValueGuideCategoryFilter = ValueGuideCategoryId | "all";
