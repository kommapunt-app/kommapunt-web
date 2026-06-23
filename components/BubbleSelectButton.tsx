"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import type { BubbleValue } from "@/lib/bubbles";
import { getBubbleFontSize } from "@/lib/bubbles";
import { BubbleInfoPopover } from "./BubbleInfoPopover";
import { BubbleLabel } from "./BubbleLabel";
import { BubbleSelectModal } from "./BubbleSelectModal";

interface BubbleSelectButtonProps {
  bubble: BubbleValue;
  selected: boolean;
  isAnimating?: boolean;
  selectionDisabled?: boolean;
  onAtLimitAttempt?: () => void;
  infoOpen: boolean;
  onInfoOpen: () => void;
  onInfoClose: () => void;
  onToggle: (id: string) => void;
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="size-3.5 text-komma-black sm:size-4"
      aria-hidden="true"
    >
      <path
        d="M5 13l4 4L19 7"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function useSupportsHover() {
  const [supportsHover, setSupportsHover] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover)");

    function update() {
      setSupportsHover(media.matches);
    }

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  return supportsHover;
}

function useMobileViewport() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");

    function update() {
      setIsMobile(media.matches);
    }

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  return isMobile;
}

export function BubbleSelectButton({
  bubble,
  selected,
  isAnimating = false,
  selectionDisabled = false,
  onAtLimitAttempt,
  infoOpen,
  onInfoOpen,
  onInfoClose,
  onToggle,
}: BubbleSelectButtonProps) {
  const fontSize = getBubbleFontSize(bubble.nameAf);
  const supportsHover = useSupportsHover();
  const isMobileViewport = useMobileViewport();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tooltipId = useId();
  const [awaitingSelection, setAwaitingSelection] = useState(false);
  const [placement, setPlacement] = useState<"top" | "bottom">("top");

  useLayoutEffect(() => {
    if (!infoOpen || !wrapperRef.current || isMobileViewport) {
      return;
    }

    const rect = wrapperRef.current.getBoundingClientRect();
    setPlacement(rect.top < 200 ? "bottom" : "top");
  }, [infoOpen, isMobileViewport]);

  useEffect(() => {
    if (!infoOpen) {
      setAwaitingSelection(false);
    }
  }, [infoOpen]);

  useEffect(() => {
    if (!infoOpen || supportsHover) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (isMobileViewport) {
        return;
      }

      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        onInfoClose();
        setAwaitingSelection(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [infoOpen, isMobileViewport, onInfoClose, supportsHover]);

  useEffect(() => {
    if (!infoOpen || isMobileViewport) {
      return;
    }

    function handleScroll() {
      onInfoClose();
      setAwaitingSelection(false);
    }

    window.addEventListener("scroll", handleScroll, true);

    return () => window.removeEventListener("scroll", handleScroll, true);
  }, [infoOpen, isMobileViewport, onInfoClose]);

  function handleSelectClick() {
    if (!supportsHover) {
      if (isMobileViewport) {
        onInfoOpen();
        return;
      }

      if (selectionDisabled) {
        onAtLimitAttempt?.();
        return;
      }

      if (!infoOpen) {
        onInfoOpen();
        setAwaitingSelection(true);
        return;
      }

      onInfoClose();
      setAwaitingSelection(false);
      onToggle(bubble.id);
      return;
    }

    if (selectionDisabled) {
      onAtLimitAttempt?.();
      return;
    }

    onToggle(bubble.id);
  }

  function handleInfoButtonClick(event: React.MouseEvent) {
    event.stopPropagation();

    if (infoOpen) {
      onInfoClose();
      setAwaitingSelection(false);
    } else {
      onInfoOpen();
      setAwaitingSelection(false);
    }
  }

  function handleInfoClose() {
    onInfoClose();
    setAwaitingSelection(false);
  }

  function handleModalSelect() {
    onInfoClose();
    setAwaitingSelection(false);
    onToggle(bubble.id);
  }

  return (
    <div ref={wrapperRef} className="relative flex flex-col items-center">
      {infoOpen && isMobileViewport ? (
        <BubbleSelectModal
          open
          bubble={bubble}
          selected={selected}
          selectionDisabled={selectionDisabled}
          onSelect={handleModalSelect}
          onCancel={handleInfoClose}
          onAtLimitAttempt={onAtLimitAttempt}
        />
      ) : null}

      {infoOpen && !isMobileViewport ? (
        <BubbleInfoPopover
          bubble={bubble}
          id={tooltipId}
          placement={placement}
          onClose={handleInfoClose}
          anchorRef={wrapperRef}
        />
      ) : null}

      {!supportsHover && (
        <button
          type="button"
          onClick={handleInfoButtonClick}
          aria-label={`Meer oor ${bubble.nameAf}`}
          aria-expanded={infoOpen}
          aria-controls={tooltipId}
          className="absolute -bottom-1 -right-1 z-10 flex size-5 items-center justify-center rounded-full border-2 border-komma-black bg-white text-[10px] font-extrabold text-komma-black shadow-[2px_2px_0_0_#000] transition-transform hover:scale-110 active:scale-95 sm:size-6 sm:text-xs"
        >
          i
        </button>
      )}

      <button
        type="button"
        onClick={handleSelectClick}
        onMouseEnter={supportsHover ? onInfoOpen : undefined}
        onMouseLeave={supportsHover ? onInfoClose : undefined}
        onFocus={onInfoOpen}
        onBlur={(event) => {
          if (!wrapperRef.current?.contains(event.relatedTarget as Node)) {
            onInfoClose();
          }
        }}
        aria-pressed={selected}
        aria-disabled={selectionDisabled}
        aria-describedby={infoOpen && !isMobileViewport ? tooltipId : undefined}
        aria-label={`${selected ? "Verwyder" : "Kies"} ${bubble.nameAf}`}
        className={`relative flex size-[6.25rem] shrink-0 items-center justify-center rounded-full border-4 px-2 font-bold transition-all duration-200 sm:size-[6.75rem] sm:px-2.5 ${
          selectionDisabled
            ? "cursor-not-allowed opacity-40"
            : "hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000] active:translate-y-0 active:shadow-[2px_2px_0_0_#000]"
        } ${isAnimating ? "animate-bubble-select" : ""} ${
          infoOpen && !supportsHover
            ? "ring-2 ring-komma-pink ring-offset-2 ring-offset-komma-yellow"
            : ""
        } ${
          selected
            ? "border-komma-pink bg-[#FFF5FA] text-komma-black shadow-[4px_4px_0_0_#FF1493]"
            : "border-komma-black bg-[#FFFEF5] text-komma-black shadow-[4px_4px_0_0_#000]"
        }`}
      >
        <BubbleLabel
          label={bubble.nameAf}
          className={`[overflow-wrap:normal] ${fontSize}`}
        />
        {selected && (
          <span className="absolute -right-0.5 -top-0.5 flex size-6 items-center justify-center rounded-full border-2 border-komma-black bg-komma-pink sm:size-7">
            <CheckIcon />
          </span>
        )}
      </button>

      {!supportsHover && infoOpen && awaitingSelection && !isMobileViewport && (
        <p className="absolute top-[calc(100%+0.25rem)] w-28 text-center text-[10px] font-semibold leading-tight text-komma-black/55">
          Tik weer om te kies
        </p>
      )}

    </div>
  );
}
