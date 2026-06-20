import type { BubbleValue } from "@/lib/bubbles";
import { MAX_BUBBLES } from "@/lib/constants";
import { SelectedBubbleChip } from "./SelectedBubbleChip";

interface SelectedBubblesPanelProps {
  selectedBubbles: BubbleValue[];
  onRemove: (id: string) => void;
  lastAddedId: string | null;
  isComplete?: boolean;
}

export function SelectedBubblesPanel({
  selectedBubbles,
  onRemove,
  lastAddedId,
  isComplete = false,
}: SelectedBubblesPanelProps) {
  const selectedCount = selectedBubbles.length;

  return (
    <aside
      className={`rounded-3xl border-4 p-5 shadow-[6px_6px_0_0_#000] sm:p-6 lg:sticky lg:top-24 lg:self-start ${
        isComplete
          ? "border-komma-pink bg-komma-yellow"
          : "border-komma-black bg-white"
      }`}
    >
      <div className="mb-4">
        <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">
          Jou gekose Bubbles
        </h2>
        <p className="mt-1 text-sm font-medium text-komma-black/65 sm:text-base">
          Dit is wat jy gekies het.
        </p>
        <p className="mt-3 text-sm font-bold sm:text-base">
          {isComplete ? (
            <span className="text-komma-pink">
              ✓ {MAX_BUBBLES} van {MAX_BUBBLES} gekies
            </span>
          ) : (
            <>
              <span className="text-komma-pink">{selectedCount}</span>
              <span className="text-komma-black/60">
                {" "}
                van {MAX_BUBBLES} gekies
              </span>
            </>
          )}
        </p>
        {isComplete && (
          <p className="mt-2 text-sm font-semibold text-komma-black/75 sm:text-base">
            Jy is gereed om te rangskik!
          </p>
        )}
      </div>

      {selectedCount === 0 ? (
        <div className="flex min-h-28 items-center justify-center rounded-2xl border-4 border-dashed border-komma-black/25 bg-komma-yellow/40 px-4 py-6 text-center">
          <p className="text-sm font-semibold text-komma-black/55 sm:text-base">
            Kies Bubbles uit die biblioteek om hulle hier te sien.
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-3 sm:gap-4">
          {selectedBubbles.map((bubble) => (
            <SelectedBubbleChip
              key={bubble.id}
              bubble={bubble}
              onRemove={onRemove}
              isNew={bubble.id === lastAddedId}
            />
          ))}
        </div>
      )}
    </aside>
  );
}
