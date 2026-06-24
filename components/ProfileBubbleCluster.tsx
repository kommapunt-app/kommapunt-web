"use client";

import { TopFiveBubbleVisual } from "@/components/TopFiveBubbleVisual";
import type { ExampleProfile } from "@/lib/example-profiles";

export type ProfileBubbleClusterVariant = "hero-carousel" | "card";

interface ProfileBubbleClusterProps {
  profile: ExampleProfile;
  variant: ProfileBubbleClusterVariant;
  ariaLabel?: string;
  className?: string;
}

const HERO_CAROUSEL_LAYOUT = {
  animationPreset: "heroFloat" as const,
  clusterOffsetY: -18,
  centerCircleOffsetY: 10,
  valueBubblePositionAdjustments: [{ index: 3, cx: -10 }] as const,
};

export function ProfileBubbleCluster({
  profile,
  variant,
  ariaLabel,
  className = "max-w-none",
}: ProfileBubbleClusterProps) {
  const heroLayout = variant === "hero-carousel" ? HERO_CAROUSEL_LAYOUT : {};

  return (
    <TopFiveBubbleVisual
      rankedBubbles={profile.rankedBubbles}
      photoUrl={profile.useCenterAvatar ? null : profile.photoSrc || null}
      centerCircleFill={profile.useCenterAvatar ? "#D4D4D4" : undefined}
      ariaLabel={ariaLabel ?? `${profile.name} se top 5 Bubbles`}
      className={className}
      colorScheme="demo"
      frameless
      centerImageScale={profile.centerImageScale}
      centerImageOffsetY={profile.centerImageOffsetY}
      centerImageBackground={profile.centerImageBackground}
      centerImageFit={profile.centerImageFit}
      {...heroLayout}
    />
  );
}
