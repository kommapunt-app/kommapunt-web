import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { BubbleProfileRequest } from "@/lib/bubble-profile/types";
import type { ShareLeadBubbleResult } from "@/lib/share-leads";

export type ShareLeadRecord = {
  name: string;
  email: string;
  bubble_results: ShareLeadBubbleResult[];
  created_at?: string;
};

let adminClient: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    return null;
  }

  if (!adminClient) {
    adminClient = createClient(url, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  return adminClient;
}

export async function insertShareLead(record: ShareLeadRecord) {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    throw new Error("Database is not configured.");
  }

  const { error } = await supabase.from("share_leads").insert({
    name: record.name,
    email: record.email,
    bubble_results: record.bubble_results,
  });

  if (error) {
    throw error;
  }
}

export type BubbleProfileInsertRecord = {
  name: string;
  email: string;
  age_group: string;
  race: string | null;
  province: string;
  ranked_values: BubbleProfileRequest["rankedValues"];
  top_5_values: string[];
  top_10_values: string[];
  scores: Record<string, number> | null;
};

export async function insertBubbleProfile(
  record: BubbleProfileInsertRecord,
): Promise<string> {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    throw new Error("Database is not configured.");
  }

  const { data, error } = await supabase
    .from("bubble_profiles")
    .insert({
      name: record.name,
      email: record.email,
      age_group: record.age_group,
      race: record.race ?? null,
      province: record.province,
      ranked_values: record.ranked_values,
      top_5_values: record.top_5_values,
      top_10_values: record.top_10_values,
      scores: record.scores,
    })
    .select("id")
    .single();

  if (error) {
    console.error("[insertBubbleProfile] Supabase insert error", error);
    throw error;
  }

  return data.id;
}
