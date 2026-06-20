"use client";

import { TopFiveBubbleVisual } from "@/components/TopFiveBubbleVisual";
import { SAMPLE_HERO_PROFILE } from "@/lib/example-profiles";

export function HeroMainProfile() {
  return (
    <div className="mx-auto w-full max-w-[565px] overflow-visible lg:ml-auto lg:mr-0 lg:max-w-[640px] xl:max-w-[700px]">
      <TopFiveBubbleVisual
        rankedBubbles={SAMPLE_HERO_PROFILE.rankedBubbles}
        photoUrl={null}
        ariaLabel="Voorbeeld Bubble-profiel"
        className="max-w-none"
        colorScheme="demo"
        frameless
        clusterOffsetY={-58}
        animationPreset="heroFloat"
        centerCircleFill="#D4D4D4"
      />
    </div>
  );
}
