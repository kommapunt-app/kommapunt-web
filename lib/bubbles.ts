export type BubbleCategoryId =
  | "ek-identiteit"
  | "mense-verhoudings"
  | "waarheid-beginsels"
  | "prestasie-groei"
  | "orde-stabiliteit"
  | "bydrae-verandering";

export type BubbleValue = {
  id: string;
  nameAf: string;
  nameEn: string;
  descriptionAf: string;
  category: BubbleCategoryId;
};

export type BubbleCategory = {
  id: BubbleCategoryId;
  label: string;
};

export const BUBBLE_CATEGORIES: BubbleCategory[] = [
  { id: "ek-identiteit", label: "Ek & identiteit" },
  { id: "mense-verhoudings", label: "Mense & verhoudings" },
  { id: "waarheid-beginsels", label: "Waarheid & beginsels" },
  { id: "prestasie-groei", label: "Prestasie & groei" },
  { id: "orde-stabiliteit", label: "Orde & stabiliteit" },
  { id: "bydrae-verandering", label: "Bydrae & verandering" },
];

export const BUBBLE_LIBRARY: BubbleValue[] = [
  {
    id: "egtheid",
    nameAf: "Egtheid",
    nameEn: "Authenticity",
    descriptionAf: "Om trou te bly aan wie jy werklik is, ook onder druk.",
    category: "ek-identiteit",
  },
  {
    id: "selfuitdrukking",
    nameAf: "Selfuitdrukking",
    nameEn: "Self-Expression",
    descriptionAf:
      "Dit is belangrik om te wees wie jy is en te sê wat jy dink.",
    category: "ek-identiteit",
  },
  {
    id: "onafhanklikheid",
    nameAf: "Onafhanklikheid",
    nameEn: "Independence",
    descriptionAf: "Om op jouself te kan staatmaak en jou eie pad te kies.",
    category: "ek-identiteit",
  },
  {
    id: "vryheid",
    nameAf: "Vryheid",
    nameEn: "Freedom",
    descriptionAf: "Die ruimte om jou eie keuses te maak en jou pad te loop.",
    category: "ek-identiteit",
  },
  {
    id: "kreatiwiteit",
    nameAf: "Kreatiwiteit",
    nameEn: "Creativity",
    descriptionAf: "Nuwe idees, kuns en maniere om probleme op te los.",
    category: "ek-identiteit",
  },
  {
    id: "nuuskierigheid",
    nameAf: "Nuuskierigheid",
    nameEn: "Curiosity",
    descriptionAf: "Die drang om te leer, te verken en te verstaan.",
    category: "ek-identiteit",
  },
  {
    id: "openheid",
    nameAf: "Wees oopkop",
    nameEn: "Openness",
    descriptionAf:
      "Die bereidheid om nuwe idees, perspektiewe en ervarings te oorweeg sonder om te vinnig te oordeel.",
    category: "ek-identiteit",
  },
  {
    id: "familie",
    nameAf: "Familie",
    nameEn: "Family",
    descriptionAf:
      "Die mense wat vir jou die naaste staan en wie jy wil beskerm.",
    category: "mense-verhoudings",
  },
  {
    id: "gemeenskap",
    nameAf: "Gemeenskap",
    nameEn: "Community",
    descriptionAf: "Saamhorigheid en die gevoel dat jy ergens behoort.",
    category: "mense-verhoudings",
  },
  {
    id: "respek",
    nameAf: "Respek",
    nameEn: "Respect",
    descriptionAf: "Om ander se waardigheid en menings te erken.",
    category: "mense-verhoudings",
  },
  {
    id: "deernis",
    nameAf: "Deernis",
    nameEn: "Compassion",
    descriptionAf: "Om mee te voel met ander en hul lyding te betrag.",
    category: "mense-verhoudings",
  },
  {
    id: "vriendelikheid",
    nameAf: "Vriendelikheid",
    nameEn: "Friendliness",
    descriptionAf: "Warmte, vriendelikheid en opregte omgee vir ander.",
    category: "mense-verhoudings",
  },
  {
    id: "lojaliteit",
    nameAf: "Lojaliteit",
    nameEn: "Loyalty",
    descriptionAf: "Trou en verbondenheid teenoor mense of oortuigings.",
    category: "mense-verhoudings",
  },
  {
    id: "behoortheid",
    nameAf: "Om te behoort",
    nameEn: "Belonging",
    descriptionAf:
      "Die behoefte om deel van 'n groep, familie, gemeenskap of verhouding te voel waar jy aanvaar en gewaardeer word.",
    category: "mense-verhoudings",
  },
  {
    id: "waarheid",
    nameAf: "Waarheid",
    nameEn: "Truth",
    descriptionAf: "Eerlikheid en feite, selfs wanneer dit ongemaklik is.",
    category: "waarheid-beginsels",
  },
  {
    id: "integriteit",
    nameAf: "Integriteit",
    nameEn: "Integrity",
    descriptionAf:
      "Om te leef volgens jou waardes, ook wanneer niemand kyk nie.",
    category: "waarheid-beginsels",
  },
  {
    id: "geloof",
    nameAf: "Geloof",
    nameEn: "Faith",
    descriptionAf:
      "Vertroue in iets groter as jouself of diep persoonlike oortuigings.",
    category: "waarheid-beginsels",
  },
  {
    id: "wysheid",
    nameAf: "Wysheid",
    nameEn: "Wisdom",
    descriptionAf: "Insig wat kom uit ervaring en diep nadenke.",
    category: "waarheid-beginsels",
  },
  {
    id: "geregtigheid",
    nameAf: "Geregtigheid",
    nameEn: "Justice",
    descriptionAf: "Dat wat reg is geld, veral vir die kwesbaardes.",
    category: "waarheid-beginsels",
  },
  {
    id: "billikheid",
    nameAf: "Billikheid",
    nameEn: "Fairness",
    descriptionAf: "Dat reëls eweredig en sonder vooroordeel toegepas word.",
    category: "waarheid-beginsels",
  },
  {
    id: "verantwoordelikheid",
    nameAf: "Verantwoordelikheid",
    nameEn: "Responsibility",
    descriptionAf: "Om vir jou keuses en die gevolge daarvan te staan.",
    category: "waarheid-beginsels",
  },
  {
    id: "prestasie",
    nameAf: "Prestasie",
    nameEn: "Achievement",
    descriptionAf: "Om doelwitte te bereik en jou beste te lewer.",
    category: "prestasie-groei",
  },
  {
    id: "uitnemendheid",
    nameAf: "Uitnemendheid",
    nameEn: "Excellence",
    descriptionAf: "Om die hoogste standaard na te streef in wat jy doen.",
    category: "prestasie-groei",
  },
  {
    id: "meriete",
    nameAf: "Meriete",
    nameEn: "Merit",
    descriptionAf: "Dat moeite en vermoë erken en beloon word.",
    category: "prestasie-groei",
  },
  {
    id: "groei",
    nameAf: "Groei",
    nameEn: "Growth",
    descriptionAf: "Persoonlike ontwikkeling en die strewe om beter te word.",
    category: "prestasie-groei",
  },
  {
    id: "leer",
    nameAf: "Leer",
    nameEn: "Learning",
    descriptionAf:
      "Om nuwe kennis en vaardighede deur jou lewe aan te leer.",
    category: "prestasie-groei",
  },
  {
    id: "dissipline",
    nameAf: "Dissipline",
    nameEn: "Discipline",
    descriptionAf: "Volhardendheid, selfbeheer en die wil om aan te hou.",
    category: "prestasie-groei",
  },
  {
    id: "leierskap",
    nameAf: "Leierskap",
    nameEn: "Leadership",
    descriptionAf:
      "Om rigting te gee en ander te inspireer om saam te beweeg.",
    category: "prestasie-groei",
  },
  {
    id: "sekuriteit",
    nameAf: "Sekuriteit",
    nameEn: "Security",
    descriptionAf:
      "Die gevoel dat jy, jou mense en jou toekoms veilig is.",
    category: "orde-stabiliteit",
  },
  {
    id: "stabiliteit",
    nameAf: "Stabiliteit",
    nameEn: "Stability",
    descriptionAf: "Voorspelbaarheid en 'n vaste fondament in jou lewe.",
    category: "orde-stabiliteit",
  },
  {
    id: "orde",
    nameAf: "Orde",
    nameEn: "Order",
    descriptionAf: "Struktuur en reëls wat dinge voorspelbaar en stabiel hou.",
    category: "orde-stabiliteit",
  },
  {
    id: "tradisie",
    nameAf: "Tradisie",
    nameEn: "Tradition",
    descriptionAf:
      "Wyshede en gebruike wat van geslag tot geslag oorgedra word.",
    category: "orde-stabiliteit",
  },
  {
    id: "harmonie",
    nameAf: "Harmonie",
    nameEn: "Harmony",
    descriptionAf: "Vrede, balans en goeie verhoudings tussen mense.",
    category: "orde-stabiliteit",
  },
  {
    id: "bydrae",
    nameAf: "Bydrae",
    nameEn: "Contribution",
    descriptionAf: "Om iets betekenisvol tot die gemeenskap by te dra.",
    category: "bydrae-verandering",
  },
  {
    id: "diens",
    nameAf: "Diens",
    nameEn: "Service",
    descriptionAf: "Om ander te help en iets groters as jyself te dien.",
    category: "bydrae-verandering",
  },
  {
    id: "moed",
    nameAf: "Moed",
    nameEn: "Courage",
    descriptionAf:
      "Die bereidheid om op te tree ten spyte van vrees, onsekerheid of risiko.",
    category: "bydrae-verandering",
  },
  {
    id: "vernuwing",
    nameAf: "Vernuwing",
    nameEn: "Innovation",
    descriptionAf: "Om nuwe maniere te vind om ou probleme op te los.",
    category: "bydrae-verandering",
  },
  {
    id: "volhoubaarheid",
    nameAf: "Volhoubaarheid",
    nameEn: "Sustainability",
    descriptionAf:
      "Om keuses te maak wat die toekoms — en die planeet — beskerm.",
    category: "bydrae-verandering",
  },
  {
    id: "inklusiwiteit",
    nameAf: "Inklusiwiteit",
    nameEn: "Inclusivity",
    descriptionAf: "Dat almal welkom is en 'n plek het.",
    category: "bydrae-verandering",
  },
  {
    id: "gelykheid",
    nameAf: "Gelykheid",
    nameEn: "Equality",
    descriptionAf: "Dat elke mens dieselfde waardigheid en regte verdien.",
    category: "bydrae-verandering",
  },
];

const bubbleById = new Map(BUBBLE_LIBRARY.map((bubble) => [bubble.id, bubble]));

export function getBubbleById(id: string): BubbleValue | undefined {
  return bubbleById.get(id);
}

export function getBubblesByIds(ids: string[]): BubbleValue[] {
  return ids
    .map((id) => bubbleById.get(id))
    .filter((bubble): bubble is BubbleValue => bubble !== undefined);
}

export function getBubbleFontSize(name: string): string {
  if (name.length > 14) {
    return "text-[10px] leading-[1.15] sm:text-xs";
  }

  if (name.length > 10) {
    return "text-xs leading-tight sm:text-sm";
  }

  return "text-xs leading-tight sm:text-sm";
}

export function groupBubblesByCategory(
  bubbles: BubbleValue[],
): { category: BubbleCategory; bubbles: BubbleValue[] }[] {
  return BUBBLE_CATEGORIES.map((category) => ({
    category,
    bubbles: bubbles.filter((bubble) => bubble.category === category.id),
  })).filter((group) => group.bubbles.length > 0);
}
