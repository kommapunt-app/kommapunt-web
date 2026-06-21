import { InsightBubbleCluster } from "@/components/insights/InsightBubbleCluster";
import type { ValueCount } from "@/lib/insights/mock-data";

interface TopValuesInsightSectionProps {
  title: string;
  subtitle: string;
  values: ValueCount[];
}

export function TopValuesInsightSection({
  title,
  subtitle,
  values,
}: TopValuesInsightSectionProps) {
  return (
    <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-8">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
        <p className="mt-2 max-w-md text-base font-semibold text-komma-black/70">
          {subtitle}
        </p>
        <ul className="mt-5 space-y-2">
          {values.map((value, index) => (
            <li
              key={value.nameAf}
              className="flex items-center gap-3 rounded-full border-4 border-komma-black bg-white px-4 py-2 text-sm font-extrabold shadow-[3px_3px_0_0_#000] sm:text-base"
            >
              <span className="flex size-8 items-center justify-center rounded-full border-4 border-komma-black bg-komma-yellow text-xs">
                {index + 1}
              </span>
              {value.nameAf}
            </li>
          ))}
        </ul>
      </div>

      <InsightBubbleCluster values={values} accent="yellow" />
    </section>
  );
}
