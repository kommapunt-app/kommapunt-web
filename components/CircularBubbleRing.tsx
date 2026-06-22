"use client";

import type { ReactNode } from "react";
import {
  getCategoryOrbitRadius,
  getRingMinHeight,
  getValueOrbitPosition,
  getOrbitOffset,
} from "@/lib/waardes-explorer-layout";

type RingKind = "category" | "value";

interface CircularBubbleRingProps {
  center: ReactNode;
  itemCount: number;
  ringKind: RingKind;
  renderItem: (index: number) => ReactNode;
  getItemKey?: (index: number) => string;
  className?: string;
  compact?: boolean;
}

function getItemPosition(
  index: number,
  total: number,
  ringKind: RingKind,
  compact: boolean,
) {
  if (ringKind === "category") {
    return getOrbitOffset(
      index,
      total,
      getCategoryOrbitRadius(total, compact),
    );
  }

  return getValueOrbitPosition(index, total, compact);
}

export function CircularBubbleRing({
  center,
  itemCount,
  ringKind,
  renderItem,
  getItemKey,
  className = "",
  compact = false,
}: CircularBubbleRingProps) {
  const minHeight = getRingMinHeight(itemCount, ringKind, compact);

  return (
    <div
      className={`relative mx-auto w-full max-w-full overflow-visible ${minHeight} ${className}`.trim()}
    >
      <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        {center}
      </div>

      {itemCount > 0 ? (
        <div className="pointer-events-none absolute inset-0 overflow-visible">
          {Array.from({ length: itemCount }, (_, index) => {
            const { x, y } = getItemPosition(
              index,
              itemCount,
              ringKind,
              compact,
            );

            return (
              <div
                key={getItemKey?.(index) ?? `${ringKind}-${index}`}
                className="pointer-events-auto absolute left-1/2 top-1/2"
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                }}
              >
                {renderItem(index)}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
