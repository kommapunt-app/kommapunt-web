import { toPng } from "html-to-image";

export const KOMMA_SHARE_CAPTION = `My Komma. Bubbles wys wat vir my gewig dra.

Komma. 'n Gesprek oor standpunte en hoe ons daar beland.`;

export const SHARE_UNSUPPORTED_MESSAGE =
  "Direkte deel werk nie op hierdie browser nie. Laai eerder die prent af en deel dit op WhatsApp.";

export const BUBBLE_EXPORT_FILENAME = "komma-my-bubbles.png";

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

async function prepareSvgImagesForExport(
  element: HTMLElement,
  photoUrl: string | null | undefined,
): Promise<() => void> {
  const svgImages = element.querySelectorAll("image");
  const restores: Array<() => void> = [];

  if (!photoUrl || !photoUrl.startsWith("blob:")) {
    return () => {};
  }

  let dataUrl: string;

  try {
    dataUrl = await blobUrlToDataUrl(photoUrl);
  } catch {
    return () => {};
  }

  svgImages.forEach((image) => {
    const svgImage = image as SVGImageElement;
    const originalHref =
      svgImage.getAttribute("href") ?? svgImage.getAttribute("xlink:href");

    svgImage.setAttribute("href", dataUrl);
    svgImage.setAttributeNS("http://www.w3.org/1999/xlink", "href", dataUrl);

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

  const file = new File([blob], BUBBLE_EXPORT_FILENAME, { type: "image/png" });
  const shareData: ShareData = {
    title: "My Komma. Bubbles",
    text: KOMMA_SHARE_CAPTION,
  };

  if (navigator.canShare?.({ files: [file] })) {
    await navigator.share({ ...shareData, files: [file] });
    return "shared";
  }

  await navigator.share(shareData);
  return "shared";
}
