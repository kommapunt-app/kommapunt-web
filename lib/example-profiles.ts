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
  /** Landing hero "Jy" slide — grey avatar centre instead of a photo. */
  useCenterAvatar?: boolean;
  /** Zoom centre photo/logo to fill the circle edge-to-edge. */
  centerImageScale?: number;
  /** Vertical nudge for centre photo/logo (negative moves up). */
  centerImageOffsetY?: number;
  /** Solid fill behind transparent centre logos. */
  centerImageBackground?: string;
  /** `cover` crops to fill; `contain` fits logo inside the circle. */
  centerImageFit?: "cover" | "contain";
};

function buildPlaceholderRankedBubbles(
  labels: readonly string[],
): RankedBubbleResult[] {
  return labels.map((nameAf, index) => ({
    id: `hero-placeholder-${index + 1}`,
    rank: index + 1,
    score: labels.length - index,
    bubble: {
      id: `hero-placeholder-${index + 1}`,
      nameAf,
      nameEn: `Your value #${index + 1}`,
      descriptionAf: "Jou eie waarde.",
      category: "ek-identiteit",
    },
  }));
}

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
    centerImageScale: 1.08,
    centerImageOffsetY: -5,
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
    centerImageScale: 1.1,
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
    centerImageBackground: "#FFFFFF",
    centerImageFit: "contain" as const,
    centerImageScale: 0.825,
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
    centerImageScale: 1.26,
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

export const HERO_USER_PROFILE: ExampleProfile = {
  id: "jy",
  name: "Jy",
  photoSrc: "",
  useCenterAvatar: true,
  bubbleNamesAf: [
    "Jou waarde #1",
    "Jou waarde #2",
    "Jou waarde #3",
    "Jou waarde #4",
    "Jou waarde #5",
  ],
  rankedBubbles: buildPlaceholderRankedBubbles([
    "Jou waarde #1",
    "Jou waarde #2",
    "Jou waarde #3",
    "Jou waarde #4",
    "Jou waarde #5",
  ]),
};

/** @deprecated Use HERO_USER_PROFILE */
export const SAMPLE_HERO_PROFILE = HERO_USER_PROFILE;

export const HERO_CAROUSEL_PROFILE_IDS = [
  "jy",
  "julius-malema",
  "rassie-erasmus",
  "steve-jobs",
  "afriforum",
  "elon-musk",
  "mk",
] as const;

export function getHeroCarouselProfiles(): ExampleProfile[] {
  return HERO_CAROUSEL_PROFILE_IDS.map((id) => getExampleProfileById(id)).filter(
    (profile): profile is ExampleProfile => profile !== undefined,
  );
}

export function getExampleProfileById(id: string): ExampleProfile | undefined {
  if (id === HERO_USER_PROFILE.id) {
    return HERO_USER_PROFILE;
  }

  return EXAMPLE_PROFILES.find((profile) => profile.id === id);
}
