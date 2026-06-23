"use client";

import { ProfileQrCode } from "@/components/ProfileQrCode";
import { ProfileShareActions } from "@/components/ProfileShareActions";
import { RankedBubbleListItem } from "@/components/RankedBubbleListItem";
import { TopFiveBubbleVisual } from "@/components/TopFiveBubbleVisual";
import { rankedRecordsToResults } from "@/lib/bubble-profile/from-records";
import type { PublicBubbleProfile } from "@/lib/bubble-profile/public-profile";
import { KOMMA_PUNT_MARK_SRC, PROFILE_CARD_TITLE } from "@/lib/profile-card";
import { formatBubbleScore } from "@/lib/results";
import { getPublicProfileUrl } from "@/lib/site-url";

interface PublicProfilePageContentProps {
  profile: PublicBubbleProfile;
}

export function PublicProfilePageContent({
  profile,
}: PublicProfilePageContentProps) {
  const rankedResults = rankedRecordsToResults(profile.rankedValues);
  const topTen = rankedResults.slice(0, 10);
  const topFive = rankedResults.slice(0, 5);
  const profileUrl = getPublicProfileUrl(profile.id);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 text-center sm:mb-10">
        <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-komma-black/55 sm:text-sm">
          {PROFILE_CARD_TITLE}
        </p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
          {profile.name}
        </h1>
        <p className="mt-3 text-base font-semibold text-komma-black/75 sm:text-lg">
          Hier is wat vir {profile.name.split(" ")[0]} die meeste gewig dra.
        </p>
      </div>

      <div className="mb-8 overflow-visible rounded-[2rem] border-4 border-komma-black bg-komma-yellow p-5 shadow-[6px_6px_0_0_#FF1493] sm:mb-10 sm:p-7">
        <h2 className="mb-4 text-center text-xl font-extrabold sm:text-2xl">
          Top 5 Bubbles
        </h2>
        <TopFiveBubbleVisual rankedBubbles={topFive} />
      </div>

      <div className="mb-8 flex flex-col items-center gap-6 sm:mb-10">
        <ProfileShareActions profileId={profile.id} personName={profile.name} />
        <div className="flex flex-col items-center gap-3">
          <ProfileQrCode url={profileUrl} />
          <p className="max-w-xs text-center text-xs font-semibold text-komma-black/60 sm:text-sm">
            Skandeer om hierdie profiel te sien
          </p>
        </div>
      </div>

      <section className="mb-10 sm:mb-12">
        <h2 className="mb-6 text-2xl font-extrabold tracking-tight sm:text-3xl">
          Top 10
        </h2>
        <ol className="flex flex-col gap-4 sm:gap-5">
          {topTen.map((item) => (
            <RankedBubbleListItem key={item.id} item={item} />
          ))}
        </ol>
      </section>

      <section className="mb-10 sm:mb-12">
        <h2 className="mb-6 text-2xl font-extrabold tracking-tight sm:text-3xl">
          Bubble gewigte
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {topTen.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between gap-3 rounded-2xl border-4 border-komma-black bg-[#FFFEF5] px-4 py-3 shadow-[3px_3px_0_0_#000] sm:px-5"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-extrabold sm:text-base">
                  {item.bubble.nameAf}
                </p>
                <p className="truncate text-xs font-semibold uppercase tracking-wide text-komma-black/45">
                  #{item.rank}
                </p>
              </div>
              <span className="shrink-0 rounded-full border-4 border-komma-black bg-komma-yellow px-3 py-1 text-sm font-extrabold">
                {formatBubbleScore(item.score)}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <footer className="flex flex-col items-center gap-4 border-t-4 border-komma-black pt-8 sm:pt-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={KOMMA_PUNT_MARK_SRC}
          alt="KommaPunt"
          width={512}
          height={120}
          className="block h-8 w-auto object-contain sm:h-9"
        />
        <p className="max-w-md text-center text-sm font-semibold leading-relaxed text-komma-black/70">
          Komma. &apos;n Gesprek oor standpunte en hoe ons daar beland.
        </p>
      </footer>
    </div>
  );
}
