import { REPORT_BEHAVIOUR_CONTEXTS, getReportPurposeLabel } from "./types";
import type {
  KommaReportContent,
  KommaReportDocument,
  ReportBubbleSnapshot,
  ReportGenerateRequest,
} from "./types";

function formatReportDate(date: Date): string {
  return new Intl.DateTimeFormat("af-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function createPlaceholderContent(
  topFive: ReportBubbleSnapshot[],
): KommaReportContent {
  const valueExplanations = topFive.map((bubble) => ({
    bubbleId: bubble.id,
    nameAf: bubble.nameAf,
    rank: bubble.rank,
    explanationAf: `[Placeholder] Verduideliking vir ${bubble.nameAf} sal hier verskyn wanneer AI-generering aktief is.`,
  }));

  const behaviourInsights = REPORT_BEHAVIOUR_CONTEXTS.map((context) => ({
    context: context.id,
    labelAf: context.labelAf,
    insightAf: `[Placeholder] Reflektiewe insig oor ${context.labelAf.toLowerCase()} sal hier verskyn.`,
  }));

  return {
    hierarchyInterpretationAf:
      "[Placeholder] 'n Warm, reflektiewe interpretasie van jou waarde-hiërargie sal hier verskyn wanneer volledige AI-generering aktief is.",
    valueExplanations,
    behaviourInsights,
    strengthsAf: [
      "[Placeholder] Moontlike sterkpunte uit jou Top 5 sal hier verskyn.",
    ],
    blindSpotsAf: [
      "[Placeholder] Moontlike blinde kolletjies sal hier verskyn.",
    ],
    reflectionQuestionsAf: [
      "Watter van jou Top 5 waardes voel vandag die mees lewendig?",
      "Waar sien jy hierdie waardes in jou daaglikse keuses?",
    ],
  };
}

export function buildReportDocument(
  request: ReportGenerateRequest,
  reportId: string,
  content?: KommaReportContent,
): KommaReportDocument {
  const generatedAt = new Date().toISOString();
  const topFive = request.bubbles.slice(0, 5);

  return {
    reportId,
    generatedAt,
    cover: {
      titleAf: "Komma. Volledige Terugvoer",
      subtitleAf: "Jou Bubble-hiërargie, vertolk",
      userName: request.form.name,
      purposeLabel: getReportPurposeLabel(request.form.purpose),
      dateLabel: formatReportDate(new Date(generatedAt)),
    },
    bubbleImageDataUrl: request.bubbleImageDataUrl ?? null,
    topFive,
    fullHierarchy: request.bubbles.slice(0, 10),
    content: content ?? createPlaceholderContent(topFive),
  };
}

/** Section order for future PDF rendering */
export const REPORT_PDF_SECTIONS = [
  { id: "cover", titleAf: "Voorblad" },
  { id: "profile", titleAf: "Jou Bubble-profiel" },
  { id: "topFive", titleAf: "Top 5 waardes" },
  { id: "hierarchy", titleAf: "Interpretasie van die hiërargie" },
  { id: "values", titleAf: "Individuele waardes" },
  { id: "behaviour", titleAf: "Gedrag in verskillende kontekste" },
  { id: "strengths", titleAf: "Sterkpunte" },
  { id: "blindSpots", titleAf: "Blinde kolletjies" },
  { id: "reflection", titleAf: "Refleksievrae" },
] as const;

export function serializeReportForPdf(document: KommaReportDocument): string {
  const lines: string[] = [
    document.cover.titleAf,
    "",
    `Naam: ${document.cover.userName}`,
    `Datum: ${document.cover.dateLabel}`,
    `Doel: ${document.cover.purposeLabel}`,
    "",
    "— Top 5 —",
    ...document.topFive.map(
      (bubble) => `${bubble.rank}. ${bubble.nameAf} (${bubble.nameEn})`,
    ),
    "",
    "— Hiërargie-interpretasie —",
    document.content.hierarchyInterpretationAf,
    "",
    "— Sterkpunte —",
    ...document.content.strengthsAf.map((item) => `• ${item}`),
    "",
    "— Blinde kolletjies —",
    ...document.content.blindSpotsAf.map((item) => `• ${item}`),
    "",
    "— Refleksievrae —",
    ...document.content.reflectionQuestionsAf.map((item) => `• ${item}`),
  ];

  return lines.join("\n");
}
