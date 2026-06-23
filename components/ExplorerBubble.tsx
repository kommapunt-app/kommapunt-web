"use client";

import type { ReactNode } from "react";
import { formatBubbleLabel } from "@/lib/bubble-label";
import { getBubbleFontSize } from "@/lib/bubbles";

export type ExplorerBubbleSize = "hub" | "group" | "value" | "map-value";

interface ExplorerBubbleProps {
  label: string;
  sublabel?: string;
  icon?: ReactNode;
  size: ExplorerBubbleSize;
  active?: boolean;
  dimmed?: boolean;
  highlighted?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  animationDelayMs?: number;
  ariaLabel?: string;
  interactive?: boolean;
  pulsing?: boolean;
}

const sizeClasses: Record<ExplorerBubbleSize, string> = {
  hub: "h-36 w-36 text-lg sm:h-44 sm:w-44 sm:text-xl",
  group: "h-[7.5rem] w-[7.5rem] text-[10px] leading-tight sm:h-32 sm:w-32 sm:text-[11px]",
  value:
    "h-[5.75rem] w-[5.75rem] text-[10px] leading-tight sm:h-24 sm:w-24 sm:text-[11px]",
  "map-value":
    "h-[4.5rem] w-[4.5rem] text-[8px] leading-[1.15] sm:h-[5rem] sm:w-[5rem] sm:text-[9px] md:h-[5.5rem] md:w-[5.5rem] md:text-[10px] lg:h-[5.75rem] lg:w-[5.75rem]",
};

export function ExplorerBubble({
  label,
  sublabel,
  icon,
  size,
  active = false,
  dimmed = false,
  highlighted = false,
  onClick,
  className = "",
  style,
  animationDelayMs = 0,
  ariaLabel,
  interactive = true,
  pulsing = false,
}: ExplorerBubbleProps) {
  const lines = formatBubbleLabel(label).slice(0, 2);
  const fontSizeClass = size === "value" ? getBubbleFontSize(label) : "";

  const bubbleClassName = [
    "bubble-pop-in flex shrink-0 flex-col items-center justify-center rounded-full border-4 border-komma-black px-2 py-2 text-center font-extrabold shadow-[4px_4px_0_0_#000] transition-all duration-200",
    sizeClasses[size],
    size === "hub"
      ? "bg-komma-yellow hover:-translate-y-1 hover:shadow-[5px_5px_0_0_#FF1493]"
      : "bg-[#F5F5F0] hover:-translate-y-0.5 hover:bg-white hover:shadow-[5px_5px_0_0_#FF1493]",
    active
      ? "scale-105 border-komma-pink bg-komma-yellow shadow-[5px_5px_0_0_#FF1493]"
      : "",
    highlighted
      ? "ring-4 ring-komma-pink ring-offset-2 ring-offset-komma-yellow"
      : "",
    pulsing ? "value-map-focus-pulse" : "",
    dimmed ? "opacity-40 saturate-50" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const bubbleStyle: React.CSSProperties = {
    ...style,
    animationDelay: `${animationDelayMs}ms`,
  };

  const bubbleContent = (
    <>
      {icon ? (
        <span className="mb-1 flex shrink-0 items-center justify-center [&_svg]:h-6 [&_svg]:w-6 sm:[&_svg]:h-7 sm:[&_svg]:w-7">
          {icon}
        </span>
      ) : null}
      {lines.map((line) => (
        <span
          key={line}
          className={`block max-w-full text-komma-black ${fontSizeClass}`}
        >
          {line}
        </span>
      ))}
      {sublabel ? (
        <span className="mt-1 block text-[9px] font-semibold uppercase tracking-wide text-komma-black/45 sm:text-[10px]">
          {sublabel}
        </span>
      ) : null}
    </>
  );

  if (!interactive) {
    return (
      <div
        aria-label={ariaLabel ?? label}
        style={bubbleStyle}
        className={bubbleClassName.replace(/hover:[^\s]+/g, "")}
      >
        {bubbleContent}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel ?? label}
      style={bubbleStyle}
      className={bubbleClassName}
    >
      {bubbleContent}
    </button>
  );
}
