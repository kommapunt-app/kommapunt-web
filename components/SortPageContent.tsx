"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { BubblesHeader } from "@/components/BubblesHeader";
import { Button } from "@/components/Button";
import { PageContainer } from "@/components/PageContainer";
import { SortBubbleRow } from "@/components/SortBubbleRow";
import { getBubblesByIds } from "@/lib/bubbles";
import { parseStoredJson } from "@/lib/compare";
import {
  MAX_BUBBLES,
  STORAGE_KEY_BUBBLE_SCORES,
  STORAGE_KEY_COMPARE_PROGRESS,
  STORAGE_KEY_MANUAL_SORTED_BUBBLES,
  STORAGE_KEY_RANKED_BUBBLES,
  STORAGE_KEY_SELECTED_BUBBLES,
  TOTAL_FLOW_STEPS,
} from "@/lib/constants";
import { PAGE_CONTAINER_CLASS, PAGE_GUTTER_CLASS } from "@/lib/page-layout";

function moveItem<T>(items: T[], fromIndex: number, toIndex: number): T[] {
  if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0) {
    return items;
  }

  const next = [...items];
  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);
  return next;
}

export function SortPageContent() {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);
  const [orderedIds, setOrderedIds] = useState<string[]>([]);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dropTargetId, setDropTargetId] = useState<string | null>(null);

  const orderedBubbles = useMemo(
    () => getBubblesByIds(orderedIds),
    [orderedIds],
  );

  useEffect(() => {
    const selectedIds = parseStoredJson<string[]>(
      localStorage.getItem(STORAGE_KEY_SELECTED_BUBBLES),
    );
    const savedOrder = parseStoredJson<string[]>(
      localStorage.getItem(STORAGE_KEY_MANUAL_SORTED_BUBBLES),
    );

    if (selectedIds?.length === MAX_BUBBLES) {
      if (savedOrder?.length === MAX_BUBBLES) {
        const selectedSet = new Set(selectedIds);
        const matchesSelection = savedOrder.every((id) => selectedSet.has(id));

        setOrderedIds(
          matchesSelection ? savedOrder : selectedIds,
        );
      } else {
        setOrderedIds(selectedIds);
      }
    }

    setHydrated(true);
  }, []);

  function handleDragStart(id: string) {
    setDraggedId(id);
  }

  function handleDragEnd() {
    setDraggedId(null);
    setDropTargetId(null);
  }

  function handleDragOver(
    event: React.DragEvent<HTMLLIElement>,
    targetId: string,
  ) {
    event.preventDefault();

    if (!draggedId || draggedId === targetId) {
      return;
    }

    setDropTargetId(targetId);

    const fromIndex = orderedIds.indexOf(draggedId);
    const toIndex = orderedIds.indexOf(targetId);

    if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) {
      return;
    }

    setOrderedIds((current) => moveItem(current, fromIndex, toIndex));
  }

  function handleDrop() {
    setDraggedId(null);
    setDropTargetId(null);
  }

  function handleNext() {
    if (orderedIds.length !== MAX_BUBBLES) {
      return;
    }

    localStorage.setItem(
      STORAGE_KEY_MANUAL_SORTED_BUBBLES,
      JSON.stringify(orderedIds),
    );
    localStorage.removeItem(STORAGE_KEY_COMPARE_PROGRESS);
    localStorage.removeItem(STORAGE_KEY_BUBBLE_SCORES);
    localStorage.removeItem(STORAGE_KEY_RANKED_BUBBLES);
    router.push("/compare");
  }

  if (!hydrated) {
    return (
      <>
        <BubblesHeader step={2} totalSteps={TOTAL_FLOW_STEPS} />
        <main className="flex flex-1 items-center justify-center px-5 py-24">
          <div className="size-12 animate-pulse rounded-full border-4 border-komma-black bg-komma-pink" />
        </main>
      </>
    );
  }

  if (orderedIds.length !== MAX_BUBBLES) {
    return (
      <>
        <BubblesHeader step={2} totalSteps={TOTAL_FLOW_STEPS} />
        <main className="flex flex-1 items-center px-5 py-16 sm:px-8">
          <div className="mx-auto max-w-md rounded-3xl border-4 border-komma-black bg-[#FFFEF5] p-8 text-center shadow-[8px_8px_0_0_#000] sm:p-10">
            <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full border-4 border-komma-black bg-komma-yellow shadow-[4px_4px_0_0_#000]">
              <span className="text-3xl font-extrabold">…</span>
            </div>
            <h1 className="mb-4 text-2xl font-extrabold sm:text-3xl">
              Jy het nog nie 12 Bubbles gekies nie.
            </h1>
            <p className="mb-8 text-base leading-relaxed text-komma-black/70">
              Kies eers jou 12 Bubbles, dan kan jy hulle handmatig sorteer.
            </p>
            <Button href="/bubbles">Kies my Bubbles</Button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <BubblesHeader step={2} totalSteps={TOTAL_FLOW_STEPS} />

      <main className="flex-1 pb-24 sm:pb-28">
        <PageContainer outerClassName="pt-8 sm:pt-12">
          <div className="mb-8 w-full max-w-3xl">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Sorteer jou Bubbles
            </h1>
            <p className="mt-3 text-base font-semibold leading-snug text-komma-black/75 sm:text-lg">
              Sleep jou Bubbles in die volgorde wat vir jou reg voel.
              <br />
              Nommer 1 dra die meeste gewig.
            </p>
          </div>

          <ol className="flex w-full max-w-3xl flex-col gap-3 sm:gap-4">
            {orderedBubbles.map((bubble, index) => (
              <SortBubbleRow
                key={bubble.id}
                bubble={bubble}
                rank={index + 1}
                isDragging={draggedId === bubble.id}
                isDropTarget={dropTargetId === bubble.id}
                onDragStart={() => handleDragStart(bubble.id)}
                onDragEnd={handleDragEnd}
                onDragOver={(event) => handleDragOver(event, bubble.id)}
                onDrop={handleDrop}
              />
            ))}
          </ol>

          <p className="mt-8 w-full max-w-xl text-sm font-semibold leading-relaxed text-komma-black/65 sm:mt-10 sm:text-base">
            Moenie te veel dink nie. Jy gaan dit in die volgende stap verfyn.
          </p>
        </PageContainer>
      </main>

      <div className={`fixed inset-x-0 bottom-0 z-50 border-t-4 border-komma-black bg-komma-yellow py-2.5 sm:py-3 ${PAGE_GUTTER_CLASS}`}>
        <div className={`${PAGE_CONTAINER_CLASS} flex items-center justify-end`}>
          <Button
            onClick={handleNext}
            className="px-5 py-2 text-sm sm:px-8 sm:py-2.5 sm:text-base"
          >
            Volgende: Verfyn met vergelykings
          </Button>
        </div>
      </div>
    </>
  );
}
