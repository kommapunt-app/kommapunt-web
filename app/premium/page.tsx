import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { PageContainer } from "@/components/PageContainer";
import { KOMMA_COFFEE_URL } from "@/lib/constants/coffee";

export const metadata: Metadata = {
  title: "KommaPunt Premium",
  description:
    "Vir slegs 2 koffies kry jy toegang tot dieper insig oor jou Bubbles — Bib, Brille, Blaaie, Pille en meer.",
};

const PREMIUM_FEATURES = [
  {
    title: "Bubbles Bib",
    description: "Verstaan jou waardes dieper.",
  },
  {
    title: "Brille",
    description: "Ontdek hoe jou wêreldbeskouing jou standpunte vorm.",
  },
  {
    title: "Bubbleblaaie",
    description: "Kry toegang tot visuele waarde-blaaie en refleksievrae.",
  },
  {
    title: "Pille",
    description: "Verken moontlike oplossings en praktiese volgende stappe.",
  },
  {
    title: "Vergelyk jouself met ander",
    description:
      "Sien hoe jou waardes vergelyk met mense volgens ouderdom, provinsie en ander groepe.",
  },
  {
    title: "Navorsing en patrone",
    description: "Kry insig in groter waarde-patrone en tendense.",
  },
] as const;

export default function PremiumPage() {
  return (
    <>
      <Header />

      <main>
        <PageContainer outerClassName="py-8 sm:py-12">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/results"
              className="mb-6 inline-flex items-center gap-2 rounded-full border-4 border-komma-black bg-white px-4 py-2 text-sm font-extrabold shadow-[3px_3px_0_0_#000] transition-transform hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#FF1493] sm:text-base"
            >
              ← Terug na jou Bubbles
            </Link>

            <header className="mb-10 sm:mb-12">
              <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-komma-black/60">
                Premium
              </p>
              <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
                KommaPunt Premium
              </h1>
              <p className="mt-4 text-base font-semibold leading-relaxed text-komma-black/80 sm:text-lg">
                Vir slegs 2 koffies kry jy toegang tot dieper insig oor jou
                Bubbles.
              </p>
            </header>

            <div className="mb-10 grid gap-4 sm:mb-12 sm:grid-cols-2 sm:gap-5">
              {PREMIUM_FEATURES.map((feature) => (
                <article
                  key={feature.title}
                  className="rounded-[1.75rem] border-4 border-komma-black bg-white p-5 shadow-[4px_4px_0_0_#000] sm:p-6"
                >
                  <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">
                    {feature.title}
                  </h2>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-komma-black/75 sm:text-base">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>

            <section className="rounded-[2rem] border-4 border-komma-black bg-komma-yellow p-6 text-center shadow-[6px_6px_0_0_#FF1493] sm:p-8">
              <p className="text-base font-semibold leading-relaxed text-komma-black/80 sm:text-lg">
                Ondersteun KommaPunt en ontsluit premium insig oor jou Bubbles,
                vergelykings en groter patrone.
              </p>

              <div className="mt-6 flex justify-center">
                <Button
                  href={KOMMA_COFFEE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-8 py-4 text-base sm:w-auto sm:text-lg"
                >
                  Vir slegs 2 koffies!
                </Button>
              </div>
            </section>
          </div>
        </PageContainer>
      </main>
    </>
  );
}
