import { BUBBLE_LIBRARY, type BubbleValue } from "@/lib/bubbles";
import type { RankedBubbleResult } from "@/lib/results";

export const EXAMPLE_PROFILE_DISCLAIMER =
  "* Voorbeeld gebaseer op openbare persepsie. Nie die persoon of organisasie se werklike Komma.-profiel nie.";

export const HERO_EXAMPLES_DISCLAIMER =
  "* Voorbeelde gebaseer op openbare persepsie.\nNie die persone of organisasies se werklike Komma.-profiele nie.";

const DEMO_ONLY_BUBBLES: Record<string, BubbleValue> = {
  "mag-invloed": {
    id: "mag-invloed",
    nameAf: "Mag / Invloed",
    nameEn: "Power / Influence",
    descriptionAf: "Om invloed uit te oefen en rigting te gee.",
    category: "prestasie-groei",
  },
  "kultuur-identiteit": {
    id: "kultuur-identiteit",
    nameAf: "Kultuur & identiteit",
    nameEn: "Culture & Identity",
    descriptionAf: "Om kultuur en identiteit te koester en te bewaar.",
    category: "ek-identiteit",
  },
};

export type ExampleProfile = {
  id: string;
  name: string;
  photoSrc: string;
  bubbleNamesAf: string[];
  rankedBubbles: RankedBubbleResult[];
};

function resolveBubble(nameAf: string): BubbleValue {
  const fromLibrary = BUBBLE_LIBRARY.find((bubble) => bubble.nameAf === nameAf);

  if (fromLibrary) {
    return fromLibrary;
  }

  const demoBubble = Object.values(DEMO_ONLY_BUBBLES).find(
    (bubble) => bubble.nameAf === nameAf,
  );

  if (demoBubble) {
    return demoBubble;
  }

  throw new Error(`Unknown example bubble: ${nameAf}`);
}

function buildRankedBubbles(bubbleNamesAf: string[]): RankedBubbleResult[] {
  return bubbleNamesAf.map((nameAf, index) => {
    const bubble = resolveBubble(nameAf);

    return {
      id: bubble.id,
      rank: index + 1,
      score: bubbleNamesAf.length - index,
      bubble,
    };
  });
}

export const EXAMPLE_PROFILES: ExampleProfile[] = [
  {
    id: "julius-malema",
    name: "Julius Malema*",
    photoSrc: "/example-profiles/julius-malema.png",
    bubbleNamesAf: [
      "Geregtigheid",
      "Mag / Invloed",
      "Vernuwing",
      "Moed",
      "Gemeenskap",
    ],
    rankedBubbles: [],
  },
  {
    id: "rassie-erasmus",
    name: "Rassie Erasmus*",
    photoSrc: "/example-profiles/rassie-erasmus.png",
    bubbleNamesAf: [
      "Prestasie",
      "Dissipline",
      "Uitnemendheid",
      "Groei",
      "Gemeenskap",
    ],
    rankedBubbles: [],
  },
  {
    id: "steve-jobs",
    name: "Steve Jobs*",
    photoSrc: "/example-profiles/steve-jobs.png",
    bubbleNamesAf: [
      "Vernuwing",
      "Kreatiwiteit",
      "Uitnemendheid",
      "Onafhanklikheid",
      "Groei",
    ],
    rankedBubbles: [],
  },
  {
    id: "afriforum",
    name: "AfriForum*",
    photoSrc: "/example-profiles/afriforum.png",
    bubbleNamesAf: [
      "Kultuur & identiteit",
      "Vryheid",
      "Gemeenskap",
      "Tradisie",
      "Sekuriteit",
    ],
    rankedBubbles: [],
  },
  {
    id: "elon-musk",
    name: "Elon Musk*",
    photoSrc: "/example-profiles/elon-musk.png",
    bubbleNamesAf: [
      "Vernuwing",
      "Onafhanklikheid",
      "Prestasie",
      "Nuuskierigheid",
      "Moed",
    ],
    rankedBubbles: [],
  },
  {
    id: "mk",
    name: "MK (uMkhonto we Sizwe)*",
    photoSrc: "/example-profiles/mk.png",
    bubbleNamesAf: [
      "Geregtigheid",
      "Gemeenskap",
      "Mag / Invloed",
      "Gelykheid",
      "Vernuwing",
    ],
    rankedBubbles: [],
  },
].map((profile) => ({
  ...profile,
  rankedBubbles: buildRankedBubbles(profile.bubbleNamesAf),
}));

export const SAMPLE_HERO_PROFILE: ExampleProfile = {
  id: "sample-user",
  name: "Jy",
  photoSrc: "",
  bubbleNamesAf: ["Familie", "Vryheid", "Prestasie", "Waarheid", "Geloof"],
  rankedBubbles: buildRankedBubbles([
    "Familie",
    "Vryheid",
    "Prestasie",
    "Waarheid",
    "Geloof",
  ]),
};

export const HERO_CAROUSEL_PROFILE_IDS = [
  "julius-malema",
  "rassie-erasmus",
  "steve-jobs",
  "afriforum",
  "elon-musk",
  "mk",
] as const;

export function getExampleProfileById(id: string): ExampleProfile | undefined {
  if (id === SAMPLE_HERO_PROFILE.id) {
    return SAMPLE_HERO_PROFILE;
  }

  return EXAMPLE_PROFILES.find((profile) => profile.id === id);
}
