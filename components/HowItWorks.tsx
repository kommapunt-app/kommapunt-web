import { Button } from "./Button";
import { PageContainer } from "@/components/PageContainer";

const steps = [
  {
    number: "1",
    title: "Kies jou Bubbles",
    description: "Kies die 12 waardes wat vir jou die meeste gewig dra.",
  },
  {
    number: "2",
    title: "Sorteer jou Bubbles",
    description: "Sleep jou Bubbles in die volgorde wat vir jou reg voel.",
  },
  {
    number: "3",
    title: "Wat dra meer gewig?",
    description: "Verfyn jou rangorde met 25 vinnige vergelykings.",
  },
  {
    number: "4",
    title: "Jou Bubble-profiel",
    description: "Sien jou Top 10 en bou jou persoonlike Bubble-visual.",
  },
] as const;

export function HowItWorks() {
  return (
    <PageContainer
      as="section"
      id="how-it-works"
      outerClassName="scroll-mt-24 border-t-4 border-komma-black bg-white py-16 sm:py-24"
    >
        <div className="mb-12 flex flex-col gap-4 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-4xl font-extrabold tracking-tight text-komma-black sm:text-5xl">
            Hoe werk dit?
          </h2>
          <p className="max-w-xs text-base font-medium text-komma-black/70 sm:text-right sm:text-lg">
            Vier stappe na jou eie Bubble-profiel.
          </p>
        </div>

        <ol className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li
              key={step.number}
              className="group relative flex flex-col gap-4 rounded-3xl border-4 border-komma-black bg-komma-yellow p-6 shadow-[6px_6px_0_0_#000] transition-transform hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#FF1493] sm:p-7"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full border-4 border-komma-black bg-komma-pink text-xl font-extrabold text-white">
                  {step.number}
                </span>
                {index < steps.length - 1 && (
                  <span
                    className="hidden h-1 flex-1 rounded-full bg-komma-black/20 lg:block"
                    aria-hidden="true"
                  />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-extrabold leading-tight text-komma-black">
                  {step.title}
                </h3>
                <p className="text-base leading-relaxed text-komma-black/75">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex sm:mt-16">
          <Button href="/bubbles" className="!text-white">
            Begin
          </Button>
        </div>
    </PageContainer>
  );
}
