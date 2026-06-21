import { InsightBubbleCluster } from "@/components/insights/InsightBubbleCluster";
import type { ProvinceValueSlice } from "@/lib/insights/mock-data";

interface ProvinceValuesSectionProps {
  title: string;
  subtitle: string;
  slices: ProvinceValueSlice[];
}

export function ProvinceValuesSection({
  title,
  subtitle,
  slices,
}: ProvinceValuesSectionProps) {
  return (
    <section>
      <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
      <p className="mt-2 max-w-2xl text-base font-semibold text-komma-black/70">
        {subtitle}
      </p>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {slices.map((slice) => (
          <article
            key={slice.province}
            className="rounded-[2rem] border-4 border-komma-black bg-komma-yellow p-4 shadow-[6px_6px_0_0_#000] sm:p-5"
          >
            <p className="mb-3 text-xl font-extrabold">{slice.label}</p>
            <InsightBubbleCluster values={slice.topValues} accent="white" />
          </article>
        ))}
      </div>
    </section>
  );
}
