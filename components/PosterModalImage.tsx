interface PosterModalImageProps {
  src: string;
  alt: string;
  className?: string;
}

/** Full-resolution poster for modal viewing — never upscales beyond natural size. */
export function PosterModalImage({
  src,
  alt,
  className = "",
}: PosterModalImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={`mx-auto block h-auto w-auto max-w-full object-contain [image-rendering:auto] ${className}`.trim()}
      decoding="async"
      draggable={false}
    />
  );
}
