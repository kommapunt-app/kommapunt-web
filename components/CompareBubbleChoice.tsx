import type { BubbleValue } from "@/lib/bubbles";

interface CompareBubbleChoiceProps {
  bubble: BubbleValue;
  onSelect: () => void;
}

export function CompareBubbleChoice({
  bubble,
  onSelect,
}: CompareBubbleChoiceProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="group flex w-full flex-col items-center gap-4 rounded-[2.5rem] border-4 border-komma-black bg-[#FFFEF5] px-6 py-8 text-center shadow-[6px_6px_0_0_#000] transition-all hover:-translate-y-1 hover:bg-white hover:shadow-[8px_8px_0_0_#FF1493] active:translate-y-0 active:shadow-[3px_3px_0_0_#000] sm:px-8 sm:py-10"
    >
      <div className="flex size-16 items-center justify-center rounded-full border-4 border-komma-black bg-komma-yellow shadow-[3px_3px_0_0_#000] transition-transform group-hover:scale-105 sm:size-20">
        <span className="text-lg font-extrabold sm:text-xl">
          {bubble.nameAf.charAt(0)}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-2xl font-extrabold leading-tight sm:text-3xl">
          {bubble.nameAf}
        </span>
        <p className="text-sm leading-relaxed text-komma-black/75 sm:text-base">
          {bubble.descriptionAf}
        </p>
        <span className="text-xs font-semibold uppercase tracking-wide text-komma-black/45 sm:text-sm">
          {bubble.nameEn}
        </span>
      </div>
    </button>
  );
}
