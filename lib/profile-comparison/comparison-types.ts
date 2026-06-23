import type { ComparisonType } from "@/lib/profile-comparison/types";

export type ComparisonTypeDefinition = {
  id: ComparisonType;
  label: string;
  description: string;
  leftLabel: string;
  rightLabel: string;
  available: boolean;
};

export const COMPARISON_TYPE_DEFINITIONS: ComparisonTypeDefinition[] = [
  {
    id: "person_vs_person",
    label: "Persoon vs Persoon",
    description: "Vergelyk twee individuele Bubbles-profiele.",
    leftLabel: "Persoon A",
    rightLabel: "Persoon B",
    available: true,
  },
  {
    id: "person_vs_partner",
    label: "Persoon vs Partner",
    description: "Sien hoe jou waardes langs dié van jou partner val.",
    leftLabel: "Ek",
    rightLabel: "Partner",
    available: false,
  },
  {
    id: "parent_vs_child",
    label: "Ouer vs Kind",
    description: "Verstaan generasie-verskille in prioriteite.",
    leftLabel: "Ouer",
    rightLabel: "Kind",
    available: false,
  },
  {
    id: "team_vs_team",
    label: "Span vs Span",
    description: "Vergelyk aggregate waardes tussen twee spanne.",
    leftLabel: "Span A",
    rightLabel: "Span B",
    available: false,
  },
  {
    id: "organisation_vs_person",
    label: "Organisasie vs Persoon",
    description: "Sien hoe persoonlike waardes by 'n organisasie pas.",
    leftLabel: "Organisasie",
    rightLabel: "Persoon",
    available: false,
  },
];

export function getComparisonTypeDefinition(
  comparisonType: ComparisonType,
): ComparisonTypeDefinition | undefined {
  return COMPARISON_TYPE_DEFINITIONS.find((entry) => entry.id === comparisonType);
}

export function isComparisonTypeAvailable(comparisonType: ComparisonType): boolean {
  return getComparisonTypeDefinition(comparisonType)?.available ?? false;
}
