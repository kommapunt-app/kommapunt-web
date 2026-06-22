const PREDEFINED_BREAKS: Record<string, readonly [string, string]> = {
  selfuitdrukking: ["Self-", "uitdrukking"],
  gemeenskap: ["Gemeen-", "skap"],
  uitnemendheid: ["Uitnemend-", "heid"],
  onafhanklikheid: ["Onafhanklik-", "heid"],
  verantwoordelikheid: ["Verantwoordelik-", "heid"],
  volhoubaarheid: ["Volhoubaar-", "heid"],
  geregtigheid: ["Geregtig-", "heid"],
  vriendelikheid: ["Vriendelik-", "heid"],
  billikheid: ["Billik-", "heid"],
  inklusiwiteit: ["Inklusiw-", "iteit"],
  integriteit: ["Integrit-", "eit"],
  stabiliteit: ["Stabil-", "iteit"],
};

const SUFFIX_BREAKS = [
  { suffix: "baarheid", minStem: 6 },
  { suffix: "likheid", minStem: 5 },
  { suffix: "igheid", minStem: 5 },
  { suffix: "iwiteit", minStem: 5 },
  { suffix: "endheid", minStem: 5 },
  { suffix: "iteit", minStem: 5 },
  { suffix: "heid", minStem: 5 },
  { suffix: "skap", minStem: 4 },
] as const;

const SINGLE_LINE_MAX = 10;

function isValidBreak(lines: readonly [string, string]): boolean {
  const [line1, line2] = lines;
  const stem = line1.endsWith("-") ? line1.slice(0, -1) : line1;

  return stem.length >= 3 && line2.length >= 2;
}

function splitOnSpaces(label: string): string[] {
  const words = label.split(/\s+/).filter(Boolean);

  if (words.length <= 1) {
    return [label];
  }

  if (words.length === 2) {
    return words;
  }

  const midpoint = Math.ceil(words.length / 2);

  return [words.slice(0, midpoint).join(" "), words.slice(midpoint).join(" ")];
}

function breakBySuffix(label: string): [string, string] | null {
  const lower = label.toLowerCase();

  for (const { suffix, minStem } of SUFFIX_BREAKS) {
    if (!lower.endsWith(suffix)) {
      continue;
    }

    const stemLength = label.length - suffix.length;

    if (stemLength < minStem) {
      continue;
    }

    const candidate: [string, string] = [
      `${label.slice(0, stemLength)}-`,
      label.slice(stemLength),
    ];

    if (isValidBreak(candidate)) {
      return candidate;
    }
  }

  return null;
}

function breakAtMidpoint(label: string): [string, string] | null {
  for (
    let breakIndex = Math.ceil(label.length / 2);
    breakIndex < label.length - 1;
    breakIndex++
  ) {
    const candidate: [string, string] = [
      `${label.slice(0, breakIndex)}-`,
      label.slice(breakIndex),
    ];

    if (isValidBreak(candidate)) {
      return candidate;
    }
  }

  for (
    let breakIndex = Math.floor(label.length / 2);
    breakIndex > 2;
    breakIndex--
  ) {
    const candidate: [string, string] = [
      `${label.slice(0, breakIndex)}-`,
      label.slice(breakIndex),
    ];

    if (isValidBreak(candidate)) {
      return candidate;
    }
  }

  return null;
}

/**
 * Formats a bubble label into at most two readable lines with natural break points.
 */
export function formatBubbleLabel(label: string): string[] {
  const trimmed = label.trim();

  if (!trimmed) {
    return [""];
  }

  if (trimmed.includes(" ")) {
    return splitOnSpaces(trimmed).slice(0, 2);
  }

  const predefined = PREDEFINED_BREAKS[trimmed.toLowerCase()];

  if (predefined) {
    return [...predefined];
  }

  if (trimmed.length <= SINGLE_LINE_MAX) {
    return [trimmed];
  }

  const suffixBreak = breakBySuffix(trimmed);

  if (suffixBreak) {
    return [...suffixBreak];
  }

  const midpointBreak = breakAtMidpoint(trimmed);

  if (midpointBreak) {
    return [...midpointBreak];
  }

  return [trimmed];
}
