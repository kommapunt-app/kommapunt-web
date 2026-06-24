"use client";

import { ProfileQrCode } from "@/components/ProfileQrCode";
import { ProfileShareActions } from "@/components/ProfileShareActions";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { RankedBubbleListItem } from "@/components/RankedBubbleListItem";
import { rankedRecordsToResults } from "@/lib/bubble-profile/from-records";
import type { PublicBubbleProfile } from "@/lib/bubble-profile/public-profile";
import { getProfilePhotoUrl } from "@/lib/profile-card";
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
  const profileUrl = getPublicProfileUrl(profile.id);
  const photoUrl = getProfilePhotoUrl(profile.photoUrl);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 sm:mb-10">
        <ProfileCard
          personName={profile.name}
          rankedBubbles={rankedResults}
          photoUrl={photoUrl}
        />
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

      <footer className="border-t-4 border-komma-black pt-8 sm:pt-10">
        <p className="mx-auto max-w-md text-center text-sm font-semibold leading-relaxed text-komma-black/70">
          Komma. &apos;n Gesprek oor standpunte en hoe ons daar beland.
        </p>
      </footer>
    </div>
  );
}
