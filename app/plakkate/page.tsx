import type { Metadata } from "next";
import { Suspense } from "react";
import { BubblesBibNav } from "@/components/BubblesBibNav";
import { Header } from "@/components/Header";
import { PageContainer } from "@/components/PageContainer";
import { PlakkatePageContent } from "@/components/PlakkatePageContent";

export const metadata: Metadata = {
  title: "Bubbleblaaie | KommaPunt",
  description:
    "Verken KommaPunt se versameling Bubbleblaaie — eenblad-opsommings van waardes wat wys waarom hulle belangrik is, hoe hulle met ander waardes bots, en hoe hulle ons besluite beïnvloed.",
};

export default function PlakkatePage() {
  return (
    <>
      <Header />

      <main>
        <PageContainer outerClassName="py-8 sm:py-12">
          <div className="mb-4 sm:mb-6">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Bubbleblaaie
            </h1>
            <p className="mt-4 max-w-2xl text-base text-komma-black/75 sm:text-lg">
              KommaPunt Bubbleblaaie &mdash; eenblad-opsommings van individuele
              waardes.
            </p>
          </div>

          <BubblesBibNav />

          <Suspense>
            <PlakkatePageContent />
          </Suspense>
        </PageContainer>
      </main>
    </>
  );
}
