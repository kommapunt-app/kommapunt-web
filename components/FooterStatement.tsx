import { Logo } from "@/components/Logo";
import { PageContainer } from "@/components/PageContainer";

export function FooterStatement() {
  return (
    <PageContainer
      as="footer"
      outerClassName="border-t-4 border-komma-black bg-komma-yellow py-16 sm:py-20"
      className="flex flex-col items-start gap-6"
    >
      <Logo size="footer" />
      <div className="max-w-md space-y-1 text-xl font-semibold leading-snug sm:text-2xl">
        <p>&rsquo;n Gesprek.</p>
        <p className="text-komma-black/75">
          Oor standpunte en hoe ons daar beland.
        </p>
      </div>
      <div className="mt-4 flex gap-3">
        <span className="size-4 rounded-full border-2 border-komma-black bg-komma-pink" />
        <span className="size-4 rounded-full border-2 border-komma-black bg-white" />
        <span className="size-4 rounded-full border-2 border-komma-black bg-komma-yellow" />
      </div>
    </PageContainer>
  );
}
