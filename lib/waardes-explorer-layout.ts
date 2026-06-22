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

export function getCategoryOrbitRadius(itemCount: number): number {
  if (itemCount <= 5) {
    return 200;
  }

  return 220;
}

export function getValueOrbitRadius(itemCount: number): number {
  if (itemCount <= 6) {
    return 220;
  }

  if (itemCount <= 10) {
    return 280;
  }

  if (itemCount <= 14) {
    return 330;
  }

  return 380;
}

/** Split large value sets across two rings to reduce overlap. */
export function getValueOrbitPosition(
  index: number,
  total: number,
): { x: number; y: number } {
  if (total <= 10) {
    return getOrbitOffset(index, total, getValueOrbitRadius(total));
  }

  const innerCount = Math.ceil(total / 2);
  const outerCount = total - innerCount;

  if (index < innerCount) {
    return getOrbitOffset(
      index,
      innerCount,
      getValueOrbitRadius(innerCount) - 40,
    );
  }

  const outerIndex = index - innerCount;
  const angleOffset = outerCount > 0 ? 360 / outerCount / 2 : 0;

  return getOrbitOffset(
    outerIndex,
    outerCount,
    getValueOrbitRadius(outerCount) + 60,
    -90 + angleOffset,
  );
}

export function formatValueCount(count: number): string {
  return count === 1 ? "1 waarde" : `${count} waardes`;
}

export function getExplorerMinHeight(valueCount: number): string {
  if (valueCount > 14) {
    return "min-h-[760px]";
  }

  if (valueCount > 10) {
    return "min-h-[680px]";
  }

  if (valueCount > 6) {
    return "min-h-[600px]";
  }

  return "min-h-[520px]";
}
