import { createClient, type SupabaseClient } from "@supabase/supabase-js";
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
