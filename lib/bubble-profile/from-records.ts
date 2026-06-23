import { getBubbleById, type BubbleCategoryId } from "@/lib/bubbles";
import type { RankedValueRecord } from "@/lib/bubble-profile/types";
import type { RankedBubbleResult } from "@/lib/results";

export function rankedRecordsToResults(
  records: RankedValueRecord[],
): RankedBubbleResult[] {
  return records
    .slice()
    .sort((a, b) => a.rank - b.rank)
    .map((record) => {
      const known = getBubbleById(record.id);
      const bubble =
        known ??
        ({
          id: record.id,
          nameAf: record.nameAf,
          nameEn: record.nameEn,
          descriptionAf: "",
          category: record.category as BubbleCategoryId,
        } as const);

      return {
        id: record.id,
        rank: record.rank,
        score: record.score,
        bubble,
      };
    });
}
