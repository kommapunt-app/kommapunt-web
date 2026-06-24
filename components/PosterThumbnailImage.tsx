"use client";

import { useEffect, useState } from "react";

interface PosterThumbnailImageProps {
  thumbnailSrc: string;
  fullSrc: string;
  alt: string;
  className?: string;
}

/** Gallery thumbnail — prefers optimized thumb, falls back to full image on error. */
export function PosterThumbnailImage({
  thumbnailSrc,
  fullSrc,
  alt,
  className = "",
}: PosterThumbnailImageProps) {
  const [src, setSrc] = useState(thumbnailSrc);

  useEffect(() => {
    setSrc(thumbnailSrc);
  }, [thumbnailSrc]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => {
        if (src !== fullSrc) {
          setSrc(fullSrc);
        }
      }}
      className={className}
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  );
}
