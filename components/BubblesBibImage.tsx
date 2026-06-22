"use client";

import { useState, type ReactNode } from "react";

export interface BubblesBibImageSource {
  src: string;
  src2x?: string;
  width: number;
  height: number;
}

interface BubblesBibImageProps {
  image: BubblesBibImageSource;
  alt: string;
  fallback?: ReactNode;
  priority?: boolean;
}

export function BubblesBibImage({
  image,
  alt,
  fallback = null,
  priority = false,
}: BubblesBibImageProps) {
  const [hasError, setHasError] = useState(false);
  const { src, src2x, width, height } = image;
  const maxWidth = src2x ? width : Math.round(width / 2);

  if (hasError) {
    return fallback ? <>{fallback}</> : null;
  }

  const srcSet = src2x ? `${src} ${width}w, ${src2x} ${width * 2}w` : `${src} ${width}w`;

  return (
    <div className="mx-auto w-full" style={{ maxWidth }}>
      {/* Native img — sharpest for text-heavy infographics; srcSet for Retina */}
      <img
        src={src}
        srcSet={srcSet}
        sizes={`(min-width: ${maxWidth}px) ${maxWidth}px, 100vw`}
        alt={alt}
        width={width}
        height={height}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        onError={() => setHasError(true)}
        className="bib-infographic h-auto w-full rounded-[2rem] border-4 border-komma-black object-contain shadow-[6px_6px_0_0_#000]"
      />
    </div>
  );
}
