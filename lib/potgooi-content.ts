export type PotgooiSymbolBlock =
  | { type: "text"; text: string }
  | { type: "lines"; lines: readonly string[] };

export const POTGOOI_SYMBOLS = [
  {
    id: "i" as const,
    title: "Wie is jy?",
    blocks: [
      { type: "text", text: "Elke gesprek begin by die mens." },
      {
        type: "lines",
        lines: [
          "Wie is jy?",
          "Wat het jou gevorm?",
          "Wat is vir jou belangrik?",
        ],
      },
      {
        type: "text",
        text: "Voordat ons oor standpunte praat, wil ons verstaan wie die persoon agter die standpunt is.",
      },
    ],
  },
  {
    id: "dash" as const,
    title: "Wat maak dit moeilik om te gesels?",
    blocks: [
      {
        type: "text",
        text: "Ons praat dikwels moeilik oor dit wat vir ons die belangrikste is.",
      },
      {
        type: "lines",
        lines: [
          "Emosies.",
          "Geloof.",
          "Politiek.",
          "Identiteit.",
          "Geskiedenis.",
        ],
      },
      { type: "text", text: "Wat maak hierdie gesprek moeilik?" },
    ],
  },
  {
    id: "punt" as const,
    title: "Wat is jou punt?",
    blocks: [
      { type: "text", text: "'n Punt is iets wat jy sê, glo of doen." },
      { type: "text", text: "Dit is die standpunt wat jy inneem." },
      {
        type: "text",
        text: "Jou punt word gevorm deur jou waardes, ervarings en prioriteite.",
      },
    ],
  },
  {
    id: "vraagteken" as const,
    title: "Hoekom sê jy dit?",
    blocks: [
      {
        type: "text",
        text: "Ons wil verstaan hoe jy by jou punt uitgekom het.",
      },
      {
        type: "lines",
        lines: [
          "Watter ervarings,",
          "waardes,",
          "stories",
          "en oortuigings het jou gevorm?",
        ],
      },
      {
        type: "text",
        text: "Ons begin met nuuskierigheid voordat ons oordeel.",
      },
    ],
  },
] as const;

export const POTGOOI_KOMMAPUNT = {
  paragraphs: [
    "KommaPunt gaan nie net oor wat mense glo nie. Dit gaan oor waarom hulle dit glo.",
    "Ons gebruik waardes, stories en gesprekke om beter te verstaan hoe mense by hulle standpunte uitkom.",
  ],
  taglineEn: "When values collide, conversations begin.",
} as const;
