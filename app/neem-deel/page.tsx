import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { PageContainer } from "@/components/PageContainer";

export const metadata: Metadata = {
  title: "Neem deel — Komma",
  description: "Deel jou punt, storie of vraag met Komma.",
};

export default function NeemDeelPage() {
  return (
    <>
      <Header />

      <main>
        <PageContainer outerClassName="py-8 sm:py-12">
          <div className="mx-auto max-w-lg">
            <Link
              href="/die-potgooi"
              className="mb-6 inline-flex items-center gap-2 rounded-full border-4 border-komma-black bg-white px-4 py-2 text-sm font-extrabold shadow-[3px_3px_0_0_#000] transition-transform hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#FF1493] sm:text-base"
            >
              ← Terug na Die Potgooi
            </Link>

            <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Neem deel
            </h1>

            <p className="mb-8 text-base leading-relaxed text-komma-black/80 sm:text-lg">
              Hier kom binnekort &rsquo;n vorm waar jy jou punt, storie of vraag
              kan deel. Ons bou hierdie spasie vir die gesprek.
            </p>

            <div className="space-y-5 rounded-[2rem] border-4 border-komma-black bg-white p-6 shadow-[6px_6px_0_0_#000] sm:p-8">
              <div>
                <label className="mb-1.5 block text-sm font-extrabold">
                  Naam
                </label>
                <div className="h-12 rounded-2xl border-4 border-komma-black/20 bg-[#F5F5F0]" />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-extrabold">
                  E-pos
                </label>
                <div className="h-12 rounded-2xl border-4 border-komma-black/20 bg-[#F5F5F0]" />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-extrabold">
                  Jou boodskap
                </label>
                <div className="h-32 rounded-2xl border-4 border-komma-black/20 bg-[#F5F5F0]" />
              </div>

              <p className="text-sm font-semibold text-komma-black/55">
                Vorm kom binnekort — jy hoef nog niks in te vul nie.
              </p>
            </div>
          </div>
        </PageContainer>
      </main>
    </>
  );
}
