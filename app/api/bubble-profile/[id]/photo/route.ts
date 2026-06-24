import { isValidProfileId } from "@/lib/bubble-profile/public-profile";
import { isValidProfilePhotoDataUrl } from "@/lib/bubble-profile/profile-photo";
import {
  getBubbleProfileById,
  updateBubbleProfileImageUrl,
} from "@/lib/supabase/admin";
import {
  parseProfileImageDataUrl,
  uploadProfileImage,
} from "@/lib/supabase/profile-image-storage";

type PhotoRouteResponse = {
  ok: boolean;
  message: string;
  profileImageUrl?: string | null;
};

type ProfilePhotoRouteProps = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: ProfilePhotoRouteProps) {
  try {
    const { id } = await params;

    if (!isValidProfileId(id)) {
      return Response.json(
        { ok: false, message: "Ongeldige profiel-ID." } satisfies PhotoRouteResponse,
        { status: 400 },
      );
    }

    const profile = await getBubbleProfileById(id);

    if (!profile) {
      return Response.json(
        { ok: false, message: "Profiel nie gevind nie." } satisfies PhotoRouteResponse,
        { status: 404 },
      );
    }

    return Response.json({
      ok: true,
      message: "Profielfoto beskikbaar.",
      profileImageUrl: profile.profile_image_url,
    } satisfies PhotoRouteResponse);
  } catch (error) {
    console.error("[bubble-profile-photo] GET failed", error);

    return Response.json(
      {
        ok: false,
        message: "Kon nie profielfoto laai nie.",
      } satisfies PhotoRouteResponse,
      { status: 500 },
    );
  }
}

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

    const profile = await getBubbleProfileById(id);

    if (!profile) {
      return Response.json(
        { ok: false, message: "Profiel nie gevind nie." } satisfies PhotoRouteResponse,
        { status: 404 },
      );
    }

    const { contentType, buffer } = parseProfileImageDataUrl(photoDataUrl);
    const profileImageUrl = await uploadProfileImage(id, buffer, contentType);
    const updated = await updateBubbleProfileImageUrl(id, profileImageUrl);

    if (!updated) {
      return Response.json(
        { ok: false, message: "Profiel nie gevind nie." } satisfies PhotoRouteResponse,
        { status: 404 },
      );
    }

    return Response.json({
      ok: true,
      message: "Profielfoto gestoor.",
      profileImageUrl,
    } satisfies PhotoRouteResponse);
  } catch (error) {
    console.error("[bubble-profile-photo] POST failed", error);

    return Response.json(
      {
        ok: false,
        message: "Kon nie jou profielfoto stoor nie. Probeer weer.",
      } satisfies PhotoRouteResponse,
      { status: 500 },
    );
  }
}
