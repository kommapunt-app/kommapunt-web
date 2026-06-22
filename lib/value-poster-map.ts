export const VALUE_POSTERS = {
  curiosity: "/value-posters/nuuskierigheid.png",
  religion: "/value-posters/geloof.png",
  freedom: "/value-posters/vryheid.png",
} as const;

export type ValuePosterId = keyof typeof VALUE_POSTERS;

export function hasValuePoster(valueId: string): valueId is ValuePosterId {
  return valueId in VALUE_POSTERS;
}

export function getValuePosterSrc(valueId: string): string | null {
  if (!hasValuePoster(valueId)) {
    return null;
  }

  return VALUE_POSTERS[valueId];
}
