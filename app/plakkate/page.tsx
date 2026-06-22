import type { Metadata } from "next";
import { Suspense } from "react";
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
          <Suspense>
            <PlakkatePageContent />
          </Suspense>
        </PageContainer>
      </main>
    </>
  );
}
