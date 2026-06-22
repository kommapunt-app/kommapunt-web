import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { BubbleProfileRequest } from "@/lib/bubble-profile/types";
import type { ShareLeadBubbleResult } from "@/lib/share-leads";

export type ShareLeadRecord = {
  name: string;
  email: string;
  bubble_results: ShareLeadBubbleResult[];
  created_at?: string;
};

const DATABASE_NOT_CONFIGURED = "Database is not configured";

let adminClient: SupabaseClient | null = null;

function getSupabaseEnv() {
  const supabaseUrl =
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  return {
    supabaseUrl,
    serviceRoleKey,
    hasSupabaseUrl: Boolean(supabaseUrl),
    hasServiceRoleKey: Boolean(serviceRoleKey),
  };
}

export function getSupabaseAdmin(): SupabaseClient {
  const { supabaseUrl, serviceRoleKey } = getSupabaseEnv();

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("[bubble-profile] env check", {
      hasSupabaseUrl: !!process.env.SUPABASE_URL,
      hasNextPublicSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasServiceRoleKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    });
    throw new Error(DATABASE_NOT_CONFIGURED);
  }

  if (!adminClient) {
    adminClient = createClient(supabaseUrl, serviceRoleKey, {
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

  const { data, error } = await supabase
    .from("bubble_profiles")
    .insert({
      name: record.name,
      email: record.email,
      age_group: record.age_group,
      race: record.race?.trim() ? record.race : "",
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
