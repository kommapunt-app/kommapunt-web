import Image from "next/image";
import { BUBBLES_AXIS_QUADRANTS } from "@/lib/bubbles-bib";

const AXIS_ENDPOINTS = {
  ons: {
    src: "/bubbles-bib/ons.png",
    alt: "Ons — Verbinding",
    width: 140,
    height: 180,
  },
  ek: {
    src: "/bubbles-bib/ek.png",
    alt: "Ek — Individu",
    width: 140,
    height: 180,
  },
  stabiliteit: {
    src: "/bubbles-bib/stabiliteit.png",
    alt: "Stabiliteit — Sekuriteit en orde",
    width: 200,
    height: 220,
  },
  verandering: {
    src: "/bubbles-bib/verandering.png",
    alt: "Verandering — Groei en nuwe moontlikhede",
    width: 220,
    height: 220,
  },
} as const;

function AxisEndpointImage({
  src,
  alt,
  width,
  height,
  className = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`h-auto w-auto max-w-full object-contain ${className}`.trim()}
      priority
    />
  );
}

function QuadrantCard({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex min-h-[5.5rem] items-center justify-center rounded-2xl border-4 border-komma-black bg-[#F5F5F0] p-3 text-center shadow-[4px_4px_0_0_#000] sm:min-h-[6.5rem] sm:p-4 ${className}`.trim()}
    >
      <p className="text-sm font-extrabold leading-snug text-komma-black sm:text-base">
        {label}
      </p>
    </div>
  );
}

export function BubblesAxisMap() {
  const quadrantByPosition = Object.fromEntries(
    BUBBLES_AXIS_QUADRANTS.map((quadrant) => [quadrant.position, quadrant]),
  ) as Record<
    (typeof BUBBLES_AXIS_QUADRANTS)[number]["position"],
    (typeof BUBBLES_AXIS_QUADRANTS)[number]
  >;

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-2 flex justify-center sm:mb-4">
        <AxisEndpointImage
          {...AXIS_ENDPOINTS.stabiliteit}
          className="max-h-28 sm:max-h-36"
        />
      </div>

      <div className="grid grid-cols-[minmax(4.5rem,5.5rem)_1fr_minmax(4.5rem,5.5rem)] items-center gap-1 sm:grid-cols-[minmax(6rem,8rem)_1fr_minmax(6rem,8rem)] sm:gap-3">
        <div className="flex justify-center">
          <AxisEndpointImage
            {...AXIS_ENDPOINTS.ons}
            className="max-h-28 sm:max-h-36"
          />
        </div>

        <div className="relative aspect-square min-h-[12rem] sm:min-h-[18rem]">
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-full w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-komma-black"
          />
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-1 w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-komma-black"
          />
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 z-10 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-komma-black bg-komma-pink shadow-[2px_2px_0_0_#000]"
          />

          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-2 p-1 sm:gap-3 sm:p-2">
            <QuadrantCard
              label={quadrantByPosition["top-left"].label}
              className="bg-white"
            />
            <QuadrantCard
              label={quadrantByPosition["top-right"].label}
              className="bg-komma-yellow/70"
            />
            <QuadrantCard
              label={quadrantByPosition["bottom-left"].label}
              className="bg-komma-yellow/70"
            />
            <QuadrantCard
              label={quadrantByPosition["bottom-right"].label}
              className="bg-white"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <AxisEndpointImage
            {...AXIS_ENDPOINTS.ek}
            className="max-h-28 sm:max-h-36"
          />
        </div>
      </div>

      <div className="mt-2 flex justify-center sm:mt-4">
        <AxisEndpointImage
          {...AXIS_ENDPOINTS.verandering}
          className="max-h-28 sm:max-h-36"
        />
      </div>

      <p className="mt-6 text-center text-sm leading-relaxed text-komma-black/75 sm:mt-8 sm:text-base">
        Die kaart help jou sien waar waardes lê: meer Ek of Ons, meer Stabiliteit
        of Verandering.
      </p>
    </div>
  );
}
