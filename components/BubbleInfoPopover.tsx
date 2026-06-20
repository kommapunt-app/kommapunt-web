import type { BubbleValue } from "@/lib/bubbles";

type PopoverPlacement = "top" | "bottom";

interface BubbleInfoPopoverProps {
  bubble: BubbleValue;
  id: string;
  placement?: PopoverPlacement;
}

export function BubbleInfoPopover({
  bubble,
  id,
  placement = "top",
}: BubbleInfoPopoverProps) {
  const positionClasses =
    placement === "top"
      ? "bottom-[calc(100%+0.5rem)]"
      : "top-[calc(100%+0.5rem)]";

  return (
    <div
      id={id}
      role="tooltip"
      className={`pointer-events-none absolute left-1/2 z-[60] w-[13.5rem] -translate-x-1/2 rounded-2xl border-4 border-komma-black bg-[#FFFEF5] px-3.5 py-3 text-left shadow-[5px_5px_0_0_#FF1493] sm:w-60 sm:px-4 sm:py-3.5 ${positionClasses}`}
    >
      <div className="mb-1.5 flex items-start gap-2">
        <span
          className="mt-1.5 size-2 shrink-0 rounded-full border-2 border-komma-black bg-komma-pink"
          aria-hidden="true"
        />
        <div className="min-w-0">
          <p className="text-sm font-extrabold leading-tight text-komma-black sm:text-base">
            {bubble.nameAf}
          </p>
          <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-komma-black/45 sm:text-xs">
            {bubble.nameEn}
          </p>
        </div>
      </div>

      <p className="text-xs leading-relaxed text-komma-black/80 sm:text-sm">
        {bubble.descriptionAf}
      </p>
    </div>
  );
}
