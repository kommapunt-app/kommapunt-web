const MAX_PROFILE_PHOTO_DATA_URL_LENGTH = 6_000_000;

type ProfilePhotoResponse = {
  ok: boolean;
  message?: string;
  profileImageUrl?: string | null;
};

export async function blobUrlToDataUrl(blobUrl: string): Promise<string> {
  const response = await fetch(blobUrl);
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

export function isValidProfilePhotoDataUrl(value: string): boolean {
  if (!value.startsWith("data:image/")) {
    return false;
  }

  return value.length <= MAX_PROFILE_PHOTO_DATA_URL_LENGTH;
}

export async function fetchProfileImageUrl(
  profileId: string,
): Promise<string | null> {
  const response = await fetch(`/api/bubble-profile/${profileId}/photo`);
  const data = (await response.json()) as ProfilePhotoResponse;

  if (!response.ok || !data.ok) {
    return null;
  }

  return data.profileImageUrl?.trim() || null;
}

export async function saveProfilePhoto(
  profileId: string,
  photoDataUrl: string,
): Promise<string> {
  const response = await fetch(`/api/bubble-profile/${profileId}/photo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ photoDataUrl }),
  });

  const data = (await response.json()) as ProfilePhotoResponse;

  if (!response.ok || !data.ok || !data.profileImageUrl) {
    throw new Error(data.message ?? "Kon nie jou profielfoto stoor nie.");
  }

  return data.profileImageUrl;
}

export async function uploadProfilePhotoFromUrl(
  profileId: string,
  photoUrl: string,
): Promise<string | null> {
  if (photoUrl.startsWith("http://") || photoUrl.startsWith("https://")) {
    return photoUrl;
  }

  if (photoUrl.startsWith("data:image/")) {
    return saveProfilePhoto(profileId, photoUrl);
  }

  if (!photoUrl.startsWith("blob:")) {
    return null;
  }

  const photoDataUrl = await blobUrlToDataUrl(photoUrl);
  return saveProfilePhoto(profileId, photoDataUrl);
}
