import {
  MOCK_INSIGHTS_SNAPSHOT,
  type InsightsAggregateSnapshot,
} from "@/lib/insights/mock-data";

/**
 * MVP placeholder. Replace with Supabase aggregate queries against
 * bubble_profiles (top_5_values, age_group, province, ranked_values).
 */
export async function fetchInsightsSnapshot(): Promise<InsightsAggregateSnapshot> {
  return MOCK_INSIGHTS_SNAPSHOT;
}
