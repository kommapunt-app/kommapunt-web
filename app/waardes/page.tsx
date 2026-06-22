import type { Metadata } from "next";
import { Suspense } from "react";
import { BubblesBibNav } from "@/components/BubblesBibNav";
import { Header } from "@/components/Header";
import { PageContainer } from "@/components/PageContainer";
import { WaardesPageContent } from "@/components/WaardesPageContent";
import { WaardesPlakkateCta } from "@/components/WaardesPlakkateCta";

export const metadata: Metadata = {
  title: "Bubbles Bib — Komma",
  description:
    "Verstaan KommaPunt waardes en waar hulle op die waardekaart lê — tussen Ek en Ons, Stabiliteit en Verandering.",
};

export default function WaardesPage() {
  return (
    <>
      <Header />

      <main className="overflow-x-clip">
        <PageContainer outerClassName="overflow-visible py-8 sm:py-12">
          <div className="mb-4 sm:mb-6">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Bubbles Bib
            </h1>
            <div className="mt-5">
              <WaardesPlakkateCta />
            </div>
            <p className="mt-4 max-w-2xl text-base text-komma-black/75 sm:text-lg">
              Verstaan waardes op die kaart. Vir die volledige visuele
              plakkate, gaan na Waardeplakkate.
            </p>
          </div>

          <BubblesBibNav />

          <Suspense>
            <WaardesPageContent />
          </Suspense>
        </PageContainer>
      </main>
    </>
  );
}
