import { LogoLink } from "@/components/Logo";
import { PageContainer } from "@/components/PageContainer";
import { SiteMenu } from "@/components/SiteMenu";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b-4 border-komma-black bg-komma-yellow">
      <PageContainer className="flex items-center justify-between py-4">
        <LogoLink priority />
        <SiteMenu />
      </PageContainer>
    </header>
  );
}
