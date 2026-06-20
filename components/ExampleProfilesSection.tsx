import { ExampleProfileCard } from "@/components/ExampleProfileCard";
import { PageContainer } from "@/components/PageContainer";
import { EXAMPLE_PROFILES, HERO_EXAMPLES_DISCLAIMER } from "@/lib/example-profiles";

export function ExampleProfilesSection() {
  return (
    <PageContainer
      as="section"
      id="voorbeeld-profiele"
      outerClassName="border-t-4 border-komma-black bg-komma-yellow py-16 sm:py-24"
    >
        <div className="mb-12 max-w-3xl sm:mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-komma-black sm:text-4xl lg:text-5xl">
            Dieselfde wêreld. Verskillende Bubbles.
          </h2>
          <p className="mt-4 text-base font-semibold leading-relaxed text-komma-black/75 sm:text-lg">
            Ons verskil nie altyd oor die feite nie. Ons verskil dikwels oor wat
            vir ons die belangrikste is.
          </p>
          <p className="mt-8 text-2xl font-extrabold tracking-tight text-komma-black sm:text-3xl">
            VOORBEELD KOMMA.-PROFIELE
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 lg:gap-6 xl:gap-8">
          {EXAMPLE_PROFILES.map((profile) => (
            <ExampleProfileCard key={profile.id} profile={profile} />
          ))}
        </div>

        <p className="mt-10 max-w-md whitespace-pre-line text-xs leading-relaxed text-komma-black/65 sm:mt-12 sm:max-w-lg sm:text-sm">
          {HERO_EXAMPLES_DISCLAIMER}
        </p>
    </PageContainer>
  );
}
