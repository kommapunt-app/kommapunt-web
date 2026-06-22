import type { Metadata } from "next";
import { BubblesBibNav } from "@/components/BubblesBibNav";
import { Header } from "@/components/Header";
import { PageContainer } from "@/components/PageContainer";
import { WaardesPageContent } from "@/components/WaardesPageContent";

export const metadata: Metadata = {
  title: "Bubbles Bib — Komma",
  description:
    "Verken Komma Bubbles en waardes. Ontdek wat mense belangrik kan vind, en dink daaroor na.",
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
          </div>

          <BubblesBibNav />

          <WaardesPageContent />
        </PageContainer>
      </main>
    </>
  );
}
