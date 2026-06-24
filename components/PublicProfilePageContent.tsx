"use client";

import { ProfileQrCode } from "@/components/ProfileQrCode";
import { ProfileShareActions } from "@/components/ProfileShareActions";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { RankedBubbleListItem } from "@/components/RankedBubbleListItem";
import { rankedRecordsToResults } from "@/lib/bubble-profile/from-records";
import type { PublicBubbleProfile } from "@/lib/bubble-profile/public-profile";
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

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 sm:mb-10">
        <ProfileCard
          personName={profile.name}
          rankedBubbles={rankedResults}
          photoUrl={profile.profileImageUrl}
        />
      </div>

      <section className="mb-8 sm:mb-10">
        <h2 className="mb-5 text-2xl font-extrabold tracking-tight sm:mb-6 sm:text-3xl">
          Top 10
        </h2>
        <ol className="flex flex-col gap-4 sm:gap-5">
          {topTen.map((item) => (
            <RankedBubbleListItem key={item.id} item={item} />
          ))}
        </ol>
      </section>

      <div className="mb-8 flex flex-col items-center gap-5 sm:mb-10 sm:gap-6">
        <ProfileShareActions profileId={profile.id} personName={profile.name} />
        <div className="flex flex-col items-center gap-3">
          <ProfileQrCode url={profileUrl} />
          <p className="max-w-xs text-center text-xs font-semibold text-komma-black/60 sm:text-sm">
            Skandeer om hierdie profiel te sien
          </p>
        </div>
      </div>

      <footer className="border-t-4 border-komma-black pt-6 sm:pt-8">
        <p className="mx-auto max-w-md text-center text-sm font-semibold leading-relaxed text-komma-black/70">
          Komma. &apos;n Gesprek oor standpunte en hoe ons daar beland.
        </p>
      </footer>
    </div>
  );
}
