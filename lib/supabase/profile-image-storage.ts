import { getSupabaseAdmin } from "@/lib/supabase/admin";

const PROFILE_IMAGE_BUCKET = "profile-images";

const MIME_EXTENSION: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export function parseProfileImageDataUrl(dataUrl: string): {
  contentType: string;
  buffer: Buffer;
} {
  const match = dataUrl.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);

  if (!match?.[1] || !match[2]) {
    throw new Error("Invalid image data URL");
  }

  return {
    contentType: match[1],
    buffer: Buffer.from(match[2], "base64"),
  };
}

function getExtension(contentType: string): string {
  return MIME_EXTENSION[contentType.toLowerCase()] ?? "jpg";
}

export async function uploadProfileImage(
  profileId: string,
  buffer: Buffer,
  contentType: string,
): Promise<string> {
  const supabase = getSupabaseAdmin();
  const extension = getExtension(contentType);
  const path = `${profileId}/profile.${extension}`;

  const { error } = await supabase.storage
    .from(PROFILE_IMAGE_BUCKET)
    .upload(path, buffer, {
      contentType,
      upsert: true,
      cacheControl: "31536000",
    });

  if (error) {
    console.error("[uploadProfileImage] storage upload error", error);
    throw error;
  }

  const { data } = supabase.storage
    .from(PROFILE_IMAGE_BUCKET)
    .getPublicUrl(path);

  return `${data.publicUrl}?v=${Date.now()}`;
}
