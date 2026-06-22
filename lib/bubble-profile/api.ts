import { toBubbleProfileApiPayload } from "@/lib/bubble-profile/build-payload";
import type {
  BubbleProfileRequest,
  BubbleProfileResponse,
} from "@/lib/bubble-profile/types";

export async function saveBubbleProfile(
  request: BubbleProfileRequest,
): Promise<BubbleProfileResponse> {
  const payload = toBubbleProfileApiPayload(request);

  console.log("[bubble-profile] submitting", payload);

  const response = await fetch("/api/bubble-profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as BubbleProfileResponse;

  console.log("[bubble-profile] response", {
    status: response.status,
    body: data,
  });

  if (!response.ok || !data.ok) {
    console.error("[bubble-profile] failed", {
      status: response.status,
      body: data,
      payload,
    });
    throw new Error(data.message ?? "Kon nie jou profiel stoor nie.");
  }

  return data;
}
