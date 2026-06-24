import { ImageResponse } from "next/og";
import { rankedRecordsToResults } from "@/lib/bubble-profile/from-records";
import { fetchPublicBubbleProfile } from "@/lib/bubble-profile/public-profile";
import {
  getAbsoluteProfileImageUrl,
  getUploadedProfileImageUrl,
  KOMMA_PUNT_MARK_SRC,
  PROFILE_CARD_INTRO_TEXT,
  PROFILE_CARD_QUOTE,
  PROFILE_CARD_TITLE,
  PROFILE_CENTER_FALLBACK_SRC,
  PROFILE_OG_LOGO_IMAGE,
  PROFILE_OG_TITLE,
} from "@/lib/profile-card";
import { SITE_URL } from "@/lib/site-url";

export const runtime = "edge";

export const alt = PROFILE_OG_TITLE;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BUBBLE_COLORS = [
  { fill: "#FF1493", text: "#FFFFFF" },
  { fill: "#F5DD00", text: "#000000" },
  { fill: "#FFFFFF", text: "#000000" },
  { fill: "#F5DD00", text: "#000000" },
  { fill: "#FFFFFF", text: "#000000" },
] as const;

const BUBBLE_LAYOUT = [
  { x: 170, y: 170, r: 78 },
  { x: 360, y: 120, r: 62 },
  { x: 430, y: 255, r: 52 },
  { x: 330, y: 360, r: 48 },
  { x: 180, y: 330, r: 44 },
] as const;

const CENTER = { x: 285, y: 265, r: 72 };

async function loadOutfitBold(): Promise<ArrayBuffer> {
  const response = await fetch(
    "https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1W4b6OClOi6ZmLPqV_Jg.woff",
  );

  if (!response.ok) {
    throw new Error("Failed to load Outfit font");
  }

  return response.arrayBuffer();
}

function truncateLabel(label: string, maxLength: number): string {
  const trimmed = label.trim();

  if (trimmed.length <= maxLength) {
    return trimmed;
  }

  return `${trimmed.slice(0, maxLength - 1).trimEnd()}…`;
}

function renderLogoFallbackImage(logoUrl: string) {
  return (
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
        src={logoUrl}
        alt={PROFILE_OG_LOGO_IMAGE.alt}
        width={PROFILE_OG_LOGO_IMAGE.width}
        height={PROFILE_OG_LOGO_IMAGE.height}
        style={{
          objectFit: "contain",
        }}
      />
    </div>
  );
}

type ProfileOgImageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProfileOgImage({ params }: ProfileOgImageProps) {
  const { id } = await params;
  const profile = await fetchPublicBubbleProfile(id);
  const outfitBold = await loadOutfitBold();
  const logoMarkUrl = `${SITE_URL}${PROFILE_CENTER_FALLBACK_SRC}`;
  const footerLogoUrl = `${SITE_URL}${KOMMA_PUNT_MARK_SRC}`;

  if (!profile || !getUploadedProfileImageUrl(profile.profileImageUrl)) {
    return new ImageResponse(renderLogoFallbackImage(logoMarkUrl), {
      ...size,
    });
  }

  const rankedBubbles = rankedRecordsToResults(profile.rankedValues).slice(0, 5);
  const centerImage = getAbsoluteProfileImageUrl(profile, SITE_URL);

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
          padding: 28,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            background: "#F5DD00",
            border: "6px solid #000000",
            borderRadius: 32,
            boxShadow: "8px 8px 0 0 #FF1493",
            overflow: "hidden",
            fontFamily: "Outfit",
          }}
        >
          <div
            style={{
              width: 560,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              position: "relative",
              background: "#F5DD00",
              borderRight: "4px solid rgba(0,0,0,0.12)",
            }}
          >
            {rankedBubbles.map((item, index) => {
              const layout = BUBBLE_LAYOUT[index];
              const colors = BUBBLE_COLORS[index] ?? BUBBLE_COLORS[4];

              if (!layout) {
                return null;
              }

              return (
                <div
                  key={item.id}
                  style={{
                    position: "absolute",
                    left: layout.x - layout.r,
                    top: layout.y - layout.r,
                    width: layout.r * 2,
                    height: layout.r * 2,
                    borderRadius: "50%",
                    background: colors.fill,
                    border: "5px solid #000000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    color: colors.text,
                    fontSize: layout.r > 60 ? 22 : 18,
                    fontWeight: 800,
                    padding: 10,
                    lineHeight: 1.1,
                  }}
                >
                  {truncateLabel(item.bubble.nameAf, layout.r > 60 ? 16 : 12)}
                </div>
              );
            })}

            <div
              style={{
                position: "absolute",
                left: CENTER.x - CENTER.r,
                top: CENTER.y - CENTER.r,
                width: CENTER.r * 2,
                height: CENTER.r * 2,
                borderRadius: "50%",
                border: "6px solid #000000",
                overflow: "hidden",
                background: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={centerImage}
                alt=""
                width={CENTER.r * 2}
                height={CENTER.r * 2}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "34px 36px",
              background: "#F5DD00",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(0,0,0,0.55)",
                }}
              >
                {PROFILE_CARD_TITLE}
              </div>
              <div
                style={{
                  marginTop: 12,
                  fontSize: 44,
                  fontWeight: 800,
                  lineHeight: 1.05,
                  color: "#000000",
                }}
              >
                {profile.name}
              </div>
              <div
                style={{
                  marginTop: 14,
                  fontSize: 24,
                  fontWeight: 600,
                  lineHeight: 1.35,
                  color: "rgba(0,0,0,0.78)",
                }}
              >
                {PROFILE_CARD_INTRO_TEXT}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  lineHeight: 1.25,
                  color: "#000000",
                }}
              >
                {PROFILE_CARD_QUOTE.lines.map((line) => (
                  <div key={line}>{line}</div>
                ))}
                <div
                  style={{
                    marginTop: 10,
                    fontSize: 16,
                    fontWeight: 600,
                    color: "rgba(0,0,0,0.45)",
                  }}
                >
                  — {PROFILE_CARD_QUOTE.author}
                </div>
              </div>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={footerLogoUrl}
                alt="KommaPunt"
                width={220}
                height={52}
                style={{
                  width: 220,
                  height: "auto",
                  objectFit: "contain",
                  alignSelf: "flex-end",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Outfit", data: outfitBold, style: "normal", weight: 800 }],
    },
  );
}
