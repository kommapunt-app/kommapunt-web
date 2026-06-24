import { getValueGuideById } from "@/lib/values-guide";
import {
  getValuePosterFullSrc,
  getValuePosterThumbnailSrc,
} from "@/lib/value-poster-images";

export type ValuePosterEntry = {
  id: string;
  name_af: string;
  name_en: string;
  /** Original full-resolution poster for modal and download. */
  full_image_url: string;
  /** Optimized thumbnail for gallery grids. */
  thumbnail_url: string;
};

/**
 * Add a poster: upload `public/value-posters/{id}.png` (full resolution) and
 * optionally `public/value-posters/thumbs/{id}.png` (gallery thumbnail).
 * Append the id here; names are filled from the value guide.
 */
export const VALUE_POSTER_IDS = [
  "aanpasbaarheid",
  "acceptance",
  "accountability",
  "adventure",
  "authenticity",
  "certainty",
  "control",
  "courage",
  "creativity",
  "curiosity",
  "diens",
  "discipline",
  "doelgerigheid",
  "excellence",
  "family",
  "financial-stability",
  "freedom",
  "friendship",
  "gemeenskap",
  "growth",
  "health",
  "honesty",
  "influence",
  "integriteit",
  "justice",
  "leer",
  "love",
  "nederigheid",
  "ontdekking",
  "openheid",
  "prestasie",
  "regverdigheid",
  "religion",
  "reputation",
  "respect",
  "selfbeheersing",
  "stabiliteit",
  "status",
  "teamwork",
  "tradition",
  "trust",
  "verantwoordelikheid",
  "vernuwing",
] as const;

function buildPosterEntry(id: string): ValuePosterEntry {
  const value = getValueGuideById(id);

  if (!value) {
    throw new Error(`Unknown value poster id: ${id}`);
  }

  return {
    id,
    name_af: value.nameAf,
    name_en: value.nameEn,
    full_image_url: getValuePosterFullSrc(id),
    thumbnail_url: getValuePosterThumbnailSrc(id),
  };
}

export const VALUE_POSTERS: ValuePosterEntry[] = VALUE_POSTER_IDS.map(
  buildPosterEntry,
).sort((left, right) =>
  left.name_af.localeCompare(right.name_af, "af", { sensitivity: "base" }),
);

export function hasValuePoster(id: string): boolean {
  return VALUE_POSTER_IDS.includes(id as (typeof VALUE_POSTER_IDS)[number]);
}

export function getValuePosterById(id: string): ValuePosterEntry | null {
  if (!hasValuePoster(id)) {
    return null;
  }

  return VALUE_POSTERS.find((poster) => poster.id === id) ?? null;
}

function normalizeSearchText(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function searchValuePosters(query: string): ValuePosterEntry[] {
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) {
    return VALUE_POSTERS;
  }

  return VALUE_POSTERS.filter((poster) =>
    [poster.id, poster.name_af, poster.name_en].some((field) =>
      normalizeSearchText(field).includes(normalizedQuery),
    ),
  );
}
