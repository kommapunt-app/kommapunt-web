import type { RankedBubbleResult } from "@/lib/results";
import {
  STORAGE_KEY_SHARE_CONTACT,
  type ShareContact,
  type ShareLeadBubbleResult,
  type ShareLeadRequest,
  type ShareLeadResponse,
} from "@/lib/share-leads";

export function loadShareContactFromSession(): ShareContact | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY_SHARE_CONTACT);

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as ShareContact;

    if (!parsed.name?.trim() || !parsed.email?.trim()) {
      return null;
    }

    return {
      name: parsed.name.trim(),
      email: parsed.email.trim(),
    };
  } catch {
    return null;
  }
}

export function saveShareContactToSession(contact: ShareContact) {
  sessionStorage.setItem(
    STORAGE_KEY_SHARE_CONTACT,
    JSON.stringify({
      name: contact.name.trim(),
      email: contact.email.trim(),
    }),
  );
}

export function toShareLeadBubbleResults(
  results: RankedBubbleResult[],
): ShareLeadBubbleResult[] {
  return results.map((item) => ({
    id: item.id,
    rank: item.rank,
    score: item.score,
    nameAf: item.bubble.nameAf,
    nameEn: item.bubble.nameEn,
    category: item.bubble.category,
  }));
}

/** Lightweight name/email capture — separate from full bubble profile save. */
export async function saveShareLead(
  payload: ShareLeadRequest,
): Promise<ShareLeadResponse> {
  const response = await fetch("/api/share/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as ShareLeadResponse;

  if (!response.ok || !data.ok) {
    console.error("[saveShareLead] request failed", {
      status: response.status,
      body: data,
    });
    throw new Error(data.message ?? "Kon nie jou besonderhede stoor nie.");
  }

  return data;
}
