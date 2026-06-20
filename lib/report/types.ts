import type { RankedBubbleResult } from "@/lib/results";

export const REPORT_PURPOSES = [
  { id: "persoonlik", label: "Persoonlik" },
  { id: "werk", label: "Werk" },
  { id: "leierskap", label: "Leierskap" },
  { id: "verhouding", label: "Verhouding" },
  { id: "span", label: "Span" },
] as const;

export type ReportPurpose = (typeof REPORT_PURPOSES)[number]["id"];

export type ReportRequestForm = {
  name: string;
  email: string;
  age: string;
  purpose: ReportPurpose;
};

export type ReportBubbleSnapshot = {
  rank: number;
  id: string;
  nameAf: string;
  nameEn: string;
  score: number;
  category: string;
};

export type ReportGenerateRequest = {
  form: ReportRequestForm;
  bubbles: ReportBubbleSnapshot[];
  /** Base64 PNG of the user's bubble visual — optional for now */
  bubbleImageDataUrl?: string | null;
};

export type ReportGenerateStatus = "placeholder" | "ready" | "error";

export type ReportGenerateResponse = {
  status: ReportGenerateStatus;
  message: string;
  reportId?: string;
};

export type ReportBehaviourContext =
  | "conflict"
  | "communication"
  | "leadership"
  | "creativity"
  | "decisionMaking"
  | "detailVsBigPicture"
  | "change"
  | "relationships";

export const REPORT_BEHAVIOUR_CONTEXTS: {
  id: ReportBehaviourContext;
  labelAf: string;
}[] = [
  { id: "conflict", labelAf: "Konflik" },
  { id: "communication", labelAf: "Kommunikasie" },
  { id: "leadership", labelAf: "Leierskap" },
  { id: "creativity", labelAf: "Kreatiwiteit" },
  { id: "decisionMaking", labelAf: "Besluitneming" },
  { id: "detailVsBigPicture", labelAf: "Detail vs. groter prentjie" },
  { id: "change", labelAf: "Verandering" },
  { id: "relationships", labelAf: "Verhoudings" },
];

export type ReportValueExplanation = {
  bubbleId: string;
  nameAf: string;
  rank: number;
  explanationAf: string;
};

export type ReportBehaviourInsight = {
  context: ReportBehaviourContext;
  labelAf: string;
  insightAf: string;
};

export type KommaReportContent = {
  hierarchyInterpretationAf: string;
  valueExplanations: ReportValueExplanation[];
  behaviourInsights: ReportBehaviourInsight[];
  strengthsAf: string[];
  blindSpotsAf: string[];
  reflectionQuestionsAf: string[];
};

export type KommaReportDocument = {
  reportId: string;
  generatedAt: string;
  cover: {
    titleAf: string;
    subtitleAf: string;
    userName: string;
    purposeLabel: string;
    dateLabel: string;
  };
  bubbleImageDataUrl?: string | null;
  topFive: ReportBubbleSnapshot[];
  fullHierarchy: ReportBubbleSnapshot[];
  content: KommaReportContent;
};

export function toReportBubbleSnapshots(
  results: RankedBubbleResult[],
): ReportBubbleSnapshot[] {
  return results.map((item) => ({
    rank: item.rank,
    id: item.id,
    nameAf: item.bubble.nameAf,
    nameEn: item.bubble.nameEn,
    score: item.score,
    category: item.bubble.category,
  }));
}

export function getReportPurposeLabel(purpose: ReportPurpose): string {
  return (
    REPORT_PURPOSES.find((option) => option.id === purpose)?.label ?? purpose
  );
}
