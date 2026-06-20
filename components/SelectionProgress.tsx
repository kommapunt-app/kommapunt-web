import { MAX_BUBBLES } from "@/lib/constants";

interface SelectionProgressProps {
  selectedCount: number;
  maxCount?: number;
  className?: string;
}

export function SelectionProgress({
  selectedCount,
  maxCount = MAX_BUBBLES,
  className = "",
}: SelectionProgressProps) {
  const progress = Math.min((selectedCount / maxCount) * 100, 100);

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <p className="text-sm font-bold sm:text-base">
        <span className="text-komma-pink">{selectedCount}</span>
        <span className="text-komma-black/60"> van {maxCount} gekies</span>
      </p>
      <div className="h-2.5 overflow-hidden rounded-full border-2 border-komma-black bg-white">
        <div
          className="h-full rounded-full bg-komma-pink transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
