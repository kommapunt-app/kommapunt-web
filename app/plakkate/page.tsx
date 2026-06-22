import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/Header";
import { PageContainer } from "@/components/PageContainer";
import { PlakkatePageContent } from "@/components/PlakkatePageContent";

export const metadata: Metadata = {
  title: "KommaPunt Waardeplakkate",
  description:
    "Verken die volledige KommaPunt versameling van waardeplakkate en ontdek hoe waardes ons prioriteite, besluite en standpunte vorm.",
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
