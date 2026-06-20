import { LogoLink } from "@/components/Logo";
import { PageContainer } from "@/components/PageContainer";
import { SiteMenu } from "@/components/SiteMenu";

interface BubblesHeaderProps {
  step: number;
  totalSteps: number;
}

export function BubblesHeader({ step, totalSteps }: BubblesHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b-4 border-komma-black bg-komma-yellow">
      <PageContainer className="flex items-center justify-between py-4">
        <LogoLink />

        <div className="flex items-center gap-3 sm:gap-4">
          <p className="rounded-full border-4 border-komma-black bg-white px-4 py-1.5 text-sm font-bold sm:text-base">
            Stap {step} van {totalSteps}
          </p>
          <SiteMenu />
        </div>
      </PageContainer>
    </header>
  );
}
