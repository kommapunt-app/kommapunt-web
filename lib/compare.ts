export type BubblePair = [string, string];

export type ComparisonChoice = "a" | "b" | "tie";

export type ComparisonHistoryEntry = {
  pair: BubblePair;
  choice: ComparisonChoice;
};

export type CompareProgressState = {
  selectedIds: string[];
  manualSortedIds: string[];
  pairs: BubblePair[];
  currentIndex: number;
  history: ComparisonHistoryEntry[];
};

export type BubbleScores = Record<string, number>;

function pairKey(pair: BubblePair): string {
  return pair[0] < pair[1] ? `${pair[0]}|${pair[1]}` : `${pair[1]}|${pair[0]}`;
}

function shuffle<T>(items: T[]): T[] {
  const shuffled = [...items];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

export function getMaxComparisons(selectedCount: number): number {
  return selectedCount >= 12 ? 25 : selectedCount < 10 ? 15 : 25;
}

function getPairPriority(
  indexA: number,
  indexB: number,
): number {
  const rankGap = indexB - indexA;
  let priority = 0;

  if (rankGap === 1) {
    priority += 100;
  }

  if (rankGap <= 2) {
    priority += 50;
  }

  if (rankGap <= 3) {
    priority += 30;
  }

  if (indexA < 5 && indexB < 5) {
    priority += 40;
  } else if (indexA < 5 || indexB < 5) {
    priority += 20;
  }

  return priority;
}

export function generateComparisonPairs(
  manualSortedIds: string[],
  targetCount = 25,
): BubblePair[] {
  const candidates = shuffle(
    manualSortedIds.flatMap((idA, indexA) =>
      manualSortedIds.slice(indexA + 1).map((idB, offset) => {
        const indexB = indexA + offset + 1;

        return {
          pair: [idA, idB] as BubblePair,
          priority: getPairPriority(indexA, indexB),
        };
      }),
    ),
  ).sort((a, b) => b.priority - a.priority);

  const selected: BubblePair[] = [];
  const usedPairs = new Set<string>();
  const appearanceCount = Object.fromEntries(
    manualSortedIds.map((id) => [id, 0]),
  );
  const minAppearances = 3;

  function addPair(pair: BubblePair) {
    const key = pairKey(pair);

    if (usedPairs.has(key)) {
      return false;
    }

    usedPairs.add(key);
    selected.push(pair);
    appearanceCount[pair[0]] += 1;
    appearanceCount[pair[1]] += 1;
    return true;
  }

  while (selected.length < targetCount) {
    const underrepresented = manualSortedIds.filter(
      (id) => appearanceCount[id] < minAppearances,
    );

    if (underrepresented.length > 0) {
      let bestCandidate: { pair: BubblePair; score: number } | null = null;

      for (const candidate of candidates) {
        const key = pairKey(candidate.pair);

        if (usedPairs.has(key)) {
          continue;
        }

        const [idA, idB] = candidate.pair;
        const includesUnderrepresented =
          underrepresented.includes(idA) || underrepresented.includes(idB);

        if (!includesUnderrepresented) {
          continue;
        }

        let score = candidate.priority;

        if (appearanceCount[idA] < minAppearances) {
          score += 200;
        }

        if (appearanceCount[idB] < minAppearances) {
          score += 200;
        }

        if (!bestCandidate || score > bestCandidate.score) {
          bestCandidate = { pair: candidate.pair, score };
        }
      }

      if (bestCandidate && addPair(bestCandidate.pair)) {
        continue;
      }
    }

    const nextCandidate = candidates.find(
      (candidate) => !usedPairs.has(pairKey(candidate.pair)),
    );

    if (!nextCandidate || !addPair(nextCandidate.pair)) {
      break;
    }
  }

  return selected.slice(0, targetCount);
}

export function createInitialScoresFromManualOrder(
  manualSortedIds: string[],
): BubbleScores {
  const count = manualSortedIds.length;

  return Object.fromEntries(
    manualSortedIds.map((id, index) => [id, count - index]),
  );
}

export function createInitialScores(selectedIds: string[]): BubbleScores {
  return Object.fromEntries(selectedIds.map((id) => [id, 0]));
}

export function applyComparisonResult(
  scores: BubbleScores,
  pair: BubblePair,
  result: "a" | "b" | "tie",
): BubbleScores {
  const [idA, idB] = pair;
  const nextScores = { ...scores };

  if (result === "a") {
    nextScores[idA] = (nextScores[idA] ?? 0) + 2;
  } else if (result === "b") {
    nextScores[idB] = (nextScores[idB] ?? 0) + 2;
  } else {
    nextScores[idA] = (nextScores[idA] ?? 0) + 1;
    nextScores[idB] = (nextScores[idB] ?? 0) + 1;
  }

  return nextScores;
}

export function reverseComparisonResult(
  scores: BubbleScores,
  pair: BubblePair,
  result: ComparisonChoice,
): BubbleScores {
  const [idA, idB] = pair;
  const nextScores = { ...scores };

  if (result === "a") {
    nextScores[idA] = (nextScores[idA] ?? 0) - 2;
  } else if (result === "b") {
    nextScores[idB] = (nextScores[idB] ?? 0) - 2;
  } else {
    nextScores[idA] = (nextScores[idA] ?? 0) - 1;
    nextScores[idB] = (nextScores[idB] ?? 0) - 1;
  }

  return nextScores;
}

export function rankBubbles(
  manualSortedIds: string[],
  scores: BubbleScores,
): string[] {
  const orderIndex = Object.fromEntries(
    manualSortedIds.map((id, index) => [id, index]),
  );

  return [...manualSortedIds].sort((idA, idB) => {
    const scoreDiff = (scores[idB] ?? 0) - (scores[idA] ?? 0);

    if (scoreDiff !== 0) {
      return scoreDiff;
    }

    return (orderIndex[idA] ?? 0) - (orderIndex[idB] ?? 0);
  });
}

function haveSameIds(left: string[], right: string[]): boolean {
  if (left.length !== right.length) {
    return false;
  }

  const rightSet = new Set(right);

  return left.every((id) => rightSet.has(id));
}

export function hasMatchingProgress(
  progress: CompareProgressState,
  selectedIds: string[],
  manualSortedIds: string[],
): boolean {
  if (!haveSameIds(progress.selectedIds, selectedIds)) {
    return false;
  }

  return haveSameIds(progress.manualSortedIds, manualSortedIds);
}

export function parseStoredJson<T>(value: string | null): T | null {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export function haveSameBubbleSet(left: string[], right: string[]): boolean {
  return haveSameIds(left, right);
}
