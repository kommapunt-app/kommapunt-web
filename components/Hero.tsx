import { HeroExampleCarousel } from "./HeroExampleCarousel";
import { HeroQuoteCard } from "./HeroQuoteCard";
import { PageContainer } from "@/components/PageContainer";

export function Hero() {
  return (
    <PageContainer
      as="section"
      outerClassName="relative overflow-x-hidden bg-komma-yellow pb-28 pt-8 sm:pb-32 sm:pt-10 lg:overflow-visible lg:pb-20 lg:pt-10"
      className="relative"
    >
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-8 xl:gap-10">
          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-3">
            <h1 className="text-[2.5rem] font-extrabold leading-[1.05] tracking-tight text-komma-black sm:text-5xl lg:text-[3rem] xl:text-[3.25rem]">
              Wat is jou{" "}
              <span className="relative inline-block">
                Bubbles
                <span className="absolute -bottom-1 left-0 h-1.5 w-full rounded-full bg-komma-pink" />
              </span>
              ?
            </h1>

            <div className="inline-flex w-fit rounded-full border-4 border-komma-black bg-[#F5F5F0] px-4 py-1.5 text-sm font-semibold sm:text-base">
              Waardes · Prioriteite · Standpunte
            </div>

            <div className="space-y-0.5 text-lg font-semibold leading-snug sm:text-xl">
              <p>Wat is vir jou belangrik?</p>
              <p>Wat dra gewig?</p>
              <p>Wat is jou waardes?</p>
            </div>

            <div className="flex w-full flex-col gap-5">
              <HeroQuoteCard
                quote="It's not differences that divide us. It's our judgments about each other because of those differences."
                author="Margaret J. Wheatley"
              />
              <HeroQuoteCard
                quote="We don't see things as they are, we see them as we are."
                author="Anaïs Nin"
              />
              <HeroQuoteCard
                quote="You can't reason someone out of a position they didn't reason themselves into."
                author="Jonathan Swift"
              />
            </div>
          </div>

          <div className="relative flex w-full flex-col items-center lg:min-h-[46rem] lg:items-end lg:pb-20 xl:min-h-[48rem]">
            <div className="w-full lg:absolute lg:-top-[20px] lg:right-0 lg:w-full xl:-top-[28px]">
              <HeroExampleCarousel />
            </div>
          </div>
        </div>
    </PageContainer>
  );
}
