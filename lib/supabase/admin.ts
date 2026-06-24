import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type {
  BubbleProfileRequest,
  RankedValueRecord,
} from "@/lib/bubble-profile/types";
import type { ShareLeadBubbleResult } from "@/lib/share-leads";
import type {
  ComparisonResult,
  ComparisonSide,
  ComparisonType,
  ProfileComparisonRecord,
} from "@/lib/profile-comparison/types";

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
  date_of_birth: string | null;
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
      date_of_birth: record.date_of_birth,
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

export type BubbleProfilePublicRow = {
  id: string;
  name: string;
  ranked_values: RankedValueRecord[];
  top_5_values: string[];
  top_10_values: string[];
  scores: Record<string, number> | null;
  profile_image_url: string | null;
};

export async function getBubbleProfileById(
  id: string,
): Promise<BubbleProfilePublicRow | null> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("bubble_profiles")
    .select(
      "id, name, ranked_values, top_5_values, top_10_values, scores, profile_image_url",
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("[getBubbleProfileById] Supabase read error", error);
    throw error;
  }

  return data;
}

export async function updateBubbleProfileImageUrl(
  id: string,
  profileImageUrl: string,
): Promise<boolean> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("bubble_profiles")
    .update({ profile_image_url: profileImageUrl })
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error) {
    console.error("[updateBubbleProfileImageUrl] Supabase update error", error);
    throw error;
  }

  return data !== null;
}

type ProfileComparisonRow = {
  id: string;
  comparison_type: ComparisonType;
  status: "draft" | "completed" | "archived";
  initiator_profile_id: string | null;
  left_side: ComparisonSide;
  right_side: ComparisonSide;
  similarity_score: number | null;
  result: ComparisonResult;
  metadata: Record<string, unknown> | null;
  created_at: string;
};

function mapProfileComparisonRow(row: ProfileComparisonRow): ProfileComparisonRecord {
  return {
    id: row.id,
    comparisonType: row.comparison_type,
    status: row.status,
    initiatorProfileId: row.initiator_profile_id,
    leftSide: row.left_side,
    rightSide: row.right_side,
    similarityScore: row.similarity_score,
    result: row.result,
    metadata: row.metadata ?? {},
    createdAt: row.created_at,
  };
}

export type InsertProfileComparisonRecord = {
  comparison_type: ComparisonType;
  initiator_profile_id: string;
  left_side: ComparisonSide;
  right_side: ComparisonSide;
  similarity_score: number;
  result: ComparisonResult;
  metadata?: Record<string, unknown>;
};

export async function insertProfileComparison(
  record: InsertProfileComparisonRecord,
): Promise<string> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("profile_comparisons")
    .insert({
      comparison_type: record.comparison_type,
      status: "completed",
      initiator_profile_id: record.initiator_profile_id,
      left_side: record.left_side,
      right_side: record.right_side,
      similarity_score: record.similarity_score,
      result: record.result,
      metadata: record.metadata ?? {},
    })
    .select("id")
    .single();

  if (error) {
    console.error("[insertProfileComparison] Supabase insert error", error);
    throw error;
  }

  return data.id;
}

export async function getProfileComparisonById(
  id: string,
): Promise<ProfileComparisonRecord | null> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("profile_comparisons")
    .select(
      "id, comparison_type, status, initiator_profile_id, left_side, right_side, similarity_score, result, metadata, created_at",
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("[getProfileComparisonById] Supabase read error", error);
    throw error;
  }

  if (!data) {
    return null;
  }

  return mapProfileComparisonRow(data as ProfileComparisonRow);
}
