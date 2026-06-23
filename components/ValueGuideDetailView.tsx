import Link from "next/link";
import { ValuePagePoster } from "@/components/ValuePagePoster";
import { ValueTensionDiagram } from "@/components/ValueTensionDiagram";
import { hasValuePoster } from "@/data/value-posters";
import { getValueMapUrl } from "@/lib/value-map-navigation";
import {
  VALUE_GUIDE_DETAIL_LABELS,
  getBubbleCategoryById,
  getValueGuideBubbleCategory,
  type ValueGuideEntry,
} from "@/lib/values-guide";

interface ValueGuideDetailViewProps {
  value: ValueGuideEntry;
}

export function ValueGuideDetailView({ value }: ValueGuideDetailViewProps) {
  const bubbleCategoryId = getValueGuideBubbleCategory(value);
  const bubbleCategory = getBubbleCategoryById(bubbleCategoryId);
  const posterImageUrl = `/value-posters/${value.id}.png`;

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
          {bubbleCategory?.label ?? value.category}
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          {value.nameAf}
        </h1>
        <p className="mt-2 text-base font-semibold uppercase tracking-wide text-komma-black/45 sm:text-lg">
          {value.nameEn}
        </p>
      </header>

      <div className="space-y-5">
        {hasValuePoster(value.id) ? (
          <ValuePagePoster
            valueNameAf={value.nameAf}
            imageUrl={posterImageUrl}
          />
        ) : null}

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

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href={getValueMapUrl(value.id)}
            className="inline-flex items-center justify-center rounded-full border-4 border-komma-black bg-white px-6 py-3 text-base font-extrabold shadow-[4px_4px_0_0_#000] transition-transform hover:-translate-y-0.5 hover:bg-komma-yellow hover:shadow-[5px_5px_0_0_#FF1493]"
          >
            📍 Sien waar die waarde inpas
          </Link>

          {hasValuePoster(value.id) ? (
            <Link
              href={`/plakkate?poster=${value.id}`}
              className="inline-flex items-center justify-center rounded-full border-4 border-komma-black bg-komma-yellow px-6 py-3 text-base font-extrabold shadow-[4px_4px_0_0_#000] transition-transform hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#FF1493]"
            >
              🖼️ Bekyk in Bubbleblaaie
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
