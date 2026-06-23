"use client";

import { useLayoutEffect, useRef, type RefObject } from "react";
import type { BubbleValue } from "@/lib/bubbles";

type PopoverPlacement = "top" | "bottom";

interface BubbleInfoPopoverProps {
  bubble: BubbleValue;
  id: string;
  placement?: PopoverPlacement;
  onClose?: () => void;
  anchorRef?: RefObject<HTMLElement | null>;
}

const CARD_CLASS =
  "rounded-2xl border-4 border-komma-black bg-[#FFFEF5] px-3.5 py-3 text-left shadow-[5px_5px_0_0_#FF1493] sm:px-4 sm:py-3.5";

function BubbleInfoPopoverContent({ bubble }: { bubble: BubbleValue }) {
  return (
    <>
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
    </>
  );
}

function clampDesktopPopoverHorizontal(
  anchor: HTMLElement,
  popover: HTMLElement,
) {
  const viewportPadding = 16;
  const anchorRect = anchor.getBoundingClientRect();
  const popoverWidth = popover.offsetWidth;

  let leftInViewport =
    anchorRect.left + anchorRect.width / 2 - popoverWidth / 2;

  if (leftInViewport < viewportPadding) {
    leftInViewport = viewportPadding;
  } else if (
    leftInViewport + popoverWidth >
    window.innerWidth - viewportPadding
  ) {
    leftInViewport = window.innerWidth - viewportPadding - popoverWidth;
  }

  popover.style.left = `${leftInViewport - anchorRect.left}px`;
  popover.style.transform = "none";
}

export function BubbleInfoPopover({
  bubble,
  id,
  placement = "top",
  anchorRef,
}: BubbleInfoPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!anchorRef?.current || !popoverRef.current) {
      return;
    }

    clampDesktopPopoverHorizontal(anchorRef.current, popoverRef.current);

    function handleResize() {
      if (anchorRef?.current && popoverRef.current) {
        clampDesktopPopoverHorizontal(anchorRef.current, popoverRef.current);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [anchorRef, placement, bubble.id]);

  const positionClasses =
    placement === "top"
      ? "bottom-[calc(100%+0.5rem)]"
      : "top-[calc(100%+0.5rem)]";

  return (
    <div
      id={id}
      ref={popoverRef}
      role="tooltip"
      className={`pointer-events-none absolute z-[60] w-[13.5rem] sm:w-60 ${positionClasses} ${CARD_CLASS}`}
      style={{ left: "50%", transform: "translateX(-50%)" }}
    >
      <BubbleInfoPopoverContent bubble={bubble} />
    </div>
  );
}
