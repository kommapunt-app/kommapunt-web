import { isValidProfileId } from "@/lib/bubble-profile/public-profile";
import {
  PREMIUM_FEATURE_PROFILE_COMPARISON,
  PREMIUM_STATUS_PENDING,
} from "@/lib/premium/constants";
import { getPremiumFeatureAccess } from "@/lib/premium/check-access";
import type { PremiumAccessResponse } from "@/lib/premium/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const profileId = searchParams.get("profileId")?.trim();

  if (!profileId || !isValidProfileId(profileId)) {
    return Response.json(
      {
        ok: false,
        hasAccess: false,
        feature: PREMIUM_FEATURE_PROFILE_COMPARISON,
        status: null,
        message: "Geldige profiel-ID is verplig.",
      } satisfies PremiumAccessResponse,
      { status: 400 },
    );
  }

  try {
    const access = await getPremiumFeatureAccess(
      profileId,
      PREMIUM_FEATURE_PROFILE_COMPARISON,
    );

    return Response.json({
      ok: true,
      hasAccess: access.hasAccess,
      feature: PREMIUM_FEATURE_PROFILE_COMPARISON,
      status: access.status ?? PREMIUM_STATUS_PENDING,
    } satisfies PremiumAccessResponse);
  } catch (error) {
    console.error("[premium/status] failed", error);

    return Response.json(
      {
        ok: false,
        hasAccess: false,
        feature: PREMIUM_FEATURE_PROFILE_COMPARISON,
        status: null,
        message: "Kon nie premium-toegang kontroleer nie.",
      } satisfies PremiumAccessResponse,
      { status: 500 },
    );
  }
}
