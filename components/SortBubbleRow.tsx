"use client";

import type { DragEvent } from "react";
import type { BubbleValue } from "@/lib/bubbles";

interface SortBubbleRowProps {
  bubble: BubbleValue;
  rank: number;
  isDragging: boolean;
  isDropTarget: boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
  onDragOver: (event: DragEvent<HTMLLIElement>) => void;
  onDrop: () => void;
}

function DragHandleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="size-5 text-komma-black/45 sm:size-6"
      aria-hidden="true"
    >
      <path
        d="M8 7h.01M16 7h.01M8 12h.01M16 12h.01M8 17h.01M16 17h.01"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SortBubbleRow({
  bubble,
  rank,
  isDragging,
  isDropTarget,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
}: SortBubbleRowProps) {
  return (
    <li
      draggable
      onDragStart={(event) => {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", bubble.id);
        onDragStart();
      }}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDrop={(event) => {
        event.preventDefault();
        onDrop();
      }}
      className={`flex items-center gap-3 rounded-2xl border-4 border-komma-black bg-[#FFFEF5] px-3 py-3 shadow-[4px_4px_0_0_#000] transition-all sm:gap-4 sm:px-4 sm:py-4 ${
        isDragging ? "scale-[0.98] opacity-50" : ""
      } ${isDropTarget ? "ring-4 ring-komma-pink ring-offset-2 ring-offset-komma-yellow" : ""}`}
    >
      <div
        className="flex size-10 shrink-0 items-center justify-center rounded-full border-4 border-komma-black bg-komma-yellow text-sm font-extrabold sm:size-11 sm:text-base"
        aria-hidden="true"
      >
        {rank}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-base font-extrabold leading-tight sm:text-lg">
          {bubble.nameAf}
        </p>
        <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-komma-black/45 sm:text-sm">
          {bubble.nameEn}
        </p>
        <p className="mt-2 hidden text-sm leading-relaxed text-komma-black/70 sm:block">
          {bubble.descriptionAf}
        </p>
      </div>

      <button
        type="button"
        className="flex shrink-0 cursor-grab touch-none items-center justify-center rounded-xl border-2 border-komma-black/15 bg-white p-2 active:cursor-grabbing"
        aria-label={`Sleep ${bubble.nameAf}`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <DragHandleIcon />
      </button>
    </li>
  );
}
