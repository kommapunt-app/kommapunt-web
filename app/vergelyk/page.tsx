import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { PageContainer } from "@/components/PageContainer";
import { VergelykPageContent } from "@/components/vergelyk/VergelykPageContent";

export const metadata: Metadata = {
  title: "Vergelyk profiele | KommaPunt",
  description:
    "Premium profielvergelyking — similarity scores, gedeelde waardes, verskille, en Value Map-oorleg.",
  openGraph: {
    title: "Vergelyk profiele | KommaPunt",
    description:
      "Premium profielvergelyking tussen twee Bubbles-profiele.",
    type: "website",
  },
};

export default function VergelykPage() {
  return (
    <>
      <Header />

      <main>
        <PageContainer outerClassName="py-8 sm:py-12">
          <VergelykPageContent />
        </PageContainer>
      </main>
    </>
  );
}
