import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { PageContainer } from "@/components/PageContainer";
import { PotgooiContent } from "@/components/PotgooiContent";

export const metadata: Metadata = {
  title: "Die Potgooi — Komma",
  description:
    "Kom vertel wie jy is, wat vir jou belangrik is, en hoe jy by jou punt uitkom.",
};

export default function DiePotgooiPage() {
  return (
    <>
      <Header />

      <main>
        <PageContainer outerClassName="py-8 sm:py-12">
          <header className="mb-8 sm:mb-10">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Die Potgooi
            </h1>
          </header>

          <PotgooiContent />
        </PageContainer>
      </main>
    </>
  );
}
