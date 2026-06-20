"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BubblesHeader } from "@/components/BubblesHeader";
import { Button } from "@/components/Button";
import { CompareBackButton } from "@/components/CompareBackButton";
import { CompareBubbleChoice } from "@/components/CompareBubbleChoice";
import { CompareProgress } from "@/components/CompareProgress";
import { PageContainer } from "@/components/PageContainer";
import { TieButton } from "@/components/TieButton";
import { getBubbleById } from "@/lib/bubbles";
import {
  applyComparisonResult,
  createInitialScoresFromManualOrder,
  generateComparisonPairs,
  hasMatchingProgress,
  parseStoredJson,
  rankBubbles,
  reverseComparisonResult,
  type BubblePair,
  type BubbleScores,
  type ComparisonHistoryEntry,
  type CompareProgressState,
} from "@/lib/compare";
import {
  COMPARISON_COUNT,
  STORAGE_KEY_BUBBLE_SCORES,
  STORAGE_KEY_COMPARE_PROGRESS,
  STORAGE_KEY_MANUAL_SORTED_BUBBLES,
  STORAGE_KEY_RANKED_BUBBLES,
  STORAGE_KEY_SELECTED_BUBBLES,
  TOTAL_FLOW_STEPS,
} from "@/lib/constants";

type CompareSession = {
  selectedIds: string[];
  manualSortedIds: string[];
  pairs: BubblePair[];
  currentIndex: number;
  scores: BubbleScores;
  history: ComparisonHistoryEntry[];
};

function loadCompareSession(): CompareSession | null {
  const selectedIds = parseStoredJson<string[]>(
    localStorage.getItem(STORAGE_KEY_SELECTED_BUBBLES),
  );
  const manualSortedIds = parseStoredJson<string[]>(
    localStorage.getItem(STORAGE_KEY_MANUAL_SORTED_BUBBLES),
  );

  if (!manualSortedIds?.length) {
    return null;
  }

  if (!selectedIds?.length) {
    return null;
  }

  const savedProgress = parseStoredJson<CompareProgressState>(
    localStorage.getItem(STORAGE_KEY_COMPARE_PROGRESS),
  );
  const savedScores = parseStoredJson<BubbleScores>(
    localStorage.getItem(STORAGE_KEY_BUBBLE_SCORES),
  );

  if (
    savedProgress &&
    savedScores &&
    hasMatchingProgress(savedProgress, selectedIds, manualSortedIds)
  ) {
    return {
      selectedIds,
      manualSortedIds,
      pairs: savedProgress.pairs,
      currentIndex: savedProgress.currentIndex,
      scores: savedScores,
      history: savedProgress.history ?? [],
    };
  }

  return {
    selectedIds,
    manualSortedIds,
    pairs: generateComparisonPairs(manualSortedIds, COMPARISON_COUNT),
    currentIndex: 0,
    scores: createInitialScoresFromManualOrder(manualSortedIds),
    history: [],
  };
}

function persistSession(session: CompareSession) {
  const progress: CompareProgressState = {
    selectedIds: session.selectedIds,
    manualSortedIds: session.manualSortedIds,
    pairs: session.pairs,
    currentIndex: session.currentIndex,
    history: session.history,
  };

  localStorage.setItem(
    STORAGE_KEY_COMPARE_PROGRESS,
    JSON.stringify(progress),
  );
  localStorage.setItem(
    STORAGE_KEY_BUBBLE_SCORES,
    JSON.stringify(session.scores),
  );
}

export function ComparePageContent() {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);
  const [session, setSession] = useState<CompareSession | null>(null);

  const finishCompare = useCallback(
    (manualSortedIds: string[], scores: BubbleScores) => {
      const ranked = rankBubbles(manualSortedIds, scores);

      localStorage.setItem(
        STORAGE_KEY_RANKED_BUBBLES,
        JSON.stringify(ranked),
      );
      localStorage.removeItem(STORAGE_KEY_COMPARE_PROGRESS);
      router.push("/results");
    },
    [router],
  );

  useEffect(() => {
    const loadedSession = loadCompareSession();

    if (loadedSession) {
      const savedProgress = parseStoredJson<CompareProgressState>(
        localStorage.getItem(STORAGE_KEY_COMPARE_PROGRESS),
      );

      if (
        !savedProgress ||
        !hasMatchingProgress(
          savedProgress,
          loadedSession.selectedIds,
          loadedSession.manualSortedIds,
        )
      ) {
        persistSession(loadedSession);
      }

      if (
        loadedSession.pairs.length === 0 ||
        loadedSession.currentIndex >= loadedSession.pairs.length
      ) {
        finishCompare(loadedSession.manualSortedIds, loadedSession.scores);
        return;
      }
    }

    setSession(loadedSession);
    setHydrated(true);
  }, [finishCompare]);

  function handleChoice(result: "a" | "b" | "tie") {
    if (!session) {
      return;
    }

    const currentPair = session.pairs[session.currentIndex];

    if (!currentPair) {
      return;
    }

    const nextScores = applyComparisonResult(
      session.scores,
      currentPair,
      result,
    );
    const nextIndex = session.currentIndex + 1;
    const nextSession: CompareSession = {
      ...session,
      scores: nextScores,
      currentIndex: nextIndex,
      history: [...session.history, { pair: currentPair, choice: result }],
    };

    setSession(nextSession);

    if (nextIndex >= session.pairs.length) {
      finishCompare(session.manualSortedIds, nextScores);
      return;
    }

    persistSession(nextSession);
  }

  function handleBack() {
    if (!session || session.currentIndex === 0 || session.history.length === 0) {
      return;
    }

    const lastEntry = session.history[session.history.length - 1];
    const revertedScores = reverseComparisonResult(
      session.scores,
      lastEntry.pair,
      lastEntry.choice,
    );

    const nextSession: CompareSession = {
      ...session,
      scores: revertedScores,
      currentIndex: session.currentIndex - 1,
      history: session.history.slice(0, -1),
    };

    setSession(nextSession);
    persistSession(nextSession);
  }

  if (!hydrated) {
    return (
      <>
        <BubblesHeader step={3} totalSteps={TOTAL_FLOW_STEPS} />
        <main className="flex flex-1 items-center justify-center px-5 py-24">
          <div className="size-12 animate-pulse rounded-full border-4 border-komma-black bg-komma-pink" />
        </main>
      </>
    );
  }

  if (!session) {
    return (
      <>
        <BubblesHeader step={3} totalSteps={TOTAL_FLOW_STEPS} />
        <main className="flex flex-1 items-center px-5 py-16 sm:px-8">
          <div className="mx-auto max-w-md rounded-3xl border-4 border-komma-black bg-[#FFFEF5] p-8 text-center shadow-[8px_8px_0_0_#000] sm:p-10">
            <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full border-4 border-komma-black bg-komma-yellow shadow-[4px_4px_0_0_#000]">
              <span className="text-3xl font-extrabold">…</span>
            </div>
            <h1 className="mb-4 text-2xl font-extrabold sm:text-3xl">
              Jy het nog nie jou Bubbles gesorteer nie.
            </h1>
            <p className="mb-8 text-base leading-relaxed text-komma-black/70">
              Sorteer eers jou 12 Bubbles handmatig, dan kan jy begin vergelyk.
            </p>
            <Button href="/sort">Sorteer my Bubbles</Button>
          </div>
        </main>
      </>
    );
  }

  const currentPair = session.pairs[session.currentIndex];
  const bubbleA = currentPair ? getBubbleById(currentPair[0]) : undefined;
  const bubbleB = currentPair ? getBubbleById(currentPair[1]) : undefined;
  const currentQuestion = session.currentIndex + 1;
  const totalQuestions = session.pairs.length;
  const canGoBack = session.currentIndex > 0 && session.history.length > 0;

  if (!currentPair || !bubbleA || !bubbleB) {
    return (
      <>
        <BubblesHeader step={3} totalSteps={TOTAL_FLOW_STEPS} />
        <main className="flex flex-1 items-center justify-center px-5 py-24">
          <div className="size-12 animate-pulse rounded-full border-4 border-komma-black bg-komma-pink" />
        </main>
      </>
    );
  }

  return (
    <>
      <BubblesHeader step={3} totalSteps={TOTAL_FLOW_STEPS} />

      <main className="flex-1">
        <PageContainer outerClassName="py-8 sm:py-12">
          <div className="mb-6">
            <CompareBackButton onBack={handleBack} disabled={!canGoBack} />
          </div>

          <div className="mb-8 flex w-full max-w-5xl flex-col gap-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                Wat dra meer gewig?
              </h1>
              <p className="mt-3 text-base font-semibold leading-snug text-komma-black/75 sm:text-lg">
                Wanneer twee goeie dinge bots, watter een kies jy?
              </p>
            </div>

            <CompareProgress
              currentQuestion={currentQuestion}
              totalQuestions={totalQuestions}
              className="w-full sm:max-w-xs"
            />
          </div>

          <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
            <CompareBubbleChoice
              bubble={bubbleA}
              onSelect={() => handleChoice("a")}
            />

            <div className="flex flex-col items-center justify-center gap-4">
              <span className="text-lg font-extrabold text-komma-black/50 sm:text-xl">
                of
              </span>
              <TieButton onSelect={() => handleChoice("tie")} />
            </div>

            <CompareBubbleChoice
              bubble={bubbleB}
              onSelect={() => handleChoice("b")}
            />
          </div>

          <p className="mt-10 max-w-lg text-sm leading-relaxed text-komma-black/60 sm:mt-12 sm:text-base">
            Daar is nie &rsquo;n regte antwoord nie. Die vraag is net: wat dra
            vir jou meer gewig?
          </p>
        </PageContainer>
      </main>
    </>
  );
}
