import type { BubbleCategoryId } from "@/lib/bubbles";
import {
  getValueGuideBubbleCategory,
  groupValuesGuideByBubbleCategory,
} from "@/lib/values-guide/bubble-category";
import { VALUE_GUIDE } from "@/lib/values-guide/values";

export type ValueAxisCoords = {
  slug: string;
  axisX: number;
  axisY: number;
};

/** Group centre on the axis map. axisX: -1 = Ons, +1 = Ek. axisY: -1 = Verandering, +1 = Stabiliteit. */
export const GROUP_AXIS_CENTERS: Record<
  BubbleCategoryId,
  { axisX: number; axisY: number }
> = {
  "ek-identiteit": { axisX: 0.72, axisY: 0.12 },
  "mense-verhoudings": { axisX: -0.72, axisY: 0.18 },
  "waarheid-beginsels": { axisX: -0.12, axisY: 0.58 },
  "prestasie-groei": { axisX: 0.68, axisY: -0.58 },
  "orde-stabiliteit": { axisX: 0.08, axisY: 0.78 },
  "bydrae-verandering": { axisX: -0.68, axisY: -0.58 },
};

/**
 * Optional per-value refinements. Values not listed here use group centre + spread.
 * Update this object to fine-tune individual bubble positions.
 */
export const VALUE_AXIS_OVERRIDES: Record<
  string,
  { axisX: number; axisY: number }
> = {
  authenticity: { axisX: 0.82, axisY: 0.05 },
  family: { axisX: -0.85, axisY: 0.28 },
  freedom: { axisX: 0.78, axisY: -0.18 },
  justice: { axisX: -0.22, axisY: 0.62 },
  curiosity: { axisX: 0.62, axisY: -0.42 },
  security: { axisX: 0.18, axisY: 0.82 },
  contribution: { axisX: -0.78, axisY: -0.48 },
};

const GROUPED = groupValuesGuideByBubbleCategory(VALUE_GUIDE);

function clampAxis(value: number): number {
  return Math.max(-0.95, Math.min(0.95, value));
}

function spreadOffset(index: number, total: number): { x: number; y: number } {
  if (total <= 1) {
    return { x: 0, y: 0 };
  }

  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const radius = 0.07 + Math.sqrt((index + 1) / total) * 0.2;
  const angle = index * goldenAngle;

  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  };
}

function buildValueAxisMap(): ValueAxisCoords[] {
  const entries: ValueAxisCoords[] = [];

  for (const group of GROUPED) {
    const center = GROUP_AXIS_CENTERS[group.category.id];

    group.values.forEach((value, index) => {
      const override = VALUE_AXIS_OVERRIDES[value.id];

      if (override) {
        entries.push({
          slug: value.id,
          axisX: clampAxis(override.axisX),
          axisY: clampAxis(override.axisY),
        });
        return;
      }

      const spread = spreadOffset(index, group.values.length);

      entries.push({
        slug: value.id,
        axisX: clampAxis(center.axisX + spread.x),
        axisY: clampAxis(center.axisY + spread.y),
      });
    });
  }

  return entries;
}

export const VALUE_AXIS_MAP: ValueAxisCoords[] = buildValueAxisMap();

const axisBySlug = new Map(VALUE_AXIS_MAP.map((entry) => [entry.slug, entry]));

export function getValueAxisCoords(slug: string): ValueAxisCoords | undefined {
  return axisBySlug.get(slug);
}

export function usesGroupDefaultPosition(slug: string): boolean {
  return !VALUE_AXIS_OVERRIDES[slug];
}

export function getUnmappedValueSlugs(): string[] {
  return VALUE_GUIDE.filter((value) => !axisBySlug.has(value.id)).map(
    (value) => value.id,
  );
}

export function axisToPercent(
  axisX: number,
  axisY: number,
): { left: number; top: number } {
  return {
    left: 50 + axisX * 42,
    top: 50 - axisY * 42,
  };
}
