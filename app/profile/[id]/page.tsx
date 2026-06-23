import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { PageContainer } from "@/components/PageContainer";
import { PublicProfilePageContent } from "@/components/PublicProfilePageContent";
import { fetchPublicBubbleProfile } from "@/lib/bubble-profile/public-profile";
import { getPublicProfileUrl } from "@/lib/site-url";

type ProfilePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  const { id } = await params;
  const profile = await fetchPublicBubbleProfile(id);

  if (!profile) {
    return {
      title: "Profiel nie gevind | KommaPunt",
      robots: { index: false, follow: false },
    };
  }

  const title = `${profile.name} se Bubbles | KommaPunt`;
  const topFiveSummary = profile.top5Values.slice(0, 5).join(", ");
  const description = `Bekyk ${profile.name} se top Bubbles op KommaPunt: ${topFiveSummary}.`;
  const url = getPublicProfileUrl(id);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "KommaPunt",
      locale: "af_ZA",
      type: "website",
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image.png"],
    },
  };
}

export default async function PublicProfilePage({ params }: ProfilePageProps) {
  const { id } = await params;
  const profile = await fetchPublicBubbleProfile(id);

  if (!profile) {
    notFound();
  }

  return (
    <>
      <Header />

      <main>
        <PageContainer outerClassName="py-8 sm:py-12">
          <PublicProfilePageContent profile={profile} />
        </PageContainer>
      </main>
    </>
  );
}
