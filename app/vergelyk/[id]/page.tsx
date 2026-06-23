import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { PageContainer } from "@/components/PageContainer";
import { VergelykPageContent } from "@/components/vergelyk/VergelykPageContent";
import { getProfileComparisonById } from "@/lib/supabase/admin";

type VergelykDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: VergelykDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const comparison = await getProfileComparisonById(id).catch(() => null);

  if (!comparison) {
    return { title: "Vergelyking | KommaPunt" };
  }

  const leftName =
    typeof comparison.metadata.leftName === "string"
      ? comparison.metadata.leftName
      : comparison.leftSide.label;
  const rightName =
    typeof comparison.metadata.rightName === "string"
      ? comparison.metadata.rightName
      : comparison.rightSide.label;

  return {
    title: `${leftName} vs ${rightName} | KommaPunt`,
    description: `Profielvergelyking met ${comparison.result.similarityScore}% similarity score.`,
    robots: { index: false, follow: false },
  };
}

export default async function VergelykDetailPage({
  params,
}: VergelykDetailPageProps) {
  const { id } = await params;
  const comparison = await getProfileComparisonById(id).catch(() => null);

  if (!comparison) {
    notFound();
  }

  return (
    <>
      <Header />

      <main>
        <PageContainer outerClassName="py-8 sm:py-12">
          <VergelykPageContent initialComparison={comparison} />
        </PageContainer>
      </main>
    </>
  );
}
