"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BubblesHeader } from "@/components/BubblesHeader";
import { Button } from "@/components/Button";
import { FullFeedbackModal } from "@/components/FullFeedbackModal";
import { PageContainer } from "@/components/PageContainer";
import { PhotoUploadSection } from "@/components/PhotoUploadSection";
import { RankedBubbleListItem } from "@/components/RankedBubbleListItem";
import { ReflectionSection } from "@/components/ReflectionSection";
import { ShareBubblesModal } from "@/components/ShareBubblesModal";
import { TopFiveBubbleVisual } from "@/components/TopFiveBubbleVisual";
import { saveLeadAndDownloadBubbles } from "@/lib/share-download-flow";
import { loadShareContactFromSession } from "@/lib/share-contact-session";
import { STORAGE_KEY_SHARE_CONTACT } from "@/lib/share-leads";
import { clearKommaSession, loadResultsFromStorage, type RankedBubbleResult } from "@/lib/results";
import { TOTAL_FLOW_STEPS } from "@/lib/constants";

export function ResultsPageContent() {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);
  const [results, setResults] = useState<RankedBubbleResult[] | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [isShareBusy, setIsShareBusy] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setResults(loadResultsFromStorage());
    setHydrated(true);
  }, []);

  useEffect(() => {
    return () => {
      if (photoUrl) {
        URL.revokeObjectURL(photoUrl);
      }
    };
  }, [photoUrl]);

  function handlePhotoChange(url: string | null) {
    setPhotoUrl((current) => {
      if (current) {
        URL.revokeObjectURL(current);
      }

      return url;
    });
  }

  function handleStartOver() {
    clearKommaSession();

    if (typeof window !== "undefined") {
      sessionStorage.removeItem(STORAGE_KEY_SHARE_CONTACT);
    }

    router.push("/bubbles");
  }

  async function handleShareClick() {
    if (!results) {
      return;
    }

    setShareError(null);
    const savedContact = loadShareContactFromSession();

    if (savedContact) {
      setIsShareBusy(true);

      try {
        await saveLeadAndDownloadBubbles({
          contact: savedContact,
          rankedBubbles: results,
          exportRef,
          photoUrl,
          skipLeadSave: true,
        });
      } catch (error) {
        setShareError(
          error instanceof Error
            ? error.message
            : "Kon nie jou Bubbles af laai nie. Probeer weer.",
        );
      } finally {
        setIsShareBusy(false);
      }

      return;
    }

    setShareOpen(true);
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
              Dit is wat vir jou die meeste gewig dra.
            </p>
          </div>

          <PhotoUploadSection
            photoUrl={photoUrl}
            onPhotoChange={handlePhotoChange}
          />

          <div className="relative z-0 mb-6 flex flex-col items-center gap-6 overflow-visible sm:mb-8">
            <div
              ref={exportRef}
              className="inline-block w-full max-w-3xl overflow-visible p-2 sm:p-3"
            >
              <div className="w-full overflow-visible rounded-[2rem] border-4 border-komma-black bg-komma-yellow p-4 shadow-[6px_6px_0_0_#000] sm:p-6">
                <TopFiveBubbleVisual
                  rankedBubbles={results}
                  photoUrl={photoUrl}
                  colorScheme="demo"
                  frameless
                  className="max-w-none"
                />
              </div>
            </div>

            <div className="flex w-full max-w-3xl flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <Button
                onClick={handleShareClick}
                disabled={isShareBusy}
                className="w-full px-8 py-4 text-base sm:w-auto sm:text-lg"
              >
                {isShareBusy ? "Laai tans af…" : "Deel my Bubbles"}
              </Button>

              <Button
                variant="secondary"
                onClick={() => setFeedbackOpen(true)}
                className="w-full px-8 py-4 text-base sm:w-auto sm:text-lg"
              >
                Volledige terugvoer
              </Button>
            </div>

            {shareError ? (
              <p className="max-w-3xl text-center text-sm font-semibold text-komma-pink">
                {shareError}
              </p>
            ) : null}
          </div>

          <ShareBubblesModal
            open={shareOpen}
            onClose={() => setShareOpen(false)}
            exportRef={exportRef}
            rankedBubbles={results}
            photoUrl={photoUrl}
          />

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

          <div className="flex border-t-4 border-komma-black pt-10">
            <Button onClick={handleStartOver}>Begin oor</Button>
          </div>
        </PageContainer>
      </main>
    </>
  );
}
