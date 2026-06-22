export function getOrbitOffset(
  index: number,
  total: number,
  radiusPx: number,
  startAngleDeg = -90,
): { x: number; y: number } {
  if (total <= 0) {
    return { x: 0, y: 0 };
  }

  const angleDeg = startAngleDeg + (360 / total) * index;
  const angleRad = (angleDeg * Math.PI) / 180;

  return {
    x: Math.round(Math.cos(angleRad) * radiusPx),
    y: Math.round(Math.sin(angleRad) * radiusPx),
  };
}

export function getCategoryOrbitRadius(
  itemCount: number,
  compact = false,
): number {
  if (compact) {
    return itemCount <= 5 ? 118 : 132;
  }

  if (itemCount <= 5) {
    return 168;
  }

  return 188;
}

export function getValueOrbitRadius(
  itemCount: number,
  compact = false,
): number {
  if (compact) {
    if (itemCount <= 6) {
      return 132;
    }

    if (itemCount <= 10) {
      return 168;
    }

    if (itemCount <= 14) {
      return 198;
    }

    return 228;
  }

  if (itemCount <= 6) {
    return 188;
  }

  if (itemCount <= 10) {
    return 228;
  }

  if (itemCount <= 14) {
    return 268;
  }

  return 308;
}

/** Split larger value sets across two rings to reduce overlap. */
export function getValueOrbitPosition(
  index: number,
  total: number,
  compact = false,
): { x: number; y: number } {
  if (total <= 8) {
    return getOrbitOffset(index, total, getValueOrbitRadius(total, compact));
  }

  const innerCount = Math.ceil(total / 2);
  const outerCount = total - innerCount;
  const innerRadius = getValueOrbitRadius(innerCount, compact) - (compact ? 28 : 36);
  const outerRadius = getValueOrbitRadius(outerCount, compact) + (compact ? 44 : 56);

  if (index < innerCount) {
    return getOrbitOffset(index, innerCount, innerRadius);
  }

  const outerIndex = index - innerCount;
  const angleOffset = outerCount > 0 ? 360 / outerCount / 2 : 0;

  return getOrbitOffset(outerIndex, outerCount, outerRadius, -90 + angleOffset);
}

export function formatValueCount(count: number): string {
  return count === 1 ? "1 waarde" : `${count} waardes`;
}

export function getRingMinHeight(
  itemCount: number,
  ringKind: "category" | "value",
  compact = false,
): string {
  if (ringKind === "category") {
    return compact ? "min-h-[22rem]" : "min-h-[26rem]";
  }

  if (itemCount > 14) {
    return compact ? "min-h-[28rem]" : "min-h-[36rem]";
  }

  if (itemCount > 10) {
    return compact ? "min-h-[26rem]" : "min-h-[32rem]";
  }

  if (itemCount > 8) {
    return compact ? "min-h-[24rem]" : "min-h-[30rem]";
  }

  if (itemCount > 6) {
    return compact ? "min-h-[22rem]" : "min-h-[28rem]";
  }

  return compact ? "min-h-[20rem]" : "min-h-[26rem]";
}

/** @deprecated Use getRingMinHeight instead. */
export function getExplorerMinHeight(valueCount: number): string {
  return getRingMinHeight(valueCount, "value", false);
}
