import type { ValuePairPop } from "@/lib/insights/mock-data";

interface PoppingValuesSectionProps {
  title: string;
  subtitle: string;
  pairs: ValuePairPop[];
}

export function PoppingValuesSection({
  title,
  subtitle,
  pairs,
}: PoppingValuesSectionProps) {
  return (
    <section>
      <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
      <p className="mt-2 max-w-2xl text-base font-semibold text-komma-black/70">
        {subtitle}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {pairs.map((pair) => (
          <article
            key={pair.values.join("-")}
            className="rounded-[2rem] border-4 border-komma-black bg-white p-5 shadow-[6px_6px_0_0_#FF1493] sm:p-6"
          >
            <div className="mb-4 flex min-h-[8rem] items-center justify-center gap-3">
              <span className="flex size-20 items-center justify-center rounded-full border-4 border-komma-black bg-komma-yellow px-2 text-center text-xs font-extrabold leading-tight sm:size-24 sm:text-sm">
                {pair.values[0]}
              </span>
              <span className="text-2xl font-extrabold text-komma-pink">POP</span>
              <span className="flex size-20 items-center justify-center rounded-full border-4 border-komma-black bg-komma-pink px-2 text-center text-xs font-extrabold leading-tight sm:size-24 sm:text-sm">
                {pair.values[1]}
              </span>
            </div>
            <p className="text-center text-sm font-extrabold">
              Saam in Top 5: {Math.round(pair.popScore * 100)}%
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
