import type { BubbleValue } from "@/lib/bubbles";
import { getBubbleFontSize } from "@/lib/bubbles";
import { BubbleLabel } from "./BubbleLabel";

interface SelectedBubbleChipProps {
  bubble: BubbleValue;
  onRemove: (id: string) => void;
  isNew?: boolean;
}

export function SelectedBubbleChip({
  bubble,
  onRemove,
  isNew = false,
}: SelectedBubbleChipProps) {
  const fontSize = getBubbleFontSize(bubble.nameAf);

  return (
    <div
      className={`relative ${isNew ? "animate-panel-arrive" : ""}`}
    >
      <div
        className={`flex size-[5.5rem] items-center justify-center rounded-full border-4 border-komma-black bg-komma-pink px-2 shadow-[3px_3px_0_0_#000] sm:size-24 ${fontSize}`}
      >
        <BubbleLabel
          label={bubble.nameAf}
          className={`font-bold text-komma-black ${fontSize}`}
        />
      </div>

      <button
        type="button"
        onClick={() => onRemove(bubble.id)}
        aria-label={`Verwyder ${bubble.nameAf}`}
        className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full border-2 border-komma-black bg-white text-sm font-extrabold leading-none text-komma-black transition-transform hover:scale-110 hover:bg-komma-yellow active:scale-95"
      >
        ×
      </button>
    </div>
  );
}
