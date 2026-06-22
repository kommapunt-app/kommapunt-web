import { getValueAxisCoords } from "@/lib/value-axis-map";
import type { ValueGuideEntry } from "@/lib/values-guide";

type QuadrantId = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export type ValueQuadrantId = QuadrantId;

type Bounds = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

type Point = {
  left: number;
  top: number;
};

export type AxisBubblePosition = {
  id: string;
  left: number;
  top: number;
};

/** Map centre (hub + axis crossing) in percent of the inset map area. */
const MAP_CENTER = 50;

/** Padding from outer map border. */
const OUTER_PAD = 7;

/** Clearance from vertical/horizontal axis lines and centre hub. */
const AXIS_HUB_GAP = 8;

/** Top quadrants: reserve upper band for corner labels. */
const LABEL_TOP_RESERVE = 15;

/** Bottom quadrants: reserve lower band for labels + breathing room. */
const BOTTOM_RESERVE = 12;

/** Target share of the quadrant zone used by the bubble group (60–70%). */
const COVERAGE_TARGET = 0.68;

/** Minimum centre-to-centre spacing between bubbles (percent). */
const MIN_BUBBLE_SPACING = 11;

/** Clamp margin inside the zone after recentering. */
const ZONE_EDGE_MARGIN = 2;

/**
 * Usable bubble zones per quadrant — centred in each quarter, padded away from
 * labels, axes, hub, and outer border.
 */
const QUADRANT_ZONES: Record<QuadrantId, Bounds> = {
  "top-left": {
    minX: OUTER_PAD,
    maxX: MAP_CENTER - AXIS_HUB_GAP,
    minY: LABEL_TOP_RESERVE,
    maxY: MAP_CENTER - AXIS_HUB_GAP,
  },
  "top-right": {
    minX: MAP_CENTER + AXIS_HUB_GAP,
    maxX: 100 - OUTER_PAD,
    minY: LABEL_TOP_RESERVE,
    maxY: MAP_CENTER - AXIS_HUB_GAP,
  },
  "bottom-left": {
    minX: OUTER_PAD,
    maxX: MAP_CENTER - AXIS_HUB_GAP,
    minY: MAP_CENTER + AXIS_HUB_GAP,
    maxY: 100 - BOTTOM_RESERVE,
  },
  "bottom-right": {
    minX: MAP_CENTER + AXIS_HUB_GAP,
    maxX: 100 - OUTER_PAD,
    minY: MAP_CENTER + AXIS_HUB_GAP,
    maxY: 100 - BOTTOM_RESERVE,
  },
};

function getQuadrant(axisX: number, axisY: number): QuadrantId {
  const horizontal = axisX >= 0 ? "right" : "left";
  const vertical = axisY >= 0 ? "top" : "bottom";

  return `${vertical}-${horizontal}` as QuadrantId;
}

function getZoneCenter(bounds: Bounds): Point {
  return {
    left: (bounds.minX + bounds.maxX) / 2,
    top: (bounds.minY + bounds.maxY) / 2,
  };
}

function getGridDimensions(count: number): { cols: number; rows: number } {
  if (count <= 0) {
    return { cols: 0, rows: 0 };
  }

  if (count === 1) {
    return { cols: 1, rows: 1 };
  }

  if (count === 2) {
    return { cols: 2, rows: 1 };
  }

  if (count === 3) {
    return { cols: 3, rows: 1 };
  }

  if (count <= 4) {
    return { cols: 2, rows: 2 };
  }

  if (count <= 6) {
    return { cols: 3, rows: 2 };
  }

  if (count === 7) {
    return { cols: 4, rows: 2 };
  }

  if (count === 8) {
    return { cols: 4, rows: 2 };
  }

  if (count <= 9) {
    return { cols: 3, rows: 3 };
  }

  if (count <= 12) {
    return { cols: 4, rows: 3 };
  }

  const cols = 4;
  return { cols, rows: Math.ceil(count / cols) };
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function clampPoint(point: Point, bounds: Bounds): Point {
  return {
    left: clamp(
      point.left,
      bounds.minX + ZONE_EDGE_MARGIN,
      bounds.maxX - ZONE_EDGE_MARGIN,
    ),
    top: clamp(
      point.top,
      bounds.minY + ZONE_EDGE_MARGIN,
      bounds.maxY - ZONE_EDGE_MARGIN,
    ),
  };
}

function getRowLayout(
  rowIndex: number,
  itemsInRow: number,
  cols: number,
): { startCol: number; colsInRow: number } {
  const colsInRow = Math.min(itemsInRow, cols);
  const startCol = (cols - colsInRow) / 2;

  return { startCol, colsInRow };
}

function shouldStaggerRow(count: number, cols: number, rowIndex: number): boolean {
  return count >= 6 && cols >= 3 && rowIndex % 2 === 1;
}

function computeLayoutSize(
  cols: number,
  rows: number,
  zoneWidth: number,
  zoneHeight: number,
): { width: number; height: number } {
  const targetWidth = zoneWidth * COVERAGE_TARGET;
  const targetHeight = zoneHeight * COVERAGE_TARGET;
  const minWidth = MIN_BUBBLE_SPACING * Math.max(cols - 1, 1) + MIN_BUBBLE_SPACING;
  const minHeight = MIN_BUBBLE_SPACING * Math.max(rows - 1, 1) + MIN_BUBBLE_SPACING;
  const maxWidth = zoneWidth * 0.88;
  const maxHeight = zoneHeight * 0.88;

  return {
    width: clamp(Math.max(targetWidth, minWidth), MIN_BUBBLE_SPACING * 2, maxWidth),
    height: clamp(
      Math.max(targetHeight, minHeight),
      MIN_BUBBLE_SPACING * 2,
      maxHeight,
    ),
  };
}

function layoutQuadrantGrid(count: number, bounds: Bounds): Point[] {
  if (count <= 0) {
    return [];
  }

  const zoneCenter = getZoneCenter(bounds);
  const zoneWidth = bounds.maxX - bounds.minX;
  const zoneHeight = bounds.maxY - bounds.minY;
  const { cols, rows } = getGridDimensions(count);
  const { width: layoutWidth, height: layoutHeight } = computeLayoutSize(
    cols,
    rows,
    zoneWidth,
    zoneHeight,
  );

  const cellWidth = layoutWidth / cols;
  const cellHeight = layoutHeight / rows;
  const layoutMinY = zoneCenter.top - layoutHeight / 2;

  const points: Point[] = [];
  let remaining = count;

  for (let row = 0; row < rows && remaining > 0; row += 1) {
    const itemsInRow = Math.min(remaining, cols);
    const { colsInRow } = getRowLayout(row, itemsInRow, cols);
    const staggerOffset = shouldStaggerRow(count, cols, row) ? cellWidth * 0.22 : 0;
    const rowWidth = cellWidth * colsInRow;
    const rowStartX =
      zoneCenter.left - rowWidth / 2 + staggerOffset;

    for (let col = 0; col < colsInRow; col += 1) {
      points.push({
        left: rowStartX + (col + 0.5) * cellWidth,
        top: layoutMinY + (row + 0.5) * cellHeight,
      });
    }

    remaining -= itemsInRow;
  }

  return recenterPoints(points, zoneCenter, bounds);
}

function recenterPoints(
  points: Point[],
  targetCenter: Point,
  bounds: Bounds,
): Point[] {
  if (points.length === 0) {
    return points;
  }

  const currentCenter = {
    left: points.reduce((sum, point) => sum + point.left, 0) / points.length,
    top: points.reduce((sum, point) => sum + point.top, 0) / points.length,
  };

  const deltaX = targetCenter.left - currentCenter.left;
  const deltaY = targetCenter.top - currentCenter.top;

  return resolveOverlaps(
    points.map((point) =>
      clampPoint(
        {
          left: point.left + deltaX,
          top: point.top + deltaY,
        },
        bounds,
      ),
    ),
    bounds,
  );
}

function distance(a: Point, b: Point): number {
  const dx = a.left - b.left;
  const dy = a.top - b.top;
  return Math.hypot(dx, dy);
}

function resolveOverlaps(points: Point[], bounds: Bounds): Point[] {
  if (points.length <= 1) {
    return points;
  }

  const adjusted = points.map((point) => ({ ...point }));

  for (let pass = 0; pass < 8; pass += 1) {
    let moved = false;

    for (let i = 0; i < adjusted.length; i += 1) {
      for (let j = i + 1; j < adjusted.length; j += 1) {
        const a = adjusted[i];
        const b = adjusted[j];
        const dist = distance(a, b);

        if (dist >= MIN_BUBBLE_SPACING || dist === 0) {
          continue;
        }

        const push = (MIN_BUBBLE_SPACING - dist) / 2;
        const angle = dist === 0 ? ((i + 1) / adjusted.length) * Math.PI * 2 : Math.atan2(
          b.top - a.top,
          b.left - a.left,
        );

        a.left -= Math.cos(angle) * push;
        a.top -= Math.sin(angle) * push;
        b.left += Math.cos(angle) * push;
        b.top += Math.sin(angle) * push;
        moved = true;
      }
    }

    for (let i = 0; i < adjusted.length; i += 1) {
      adjusted[i] = clampPoint(adjusted[i], bounds);
    }

    if (!moved) {
      break;
    }
  }

  return adjusted;
}

function sortQuadrantValues(values: ValueGuideEntry[]): ValueGuideEntry[] {
  return [...values].sort((a, b) => {
    const aCoords = getValueAxisCoords(a.id)!;
    const bCoords = getValueAxisCoords(b.id)!;

    return (
      aCoords.axisY - bCoords.axisY ||
      aCoords.axisX - bCoords.axisX ||
      a.nameAf.localeCompare(b.nameAf, "af")
    );
  });
}

export function getValueQuadrantId(valueId: string): ValueQuadrantId | null {
  const coords = getValueAxisCoords(valueId);

  if (!coords) {
    return null;
  }

  return getQuadrant(coords.axisX, coords.axisY);
}

export function groupValuesByQuadrant(
  values: ValueGuideEntry[],
): Map<ValueQuadrantId, ValueGuideEntry[]> {
  const grouped = new Map<ValueQuadrantId, ValueGuideEntry[]>();

  for (const value of values) {
    const quadrant = getValueQuadrantId(value.id);

    if (!quadrant) {
      continue;
    }

    const bucket = grouped.get(quadrant) ?? [];
    bucket.push(value);
    grouped.set(quadrant, bucket);
  }

  for (const [quadrant, quadrantValues] of grouped) {
    grouped.set(quadrant, sortQuadrantValues(quadrantValues));
  }

  return grouped;
}

export function layoutAxisBubbles(values: ValueGuideEntry[]): AxisBubblePosition[] {
  const grouped = groupValuesByQuadrant(values);
  const positions: AxisBubblePosition[] = [];

  for (const [quadrant, sorted] of grouped) {
    const grid = layoutQuadrantGrid(sorted.length, QUADRANT_ZONES[quadrant]);

    sorted.forEach((value, index) => {
      const point = grid[index];

      if (!point) {
        return;
      }

      positions.push({
        id: value.id,
        left: point.left,
        top: point.top,
      });
    });
  }

  return positions;
}
