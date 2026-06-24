import { toPng } from "html-to-image";
import { PROFILE_CARD_CENTER_LOGO_SRC } from "@/lib/profile-card";

import { PROFILE_CARD_INTRO_TEXT, PROFILE_SHARE_TAGLINE } from "@/lib/profile-card";

export const KOMMA_SHARE_CAPTION = `${PROFILE_CARD_INTRO_TEXT}

${PROFILE_SHARE_TAGLINE}`;

export const SHARE_UNSUPPORTED_MESSAGE =
  "Direkte deel werk nie op hierdie browser nie. Laai eerder die prent af en deel dit op WhatsApp.";

export const BUBBLE_EXPORT_FILENAME = "komma-my-bubbles.png";

export const KOMMAPUNT_PROFILE_FILENAME = "kommapunt-profiel.png";

export const IPHONE_PHOTOS_FALLBACK_HELPER =
  "Op iPhone: Maak Downloads oop, kies die beeld en tik Save Image om dit na Fotos te stoor.";

export function createProfileImageFile(blob: Blob): File {
  return new File([blob], KOMMAPUNT_PROFILE_FILENAME, { type: "image/png" });
}

export function canShareProfileImageFile(blob: Blob): boolean {
  if (!canUseNativeShare()) {
    return false;
  }

  const file = createProfileImageFile(blob);

  return navigator.canShare?.({ files: [file] }) ?? false;
}

export async function saveProfileImageToPhotos(
  blob: Blob,
): Promise<"shared" | "downloaded"> {
  const file = createProfileImageFile(blob);

  if (canShareProfileImageFile(blob)) {
    try {
      await navigator.share({
        files: [file],
        title: "KommaPunt Profiel",
      });
      return "shared";
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return "shared";
      }

      throw error;
    }
  }

  downloadBlob(blob, KOMMAPUNT_PROFILE_FILENAME);
  return "downloaded";
}

async function blobUrlToDataUrl(blobUrl: string): Promise<string> {
  const response = await fetch(blobUrl);
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

async function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

async function prepareSvgImagesForExport(
  element: HTMLElement,
  photoUrl: string | null | undefined,
): Promise<() => void> {
  const svgImages = element.querySelectorAll("image");
  const restores: Array<() => void> = [];

  if (!photoUrl) {
    return () => {};
  }

  let dataUrl: string | null = null;

  if (photoUrl.startsWith("data:image/")) {
    dataUrl = photoUrl;
  } else if (photoUrl.startsWith("blob:")) {
    try {
      dataUrl = await blobUrlToDataUrl(photoUrl);
    } catch {
      return () => {};
    }
  } else if (
    photoUrl.startsWith("http://") ||
    photoUrl.startsWith("https://")
  ) {
    try {
      const response = await fetch(photoUrl);
      if (!response.ok) {
        return () => {};
      }

      dataUrl = await blobToDataUrl(await response.blob());
    } catch {
      return () => {};
    }
  }

  if (!dataUrl) {
    return () => {};
  }

  svgImages.forEach((image) => {
    const svgImage = image as SVGImageElement;
    const originalHref =
      svgImage.getAttribute("href") ?? svgImage.getAttribute("xlink:href");

    if (!originalHref || originalHref === PROFILE_CARD_CENTER_LOGO_SRC) {
      return;
    }

    svgImage.setAttribute("href", dataUrl!);
    svgImage.setAttributeNS("http://www.w3.org/1999/xlink", "href", dataUrl!);

    restores.push(() => {
      if (originalHref) {
        svgImage.setAttribute("href", originalHref);
        svgImage.setAttributeNS("http://www.w3.org/1999/xlink", "href", originalHref);
      } else {
        svgImage.removeAttribute("href");
        svgImage.removeAttributeNS("http://www.w3.org/1999/xlink", "href");
      }
    });
  });

  return () => {
    restores.forEach((restore) => restore());
  };
}

function dataUrlToBlob(dataUrl: string): Blob {
  const [header, base64] = dataUrl.split(",");
  const mimeMatch = header?.match(/:(.*?);/);
  const mime = mimeMatch?.[1] ?? "image/png";
  const binary = atob(base64 ?? "");
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return new Blob([bytes], { type: mime });
}

async function prepareHtmlImagesForExport(
  element: HTMLElement,
): Promise<() => void> {
  const images = element.querySelectorAll("img");
  const restores: Array<() => void> = [];

  await Promise.all(
    Array.from(images).map(async (image) => {
      const img = image as HTMLImageElement;
      const originalSrc = img.getAttribute("src");

      if (!originalSrc || originalSrc.startsWith("data:")) {
        return;
      }

      try {
        const absoluteSrc = originalSrc.startsWith("/")
          ? `${window.location.origin}${originalSrc}`
          : originalSrc;
        const response = await fetch(absoluteSrc);
        const blob = await response.blob();
        const dataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(blob);
        });

        img.setAttribute("src", dataUrl);
        restores.push(() => {
          if (originalSrc) {
            img.setAttribute("src", originalSrc);
          }
        });
      } catch {
        // Keep original src if inlining fails.
      }
    }),
  );

  return () => {
    restores.forEach((restore) => restore());
  };
}

export async function exportBubbleVisualAsPng(
  element: HTMLElement,
  photoUrl?: string | null,
): Promise<Blob> {
  const restoreSvgImages = await prepareSvgImagesForExport(element, photoUrl);
  const restoreHtmlImages = await prepareHtmlImagesForExport(element);

  try {
    await document.fonts.ready;

    const dataUrl = await toPng(element, {
      pixelRatio: 2,
      cacheBust: true,
      skipFonts: false,
      backgroundColor: "#F5DD00",
      filter: (node) => {
        if (node instanceof Element && node.classList.contains("export-exclude")) {
          return false;
        }

        return true;
      },
    });

    return dataUrlToBlob(dataUrl);
  } finally {
    restoreHtmlImages();
    restoreSvgImages();
  }
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}


export function canUseNativeShare(): boolean {
  return typeof navigator !== "undefined" && typeof navigator.share === "function";
}

export async function shareBubbleVisual(
  blob: Blob,
): Promise<"shared" | "unsupported"> {
  if (!canUseNativeShare()) {
    return "unsupported";
  }

  const file = createProfileImageFile(blob);
  const shareData: ShareData = {
    title: "KommaPunt Profiel",
    text: KOMMA_SHARE_CAPTION,
  };

  try {
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ ...shareData, files: [file] });
      return "shared";
    }

    await navigator.share(shareData);
    return "shared";
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return "shared";
    }

    throw error;
  }
}
