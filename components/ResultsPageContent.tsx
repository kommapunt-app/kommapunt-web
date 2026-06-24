"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BubbleProfileGateModal } from "@/components/BubbleProfileGateModal";
import { BubblesHeader } from "@/components/BubblesHeader";
import { Button } from "@/components/Button";
import { FullFeedbackModal } from "@/components/FullFeedbackModal";
import { KommaPuntProfileCard } from "@/components/KommaPuntProfileCard";
import { LockedProfilePlaceholder } from "@/components/LockedProfilePlaceholder";
import { PageContainer } from "@/components/PageContainer";
import { ProfileActionButtons } from "@/components/ProfileActionButtons";
import { RankedBubbleListItem } from "@/components/RankedBubbleListItem";
import { ReflectionSection } from "@/components/ReflectionSection";
import {
  downloadBubbleVisual,
  saveBubbleVisualToPhotos,
  shareBubbleProfileUrl,
} from "@/lib/bubble-profile/export-actions";
import { loadBubbleProfileFromSession } from "@/lib/bubble-profile/session";
import {
  fetchProfileImageUrl,
  uploadProfilePhotoFromUrl,
} from "@/lib/bubble-profile/profile-photo";
import { STORAGE_KEY_BUBBLE_PROFILE } from "@/lib/bubble-profile/types";
import type { BubbleProfileContact } from "@/lib/bubble-profile/types";
import { getPublicProfileUrl } from "@/lib/site-url";
import { clearKommaSession, loadResultsFromStorage, type RankedBubbleResult } from "@/lib/results";
import { TOTAL_FLOW_STEPS } from "@/lib/constants";
import { useMobileViewport } from "@/lib/use-mobile-viewport";

export function ResultsPageContent() {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);
  const [results, setResults] = useState<RankedBubbleResult[] | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [profileContact, setProfileContact] = useState<BubbleProfileContact | null>(
    null,
  );
  const [profileId, setProfileId] = useState<string | null>(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [isActionBusy, setIsActionBusy] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [saveHelperMessage, setSaveHelperMessage] = useState<string | null>(null);
  const [syncWarning, setSyncWarning] = useState<string | null>(null);
  const exportRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileViewport();

  useEffect(() => {
    const savedProfile = loadBubbleProfileFromSession();
    if (savedProfile) {
      console.log(
        "[bubble-profile] skipped gate — local profile already exists",
        savedProfile,
      );
    }
    setResults(loadResultsFromStorage());
    setProfileContact(savedProfile);
    setProfileId(savedProfile?.profileId ?? null);
    setProfileModalOpen(savedProfile === null);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!profileId) {
      return;
    }

    let cancelled = false;

    void fetchProfileImageUrl(profileId).then((url) => {
      if (!cancelled && url) {
        setPhotoUrl(url);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [profileId]);

  useEffect(() => {
    return () => {
      if (photoUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(photoUrl);
      }
    };
  }, [photoUrl]);

  useEffect(() => {
    if (!profileId || !photoUrl) {
      return;
    }

    if (
      !photoUrl.startsWith("blob:") &&
      !photoUrl.startsWith("data:image/")
    ) {
      return;
    }

    let cancelled = false;

    async function syncProfilePhoto() {
      try {
        const persistedUrl = await uploadProfilePhotoFromUrl(
          profileId!,
          photoUrl!,
        );

        if (!cancelled && persistedUrl) {
          setPhotoUrl((current) => {
            if (current?.startsWith("blob:")) {
              URL.revokeObjectURL(current);
            }

            return persistedUrl;
          });
        }
      } catch (error) {
        if (!cancelled) {
          console.error("[bubble-profile] photo sync failed", error);
        }
      }
    }

    const timer = window.setTimeout(() => {
      void syncProfilePhoto();
    }, 400);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [photoUrl, profileId]);

  function handlePhotoChange(url: string | null) {
    setPhotoUrl((current) => {
      if (current?.startsWith("blob:")) {
        URL.revokeObjectURL(current);
      }

      return url;
    });
  }

  function handleStartOver() {
    clearKommaSession();

    if (typeof window !== "undefined") {
      sessionStorage.removeItem(STORAGE_KEY_BUBBLE_PROFILE);
    }

    router.push("/bubbles");
  }

  function handleProfileSaved(
    contact: BubbleProfileContact,
    result?: {
      serverSynced: boolean;
      serverMessage?: string;
      profileId?: string;
    },
  ) {
    setProfileContact(contact);
    setProfileId(result?.profileId ?? null);
    setProfileModalOpen(false);
    setActionError(null);
    setSyncWarning(
      result?.serverSynced === false
        ? "Jou profiel is ontsluit. Ons kon dit nie op die bediener stoor nie — jy kan steeds aflaai en deel."
        : null,
    );
  }

  async function handleDownload() {
    if (!profileContact) {
      return;
    }

    setActionError(null);
    setSaveHelperMessage(null);
    setIsActionBusy(true);

    try {
      if (isMobile) {
        const result = await saveBubbleVisualToPhotos(exportRef, photoUrl);
        setSaveHelperMessage(result.helperMessage ?? null);
      } else {
        await downloadBubbleVisual(exportRef, photoUrl);
      }
    } catch (error) {
      setActionError(
        error instanceof Error
          ? error.message
          : "Kon nie jou profiel stoor nie. Probeer weer.",
      );
    } finally {
      setIsActionBusy(false);
    }
  }

  async function handleShare() {
    if (!profileContact || !profileId) {
      setActionError(
        "Geen publieke skakel beskikbaar nie. Probeer weer om jou profiel te stoor.",
      );
      return;
    }

    setActionError(null);
    setSaveHelperMessage(null);
    setIsActionBusy(true);

    try {
      const result = await shareBubbleProfileUrl(profileId);

      if (result === "copied") {
        setSaveHelperMessage("Skakel gekopieer na knipbord.");
      }
    } catch (error) {
      setActionError(
        error instanceof Error
          ? error.message
          : "Kon nie jou profiel deel nie. Probeer weer.",
      );
    } finally {
      setIsActionBusy(false);
    }
  }

  if (!hydrated) {
    return (
      <>
        <BubblesHeader step={4} totalSteps={TOTAL_FLOW_STEPS} />
        <main className="flex flex-1 items-center justify-center px-5 py-24">
          <div className="size-12 animate-pulse rounded-full border-4 border-komma-black bg-komma-pink" />
        </main>
      </>
    );
  }

  if (!results) {
    return (
      <>
        <BubblesHeader step={4} totalSteps={TOTAL_FLOW_STEPS} />
        <main className="flex flex-1 items-center px-5 py-16 sm:px-8">
          <div className="mx-auto max-w-md rounded-3xl border-4 border-komma-black bg-[#FFFEF5] p-8 text-center shadow-[8px_8px_0_0_#000] sm:p-10">
            <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full border-4 border-komma-black bg-komma-yellow shadow-[4px_4px_0_0_#000]">
              <span className="text-3xl font-extrabold">…</span>
            </div>
            <h1 className="mb-4 text-2xl font-extrabold sm:text-3xl">
              Jy het nog nie jou Bubbles voltooi nie.
            </h1>
            <p className="mb-8 text-base leading-relaxed text-komma-black/70">
              Kies en rangskik jou Bubbles om jou persoonlike profiel te sien.
            </p>
            <Button href="/bubbles">Begin my Bubbles</Button>
          </div>
        </main>
      </>
    );
  }

  const topTen = results.slice(0, 10);
  const profileSaved = profileContact !== null;

  return (
    <>
      <BubblesHeader step={4} totalSteps={TOTAL_FLOW_STEPS} />

      <main>
        <PageContainer outerClassName="py-8 sm:py-12">
          <div className="mb-10 sm:mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Jou Bubbles
            </h1>
            <p className="mt-3 max-w-md text-base font-semibold text-komma-black/75 sm:text-lg">
              {profileSaved
                ? "Dit is wat vir jou die meeste gewig dra."
                : "Jou profiel wag — voltooi die vorm om dit te sien."}
            </p>
          </div>

          <div className="relative z-0 mb-8 flex flex-col items-center gap-6 overflow-visible sm:mb-10">
            <div className="inline-block w-full max-w-3xl overflow-visible p-2 sm:p-3">
              {profileSaved ? (
                <KommaPuntProfileCard
                  ref={exportRef}
                  personName={profileContact.name}
                  rankedBubbles={results}
                  photoUrl={photoUrl}
                  onPhotoChange={handlePhotoChange}
                  photoUploadEnabled
                />
              ) : (
                <LockedProfilePlaceholder
                  onUnlock={() => setProfileModalOpen(true)}
                />
              )}
            </div>
          </div>

          <div className="mb-6 flex justify-center sm:mb-8">
            <ProfileActionButtons
              profileSaved={profileSaved}
              profileId={profileId}
              profileUrl={profileId ? getPublicProfileUrl(profileId) : null}
              personName={profileContact?.name ?? null}
              isBusy={isActionBusy}
              isMobile={isMobile}
              onDownload={handleDownload}
              onShare={handleShare}
              actionError={actionError}
              saveHelperMessage={saveHelperMessage}
            />
          </div>

          {syncWarning ? (
            <p className="mx-auto mb-6 max-w-3xl text-center text-sm font-semibold text-komma-black/70">
              {syncWarning}
            </p>
          ) : null}

          {profileSaved ? (
            <>
              <div className="mb-14 flex justify-center sm:mb-16">
                <Button
                  variant="secondary"
                  onClick={() => setFeedbackOpen(true)}
                  className="w-full max-w-3xl px-8 py-4 text-base sm:text-lg"
                >
                  Volledige terugvoer
                </Button>
              </div>

              <FullFeedbackModal
                open={feedbackOpen}
                onClose={() => setFeedbackOpen(false)}
                rankedBubbles={results}
                exportRef={exportRef}
                photoUrl={photoUrl}
              />

              <section className="relative z-0 mb-14 sm:mb-16">
                <h2 className="mb-6 text-2xl font-extrabold tracking-tight sm:mb-8 sm:text-3xl">
                  Jou Top 10
                </h2>
                <ol className="flex flex-col gap-4 sm:gap-5">
                  {topTen.map((item) => (
                    <RankedBubbleListItem key={item.id} item={item} />
                  ))}
                </ol>
              </section>

              <div className="mb-14 sm:mb-16">
                <ReflectionSection />
              </div>
            </>
          ) : null}

          <div className="flex border-t-4 border-komma-black pt-10">
            <Button onClick={handleStartOver}>Begin oor</Button>
          </div>
        </PageContainer>
      </main>

      {!profileSaved ? (
        <BubbleProfileGateModal
          open={profileModalOpen}
          onClose={() => setProfileModalOpen(false)}
          onSaved={handleProfileSaved}
          rankedBubbles={results}
          initialContact={profileContact}
        />
      ) : null}
    </>
  );
}
