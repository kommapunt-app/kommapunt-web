"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ComparisonResultsView } from "@/components/vergelyk/ComparisonResultsView";
import { ComparisonSetupPanel } from "@/components/vergelyk/ComparisonSetupPanel";
import { ComparisonTypePicker } from "@/components/vergelyk/ComparisonTypePicker";
import { PremiumLockedOverlay } from "@/components/vergelyk/PremiumLockedOverlay";
import { PremiumUpgradeCard } from "@/components/vergelyk/PremiumUpgradeCard";
import { loadBubbleProfileFromSession } from "@/lib/bubble-profile/session";
import { MOCK_COMPARISON_PREVIEW } from "@/lib/profile-comparison/mock-preview";
import type {
  ComparisonType,
  ProfileComparisonRecord,
  ProfileComparisonResponse,
} from "@/lib/profile-comparison/types";
import type { PremiumAccessResponse } from "@/lib/premium/types";

interface VergelykPageContentProps {
  initialComparison?: ProfileComparisonRecord | null;
}

export function VergelykPageContent({
  initialComparison = null,
}: VergelykPageContentProps) {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);
  const [profileId, setProfileId] = useState<string | null>(null);
  const [hasPremium, setHasPremium] = useState(false);
  const [selectedType, setSelectedType] =
    useState<ComparisonType>("person_vs_person");
  const [comparison, setComparison] = useState<ProfileComparisonRecord | null>(
    initialComparison,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const storedProfile = loadBubbleProfileFromSession();
    setProfileId(storedProfile?.profileId ?? null);
    setHydrated(true);

    if (!storedProfile?.profileId) {
      return;
    }

    fetch(`/api/premium/status?profileId=${storedProfile.profileId}`)
      .then((response) => response.json())
      .then((data: PremiumAccessResponse) => {
        setHasPremium(Boolean(data.ok && data.hasAccess));
      })
      .catch(() => {
        setHasPremium(false);
      });
  }, []);

  async function handleComparisonSubmit(input: {
    leftProfileId: string;
    rightProfileId: string;
  }) {
    if (!profileId || !hasPremium) {
      throw new Error("Premium-toegang is nodig.");
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/profile-comparison", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comparisonType: selectedType,
          initiatorProfileId: profileId,
          leftProfileId: input.leftProfileId,
          rightProfileId: input.rightProfileId,
        }),
      });

      const data = (await response.json()) as ProfileComparisonResponse;

      if (!response.ok || !data.ok || !data.comparison) {
        throw new Error(data.message ?? "Kon nie vergelyking uitvoer nie.");
      }

      setComparison(data.comparison);
      router.push(`/vergelyk/${data.comparisonId}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!hydrated) {
    return (
      <div className="flex justify-center py-24">
        <div className="size-12 animate-pulse rounded-full border-4 border-komma-black bg-komma-pink" />
      </div>
    );
  }

  const previewComparison = comparison ?? MOCK_COMPARISON_PREVIEW;
  const showLockedResults = !hasPremium;
  const hasRealComparison = comparison !== null;

  return (
    <div className="flex flex-col gap-12 sm:gap-16">
      <header>
        <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-komma-black/60">
          Premium kenmerk
        </p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Vergelyk profiele
        </h1>
        <p className="mt-4 max-w-3xl text-base font-semibold leading-relaxed text-komma-black/75 sm:text-lg">
          Sien hoe twee Bubbles-profiele op mekaar val — met &apos;n similarity
          score, gedeelde waardes, verskille, en &apos;n Value Map-oorleg. AI-gesprekinsigte
          volg binnekort.
        </p>
      </header>

      <section className="space-y-5">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Kies vergelykingstipe
          </h2>
          <p className="mt-2 max-w-2xl text-sm font-semibold text-komma-black/70 sm:text-base">
            Die databasis en roetering ondersteun verskeie vergelykings — van persoon
            tot span en organisasie. Slegs persoon vs persoon is tans aktief.
          </p>
        </div>
        <ComparisonTypePicker
          selectedType={selectedType}
          onSelect={setSelectedType}
          disabled={!hasPremium}
        />
      </section>

      {!profileId ? (
        <section className="rounded-[2rem] border-4 border-komma-black bg-[#FFFEF5] p-6 text-center shadow-[4px_4px_0_0_#000] sm:p-8">
          <h2 className="text-2xl font-extrabold">Jy het nog geen profiel nie</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm font-semibold text-komma-black/70 sm:text-base">
            Voltooi die Bubbles-vloei en stoor jou profiel voordat jy vergelykings
            kan begin.
          </p>
        </section>
      ) : null}

      {profileId && !hasPremium ? <PremiumUpgradeCard profileId={profileId} /> : null}

      {profileId && hasPremium ? (
        <ComparisonSetupPanel
          comparisonType={selectedType}
          initiatorProfileId={profileId}
          isSubmitting={isSubmitting}
          onSubmit={handleComparisonSubmit}
        />
      ) : (
        <PremiumLockedOverlay title="Premium vereis">
          <ComparisonSetupPanel
            comparisonType={selectedType}
            initiatorProfileId={profileId ?? ""}
            disabled
            onSubmit={async () => {}}
          />
        </PremiumLockedOverlay>
      )}

      <section className="space-y-5">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Resultate
          </h2>
          <p className="mt-2 text-sm font-semibold text-komma-black/70 sm:text-base">
            {hasPremium && hasRealComparison
              ? "Jou premium vergelyking is gereed."
              : hasPremium
                ? "Voer 'n vergelyking uit om resultate te sien."
                : "Voorskou van wat premium resultate bevat."}
          </p>
        </div>

        {hasPremium && !hasRealComparison ? (
          <div className="rounded-[2rem] border-4 border-dashed border-komma-black bg-[#FFFEF5] p-8 text-center">
            <p className="text-sm font-semibold text-komma-black/70 sm:text-base">
              Gebruik die vorm hierbo om twee profiele te vergelyk.
            </p>
          </div>
        ) : showLockedResults ? (
          <PremiumLockedOverlay>
            <ComparisonResultsView comparison={previewComparison} />
          </PremiumLockedOverlay>
        ) : (
          <ComparisonResultsView comparison={previewComparison} />
        )}
      </section>

      {errorMessage ? (
        <p className="text-center text-sm font-semibold text-komma-pink">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
