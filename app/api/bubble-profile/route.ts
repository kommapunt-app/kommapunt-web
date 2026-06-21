import { insertBubbleProfile } from "@/lib/supabase/admin";
import { validateBubbleProfileRequest } from "@/lib/bubble-profile/validate-request";
import type { BubbleProfileResponse } from "@/lib/bubble-profile/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = validateBubbleProfileRequest(body);

    if (!payload) {
      return Response.json(
        {
          ok: false,
          message:
            "Naam, e-pos, demografie en Bubble-resultate is verplig.",
        } satisfies BubbleProfileResponse,
        { status: 400 },
      );
    }

    const profileId = await insertBubbleProfile({
      name: payload.name,
      email: payload.email,
      age_group: payload.ageGroup,
      race: payload.race,
      province: payload.province,
      ranked_values: payload.rankedValues,
      top_5_values: payload.top5Values,
      top_10_values: payload.top10Values,
      scores: payload.scores,
    });

    return Response.json({
      ok: true,
      message: "Profiel gestoor.",
      profileId,
    } satisfies BubbleProfileResponse);
  } catch (error) {
    console.error("[POST /api/bubble-profile] insert failed", error);

    const message =
      error instanceof Error && error.message === "Database is not configured."
        ? "Kon nie jou profiel stoor nie. Probeer later weer."
        : "Kon nie jou profiel stoor nie. Probeer weer.";

    return Response.json(
      { ok: false, message } satisfies BubbleProfileResponse,
      { status: 500 },
    );
  }
}
