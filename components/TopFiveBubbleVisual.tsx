"use client";

import { useEffect, useId, useRef, useState } from "react";
import { formatBubbleLabel } from "@/lib/bubble-label";
import {
  getProfileCenterImageSrc,
  getUploadedProfileImageUrl,
  PROFILE_CENTER_FALLBACK_SRC,
} from "@/lib/profile-card";
import type { RankedBubbleResult } from "@/lib/results";

const VIEWBOX_WIDTH = 1000;
const VIEWBOX_HEIGHT = 700;
const VIEWBOX_PAD = 12;

const FRAME_BORDER = {
  default: { inset: 30, rx: 40, strokeWidth: 8 },
  compact: { inset: 20, rx: 28, strokeWidth: 5 },
} as const;

const CENTER = { cx: 500, cy: 360, r: 135 };
const CENTER_LEFT_PCT = (CENTER.cx / VIEWBOX_WIDTH) * 100;
const CENTER_WIDTH_PCT = ((CENTER.r * 2) / VIEWBOX_WIDTH) * 100;

const VALUE_BUBBLES = [
  {
    cx: 300,
    cy: 250,
    r: 185,
    floatValues: "0,0; -2,-4; 0,0",
    dur: 7,
    delay: 0,
  },
  {
    cx: 635,
    cy: 220,
    r: 145,
    floatValues: "0,0; 3,-3; 0,0",
    dur: 7.5,
    delay: 0.8,
  },
  {
    cx: 735,
    cy: 410,
    r: 120,
    floatValues: "0,0; 3,-2; 0,0",
    dur: 6.8,
    delay: 1.2,
  },
  {
    cx: 560,
    cy: 545,
    r: 110,
    floatValues: "0,0; 2,4; 0,0",
    dur: 7.2,
    delay: 1.6,
  },
  {
    cx: 335,
    cy: 500,
    r: 100,
    floatValues: "0,0; -2,3; 0,0",
    dur: 6.5,
    delay: 2,
  },
] as const;

const OFF_WHITE = "#F5F5F0";
const KOMMA_YELLOW = "#F5DD00";
const KOMMA_PINK = "#FF1493";
const KOMMA_WHITE = "#FFFFFF";

const DEMO_BUBBLE_COLORS = [
  { fill: KOMMA_PINK, text: KOMMA_WHITE },
  { fill: KOMMA_YELLOW, text: "#000000" },
  { fill: KOMMA_WHITE, text: "#000000" },
  { fill: KOMMA_YELLOW, text: "#000000" },
  { fill: KOMMA_WHITE, text: "#000000" },
] as const;

function getLabelFontSize(radius: number): number {
  if (radius >= 170) {
    return 32;
  }

  if (radius >= 140) {
    return 28;
  }

  if (radius >= 120) {
    return 24;
  }

  if (radius >= 100) {
    return 20;
  }

  if (radius >= 90) {
    return 18;
  }

  return 16;
}

function getLineHeight(fontSize: number): number {
  return Math.round(fontSize * 1.15);
}

function estimateTextWidth(text: string, fontSize: number): number {
  const narrowChars = (text.match(/[iIljft1.]/g) ?? []).length;
  const wideChars = (text.match(/[mwMW]/g) ?? []).length;
  const normalChars = text.length - narrowChars - wideChars;

  return (
    narrowChars * fontSize * 0.28 +
    normalChars * fontSize * 0.58 +
    wideChars * fontSize * 0.72
  );
}

function getMaxTextWidth(radius: number): number {
  return radius * 1.75;
}

function getMinFontSize(radius: number): number {
  if (radius >= 170) {
    return 24;
  }

  if (radius >= 140) {
    return 20;
  }

  if (radius >= 120) {
    return 18;
  }

  if (radius >= 100) {
    return 16;
  }

  return 14;
}

function getVisualLabelLayout(
  label: string,
  radius: number,
): { lines: string[]; fontSize: number } {
  const trimmed = label.trim();
  const baseFontSize = getLabelFontSize(radius);
  const minFontSize = getMinFontSize(radius);
  const maxWidth = getMaxTextWidth(radius);

  for (let fontSize = baseFontSize; fontSize >= minFontSize; fontSize -= 1) {
    if (estimateTextWidth(trimmed, fontSize) <= maxWidth) {
      return { lines: [trimmed], fontSize };
    }
  }

  return {
    lines: formatBubbleLabel(label),
    fontSize: baseFontSize,
  };
}

interface ValueBubblePositionAdjustment {
  index: number;
  cx?: number;
  cy?: number;
}

function getValueBubblePosition(
  index: number,
  adjustments?: ValueBubblePositionAdjustment[],
) {
  const layout = VALUE_BUBBLES[index];

  if (!layout) {
    return null;
  }

  const adjustment = adjustments?.find((item) => item.index === index);

  return {
    cx: layout.cx + (adjustment?.cx ?? 0),
    cy: layout.cy + (adjustment?.cy ?? 0),
    r: layout.r,
  };
}

interface TopFiveBubbleVisualProps {
  rankedBubbles: RankedBubbleResult[];
  photoUrl?: string | null;
  ariaLabel?: string;
  className?: string;
  colorScheme?: "default" | "demo";
  compact?: boolean;
  frameless?: boolean;
  clusterOffsetY?: number;
  animationPreset?: "default" | "heroFloat";
  /** Vertical offset for centre profile circle only (negative moves up). */
  centerCircleOffsetY?: number;
  /** Per-bubble layout nudges without changing the base cluster. */
  valueBubblePositionAdjustments?: ValueBubblePositionAdjustment[];
  /** Zoom centre photo to fill the circle (1 = default). */
  centerImageScale?: number;
  /** Vertical nudge for centre photo (negative moves up). */
  centerImageOffsetY?: number;
  /** Solid fill behind transparent centre logos. */
  centerImageBackground?: string;
  /** `cover` crops to fill; `contain` fits logo inside the circle. */
  centerImageFit?: "cover" | "contain";
  /** Landing hero only — grey centre avatar instead of KommaPunt logo */
  centerCircleFill?: string;
  defaultCenterImageSrc?: string;
  photoUploadEnabled?: boolean;
  onPhotoChange?: (url: string | null) => void;
}

type BubbleMotion = {
  floatValues: string;
  dur: number;
  delay: number;
  scaleValues?: string;
  scaleDur?: number;
};

const HERO_FLOAT_ANIMATIONS: BubbleMotion[] = [
  {
    floatValues: "0,0; -8,-12; -4,-6; 0,0",
    dur: 8.6,
    delay: 0,
    scaleValues: "1;1.025;1.02;1",
    scaleDur: 9.2,
  },
  {
    floatValues: "0,0; 12,-10; 5,-4; 0,0",
    dur: 9.4,
    delay: 1.2,
    scaleValues: "1;1.03;1.015;1",
    scaleDur: 8.8,
  },
  {
    floatValues: "0,0; 9,-7; -3,-11; 0,0",
    dur: 7.8,
    delay: 2.1,
    scaleValues: "1;1.02;1.03;1",
    scaleDur: 9.6,
  },
  {
    floatValues: "0,0; -6,11; 3,5; 0,0",
    dur: 8.9,
    delay: 0.7,
    scaleValues: "1;1.028;1.02;1",
    scaleDur: 8.2,
  },
  {
    floatValues: "0,0; -11,9; -5,4; 0,0",
    dur: 9.1,
    delay: 1.8,
    scaleValues: "1;1.022;1.03;1",
    scaleDur: 9,
  },
];

function getBubbleMotion(
  index: number,
  animationPreset: "default" | "heroFloat",
): BubbleMotion | null {
  const bubble = VALUE_BUBBLES[index];

  if (!bubble) {
    return null;
  }

  if (animationPreset === "heroFloat") {
    const heroMotion = HERO_FLOAT_ANIMATIONS[index];

    if (heroMotion) {
      return heroMotion;
    }
  }

  return bubble;
}

function getBubbleColors(index: number, colorScheme: "default" | "demo") {
  if (colorScheme === "demo") {
    return DEMO_BUBBLE_COLORS[index] ?? DEMO_BUBBLE_COLORS[4];
  }

  return { fill: OFF_WHITE, text: "#000000" };
}

function ValueBubble({
  cx,
  cy,
  r,
  label,
  floatValues,
  dur,
  delay,
  fill,
  textColor,
  strokeWidth,
  scaleValues,
  scaleDur,
}: {
  cx: number;
  cy: number;
  r: number;
  label: string;
  floatValues: string;
  dur: number;
  delay: number;
  fill: string;
  textColor: string;
  strokeWidth: number;
  scaleValues?: string;
  scaleDur?: number;
}) {
  const { lines, fontSize } = getVisualLabelLayout(label, r);
  const lineHeight = getLineHeight(fontSize);

  const bubbleContent = (
    <>
      <circle
        cx={cx + 4}
        cy={cy + 3}
        r={r}
        fill="none"
        stroke="#000"
        strokeWidth={strokeWidth}
        opacity={0.25}
      />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={fill}
        stroke="#000"
        strokeWidth={strokeWidth}
      />
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={textColor}
        fontSize={fontSize}
        fontWeight={800}
        fontFamily="var(--font-outfit), Outfit, sans-serif"
      >
        {lines.map((line, index) => (
          <tspan
            key={`${line}-${index}`}
            x={cx}
            dy={index === 0 ? -((lines.length - 1) * lineHeight) / 2 : lineHeight}
          >
            {line}
          </tspan>
        ))}
      </text>
    </>
  );

  return (
    <g>
      <animateTransform
        attributeName="transform"
        type="translate"
        values={floatValues}
        dur={`${dur}s`}
        begin={`${delay}s`}
        repeatCount="indefinite"
      />
      {scaleValues ? (
        <g transform={`translate(${cx} ${cy})`}>
          <g>
            <animateTransform
              attributeName="transform"
              type="scale"
              values={scaleValues}
              dur={`${scaleDur ?? dur}s`}
              begin={`${delay}s`}
              repeatCount="indefinite"
            />
            <g transform={`translate(${-cx} ${-cy})`}>{bubbleContent}</g>
          </g>
        </g>
      ) : (
        bubbleContent
      )}
    </g>
  );
}

function useResolvedProfileImageUrl(photoUrl: string | null | undefined) {
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    setLoadFailed(false);

    if (
      !photoUrl ||
      photoUrl.startsWith("blob:") ||
      photoUrl.startsWith("data:image/")
    ) {
      return;
    }

    const image = new window.Image();
    image.onload = () => setLoadFailed(false);
    image.onerror = () => setLoadFailed(true);
    image.src = photoUrl;
  }, [photoUrl]);

  if (!photoUrl || loadFailed) {
    return null;
  }

  return photoUrl;
}

function CenterProfileImage({
  cx,
  cy,
  photoRadius,
  photoDiameter,
  clipId,
  src,
  imageScale = 1,
  imageOffsetX = 0,
  imageOffsetY = 0,
  imageFit = "cover",
  backgroundFill,
}: {
  cx: number;
  cy: number;
  photoRadius: number;
  photoDiameter: number;
  clipId: string;
  src: string;
  imageScale?: number;
  imageOffsetX?: number;
  imageOffsetY?: number;
  imageFit?: "cover" | "contain";
  backgroundFill?: string;
}) {
  const scaledSize = photoDiameter * imageScale;
  const imageX = cx - scaledSize / 2 + imageOffsetX;
  const imageY = cy - scaledSize / 2 + imageOffsetY;
  const preserveAspectRatio =
    imageFit === "contain" ? "xMidYMid meet" : "xMidYMid slice";

  return (
    <g clipPath={`url(#${clipId})`}>
      {backgroundFill ? (
        <circle cx={cx} cy={cy} r={photoRadius} fill={backgroundFill} />
      ) : null}
      <image
        href={src}
        x={imageX}
        y={imageY}
        width={scaledSize}
        height={scaledSize}
        preserveAspectRatio={preserveAspectRatio}
      />
    </g>
  );
}

function DefaultCenterAvatar({
  cx,
  cy,
  r,
  fill,
}: {
  cx: number;
  cy: number;
  r: number;
  fill: string;
}) {
  const iconR = r * 0.22;

  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={fill} />
      <circle cx={cx} cy={cy - r * 0.12} r={iconR} fill="#000" />
      <path
        d={`M ${cx - r * 0.38} ${cy + r * 0.42} Q ${cx} ${cy + r * 0.08} ${cx + r * 0.38} ${cy + r * 0.42}`}
        fill="none"
        stroke="#000"
        strokeWidth={Math.max(6, r * 0.05)}
        strokeLinecap="round"
      />
      <text
        x={cx}
        y={cy + r * 0.58}
        textAnchor="middle"
        fill="#000"
        fontSize={Math.round(r * 0.22)}
        fontWeight={800}
        fontFamily="var(--font-outfit), Outfit, sans-serif"
      >
        Jy
      </text>
    </g>
  );
}

export function TopFiveBubbleVisual({
  rankedBubbles,
  photoUrl = null,
  ariaLabel = "Jou top 5 Bubbles",
  className = "",
  colorScheme = "default",
  compact = false,
  frameless = false,
  clusterOffsetY = 0,
  animationPreset = "default",
  centerCircleOffsetY = 0,
  valueBubblePositionAdjustments,
  centerImageScale = 1,
  centerImageOffsetY = 0,
  centerImageBackground,
  centerImageFit = "cover",
  centerCircleFill,
  defaultCenterImageSrc = PROFILE_CENTER_FALLBACK_SRC,
  photoUploadEnabled = false,
  onPhotoChange,
}: TopFiveBubbleVisualProps) {
  const clipId = useId().replace(/:/g, "");
  const photoInputRef = useRef<HTMLInputElement>(null);
  const trimmedPhotoUrl = photoUrl?.trim() || null;
  const uploadedImageUrl = getUploadedProfileImageUrl(photoUrl);
  const staticImageCandidate =
    !uploadedImageUrl &&
    trimmedPhotoUrl?.startsWith("/") &&
    trimmedPhotoUrl !== PROFILE_CENTER_FALLBACK_SRC
      ? trimmedPhotoUrl
      : null;
  const validatedStaticImageUrl = useResolvedProfileImageUrl(staticImageCandidate);
  const centerImageSrc = uploadedImageUrl
    ? getProfileCenterImageSrc(uploadedImageUrl)
    : validatedStaticImageUrl
      ? getProfileCenterImageSrc(validatedStaticImageUrl)
      : PROFILE_CENTER_FALLBACK_SRC;
  const hasUserUploadedPhoto = Boolean(uploadedImageUrl);
  const topFive = rankedBubbles.slice(0, 5);
  const strokeWidth = compact ? 5 : 8;
  const photoRadius = CENTER.r - strokeWidth / 2;
  const photoDiameter = photoRadius * 2;
  const centerCy = CENTER.cy + centerCircleOffsetY;
  const centerTopPct = (centerCy / VIEWBOX_HEIGHT) * 100;

  const frameBorder = frameless
    ? null
    : compact
      ? FRAME_BORDER.compact
      : FRAME_BORDER.default;

  const viewBox = frameless
    ? `0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`
    : `${-VIEWBOX_PAD} ${-VIEWBOX_PAD} ${VIEWBOX_WIDTH + VIEWBOX_PAD * 2} ${VIEWBOX_HEIGHT + VIEWBOX_PAD * 2}`;

  const frameRadiusClass = frameless
    ? ""
    : compact
      ? "rounded-2xl"
      : "rounded-[2rem]";

  const frameShadowClass = frameless
    ? ""
    : compact
      ? "shadow-[4px_4px_0_0_#000]"
      : "shadow-[6px_6px_0_0_#000]";

  const clusterTransform =
    clusterOffsetY !== 0 ? `translate(0 ${clusterOffsetY})` : undefined;

  function openPhotoPicker() {
    photoInputRef.current?.click();
  }

  function handlePhotoFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file?.type.startsWith("image/") || !onPhotoChange) {
      return;
    }

    onPhotoChange(URL.createObjectURL(file));
  }

  return (
    <div
      className={`relative mx-auto w-full max-w-[900px] overflow-visible ${frameless ? "" : "p-2 sm:p-3"} ${frameRadiusClass} ${frameShadowClass} ${className}`.trim()}
    >
      <svg
        viewBox={viewBox}
        width="100%"
        overflow="visible"
        role="img"
        aria-label={ariaLabel}
        className="block"
      >
        {!frameless && frameBorder && (
          <rect
            x={frameBorder.inset}
            y={frameBorder.inset}
            width={VIEWBOX_WIDTH - frameBorder.inset * 2}
            height={VIEWBOX_HEIGHT - frameBorder.inset * 2}
            rx={frameBorder.rx}
            ry={frameBorder.rx}
            fill={KOMMA_YELLOW}
            stroke="#000"
            strokeWidth={frameBorder.strokeWidth}
          />
        )}

        <defs>
          <clipPath id={clipId}>
            <circle cx={CENTER.cx} cy={centerCy} r={photoRadius} />
          </clipPath>
        </defs>

        <g transform={clusterTransform}>
          {topFive.map((item, index) => {
            const bubble = getBubbleMotion(index, animationPreset);

            if (!bubble) {
              return null;
            }

            const colors = getBubbleColors(index, colorScheme);
            const position = getValueBubblePosition(
              index,
              valueBubblePositionAdjustments,
            );

            if (!position) {
              return null;
            }

            return (
              <ValueBubble
                key={item.id}
                cx={position.cx}
                cy={position.cy}
                r={position.r}
                label={item.bubble.nameAf}
                floatValues={bubble.floatValues}
                dur={bubble.dur}
                delay={bubble.delay}
                scaleValues={bubble.scaleValues}
                scaleDur={bubble.scaleDur}
                fill={colors.fill}
                textColor={colors.text}
                strokeWidth={strokeWidth}
              />
            );
          })}
        </g>

        <g>
          {centerCircleFill && !uploadedImageUrl ? (
            <DefaultCenterAvatar
              cx={CENTER.cx}
              cy={centerCy}
              r={CENTER.r}
              fill={centerCircleFill}
            />
          ) : (
            <CenterProfileImage
              cx={CENTER.cx}
              cy={centerCy}
              photoRadius={photoRadius}
              photoDiameter={photoDiameter}
              clipId={clipId}
              src={centerImageSrc}
              imageScale={centerImageScale}
              imageOffsetY={centerImageOffsetY}
              imageFit={centerImageFit}
              backgroundFill={centerImageBackground}
            />
          )}

          <circle
            cx={CENTER.cx + 3}
            cy={centerCy + 2}
            r={CENTER.r}
            fill="none"
            stroke="#000"
            strokeWidth={strokeWidth}
            opacity={0.25}
          />
          <circle
            cx={CENTER.cx}
            cy={centerCy}
            r={CENTER.r}
            fill="none"
            stroke="#000"
            strokeWidth={strokeWidth}
          />
        </g>
      </svg>

      {photoUploadEnabled && onPhotoChange ? (
        <>
          <input
            ref={photoInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoFileChange}
            className="sr-only"
            aria-hidden
            tabIndex={-1}
          />
          <div
            className="export-exclude pointer-events-none absolute inset-0"
            aria-hidden={false}
          >
            <div
              className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${CENTER_LEFT_PCT}%`,
                top: `${centerTopPct}%`,
                width: `${CENTER_WIDTH_PCT}%`,
              }}
            >
              {hasUserUploadedPhoto ? (
                <button
                  type="button"
                  onClick={openPhotoPicker}
                  className="absolute inset-0 rounded-full opacity-0 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-komma-pink"
                  aria-label="Verander foto"
                />
              ) : (
                <button
                  type="button"
                  onClick={openPhotoPicker}
                  className="absolute left-1/2 top-[calc(50%-60px)] w-[72%] max-w-[8.5rem] -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-komma-black bg-white px-2 py-2 text-center text-[0.6rem] font-extrabold leading-tight shadow-[3px_3px_0_0_#000] transition-all hover:-translate-y-[calc(50%+2px)] hover:bg-komma-yellow hover:shadow-[4px_4px_0_0_#FF1493] active:translate-y-0 sm:max-w-[9rem] sm:px-3 sm:py-2.5 sm:text-xs"
                >
                  Laai jou foto op
                </button>
              )}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
