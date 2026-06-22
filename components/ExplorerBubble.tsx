"use client";

import { formatBubbleLabel } from "@/lib/bubble-label";
import { getBubbleFontSize } from "@/lib/bubbles";

export type ExplorerBubbleSize = "hub" | "group" | "value";

interface ExplorerBubbleProps {
  label: string;
  sublabel?: string;
  size: ExplorerBubbleSize;
  active?: boolean;
  dimmed?: boolean;
  highlighted?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  animationDelayMs?: number;
  ariaLabel?: string;
}

const sizeClasses: Record<ExplorerBubbleSize, string> = {
  hub: "h-36 w-36 text-lg sm:h-44 sm:w-44 sm:text-xl",
  group: "h-[7.5rem] w-[7.5rem] text-[10px] leading-tight sm:h-32 sm:w-32 sm:text-[11px]",
  value:
    "h-[5.75rem] w-[5.75rem] text-[10px] leading-tight sm:h-24 sm:w-24 sm:text-[11px]",
};

export function ExplorerBubble({
  label,
  sublabel,
  size,
  active = false,
  dimmed = false,
  highlighted = false,
  onClick,
  className = "",
  style,
  animationDelayMs = 0,
  ariaLabel,
}: ExplorerBubbleProps) {
  const lines = formatBubbleLabel(label);
  const fontSizeClass = size === "value" ? getBubbleFontSize(label) : "";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel ?? label}
      style={{
        ...style,
        animationDelay: `${animationDelayMs}ms`,
      }}
      className={[
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
        dimmed ? "opacity-40 saturate-50" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {lines.map((line) => (
        <span
          key={line}
          className={`block text-komma-black ${fontSizeClass}`}
        >
          {line}
        </span>
      ))}
      {sublabel ? (
        <span className="mt-1 block text-[9px] font-semibold uppercase tracking-wide text-komma-black/45 sm:text-[10px]">
          {sublabel}
        </span>
      ) : null}
    </button>
  );
}
