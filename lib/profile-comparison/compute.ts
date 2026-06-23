import type { BubbleCategoryId } from "@/lib/bubbles";
import { GROUP_AXIS_CENTERS } from "@/lib/value-axis-map";
import type {
  ComparisonProfileSummary,
  ComparisonResult,
  SharedTopValue,
  ValueDifference,
  ValueMapOverlayPoint,
} from "@/lib/profile-comparison/types";

function buildRankMap(profile: ComparisonProfileSummary) {
  return new Map(
    profile.rankedValues.map((record) => [record.id, record]),
  );
}

export function computeSimilarityScore(
  left: ComparisonProfileSummary,
  right: ComparisonProfileSummary,
): number {
  const rightRankById = buildRankMap(right);
  const leftTop10 = left.rankedValues.slice(0, 10);

  let score = 0;
  let maxScore = 0;

  for (const leftItem of leftTop10) {
    const rightItem = rightRankById.get(leftItem.id);
    maxScore += 10;

    if (rightItem) {
      const rankDiff = Math.abs(leftItem.rank - rightItem.rank);
      score += Math.max(0, 10 - rankDiff);
    }
  }

  if (maxScore === 0) {
    return 0;
  }

  return Math.round((score / maxScore) * 100);
}

export function computeSharedTopValues(
  left: ComparisonProfileSummary,
  right: ComparisonProfileSummary,
): SharedTopValue[] {
  const rightRankById = buildRankMap(right);
  const shared: SharedTopValue[] = [];

  for (const leftItem of left.rankedValues.slice(0, 10)) {
    const rightItem = rightRankById.get(leftItem.id);

    if (!rightItem || rightItem.rank > 10) {
      continue;
    }

    shared.push({
      id: leftItem.id,
      nameAf: leftItem.nameAf,
      nameEn: leftItem.nameEn,
      leftRank: leftItem.rank,
      rightRank: rightItem.rank,
    });
  }

  return shared.sort((a, b) => {
    const aAvg = (a.leftRank + a.rightRank) / 2;
    const bAvg = (b.leftRank + b.rightRank) / 2;
    return aAvg - bAvg;
  });
}

export function computeBiggestDifferences(
  left: ComparisonProfileSummary,
  right: ComparisonProfileSummary,
): ValueDifference[] {
  const leftRankById = buildRankMap(left);
  const rightRankById = buildRankMap(right);
  const differences: ValueDifference[] = [];

  for (const leftItem of left.rankedValues.slice(0, 10)) {
    const rightItem = rightRankById.get(leftItem.id);

    if (!rightItem || rightItem.rank > 10) {
      differences.push({
        id: leftItem.id,
        nameAf: leftItem.nameAf,
        nameEn: leftItem.nameEn,
        side: "left",
        rank: leftItem.rank,
        otherRank: rightItem?.rank ?? null,
      });
    }
  }

  for (const rightItem of right.rankedValues.slice(0, 10)) {
    const leftItem = leftRankById.get(rightItem.id);

    if (!leftItem || leftItem.rank > 10) {
      differences.push({
        id: rightItem.id,
        nameAf: rightItem.nameAf,
        nameEn: rightItem.nameEn,
        side: "right",
        rank: rightItem.rank,
        otherRank: leftItem?.rank ?? null,
      });
    }
  }

  return differences
    .sort((a, b) => {
      const aGap = a.otherRank === null ? 20 : Math.abs(a.rank - a.otherRank);
      const bGap = b.otherRank === null ? 20 : Math.abs(b.rank - b.otherRank);
      return bGap - aGap;
    })
    .slice(0, 8);
}

function categoryAxis(category: string, index: number, total: number) {
  const center = GROUP_AXIS_CENTERS[category as BubbleCategoryId];

  if (!center) {
    return { axisX: 0, axisY: 0 };
  }

  const angle = (index / Math.max(total, 1)) * Math.PI * 2;
  const radius = 0.06;

  return {
    axisX: center.axisX + Math.cos(angle) * radius,
    axisY: center.axisY + Math.sin(angle) * radius,
  };
}

export function buildValueMapOverlay(
  left: ComparisonProfileSummary,
  right: ComparisonProfileSummary,
): ValueMapOverlayPoint[] {
  const leftTop = left.rankedValues.slice(0, 5);
  const rightTop = right.rankedValues.slice(0, 5);
  const rightRankById = buildRankMap(right);
  const leftRankById = buildRankMap(left);
  const combined = new Map<string, ValueMapOverlayPoint>();

  leftTop.forEach((record, index) => {
    const rightRecord = rightRankById.get(record.id);
    const coords = categoryAxis(record.category, index, leftTop.length);

    combined.set(record.id, {
      id: record.id,
      nameAf: record.nameAf,
      category: record.category,
      axisX: coords.axisX,
      axisY: coords.axisY,
      presence: rightRecord && rightRecord.rank <= 5 ? "shared" : "left_only",
      leftRank: record.rank,
      rightRank: rightRecord?.rank,
    });
  });

  rightTop.forEach((record, index) => {
    if (combined.has(record.id)) {
      return;
    }

    const leftRecord = leftRankById.get(record.id);
    const coords = categoryAxis(record.category, index, rightTop.length);

    combined.set(record.id, {
      id: record.id,
      nameAf: record.nameAf,
      category: record.category,
      axisX: coords.axisX,
      axisY: coords.axisY,
      presence: leftRecord && leftRecord.rank <= 5 ? "shared" : "right_only",
      leftRank: leftRecord?.rank,
      rightRank: record.rank,
    });
  });

  return Array.from(combined.values());
}

export function computeComparisonResult(
  left: ComparisonProfileSummary,
  right: ComparisonProfileSummary,
): ComparisonResult {
  return {
    similarityScore: computeSimilarityScore(left, right),
    sharedTopValues: computeSharedTopValues(left, right),
    biggestDifferences: computeBiggestDifferences(left, right),
    valueMapOverlay: buildValueMapOverlay(left, right),
    aiInsights: null,
  };
}
