import { insertBubbleProfile } from "@/lib/supabase/admin";
import { validateBubbleProfileRequest } from "@/lib/bubble-profile/validate-request";
import type { BubbleProfileResponse } from "@/lib/bubble-profile/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = validateBubbleProfileRequest(body);

    if (!payload) {
      console.error("[bubble-profile] failed", {
        reason: "validation",
        body,
      });

      return Response.json(
        {
          ok: false,
          message:
            "Naam, e-pos, ouderdom, provinsie en Bubble-resultate is verplig.",
        } satisfies BubbleProfileResponse,
        { status: 400 },
      );
    }

    const insertRecord = {
      name: payload.name,
      email: payload.email,
      age_group: payload.ageGroup,
      date_of_birth: payload.dateOfBirth,
      race: "",
      province: payload.province,
      ranked_values: payload.rankedValues,
      top_5_values: payload.top5Values,
      top_10_values: payload.top10Values,
      scores: payload.scores,
    };

    console.log("[bubble-profile] inserting", insertRecord);

    const profileId = await insertBubbleProfile(insertRecord);

    console.log("[bubble-profile] inserted", profileId);

    return Response.json({
      ok: true,
      message: "Profiel gestoor.",
      profileId,
    } satisfies BubbleProfileResponse);
  } catch (error) {
    console.error("[bubble-profile] failed", error);

    const supabaseCode =
      error &&
      typeof error === "object" &&
      "code" in error &&
      typeof (error as { code: unknown }).code === "string"
        ? (error as { code: string }).code
        : null;

    let message = "Kon nie jou profiel stoor nie. Probeer weer.";

    if (error instanceof Error && error.message === "Database is not configured") {
      message = "Kon nie jou profiel stoor nie. Probeer later weer.";
    } else if (supabaseCode === "42501") {
      message =
        "Kon nie jou profiel stoor nie. Databasis-toestemming ontbreek — kontak die admin.";
    } else if (supabaseCode === "23502") {
      message =
        "Kon nie jou profiel stoor nie. Databasis-skema moet opgedateer word (race kolom).";
    } else if (supabaseCode === "23505") {
      message = "Kon nie jou profiel stoor nie. Hierdie profiel bestaan reeds.";
    }

    return Response.json(
      { ok: false, message } satisfies BubbleProfileResponse,
      { status: 500 },
    );
  }
}
