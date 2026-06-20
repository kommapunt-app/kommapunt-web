"use client";

import { useCallback, useEffect, useState } from "react";
import { ExampleProfileModal } from "@/components/ExampleProfileModal";
import { TopFiveBubbleVisual } from "@/components/TopFiveBubbleVisual";
import { EXAMPLE_PROFILES, HERO_CAROUSEL_PROFILE_IDS, HERO_EXAMPLES_DISCLAIMER, type ExampleProfile } from "@/lib/example-profiles";

const ROTATE_MS = 5000;

function CarouselArrow({
  direction,
  onClick,
  label,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex size-10 shrink-0 items-center justify-center rounded-full border-4 border-komma-black bg-[#F5F5F0] text-lg font-extrabold shadow-[3px_3px_0_0_#000] transition-transform hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#FF1493] active:translate-y-0 sm:size-11"
    >
      {direction === "prev" ? "←" : "→"}
    </button>
  );
}

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
      className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-2xl transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-komma-pink"
      aria-label={`Open ${profile.name} se profiel`}
    >
      <div className="h-full w-full">
        <TopFiveBubbleVisual
          rankedBubbles={profile.rankedBubbles}
          photoUrl={profile.photoSrc || null}
          ariaLabel={`${profile.name} se top 5 Bubbles`}
          className="max-w-none"
          colorScheme="demo"
          compact
          frameless
        />
      </div>
    </button>
  );
}

export function HeroExampleCarousel() {
  const profiles = HERO_CAROUSEL_PROFILE_IDS.map((id) =>
    EXAMPLE_PROFILES.find((profile) => profile.id === id),
  ).filter((profile): profile is ExampleProfile => profile !== undefined);

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

  const goPrev = useCallback(() => {
    setActiveIndex((current) => (current - 1 + profiles.length) % profiles.length);
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
      <div className="flex flex-col items-center">
        <div className="flex w-full items-center justify-center gap-3 sm:gap-4">
          <CarouselArrow direction="prev" onClick={goPrev} label="Vorige voorbeeld" />

          <div
            className="relative aspect-[10/7] w-full max-w-[21.5rem]"
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

          <CarouselArrow direction="next" onClick={goNext} label="Volgende voorbeeld" />
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
