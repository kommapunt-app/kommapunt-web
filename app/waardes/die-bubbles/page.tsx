import type { Metadata } from "next";
import { Suspense } from "react";
import { BubblesBibNav } from "@/components/BubblesBibNav";
import { DieBubblesPageContent } from "@/components/DieBubblesPageContent";
import { Header } from "@/components/Header";
import { PageContainer } from "@/components/PageContainer";

export const metadata: Metadata = {
  title: "Die Bubbles — Bubbles Bib — Komma",
  description:
    "Verken die KommaPunt waardekaart — waar waardes lê tussen Ek en Ons, Stabiliteit en Verandering.",
};

export default function DieBubblesPage() {
  return (
    <>
      <Header />

      <main className="overflow-x-clip">
        <PageContainer outerClassName="overflow-visible py-8 sm:py-12">
          <div className="mb-4 sm:mb-6">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Die Bubbles
            </h1>
            <p className="mt-4 max-w-2xl text-base text-komma-black/75 sm:text-lg">
              Kies &rsquo;n waardegroep en sien waar sy waardes op die waardekaart
              lê &mdash; tussen Ek en Ons, Stabiliteit en Verandering.
            </p>
          </div>

          <BubblesBibNav />

          <Suspense>
            <DieBubblesPageContent />
          </Suspense>
        </PageContainer>
      </main>
    </>
  );
}
