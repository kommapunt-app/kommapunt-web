import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { PageContainer } from "@/components/PageContainer";
import { ValuesCategoryCards } from "@/components/ValuesCategoryCards";
import { ValuesGuideBrowse } from "@/components/ValuesGuideBrowse";
import { ValuesGuideIntro } from "@/components/ValuesGuideIntro";

export const metadata: Metadata = {
  title: "Bubbles Bib — Komma",
  description:
    "Verken Komma Bubbles en waardes. Ontdek wat mense belangrik kan vind, en dink daaroor na.",
};

export default function WaardesPage() {
  return (
    <>
      <Header />

      <main>
        <PageContainer outerClassName="py-8 sm:py-12">
          <div className="mb-10 sm:mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Bubbles Bib
            </h1>
            <p className="mt-3 text-2xl font-extrabold tracking-tight text-komma-black/85 sm:text-3xl">
              Wat is vir jou belangrik?
            </p>
          </div>

          <ValuesGuideIntro />

          <ValuesCategoryCards />

          <ValuesGuideBrowse />
        </PageContainer>
      </main>
    </>
  );
}
