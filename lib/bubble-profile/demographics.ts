export const AGE_GROUP_OPTIONS = [
  { value: "13-17", label: "13–17" },
  { value: "18-24", label: "18–24" },
  { value: "25-34", label: "25–34" },
  { value: "35-44", label: "35–44" },
  { value: "45-54", label: "45–54" },
  { value: "55-64", label: "55–64" },
  { value: "65+", label: "65+" },
] as const;

/** @deprecated Legacy stored value — still accepted when reading old profiles */
export const LEGACY_AGE_GROUP_55_PLUS = "55+" as const;

export const RACE_OPTIONS = [
  { value: "black", label: "Swart" },
  { value: "coloured", label: "Kleurling" },
  { value: "indian", label: "Indiër / Asiaties" },
  { value: "white", label: "Wit" },
  { value: "other", label: "Ander" },
  { value: "prefer-not-to-say", label: "Sê liewer nie" },
] as const;

export const PROVINCE_OPTIONS = [
  { value: "eastern-cape", label: "Oos-Kaap" },
  { value: "free-state", label: "Vrystaat" },
  { value: "gauteng", label: "Gauteng" },
  { value: "kwazulu-natal", label: "KwaZulu-Natal" },
  { value: "limpopo", label: "Limpopo" },
  { value: "mpumalanga", label: "Mpumalanga" },
  { value: "north-west", label: "Noordwes" },
  { value: "northern-cape", label: "Noord-Kaap" },
  { value: "western-cape", label: "Wes-Kaap" },
] as const;

export type AgeGroup = (typeof AGE_GROUP_OPTIONS)[number]["value"];
export type StoredAgeGroup = AgeGroup | typeof LEGACY_AGE_GROUP_55_PLUS;
export type RaceOption = (typeof RACE_OPTIONS)[number]["value"];
export type ProvinceOption = (typeof PROVINCE_OPTIONS)[number]["value"];

const AGE_GROUP_VALUES = new Set<string>([
  ...AGE_GROUP_OPTIONS.map((o) => o.value),
  LEGACY_AGE_GROUP_55_PLUS,
]);
const RACE_VALUES = new Set<string>(RACE_OPTIONS.map((o) => o.value));
const PROVINCE_VALUES = new Set<string>(PROVINCE_OPTIONS.map((o) => o.value));

export function isValidAgeGroup(value: string): value is StoredAgeGroup {
  return AGE_GROUP_VALUES.has(value);
}

export function isCurrentAgeGroup(value: string): value is AgeGroup {
  return AGE_GROUP_OPTIONS.some((option) => option.value === value);
}

export function isValidRace(value: string): value is RaceOption {
  return RACE_VALUES.has(value);
}

export function isValidProvince(value: string): value is ProvinceOption {
  return PROVINCE_VALUES.has(value);
}
