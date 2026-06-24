import type { RankedValueRecord } from "@/lib/bubble-profile/types";
import { getBubbleProfileById } from "@/lib/supabase/admin";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export type PublicBubbleProfile = {
  id: string;
  name: string;
  rankedValues: RankedValueRecord[];
  top5Values: string[];
  top10Values: string[];
  scores: Record<string, number> | null;
  profileImageUrl: string | null;
};

export function isValidProfileId(id: string): boolean {
  return UUID_REGEX.test(id);
}

export async function fetchPublicBubbleProfile(
  id: string,
): Promise<PublicBubbleProfile | null> {
  if (!isValidProfileId(id)) {
    return null;
  }

  const row = await getBubbleProfileById(id);

  if (!row) {
    return null;
  }

  return {
    id: row.id,
    name: row.name,
    rankedValues: row.ranked_values,
    top5Values: row.top_5_values,
    top10Values: row.top_10_values,
    scores: row.scores,
    profileImageUrl: row.profile_image_url,
  };
}
