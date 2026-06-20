import type { BubbleCategory, BubbleValue } from "@/lib/bubbles";
import { BubbleCategoryIcon } from "./BubbleCategoryIcon";
import { BubbleSelectButton } from "./BubbleSelectButton";

interface BubbleCategorySectionProps {
  category: BubbleCategory;
  bubbles: BubbleValue[];
  selectedIds: string[];
  animatingId: string | null;
  activeInfoId: string | null;
  atLimit?: boolean;
  onAtLimitAttempt?: () => void;
  onInfoOpen: (id: string) => void;
  onInfoClose: () => void;
  onToggle: (id: string) => void;
}

export function BubbleCategorySection({
  category,
  bubbles,
  selectedIds,
  animatingId,
  activeInfoId,
  atLimit = false,
  onAtLimitAttempt,
  onInfoOpen,
  onInfoClose,
  onToggle,
}: BubbleCategorySectionProps) {
  return (
    <section className="flex w-[6.75rem] shrink-0 snap-start flex-col sm:w-[7.25rem] lg:w-auto">
      <div className="mb-3 flex min-h-[4.5rem] flex-col items-center gap-2 sm:min-h-[5rem] sm:gap-2.5 lg:min-h-[5.25rem]">
        <BubbleCategoryIcon categoryId={category.id} />
        <h3 className="text-center text-xs font-extrabold leading-tight text-komma-black sm:text-sm">
          {category.label}
        </h3>
      </div>
      <div className="flex flex-col items-center gap-3">
        {bubbles.map((bubble) => (
          <BubbleSelectButton
            key={bubble.id}
            bubble={bubble}
            selected={selectedIds.includes(bubble.id)}
            isAnimating={animatingId === bubble.id}
            selectionDisabled={atLimit && !selectedIds.includes(bubble.id)}
            onAtLimitAttempt={onAtLimitAttempt}
            infoOpen={activeInfoId === bubble.id}
            onInfoOpen={() => onInfoOpen(bubble.id)}
            onInfoClose={onInfoClose}
            onToggle={onToggle}
          />
        ))}
      </div>
    </section>
  );
}
