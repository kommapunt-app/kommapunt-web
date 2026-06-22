const posterExistenceCache = new Map<string, boolean>();

export function getValuePosterSrc(valueId: string): string {
  return `/value-posters/${valueId}.png`;
}

export function checkValuePosterExists(valueId: string): Promise<boolean> {
  const cached = posterExistenceCache.get(valueId);

  if (cached !== undefined) {
    return Promise.resolve(cached);
  }

  return new Promise((resolve) => {
    const image = new Image();

    image.onload = () => {
      posterExistenceCache.set(valueId, true);
      resolve(true);
    };

    image.onerror = () => {
      posterExistenceCache.set(valueId, false);
      resolve(false);
    };

    image.src = getValuePosterSrc(valueId);
  });
}
