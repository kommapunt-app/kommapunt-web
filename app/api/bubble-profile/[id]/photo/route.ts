import { isValidProfileId } from "@/lib/bubble-profile/public-profile";
import { isValidProfilePhotoDataUrl } from "@/lib/bubble-profile/profile-photo";
import { updateBubbleProfilePhoto } from "@/lib/supabase/admin";

type PhotoRouteResponse = {
  ok: boolean;
  message: string;
};

type ProfilePhotoRouteProps = {
  params: Promise<{ id: string }>;
};

export async function POST(request: Request, { params }: ProfilePhotoRouteProps) {
  try {
    const { id } = await params;

    if (!isValidProfileId(id)) {
      return Response.json(
        { ok: false, message: "Ongeldige profiel-ID." } satisfies PhotoRouteResponse,
        { status: 400 },
      );
    }

    const body = (await request.json()) as { photoDataUrl?: unknown };
    const photoDataUrl =
      typeof body.photoDataUrl === "string" ? body.photoDataUrl.trim() : "";

    if (!photoDataUrl || !isValidProfilePhotoDataUrl(photoDataUrl)) {
      return Response.json(
        {
          ok: false,
          message: "Laai 'n geldige profielfoto op.",
        } satisfies PhotoRouteResponse,
        { status: 400 },
      );
    }

    const updated = await updateBubbleProfilePhoto(id, photoDataUrl);

    if (!updated) {
      return Response.json(
        { ok: false, message: "Profiel nie gevind nie." } satisfies PhotoRouteResponse,
        { status: 404 },
      );
    }

    return Response.json({
      ok: true,
      message: "Profielfoto gestoor.",
    } satisfies PhotoRouteResponse);
  } catch (error) {
    console.error("[bubble-profile-photo] failed", error);

    return Response.json(
      {
        ok: false,
        message: "Kon nie jou profielfoto stoor nie. Probeer weer.",
      } satisfies PhotoRouteResponse,
      { status: 500 },
    );
  }
}
