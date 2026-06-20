import Link from "next/link";
import { ValueTensionDiagram } from "@/components/ValueTensionDiagram";
import {
  VALUE_GUIDE_DETAIL_LABELS,
  getCategoryById,
  type ValueGuideEntry,
} from "@/lib/values-guide";

interface ValueGuideDetailViewProps {
  value: ValueGuideEntry;
}

export function ValueGuideDetailView({ value }: ValueGuideDetailViewProps) {
  const category = getCategoryById(value.category);

  return (
    <article>
      <Link
        href="/waardes"
        className="mb-6 inline-flex items-center gap-2 rounded-full border-4 border-komma-black bg-white px-4 py-2 text-sm font-extrabold shadow-[3px_3px_0_0_#000] transition-transform hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#FF1493] sm:text-base"
      >
        ← Terug na Bubbles Bib
      </Link>

      <header className="mb-8">
        <p className="mb-2 text-sm font-bold uppercase tracking-wide text-komma-black/50 sm:text-base">
          {category?.labelAf ?? value.category}
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          {value.nameAf}
        </h1>
        <p className="mt-2 text-base font-semibold uppercase tracking-wide text-komma-black/45 sm:text-lg">
          {value.nameEn}
        </p>
      </header>

      <div className="space-y-5">
        <section className="rounded-2xl border-4 border-komma-black bg-[#F3F1EC] p-5 sm:p-6">
          <h2 className="mb-2 text-sm font-extrabold uppercase tracking-wide text-komma-black/55 sm:text-base">
            {VALUE_GUIDE_DETAIL_LABELS.definition}
          </h2>
          <p className="text-base leading-relaxed text-komma-black/85 sm:text-lg">
            {value.definitionAf}
          </p>
        </section>

        <section className="rounded-2xl border-4 border-komma-black bg-white p-5 sm:p-6">
          <h2 className="mb-2 text-sm font-extrabold uppercase tracking-wide text-komma-black/55 sm:text-base">
            {VALUE_GUIDE_DETAIL_LABELS.significance}
          </h2>
          <p className="text-base leading-relaxed text-komma-black/85 sm:text-lg">
            {value.significanceAf}
          </p>
        </section>

        <section className="rounded-2xl border-4 border-komma-black bg-komma-yellow/40 p-5 sm:p-6">
          <h2 className="mb-2 text-sm font-extrabold uppercase tracking-wide text-komma-black/55 sm:text-base">
            {VALUE_GUIDE_DETAIL_LABELS.healthyExpression}
          </h2>
          <p className="text-base leading-relaxed text-komma-black/85 sm:text-lg">
            {value.healthyExpressionAf}
          </p>
        </section>

        <section className="rounded-2xl border-4 border-komma-black bg-komma-pink/10 p-5 sm:p-6">
          <h2 className="mb-2 text-sm font-extrabold uppercase tracking-wide text-komma-black/55 sm:text-base">
            {VALUE_GUIDE_DETAIL_LABELS.overdoneRisk}
          </h2>
          <p className="text-base leading-relaxed text-komma-black/85 sm:text-lg">
            {value.overdoneRiskAf}
          </p>
        </section>

        <ValueTensionDiagram
          currentValueName={value.nameAf}
          conflicts={value.conflictingValues}
        />

        <section className="rounded-2xl border-4 border-komma-black bg-[#F5F5F0] p-5 shadow-[4px_4px_0_0_#000] sm:p-6">
          <h2 className="mb-3 text-sm font-extrabold uppercase tracking-wide text-komma-black/55 sm:text-base">
            {VALUE_GUIDE_DETAIL_LABELS.reflectionQuestion}
          </h2>
          <p className="text-base font-semibold leading-relaxed text-komma-black/90 sm:text-lg">
            {value.reflectionQuestionAf}
          </p>
        </section>
      </div>
    </article>
  );
}
