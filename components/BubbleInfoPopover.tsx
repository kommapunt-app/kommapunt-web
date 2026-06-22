"use client";

import { useLayoutEffect, useRef, type RefObject } from "react";
import { createPortal } from "react-dom";
import type { BubbleValue } from "@/lib/bubbles";

type PopoverPlacement = "top" | "bottom";

interface BubbleInfoPopoverProps {
  bubble: BubbleValue;
  id: string;
  placement?: PopoverPlacement;
  mobile?: boolean;
  onClose?: () => void;
  anchorRef?: RefObject<HTMLElement | null>;
}

const CARD_CLASS =
  "rounded-2xl border-4 border-komma-black bg-[#FFFEF5] px-3.5 py-3 text-left shadow-[5px_5px_0_0_#FF1493] sm:px-4 sm:py-3.5";

function BubbleInfoPopoverContent({
  bubble,
  onClose,
  showClose,
}: {
  bubble: BubbleValue;
  onClose?: () => void;
  showClose: boolean;
}) {
  return (
    <>
      {showClose ? (
        <button
          type="button"
          onClick={onClose}
          aria-label="Sluit"
          className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full border-2 border-komma-black bg-white text-lg font-extrabold leading-none text-komma-black shadow-[2px_2px_0_0_#000] transition-transform hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#FF1493] active:translate-y-0"
        >
          ×
        </button>
      ) : null}

      <div className={`mb-1.5 flex items-start gap-2 ${showClose ? "pr-8" : ""}`}>
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
  mobile = false,
  onClose,
  anchorRef,
}: BubbleInfoPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (mobile || !anchorRef?.current || !popoverRef.current) {
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
  }, [anchorRef, mobile, placement, bubble.id]);

  if (mobile) {
    if (typeof document === "undefined") {
      return null;
    }

    return createPortal(
      <>
        <button
          type="button"
          className="fixed inset-0 z-[70] bg-komma-black/35"
          aria-label="Sluit inligting"
          onClick={onClose}
        />
        <div
          id={id}
          ref={popoverRef}
          role="dialog"
          aria-modal="true"
          className={`fixed bottom-24 left-4 right-4 z-[80] mx-auto w-[calc(100vw-32px)] max-w-[420px] ${CARD_CLASS}`}
        >
          <BubbleInfoPopoverContent
            bubble={bubble}
            onClose={onClose}
            showClose
          />
        </div>
      </>,
      document.body,
    );
  }

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
      <BubbleInfoPopoverContent bubble={bubble} showClose={false} />
    </div>
  );
}
