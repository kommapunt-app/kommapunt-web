const MAX_PROFILE_PHOTO_DATA_URL_LENGTH = 600_000;

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

export async function saveProfilePhoto(
  profileId: string,
  photoDataUrl: string,
): Promise<void> {
  const response = await fetch(`/api/bubble-profile/${profileId}/photo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ photoDataUrl }),
  });

  const data = (await response.json()) as { ok?: boolean; message?: string };

  if (!response.ok || !data.ok) {
    throw new Error(data.message ?? "Kon nie jou profielfoto stoor nie.");
  }
}

export async function uploadProfilePhotoFromUrl(
  profileId: string,
  photoUrl: string,
): Promise<void> {
  if (photoUrl.startsWith("data:image/")) {
    await saveProfilePhoto(profileId, photoUrl);
    return;
  }

  if (!photoUrl.startsWith("blob:")) {
    return;
  }

  const photoDataUrl = await blobUrlToDataUrl(photoUrl);
  await saveProfilePhoto(profileId, photoDataUrl);
}
