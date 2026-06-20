import { VALUES_GUIDE_INTRO } from "@/lib/values-guide/intro";

export function ValuesGuideIntro() {
  return (
    <div className="mb-12 space-y-8 sm:mb-16 sm:space-y-10">
      <section className="rounded-[2rem] border-4 border-komma-black bg-[#F3F1EC] p-6 shadow-[6px_6px_0_0_#000] sm:p-8">
        <h2 className="mb-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
          {VALUES_GUIDE_INTRO.whatAreValues.titleAf}
        </h2>
        <p className="text-base leading-relaxed text-komma-black/85 sm:text-lg">
          {VALUES_GUIDE_INTRO.whatAreValues.bodyAf}
        </p>
      </section>

      <section className="rounded-[2rem] border-4 border-komma-black bg-white p-6 shadow-[6px_6px_0_0_#000] sm:p-8">
        <h2 className="mb-4 text-2xl font-extrabold tracking-tight sm:text-3xl">
          {VALUES_GUIDE_INTRO.whyValuesMatter.titleAf}
        </h2>
        <ul className="space-y-2.5">
          {VALUES_GUIDE_INTRO.whyValuesMatter.pointsAf.map((point) => (
            <li
              key={point}
              className="flex gap-3 text-base leading-relaxed text-komma-black/85 sm:text-lg"
            >
              <span
                className="mt-2 size-2 shrink-0 rounded-full border-2 border-komma-black bg-komma-pink"
                aria-hidden="true"
              />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-[2rem] border-4 border-komma-black bg-komma-yellow p-6 shadow-[6px_6px_0_0_#000] sm:p-8">
        <h2 className="mb-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
          {VALUES_GUIDE_INTRO.valuesAndNeeds.titleAf}
        </h2>
        <p className="text-base leading-relaxed text-komma-black/85 sm:text-lg">
          {VALUES_GUIDE_INTRO.valuesAndNeeds.bodyAf}
        </p>
      </section>

      <section className="rounded-[2rem] border-4 border-komma-black bg-komma-pink/15 p-6 shadow-[6px_6px_0_0_#FF1493] sm:p-8">
        <h2 className="mb-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
          {VALUES_GUIDE_INTRO.kommaFraming.titleAf}
        </h2>
        <p className="text-base font-semibold leading-relaxed text-komma-black/90 sm:text-lg">
          {VALUES_GUIDE_INTRO.kommaFraming.bodyAf}
        </p>
      </section>
    </div>
  );
}
