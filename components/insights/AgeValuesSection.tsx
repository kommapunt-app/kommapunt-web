import { InsightBubbleCluster } from "@/components/insights/InsightBubbleCluster";
import type { AgeGroupValueSlice } from "@/lib/insights/mock-data";

interface AgeValuesSectionProps {
  title: string;
  subtitle: string;
  slices: AgeGroupValueSlice[];
}

export function AgeValuesSection({
  title,
  subtitle,
  slices,
}: AgeValuesSectionProps) {
  return (
    <section>
      <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
      <p className="mt-2 max-w-2xl text-base font-semibold text-komma-black/70">
        {subtitle}
      </p>

      <div className="mt-6 flex flex-col gap-6">
        {slices.map((slice, index) => (
          <article
            key={slice.ageGroup}
            className="grid gap-4 rounded-[2rem] border-4 border-komma-black bg-[#FFFEF5] p-5 shadow-[6px_6px_0_0_#000] sm:p-6 lg:grid-cols-[12rem_minmax(0,1fr)] lg:items-center"
          >
            <div>
              <p className="text-sm font-extrabold uppercase tracking-wide text-komma-black/60">
                Ouderdom
              </p>
              <p className="mt-1 text-3xl font-extrabold">{slice.label}</p>
            </div>
            <InsightBubbleCluster
              values={slice.topValues}
              accent={index % 2 === 0 ? "pink" : "white"}
            />
          </article>
        ))}
      </div>
    </section>
  );
}
