import Link from "next/link";
import {
  VALUE_GUIDE_CATEGORIES,
  getValueGuideById,
} from "@/lib/values-guide";

export function ValuesCategoryCards() {
  return (
    <div className="mb-12 grid gap-5 sm:mb-16 sm:grid-cols-2 lg:gap-6">
      {VALUE_GUIDE_CATEGORIES.map((category) => (
        <article
          key={category.id}
          id={category.id}
          className="scroll-mt-28 rounded-[2rem] border-4 border-komma-black bg-white p-5 shadow-[6px_6px_0_0_#000] sm:p-6"
        >
          <p className="mb-1 text-xs font-bold uppercase tracking-wide text-komma-black/45 sm:text-sm">
            {category.labelEn}
          </p>
          <h2 className="mb-2 text-xl font-extrabold tracking-tight sm:text-2xl">
            {category.labelAf}
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-komma-black/75 sm:text-base">
            {category.summaryAf}
          </p>

          <div className="flex flex-wrap gap-2">
            {category.exampleValueIds.map((valueId) => {
              const value = getValueGuideById(valueId);

              if (!value) {
                return null;
              }

              return (
                <Link
                  key={value.id}
                  href={`/waardes/${value.id}`}
                  className="rounded-full border-4 border-komma-black bg-[#F5F5F0] px-3 py-1.5 text-sm font-extrabold shadow-[3px_3px_0_0_#000] transition-transform hover:-translate-y-0.5 hover:bg-komma-yellow hover:shadow-[4px_4px_0_0_#FF1493] sm:px-4 sm:py-2"
                >
                  {value.nameAf}
                </Link>
              );
            })}
          </div>
        </article>
      ))}
    </div>
  );
}
