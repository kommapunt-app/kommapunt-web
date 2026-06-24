import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { PageContainer } from "@/components/PageContainer";
import { PublicProfilePageContent } from "@/components/PublicProfilePageContent";
import { fetchPublicBubbleProfile } from "@/lib/bubble-profile/public-profile";
import {
  getProfileOpenGraphImages,
  PROFILE_OG_DESCRIPTION,
  PROFILE_OG_TITLE,
} from "@/lib/profile-card";
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

  const url = getPublicProfileUrl(id);
  const images = getProfileOpenGraphImages(profile, id);

  return {
    title: `${PROFILE_OG_TITLE} | KommaPunt`,
    description: PROFILE_OG_DESCRIPTION,
    openGraph: {
      title: PROFILE_OG_TITLE,
      description: PROFILE_OG_DESCRIPTION,
      url,
      siteName: "KommaPunt",
      locale: "af_ZA",
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: PROFILE_OG_TITLE,
      description: PROFILE_OG_DESCRIPTION,
      images: images.map((image) => ({
        url: image.url,
        width: image.width,
        height: image.height,
        alt: image.alt,
      })),
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
