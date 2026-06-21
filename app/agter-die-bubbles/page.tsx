import { PageContainer } from "@/components/PageContainer";
import { AgeValuesSection } from "@/components/insights/AgeValuesSection";
import { PoppingValuesSection } from "@/components/insights/PoppingValuesSection";
import { ProvinceValuesSection } from "@/components/insights/ProvinceValuesSection";
import { TopValuesInsightSection } from "@/components/insights/TopValuesInsightSection";
import { fetchInsightsSnapshot } from "@/lib/insights/queries";

export const metadata = {
  title: "Agter die Bubbles | KommaPunt",
  description:
    "Waar waardes saamkom — aggregate insigte uit KommaPunt-profiele.",
};

export default async function AgterDieBubblesPage() {
  const snapshot = await fetchInsightsSnapshot();

  return (
    <main>
      <PageContainer outerClassName="py-10 sm:py-14">
        <header className="mb-12 sm:mb-16">
          <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-komma-black/60">
            MVP insigte
          </p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Agter die Bubbles
          </h1>
          <p className="mt-4 max-w-2xl text-base font-semibold leading-relaxed text-komma-black/75 sm:text-lg">
            Visuele plekhouers vir toekomstige Supabase-aggregate. Elke blok kan
            later live data uit{" "}
            <code className="rounded bg-white px-1.5 py-0.5 text-sm font-bold">
              bubble_profiles
            </code>{" "}
            laai.
          </p>
        </header>

        <div className="flex flex-col gap-14 sm:gap-16 lg:gap-20">
          <TopValuesInsightSection
            title="Top waardes in Top 5"
            subtitle="Waardes wat die meeste in mense se Top 5 verskyn — mock data vir nou."
            values={snapshot.topFiveValues}
          />

          <PoppingValuesSection
            title="Waardes wat saam POP"
            subtitle="Paartjies wat dikwels saam in Top 5 opduik."
            pairs={snapshot.poppingPairs}
          />

          <AgeValuesSection
            title="Ouderdom en waardes"
            subtitle="Hoe Top 3-waardes verskil per ouderdomsgroep."
            slices={snapshot.ageGroups}
          />

          <ProvinceValuesSection
            title="Provinsies en waardes"
            subtitle="Provinsiale snitte van die gewildste waardes."
            slices={snapshot.provinces}
          />
        </div>
      </PageContainer>
    </main>
  );
}
