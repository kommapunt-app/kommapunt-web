export function getValueMapUrl(valueId: string): string {
  return `/waardes/die-bubbles?value=${encodeURIComponent(valueId)}`;
}

export const DIE_BUBBLES_PATH = "/waardes/die-bubbles";
