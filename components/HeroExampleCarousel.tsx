"use client";

import { useCallback, useEffect, useState } from "react";
import { ExampleProfileModal } from "@/components/ExampleProfileModal";
import { TopFiveBubbleVisual } from "@/components/TopFiveBubbleVisual";
import {
  getHeroCarouselProfiles,
  HERO_EXAMPLES_DISCLAIMER,
  type ExampleProfile,
} from "@/lib/example-profiles";

const ROTATE_MS = 5000;

function CarouselSlide({
  profile,
  onOpen,
}: {
  profile: ExampleProfile;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-2xl transition-transform hover:scale-[1.01] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-komma-pink"
      aria-label={`Open ${profile.name} se profiel`}
    >
      <div className="h-full w-full">
        <TopFiveBubbleVisual
          rankedBubbles={profile.rankedBubbles}
          photoUrl={profile.useCenterAvatar ? null : profile.photoSrc || null}
          centerCircleFill={profile.useCenterAvatar ? "#D4D4D4" : undefined}
          ariaLabel={`${profile.name} se top 5 Bubbles`}
          className="max-w-none"
          colorScheme="demo"
          frameless
          animationPreset="heroFloat"
          clusterOffsetY={-18}
          centerCircleOffsetY={10}
          valueBubblePositionAdjustments={[{ index: 3, cx: -10 }]}
          centerImageScale={profile.centerImageScale}
          centerImageOffsetY={profile.centerImageOffsetY}
          centerImageBackground={profile.centerImageBackground}
          centerImageFit={profile.centerImageFit}
        />
      </div>
    </button>
  );
}

export function HeroExampleCarousel() {
  const profiles = getHeroCarouselProfiles();

  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [modalProfile, setModalProfile] = useState<ExampleProfile | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (profiles.length === 0) {
        return;
      }

      setActiveIndex(((index % profiles.length) + profiles.length) % profiles.length);
    },
    [profiles.length],
  );

  const goNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % profiles.length);
  }, [profiles.length]);

  useEffect(() => {
    if (paused || profiles.length <= 1) {
      return;
    }

    const timer = window.setInterval(goNext, ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [paused, goNext, profiles.length]);

  if (profiles.length === 0) {
    return null;
  }

  return (
    <>
      <ExampleProfileModal
        profile={modalProfile}
        onClose={() => setModalProfile(null)}
      />

      <div
        id="hero-voorbeelde"
        className="scroll-mt-24 w-full"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            setPaused(false);
          }
        }}
      >
        <div className="mx-auto flex w-full max-w-[565px] flex-col items-center overflow-visible lg:ml-auto lg:mr-0 lg:max-w-[640px] xl:max-w-[700px]">
          <div
            className="relative aspect-[10/7] w-full"
            aria-live="polite"
          >
            {profiles.map((profile, index) => (
              <div
                key={profile.id}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  index === activeIndex
                    ? "pointer-events-auto z-10 opacity-100"
                    : "pointer-events-none z-0 opacity-0"
                }`}
                aria-hidden={index !== activeIndex}
              >
                <CarouselSlide
                  profile={profile}
                  onOpen={() => setModalProfile(profile)}
                />
              </div>
            ))}
          </div>

          <div className="relative z-20 mt-5 flex flex-wrap justify-center gap-2 px-1 sm:mt-6 sm:gap-2.5">
            {profiles.map((profile, index) => (
              <button
                key={profile.id}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Wys ${profile.name}`}
                aria-current={index === activeIndex ? "true" : undefined}
                className={`size-2.5 rounded-full border-2 border-komma-black transition-all sm:size-3 ${
                  index === activeIndex
                    ? "scale-110 bg-komma-pink"
                    : "bg-[#F5F5F0] hover:bg-komma-yellow"
                }`}
              />
            ))}
          </div>

          <p className="relative z-20 mx-auto mt-7 max-w-[16rem] whitespace-pre-line text-center text-xs leading-relaxed text-komma-black/65 sm:max-w-xs sm:text-sm">
            {HERO_EXAMPLES_DISCLAIMER}
          </p>
        </div>
      </div>
    </>
  );
}
