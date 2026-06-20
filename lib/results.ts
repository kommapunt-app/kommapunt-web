import { getBubbleById } from "@/lib/bubbles";
import {
  STORAGE_KEY_BUBBLE_SCORES,
  STORAGE_KEY_COMPARE_PROGRESS,
  STORAGE_KEY_MANUAL_SORTED_BUBBLES,
  STORAGE_KEY_RANKED_BUBBLES,
  STORAGE_KEY_SELECTED_BUBBLES,
} from "@/lib/constants";
import {
  parseStoredJson,
  rankBubbles,
  type BubbleScores,
} from "@/lib/compare";

export type RankedBubbleResult = {
  id: string;
  rank: number;
  score: number;
  bubble: NonNullable<ReturnType<typeof getBubbleById>>;
};

export function formatBubbleScore(score: number): string {
  return Number.isInteger(score) ? String(score) : score.toFixed(1);
}

export function loadResultsFromStorage(): RankedBubbleResult[] | null {
  const rankedIds = parseStoredJson<string[]>(
    localStorage.getItem(STORAGE_KEY_RANKED_BUBBLES),
  );
  const scores = parseStoredJson<BubbleScores>(
    localStorage.getItem(STORAGE_KEY_BUBBLE_SCORES),
  );
  const selectedIds = parseStoredJson<string[]>(
    localStorage.getItem(STORAGE_KEY_SELECTED_BUBBLES),
  );

  let orderedIds = rankedIds?.length ? rankedIds : null;

  if (!orderedIds?.length && selectedIds?.length && scores) {
    const manualSortedIds = parseStoredJson<string[]>(
      localStorage.getItem(STORAGE_KEY_MANUAL_SORTED_BUBBLES),
    );

    if (manualSortedIds?.length) {
      orderedIds = rankBubbles(manualSortedIds, scores);
    }
  }

  if (!orderedIds?.length) {
    return null;
  }

  const scoreMap = scores ?? {};

  const results = orderedIds
    .map((id, index) => {
      const bubble = getBubbleById(id);

      if (!bubble) {
        return null;
      }

      return {
        id,
        rank: index + 1,
        score: scoreMap[id] ?? 0,
        bubble,
      };
    })
    .filter((item): item is RankedBubbleResult => item !== null);

  return results.length > 0 ? results : null;
}

export function clearKommaSession() {
  localStorage.removeItem(STORAGE_KEY_SELECTED_BUBBLES);
  localStorage.removeItem(STORAGE_KEY_MANUAL_SORTED_BUBBLES);
  localStorage.removeItem(STORAGE_KEY_BUBBLE_SCORES);
  localStorage.removeItem(STORAGE_KEY_COMPARE_PROGRESS);
  localStorage.removeItem(STORAGE_KEY_RANKED_BUBBLES);
}
