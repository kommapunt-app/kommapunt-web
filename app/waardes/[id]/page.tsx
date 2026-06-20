import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { PageContainer } from "@/components/PageContainer";
import { ValueGuideDetailView } from "@/components/ValueGuideDetailView";
import { getAllValueGuideIds, getValueGuideById } from "@/lib/values-guide";

type WaardePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return getAllValueGuideIds().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: WaardePageProps): Promise<Metadata> {
  const { id } = await params;
  const value = getValueGuideById(id);

  if (!value) {
    return { title: "Waarde nie gevind — Komma" };
  }

  return {
    title: `${value.nameAf} — Bubbles Bib — Komma`,
    description: value.definitionAf,
  };
}

export default async function WaardeDetailPage({ params }: WaardePageProps) {
  const { id } = await params;
  const value = getValueGuideById(id);

  if (!value) {
    notFound();
  }

  return (
    <>
      <Header />

      <main>
        <PageContainer outerClassName="py-8 sm:py-12">
          <ValueGuideDetailView value={value} />
        </PageContainer>
      </main>
    </>
  );
}
