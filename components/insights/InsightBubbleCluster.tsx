import type { ValueCount } from "@/lib/insights/mock-data";

const BUBBLE_COLORS = ["#FF1493", "#F5DD00", "#FFFFFF", "#000000"] as const;

function bubbleSize(index: number, maxShare: number, share: number) {
  const min = 4.5;
  const max = 9;
  const normalized = maxShare > 0 ? share / maxShare : 0;
  return min + normalized * (max - min) - index * 0.15;
}

interface InsightBubbleClusterProps {
  values: ValueCount[];
  accent?: "yellow" | "pink" | "white";
}

export function InsightBubbleCluster({
  values,
  accent = "yellow",
}: InsightBubbleClusterProps) {
  const maxShare = values[0]?.share ?? 1;
  const frameClass =
    accent === "pink"
      ? "bg-komma-pink"
      : accent === "white"
        ? "bg-white"
        : "bg-komma-yellow";

  return (
    <div
      className={`relative min-h-[14rem] overflow-hidden rounded-[2rem] border-4 border-komma-black p-5 shadow-[6px_6px_0_0_#000] sm:min-h-[16rem] sm:p-7 ${frameClass}`}
    >
      <div className="relative mx-auto flex h-full min-h-[11rem] max-w-lg items-center justify-center">
        {values.map((value, index) => {
          const sizeRem = bubbleSize(index, maxShare, value.share);
          const color = BUBBLE_COLORS[index % BUBBLE_COLORS.length];
          const offsetX = (index % 2 === 0 ? -1 : 1) * (index * 12 + 8);
          const offsetY = index * 10 - 12;

          return (
            <div
              key={value.nameAf}
              className="absolute flex items-center justify-center rounded-full border-4 border-komma-black text-center font-extrabold leading-tight shadow-[3px_3px_0_0_#000]"
              style={{
                width: `${sizeRem}rem`,
                height: `${sizeRem}rem`,
                backgroundColor: color,
                color: color === "#000000" ? "#F5DD00" : "#000000",
                transform: `translate(${offsetX}px, ${offsetY}px)`,
                zIndex: values.length - index,
              }}
            >
              <span className="px-2 text-[0.65rem] sm:text-xs">{value.nameAf}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
