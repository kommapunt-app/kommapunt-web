export const DIE_BUBBLES_PATH = "/waardes/die-bubbles";

/** Duration for map focus pulse + placement label after deep-linking to a value. */
export const VALUE_MAP_FOCUS_DURATION_MS = 3000;

export function getValueMapUrl(valueId: string): string {
  return `${DIE_BUBBLES_PATH}?value=${encodeURIComponent(valueId)}`;
}
