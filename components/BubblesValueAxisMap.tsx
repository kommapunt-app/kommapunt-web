"use client";

import { useMemo } from "react";
import Image from "next/image";
import { BubbleCategoryIcon } from "@/components/BubbleCategoryIcon";
import { ExplorerBubble } from "@/components/ExplorerBubble";
import {
  AXIS_ICON_PATHS,
  BUBBLES_AXIS_QUADRANTS,
} from "@/lib/bubbles-bib";
import { layoutAxisBubbles } from "@/lib/axis-bubble-layout";
import { formatBubbleLabel } from "@/lib/bubble-label";
import {
  BUBBLE_CATEGORIES,
  type BubbleCategoryId,
} from "@/lib/bubbles";
import type { ValueGuideEntry } from "@/lib/values-guide";

const AXIS_ENDPOINTS = {
  stabiliteit: {
    src: AXIS_ICON_PATHS.stabiliteit,
    alt: "Stabiliteit",
    width: 140,
    height: 160,
  },
  verandering: {
    src: AXIS_ICON_PATHS.verandering,
    alt: "Verandering",
    width: 150,
    height: 150,
  },
  ons: {
    src: AXIS_ICON_PATHS.ons,
    alt: "Ons",
    width: 100,
    height: 130,
  },
  ek: {
    src: AXIS_ICON_PATHS.ek,
    alt: "Ek",
    width: 100,
    height: 130,
  },
} as const;

/** Fixed 2×3 mobile layout — row order matches map quadrants. */
const MOBILE_GROUP_GRID_ORDER: BubbleCategoryId[] = [
  "mense-verhoudings",
  "ek-identiteit",
  "waarheid-beginsels",
  "orde-stabiliteit",
  "bydrae-verandering",
  "prestasie-groei",
];

const MOBILE_AXIS_SIDE_CLASS = "h-[5rem] w-[4.75rem] object-contain";
const MOBILE_AXIS_VERTICAL_CLASS = "h-[5rem] w-[7.25rem] object-contain";
const DESKTOP_AXIS_ICON_CLASS = "max-h-16 lg:max-h-24";

function AxisIcon({
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
      className={`shrink-0 object-contain ${className}`.trim()}
    />
  );
}

function MobileAxisIcon({
  endpoint,
  placement,
}: {
  endpoint: (typeof AXIS_ENDPOINTS)[keyof typeof AXIS_ENDPOINTS];
  placement: "top" | "bottom" | "left" | "right";
}) {
  const sizeClass =
    placement === "left" || placement === "right"
      ? MOBILE_AXIS_SIDE_CLASS
      : MOBILE_AXIS_VERTICAL_CLASS;

  const placementClass =
    placement === "left"
      ? "justify-end pr-0.5"
      : placement === "right"
        ? "justify-start pl-0.5"
        : "justify-center";

  return (
    <div className={`flex w-full ${placementClass}`}>
      <AxisIcon {...endpoint} className={sizeClass} />
    </div>
  );
}

function QuadrantLabel({
  title,
  label,
  className = "",
}: {
  title: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute z-10 max-w-[38%] rounded-lg border-2 border-komma-black bg-white/95 px-2 py-1.5 text-center shadow-[2px_2px_0_0_#000] sm:max-w-[34%] sm:rounded-xl sm:border-4 sm:p-2.5 ${className}`.trim()}
    >
      <p className="text-[9px] font-extrabold uppercase tracking-wide text-komma-pink sm:text-[10px]">
        {title}
      </p>
      <p className="mt-0.5 text-[10px] font-extrabold leading-snug text-komma-black sm:text-xs">
        {label}
      </p>
    </div>
  );
}

function formatGroupLabelLines(label: string): string[] {
  if (label.includes(" & ")) {
    const [head, tail] = label.split(" & ");
    return [`${head} &`, tail];
  }

  return formatBubbleLabel(label).slice(0, 2);
}

function MobileMapGroupButton({
  categoryId,
  label,
  valueCount,
  isActive,
  onSelect,
}: {
  categoryId: BubbleCategoryId;
  label: string;
  valueCount: number;
  isActive: boolean;
  onSelect: (categoryId: BubbleCategoryId) => void;
}) {
  const labelLines = formatGroupLabelLines(label);

  return (
    <button
      type="button"
      onClick={() => onSelect(categoryId)}
      aria-pressed={isActive}
      aria-label={`${label}, ${valueCount} waardes`}
      className={[
        "mx-auto flex h-[4.5rem] w-full max-w-[8.5rem] flex-col items-center justify-center gap-0.5 overflow-hidden rounded-xl border-4 px-2 py-1.5 text-center transition-shadow",
        isActive
          ? "border-komma-pink bg-komma-yellow shadow-[4px_4px_0_0_#FF1493]"
          : "border-komma-black bg-white shadow-[4px_4px_0_0_#000]",
      ].join(" ")}
    >
      <BubbleCategoryIcon categoryId={categoryId} className="!h-5 !w-5 shrink-0" />
      <span className="flex w-full flex-col items-center justify-center leading-[1.1]">
        {labelLines.map((line) => (
          <span
            key={line}
            className="block w-full text-center text-[14px] font-extrabold text-komma-black"
          >
            {line}
          </span>
        ))}
      </span>
      <span className="text-[11px] font-bold leading-none text-komma-black/50">
        {valueCount} waardes
      </span>
    </button>
  );
}

interface ValueMapCanvasProps {
  values: ValueGuideEntry[];
  highlightedIds?: Set<string>;
  onValueSelect: (valueId: string) => void;
  emptyMessage: string;
  positionById: Map<string, { left: number; top: number }>;
  quadrantByPosition: Record<
    (typeof BUBBLES_AXIS_QUADRANTS)[number]["position"],
    (typeof BUBBLES_AXIS_QUADRANTS)[number]
  >;
  selectedCategoryId: BubbleCategoryId | null;
  onCategorySelect?: (categoryId: BubbleCategoryId) => void;
  categoryValueCounts: Partial<Record<BubbleCategoryId, number>>;
}

function ValueMapCanvas({
  values,
  highlightedIds,
  onValueSelect,
  emptyMessage,
  positionById,
  quadrantByPosition,
  selectedCategoryId,
  onCategorySelect,
  categoryValueCounts,
}: ValueMapCanvasProps) {
  const categoryById = useMemo(
    () => new Map(BUBBLE_CATEGORIES.map((category) => [category.id, category])),
    [],
  );

  return (
    <div className="relative aspect-[4/5] min-h-[19rem] w-full md:min-h-[34rem] lg:min-h-[40rem] xl:min-h-[44rem]">
      <div className="absolute inset-[6%] rounded-[1.5rem] border-4 border-komma-black bg-[#F5F5F0] shadow-[inset_0_0_0_4px_#F5DD00] sm:rounded-[1.75rem]" />

      <div
        aria-hidden
        className="absolute left-1/2 top-[6%] h-[88%] w-1.5 -translate-x-1/2 rounded-full bg-komma-black"
      />
      <div
        aria-hidden
        className="absolute left-[6%] top-1/2 h-1.5 w-[88%] -translate-y-1/2 rounded-full bg-komma-black"
      />

      <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <div className="flex h-11 w-11 flex-col items-center justify-center rounded-full border-4 border-komma-black bg-komma-yellow px-1 text-center shadow-[3px_3px_0_0_#000] ring-2 ring-komma-pink ring-offset-1 ring-offset-[#F5F5F0] md:h-14 md:w-14 md:ring-4 md:ring-offset-2 sm:h-20 sm:w-20 sm:px-2">
          <span className="text-[8px] font-extrabold leading-tight text-komma-black md:text-[9px] sm:text-[11px]">
            Waarde
            <br />
            Kaart
          </span>
        </div>
      </div>

      <QuadrantLabel
        title={quadrantByPosition["top-left"].title}
        label={quadrantByPosition["top-left"].label}
        className="left-[7%] top-[7%] hidden md:block"
      />
      <QuadrantLabel
        title={quadrantByPosition["top-right"].title}
        label={quadrantByPosition["top-right"].label}
        className="right-[7%] top-[7%] hidden md:block"
      />
      <QuadrantLabel
        title={quadrantByPosition["bottom-left"].title}
        label={quadrantByPosition["bottom-left"].label}
        className="bottom-[7%] left-[7%] hidden md:block"
      />
      <QuadrantLabel
        title={quadrantByPosition["bottom-right"].title}
        label={quadrantByPosition["bottom-right"].label}
        className="bottom-[7%] right-[7%] hidden md:block"
      />

      {onCategorySelect && (
        <div className="absolute inset-[9%] z-30 grid grid-cols-2 grid-rows-3 gap-x-1.5 gap-y-1.5 md:hidden">
          {MOBILE_GROUP_GRID_ORDER.map((categoryId) => {
            const category = categoryById.get(categoryId);

            if (!category) {
              return null;
            }

            return (
              <MobileMapGroupButton
                key={categoryId}
                categoryId={categoryId}
                label={category.label}
                valueCount={categoryValueCounts[categoryId] ?? 0}
                isActive={selectedCategoryId === categoryId}
                onSelect={onCategorySelect}
              />
            );
          })}
        </div>
      )}

      {values.length === 0 ? (
        <div className="absolute inset-[14%] hidden items-center justify-center p-4 text-center md:flex">
          <p className="max-w-xs text-sm font-bold leading-relaxed text-komma-black/60 sm:text-base">
            {emptyMessage}
          </p>
        </div>
      ) : (
        <div className="absolute inset-[6%] hidden md:block">
          {values.map((value, index) => {
            const position = positionById.get(value.id);

            if (!position) {
              return null;
            }

            const isHighlighted = highlightedIds?.has(value.id) ?? false;

            return (
              <div
                key={value.id}
                className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${position.left}%`,
                  top: `${position.top}%`,
                }}
              >
                <ExplorerBubble
                  label={value.nameAf}
                  size="map-value"
                  highlighted={isHighlighted}
                  onClick={() => onValueSelect(value.id)}
                  animationDelayMs={index * 18}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface BubblesValueAxisMapProps {
  values: ValueGuideEntry[];
  highlightedIds?: Set<string>;
  onValueSelect: (valueId: string) => void;
  emptyMessage?: string;
  selectedCategoryId?: BubbleCategoryId | null;
  onCategorySelect?: (categoryId: BubbleCategoryId) => void;
  categoryValueCounts?: Partial<Record<BubbleCategoryId, number>>;
}

export function BubblesValueAxisMap({
  values,
  highlightedIds,
  onValueSelect,
  emptyMessage = "Kies \u2019n groep hier bo om waardes op die kaart te sien.",
  selectedCategoryId = null,
  onCategorySelect,
  categoryValueCounts = {},
}: BubblesValueAxisMapProps) {
  const quadrantByPosition = Object.fromEntries(
    BUBBLES_AXIS_QUADRANTS.map((quadrant) => [quadrant.position, quadrant]),
  ) as Record<
    (typeof BUBBLES_AXIS_QUADRANTS)[number]["position"],
    (typeof BUBBLES_AXIS_QUADRANTS)[number]
  >;

  const bubblePositions = useMemo(
    () => layoutAxisBubbles(values),
    [values],
  );

  const positionById = useMemo(
    () => new Map(bubblePositions.map((entry) => [entry.id, entry])),
    [bubblePositions],
  );

  const canvasProps: ValueMapCanvasProps = {
    values,
    highlightedIds,
    onValueSelect,
    emptyMessage,
    positionById,
    quadrantByPosition,
    selectedCategoryId,
    onCategorySelect,
    categoryValueCounts,
  };

  return (
    <div className="w-full">
      {/* Mobile: larger axis icons in tight rails beside the map */}
      <div className="grid grid-cols-[4.75rem_1fr_4.75rem] grid-rows-[auto_1fr_auto] items-center justify-items-stretch gap-x-0.5 gap-y-0.5 md:hidden">
        <div aria-hidden />

        <div className="flex justify-center self-end">
          <MobileAxisIcon endpoint={AXIS_ENDPOINTS.stabiliteit} placement="top" />
        </div>

        <div aria-hidden />

        <div className="flex items-center self-center">
          <MobileAxisIcon endpoint={AXIS_ENDPOINTS.ons} placement="left" />
        </div>

        <ValueMapCanvas {...canvasProps} />

        <div className="flex items-center self-center">
          <MobileAxisIcon endpoint={AXIS_ENDPOINTS.ek} placement="right" />
        </div>

        <div aria-hidden />

        <div className="flex justify-center self-start">
          <MobileAxisIcon endpoint={AXIS_ENDPOINTS.verandering} placement="bottom" />
        </div>

        <div aria-hidden />
      </div>

      {/* Desktop: original spacing */}
      <div className="hidden md:block">
        <div className="mb-3 flex justify-center">
          <AxisIcon
            {...AXIS_ENDPOINTS.stabiliteit}
            className={`h-auto w-auto ${DESKTOP_AXIS_ICON_CLASS}`}
          />
        </div>

        <div className="grid grid-cols-[minmax(3.25rem,4.5rem)_1fr_minmax(3.25rem,4.5rem)] items-stretch gap-1 lg:grid-cols-[minmax(4.5rem,6rem)_1fr_minmax(4.5rem,6rem)] lg:gap-2">
          <div className="flex items-center justify-center">
            <AxisIcon
              {...AXIS_ENDPOINTS.ons}
              className={`h-auto w-auto ${DESKTOP_AXIS_ICON_CLASS}`}
            />
          </div>

          <ValueMapCanvas {...canvasProps} />

          <div className="flex items-center justify-center">
            <AxisIcon
              {...AXIS_ENDPOINTS.ek}
              className={`h-auto w-auto ${DESKTOP_AXIS_ICON_CLASS}`}
            />
          </div>
        </div>

        <div className="mt-3 flex justify-center">
          <AxisIcon
            {...AXIS_ENDPOINTS.verandering}
            className={`h-auto w-auto ${DESKTOP_AXIS_ICON_CLASS}`}
          />
        </div>
      </div>
    </div>
  );
}
