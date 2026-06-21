import { toBubbleProfileApiPayload } from "@/lib/bubble-profile/build-payload";
import type {
  BubbleProfileRequest,
  BubbleProfileResponse,
} from "@/lib/bubble-profile/types";

export async function saveBubbleProfile(
  request: BubbleProfileRequest,
): Promise<BubbleProfileResponse> {
  const payload = toBubbleProfileApiPayload(request);

  const response = await fetch("/api/bubble-profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as BubbleProfileResponse;

  if (!response.ok || !data.ok) {
    console.error("[saveBubbleProfile] request failed", {
      status: response.status,
      body: data,
      payload,
    });
    throw new Error(data.message ?? "Kon nie jou profiel stoor nie.");
  }

  return data;
}
