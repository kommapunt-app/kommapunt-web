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

export function getOrbitRadius(itemCount: number, baseRadius: number): number {
  if (itemCount <= 5) {
    return baseRadius;
  }

  if (itemCount <= 10) {
    return baseRadius + 36;
  }

  return baseRadius + 72;
}
