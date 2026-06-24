const POSTER_DIR = "/value-posters";
const POSTER_THUMB_DIR = "/value-posters/thumbs";

export function getValuePosterFullSrc(valueId: string): string {
  return `${POSTER_DIR}/${valueId}.png`;
}

export function getValuePosterThumbnailSrc(valueId: string): string {
  return `${POSTER_THUMB_DIR}/${valueId}.png`;
}

export async function downloadValuePoster(
  fullSrc: string,
  filename: string,
): Promise<void> {
  const response = await fetch(fullSrc, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Kon nie die Bubbleblad aflaai nie.");
  }

  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(objectUrl);
}
