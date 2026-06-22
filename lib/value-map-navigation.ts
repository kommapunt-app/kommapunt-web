export function getValueMapUrl(valueId: string): string {
  return `/waardes?value=${encodeURIComponent(valueId)}#die-bubbles`;
}
