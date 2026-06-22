import { LogoLink } from "@/components/Logo";
import { PageContainer } from "@/components/PageContainer";
import { SiteMenu } from "@/components/SiteMenu";
import { SITE_MENU_ITEMS } from "@/lib/navigation";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b-4 border-komma-black bg-komma-yellow">
      <PageContainer className="flex items-center justify-between gap-4 py-4">
        <LogoLink priority />

        <nav
          aria-label="Hoof navigasie"
          className="hidden flex-1 items-center justify-end gap-2 lg:flex"
        >
          {SITE_MENU_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full border-4 border-komma-black bg-white px-4 py-2 text-sm font-extrabold shadow-[3px_3px_0_0_#000] transition-transform hover:-translate-y-0.5 hover:bg-komma-yellow hover:shadow-[4px_4px_0_0_#FF1493] xl:px-5 xl:text-base"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <SiteMenu className="lg:hidden" />
      </PageContainer>
    </header>
  );
}
