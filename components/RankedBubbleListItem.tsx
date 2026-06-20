import { formatBubbleScore, type RankedBubbleResult } from "@/lib/results";

interface RankedBubbleListItemProps {
  item: RankedBubbleResult;
}

export function RankedBubbleListItem({ item }: RankedBubbleListItemProps) {
  const isTopThree = item.rank <= 3;

  return (
    <li
      className={`flex gap-4 rounded-2xl border-4 border-komma-black p-4 shadow-[4px_4px_0_0_#000] sm:gap-5 sm:p-5 ${
        isTopThree ? "bg-komma-yellow" : "bg-[#FFFEF5]"
      }`}
    >
      <div
        className={`flex size-10 shrink-0 items-center justify-center rounded-full border-4 border-komma-black text-lg font-extrabold sm:size-12 sm:text-xl ${
          item.rank === 1
            ? "bg-komma-pink text-komma-black"
            : "bg-white text-komma-black"
        }`}
      >
        {item.rank}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-lg font-extrabold sm:text-xl">
            {item.bubble.nameAf}
          </h3>
          <span className="text-sm font-semibold uppercase tracking-wide text-komma-black/45">
            {item.bubble.nameEn}
          </span>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-komma-black/75 sm:text-base">
          {item.bubble.descriptionAf}
        </p>
        <p className="mt-2 text-xs font-bold text-komma-black/50 sm:text-sm">
          gewig: {formatBubbleScore(item.score)}
        </p>
      </div>
    </li>
  );
}
