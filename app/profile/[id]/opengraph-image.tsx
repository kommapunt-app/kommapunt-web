import { ImageResponse } from "next/og";
import {
  PROFILE_CENTER_FALLBACK_SRC,
  PROFILE_OG_LOGO_IMAGE,
  PROFILE_OG_TITLE,
} from "@/lib/profile-card";
import { SITE_URL } from "@/lib/site-url";

export const runtime = "edge";

export const alt = PROFILE_OG_TITLE;
export const size = {
  width: PROFILE_OG_LOGO_IMAGE.width,
  height: PROFILE_OG_LOGO_IMAGE.height,
};
export const contentType = "image/png";

type ProfileOgImageProps = {
  params: Promise<{ id: string }>;
};

/** Profile link previews always use the KommaPunt logo — not the user's photo. */
export default async function ProfileOgImage(_props: ProfileOgImageProps) {
  const logoMarkUrl = `${SITE_URL}${PROFILE_CENTER_FALLBACK_SRC}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F5DD00",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoMarkUrl}
          alt={PROFILE_OG_LOGO_IMAGE.alt}
          width={PROFILE_OG_LOGO_IMAGE.width}
          height={PROFILE_OG_LOGO_IMAGE.height}
          style={{
            objectFit: "contain",
          }}
        />
      </div>
    ),
    {
      ...size,
    },
  );
}
