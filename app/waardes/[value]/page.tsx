import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { PageContainer } from "@/components/PageContainer";
import { ValueGuideDetailView } from "@/components/ValueGuideDetailView";
import { getValuePageMetadata } from "@/lib/value-page";
import { getAllValueGuideIds, getValueGuideById } from "@/lib/values-guide";

type WaardePageProps = {
  params: Promise<{ value: string }>;
};

export async function generateStaticParams() {
  return getAllValueGuideIds().map((value) => ({ value }));
}

export async function generateMetadata({ params }: WaardePageProps) {
  const { value: valueId } = await params;
  const value = getValueGuideById(valueId);

  if (!value) {
    return { title: "Waarde nie gevind | KommaPunt" };
  }

  return getValuePageMetadata(value);
}

export default async function WaardeDetailPage({ params }: WaardePageProps) {
  const { value: valueId } = await params;
  const value = getValueGuideById(valueId);

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
