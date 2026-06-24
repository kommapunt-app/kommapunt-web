"use client";

import { TopFiveBubbleVisual } from "@/components/TopFiveBubbleVisual";
import type { ExampleProfile } from "@/lib/example-profiles";

interface ExampleProfileCardProps {
  profile: ExampleProfile;
}

export function ExampleProfileCard({ profile }: ExampleProfileCardProps) {
  const topFive = profile.rankedBubbles.slice(0, 5);

  return (
    <article className="flex h-full flex-col rounded-[2rem] border-4 border-komma-black bg-[#FFFEF5] p-4 shadow-[6px_6px_0_0_#FF1493] sm:p-5">
      <h3 className="mb-4 text-center text-xl font-extrabold tracking-tight sm:text-2xl">
        {profile.name}
      </h3>

      <TopFiveBubbleVisual
        rankedBubbles={profile.rankedBubbles}
        photoUrl={profile.photoSrc || null}
        ariaLabel={`${profile.name} se top 5 Bubbles`}
        className="max-w-none"
        colorScheme="demo"
        frameless
        centerCircleOffsetY={-30}
        centerImageScale={profile.centerImageScale}
        centerImageOffsetY={profile.centerImageOffsetY}
        centerImageBackground={profile.centerImageBackground}
        centerImageFit={profile.centerImageFit}
      />

      <div className="mt-5 flex flex-1 flex-col">
        <h4 className="mb-3 text-sm font-extrabold uppercase tracking-wide text-komma-black/55 sm:text-base">
          Top 5 Bubbles
        </h4>

        <ol className="flex flex-col gap-2.5">
          {topFive.map((item) => (
            <li
              key={item.id}
              className={`flex items-center gap-3 rounded-2xl border-4 border-komma-black px-3 py-2.5 shadow-[3px_3px_0_0_#000] sm:px-4 sm:py-3 ${
                item.rank === 1 ? "bg-komma-yellow" : "bg-white"
              }`}
            >
              <span
                className={`flex size-8 shrink-0 items-center justify-center rounded-full border-4 border-komma-black text-sm font-extrabold sm:size-9 sm:text-base ${
                  item.rank === 1
                    ? "bg-komma-pink text-komma-black"
                    : "bg-white text-komma-black"
                }`}
              >
                {item.rank}
              </span>

              <div className="min-w-0">
                <p className="text-sm font-extrabold leading-tight sm:text-base">
                  {item.bubble.nameAf}
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-komma-black/45 sm:text-xs">
                  {item.bubble.nameEn}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </article>
  );
}
