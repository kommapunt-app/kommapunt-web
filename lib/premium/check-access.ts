import {
  PREMIUM_FEATURE_PROFILE_COMPARISON,
  PREMIUM_STATUS_ACTIVE,
  type PremiumFeature,
  type PremiumStatus,
} from "@/lib/premium/constants";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

function getPremiumBypassProfileIds(): string[] {
  return (process.env.PREMIUM_BYPASS_PROFILE_IDS ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

export function isPremiumBypassEnabled(profileId: string): boolean {
  if (process.env.PREMIUM_BYPASS === "true") {
    return true;
  }

  return getPremiumBypassProfileIds().includes(profileId);
}

export async function getPremiumFeatureAccess(
  profileId: string,
  feature: PremiumFeature = PREMIUM_FEATURE_PROFILE_COMPARISON,
): Promise<{ hasAccess: boolean; status: PremiumStatus | null }> {
  if (isPremiumBypassEnabled(profileId)) {
    return { hasAccess: true, status: PREMIUM_STATUS_ACTIVE };
  }

  const supabase = getSupabaseAdmin();
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("premium_profiles")
    .select("status, expires_at")
    .eq("bubble_profile_id", profileId)
    .eq("feature", feature)
    .eq("status", PREMIUM_STATUS_ACTIVE)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("[getPremiumFeatureAccess] Supabase read error", error);
    throw error;
  }

  if (!data) {
    return { hasAccess: false, status: null };
  }

  if (data.expires_at && data.expires_at <= now) {
    return { hasAccess: false, status: "expired" };
  }

  return {
    hasAccess: true,
    status: data.status as PremiumStatus,
  };
}
