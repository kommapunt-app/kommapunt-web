import {
  BUBBLE_CATEGORIES,
  BUBBLE_LIBRARY,
  type BubbleCategory,
  type BubbleCategoryId,
} from "@/lib/bubbles";
import type { ValueGuideCategoryId, ValueGuideEntry } from "./types";
import { VALUE_GUIDE } from "./values";

function normalizeKey(value: string): string {
  return value.trim().toLowerCase();
}

const bubbleCategoryByBubbleId = new Map(
  BUBBLE_LIBRARY.map((bubble) => [bubble.id, bubble.category]),
);

const bubbleCategoryByNameEn = new Map(
  BUBBLE_LIBRARY.map((bubble) => [normalizeKey(bubble.nameEn), bubble.category]),
);

/** Maps value-guide English names to bubble-library English names. */
const GUIDE_NAME_EN_ALIASES: Record<string, string> = {
  certainty: "stability",
  control: "order",
  friendship: "friendliness",
  honesty: "truth",
  religion: "faith",
  accountability: "responsibility",
  adventure: "innovation",
  appreciation: "respect",
  competence: "achievement",
  determination: "discipline",
  discovery: "learning",
  ethics: "integrity",
  excitement: "creativity",
  fame: "achievement",
  forgiveness: "compassion",
  health: "independence",
  helpfulness: "service",
  influence: "leadership",
  "inner harmony": "harmony",
  intelligence: "learning",
  love: "belonging",
  "meaningful work": "contribution",
  passion: "self-expression",
  peace: "harmony",
  pleasure: "freedom",
  popularity: "achievement",
  reputation: "achievement",
  spirituality: "faith",
  success: "achievement",
  teamwork: "community",
  tolerance: "inclusivity",
  trust: "belonging",
  uniqueness: "self-expression",
  variety: "curiosity",
  wealth: "merit",
};

const GUIDE_CATEGORY_FALLBACK: Record<ValueGuideCategoryId, BubbleCategoryId> = {
  "safety-security": "orde-stabiliteit",
  "love-belonging": "mense-verhoudings",
  esteem: "prestasie-groei",
  growth: "prestasie-groei",
  "self-actualisation": "bydrae-verandering",
};

const GUIDE_ID_OVERRIDES: Record<string, BubbleCategoryId> = {
  acceptance: "mense-verhoudings",
  aanpasbaarheid: "ek-identiteit",
  authority: "waarheid-beginsels",
  beauty: "ek-identiteit",
  commitment: "mense-verhoudings",
  diens: "bydrae-verandering",
  doelgerigheid: "bydrae-verandering",
  gemeenskap: "mense-verhoudings",
  integriteit: "mense-verhoudings",
  leer: "prestasie-groei",
  nederigheid: "waarheid-beginsels",
  ontdekking: "prestasie-groei",
  prestasie: "prestasie-groei",
  privacy: "ek-identiteit",
  verantwoordelikheid: "mense-verhoudings",
  regverdigheid: "orde-stabiliteit",
  selfbeheersing: "prestasie-groei",
  stabiliteit: "orde-stabiliteit",
  status: "prestasie-groei",
};

export function getValueGuideBubbleCategory(
  value: ValueGuideEntry,
): BubbleCategoryId {
  const override = GUIDE_ID_OVERRIDES[value.id];
  if (override) {
    return override;
  }

  const byBubbleId = bubbleCategoryByBubbleId.get(value.id);
  if (byBubbleId) {
    return byBubbleId;
  }

  const aliasTarget = GUIDE_NAME_EN_ALIASES[normalizeKey(value.nameEn)];
  if (aliasTarget) {
    const byAlias = bubbleCategoryByNameEn.get(normalizeKey(aliasTarget));
    if (byAlias) {
      return byAlias;
    }
  }

  const byNameEn = bubbleCategoryByNameEn.get(normalizeKey(value.nameEn));
  if (byNameEn) {
    return byNameEn;
  }

  return GUIDE_CATEGORY_FALLBACK[value.category];
}

export function groupValuesGuideByBubbleCategory(values: ValueGuideEntry[]) {
  return BUBBLE_CATEGORIES.map((category) => ({
    category,
    values: values.filter(
      (value) => getValueGuideBubbleCategory(value) === category.id,
    ),
  })).filter((group) => group.values.length > 0);
}

export function getBubbleCategoryById(
  id: BubbleCategoryId,
): BubbleCategory | undefined {
  return BUBBLE_CATEGORIES.find((category) => category.id === id);
}

export const VALUE_GUIDE_BY_BUBBLE_CATEGORY = BUBBLE_CATEGORIES.map(
  (category) => ({
    category,
    values: VALUE_GUIDE.filter(
      (value) => getValueGuideBubbleCategory(value) === category.id,
    ),
  }),
);
