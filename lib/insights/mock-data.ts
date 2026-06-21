export type ValueCount = {
  nameAf: string;
  count: number;
  share: number;
};

export type AgeGroupValueSlice = {
  ageGroup: string;
  label: string;
  topValues: ValueCount[];
};

export type ProvinceValueSlice = {
  province: string;
  label: string;
  topValues: ValueCount[];
};

export type ValuePairPop = {
  values: [string, string];
  popScore: number;
};

export type InsightsAggregateSnapshot = {
  topFiveValues: ValueCount[];
  poppingPairs: ValuePairPop[];
  ageGroups: AgeGroupValueSlice[];
  provinces: ProvinceValueSlice[];
};

export const MOCK_INSIGHTS_SNAPSHOT: InsightsAggregateSnapshot = {
  topFiveValues: [
    { nameAf: "Geregtigheid", count: 142, share: 0.31 },
    { nameAf: "Familie", count: 118, share: 0.26 },
    { nameAf: "Vryheid", count: 96, share: 0.21 },
    { nameAf: "Respek", count: 74, share: 0.16 },
    { nameAf: "Eerlikheid", count: 68, share: 0.15 },
  ],
  poppingPairs: [
    { values: ["Geregtigheid", "Vryheid"], popScore: 0.82 },
    { values: ["Familie", "Avontuur"], popScore: 0.71 },
    { values: ["Respek", "Outonomie"], popScore: 0.66 },
    { values: ["Eerlikheid", "Mededinging"], popScore: 0.58 },
  ],
  ageGroups: [
    {
      ageGroup: "18-24",
      label: "18–24",
      topValues: [
        { nameAf: "Vryheid", count: 41, share: 0.34 },
        { nameAf: "Geregtigheid", count: 36, share: 0.3 },
        { nameAf: "Avontuur", count: 28, share: 0.23 },
      ],
    },
    {
      ageGroup: "25-34",
      label: "25–34",
      topValues: [
        { nameAf: "Familie", count: 52, share: 0.36 },
        { nameAf: "Geregtigheid", count: 44, share: 0.31 },
        { nameAf: "Respek", count: 31, share: 0.22 },
      ],
    },
    {
      ageGroup: "35-44",
      label: "35–44",
      topValues: [
        { nameAf: "Familie", count: 38, share: 0.33 },
        { nameAf: "Eerlikheid", count: 34, share: 0.29 },
        { nameAf: "Stabiliteit", count: 27, share: 0.23 },
      ],
    },
  ],
  provinces: [
    {
      province: "gauteng",
      label: "Gauteng",
      topValues: [
        { nameAf: "Geregtigheid", count: 58, share: 0.32 },
        { nameAf: "Ambisie", count: 47, share: 0.26 },
        { nameAf: "Vryheid", count: 39, share: 0.21 },
      ],
    },
    {
      province: "western-cape",
      label: "Wes-Kaap",
      topValues: [
        { nameAf: "Familie", count: 44, share: 0.3 },
        { nameAf: "Respek", count: 36, share: 0.25 },
        { nameAf: "Geregtigheid", count: 33, share: 0.22 },
      ],
    },
    {
      province: "kwazulu-natal",
      label: "KwaZulu-Natal",
      topValues: [
        { nameAf: "Gemeenskap", count: 41, share: 0.31 },
        { nameAf: "Tradisie", count: 35, share: 0.26 },
        { nameAf: "Familie", count: 29, share: 0.22 },
      ],
    },
  ],
};
