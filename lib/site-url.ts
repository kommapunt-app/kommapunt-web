export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://kommapunt.co.za";

export function getPublicProfileUrl(profileId: string): string {
  return `${SITE_URL}/profile/${profileId}`;
}
