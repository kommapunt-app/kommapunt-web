type PotgooiArtworkIconProps = {
  src: string;
  className?: string;
};

/** Renders an extracted Potgooi artwork PNG at native proportions — no cropping. */
export function PotgooiArtworkIcon({ src, className = "" }: PotgooiArtworkIconProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      aria-hidden
      width={138}
      height={138}
      className={`block size-full max-w-none object-contain object-center ${className}`.trim()}
    />
  );
}
