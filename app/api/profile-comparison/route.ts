import { isValidProfileId } from "@/lib/bubble-profile/public-profile";
import { getComparisonTypeDefinition } from "@/lib/profile-comparison/comparison-types";
import { computeComparisonResult } from "@/lib/profile-comparison/compute";
import type {
  ComparisonProfileSummary,
  CreateProfileComparisonRequest,
  ProfileComparisonResponse,
} from "@/lib/profile-comparison/types";
import { PREMIUM_FEATURE_PROFILE_COMPARISON } from "@/lib/premium/constants";
import { getPremiumFeatureAccess } from "@/lib/premium/check-access";
import {
  getBubbleProfileById,
  getProfileComparisonById,
  insertProfileComparison,
} from "@/lib/supabase/admin";

function toComparisonProfileSummary(
  row: NonNullable<Awaited<ReturnType<typeof getBubbleProfileById>>>,
): ComparisonProfileSummary {
  return {
    id: row.id,
    name: row.name,
    top5Values: row.top_5_values,
    top10Values: row.top_10_values,
    rankedValues: row.ranked_values,
  };
}

function parseCreateRequest(
  body: unknown,
): CreateProfileComparisonRequest | null {
  if (!body || typeof body !== "object") {
    return null;
  }

  const payload = body as Partial<CreateProfileComparisonRequest>;

  if (
    !payload.comparisonType ||
    !payload.initiatorProfileId ||
    !payload.leftProfileId ||
    !payload.rightProfileId
  ) {
    return null;
  }

  if (
    !isValidProfileId(payload.initiatorProfileId) ||
    !isValidProfileId(payload.leftProfileId) ||
    !isValidProfileId(payload.rightProfileId)
  ) {
    return null;
  }

  return {
    comparisonType: payload.comparisonType,
    initiatorProfileId: payload.initiatorProfileId,
    leftProfileId: payload.leftProfileId,
    rightProfileId: payload.rightProfileId,
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const comparisonId = searchParams.get("id")?.trim();
  const initiatorProfileId = searchParams.get("initiatorProfileId")?.trim();

  if (!comparisonId || !isValidProfileId(comparisonId)) {
    return Response.json(
      {
        ok: false,
        message: "Geldige vergelyking-ID is verplig.",
      } satisfies ProfileComparisonResponse,
      { status: 400 },
    );
  }

  if (!initiatorProfileId || !isValidProfileId(initiatorProfileId)) {
    return Response.json(
      {
        ok: false,
        message: "Geldige profiel-ID is verplig om resultate te sien.",
      } satisfies ProfileComparisonResponse,
      { status: 400 },
    );
  }

  try {
    const access = await getPremiumFeatureAccess(
      initiatorProfileId,
      PREMIUM_FEATURE_PROFILE_COMPARISON,
    );

    if (!access.hasAccess) {
      return Response.json(
        {
          ok: false,
          message: "Premium-toegang is nodig om vergelykings te sien.",
        } satisfies ProfileComparisonResponse,
        { status: 403 },
      );
    }

    const comparison = await getProfileComparisonById(comparisonId);

    if (!comparison) {
      return Response.json(
        {
          ok: false,
          message: "Vergelyking nie gevind nie.",
        } satisfies ProfileComparisonResponse,
        { status: 404 },
      );
    }

    return Response.json({
      ok: true,
      message: "Vergelyking gelaai.",
      comparisonId: comparison.id,
      comparison,
    } satisfies ProfileComparisonResponse);
  } catch (error) {
    console.error("[profile-comparison] GET failed", error);

    return Response.json(
      {
        ok: false,
        message: "Kon nie vergelyking laai nie.",
      } satisfies ProfileComparisonResponse,
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = parseCreateRequest(body);

    if (!payload) {
      return Response.json(
        {
          ok: false,
          message: "Ongeldige vergelykingsversoek.",
        } satisfies ProfileComparisonResponse,
        { status: 400 },
      );
    }

    const typeDefinition = getComparisonTypeDefinition(payload.comparisonType);

    if (!typeDefinition?.available) {
      return Response.json(
        {
          ok: false,
          message: "Hierdie vergelykingstipe is nog nie beskikbaar nie.",
        } satisfies ProfileComparisonResponse,
        { status: 400 },
      );
    }

    const access = await getPremiumFeatureAccess(
      payload.initiatorProfileId,
      PREMIUM_FEATURE_PROFILE_COMPARISON,
    );

    if (!access.hasAccess) {
      return Response.json(
        {
          ok: false,
          message: "Premium-toegang is nodig om profiele te vergelyk.",
        } satisfies ProfileComparisonResponse,
        { status: 403 },
      );
    }

    const [leftRow, rightRow] = await Promise.all([
      getBubbleProfileById(payload.leftProfileId),
      getBubbleProfileById(payload.rightProfileId),
    ]);

    if (!leftRow || !rightRow) {
      return Response.json(
        {
          ok: false,
          message: "Een of albei profiele kon nie gevind word nie.",
        } satisfies ProfileComparisonResponse,
        { status: 404 },
      );
    }

    const leftProfile = toComparisonProfileSummary(leftRow);
    const rightProfile = toComparisonProfileSummary(rightRow);
    const result = computeComparisonResult(leftProfile, rightProfile);

    const comparisonId = await insertProfileComparison({
      comparison_type: payload.comparisonType,
      initiator_profile_id: payload.initiatorProfileId,
      left_side: {
        entityType: "profile",
        entityIds: [leftProfile.id],
        label: leftProfile.name,
      },
      right_side: {
        entityType: "profile",
        entityIds: [rightProfile.id],
        label: rightProfile.name,
      },
      similarity_score: result.similarityScore,
      result,
      metadata: {
        leftName: leftProfile.name,
        rightName: rightProfile.name,
      },
    });

    const comparison = await getProfileComparisonById(comparisonId);

    return Response.json({
      ok: true,
      message: "Vergelyking voltooi.",
      comparisonId,
      comparison: comparison ?? undefined,
    } satisfies ProfileComparisonResponse);
  } catch (error) {
    console.error("[profile-comparison] POST failed", error);

    return Response.json(
      {
        ok: false,
        message: "Kon nie vergelyking uitvoer nie.",
      } satisfies ProfileComparisonResponse,
      { status: 500 },
    );
  }
}
