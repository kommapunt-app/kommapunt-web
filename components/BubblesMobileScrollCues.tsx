"use client";

import type { ReactNode } from "react";

interface BubblesMobileScrollCuesProps {
  active: boolean;
  children: ReactNode;
}

export function BubblesScrollHintPill({ active }: { active: boolean }) {
  if (!active) {
    return null;
  }

  return (
    <div className="mb-4 flex justify-center lg:hidden">
      <p
        className="rounded-full border-4 border-komma-black bg-white px-4 py-2 text-center text-xs font-extrabold text-komma-black shadow-[3px_3px_0_0_#FF1493] sm:text-sm"
        role="status"
      >
        Rol af vir meer Bubbles ↓
      </p>
    </div>
  );
}

export function BubblesMobileScrollCues({
  active,
  children,
}: BubblesMobileScrollCuesProps) {
  return (
    <div className="relative">
      {active ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-komma-yellow from-40% via-komma-yellow/70 to-transparent lg:hidden"
        />
      ) : null}
      {children}
    </div>
  );
}

export function BubblesScrollArrowCue({ active }: { active: boolean }) {
  if (!active) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 bottom-[4.5rem] z-40 flex justify-center lg:hidden"
    >
      <div className="animate-bounce-down flex flex-col items-center rounded-full border-2 border-komma-black bg-white px-3.5 py-1.5 text-center font-extrabold text-komma-black shadow-[2px_2px_0_0_#FF1493]">
        <span className="text-[10px] leading-none">meer</span>
        <span className="mt-0.5 text-sm leading-none">↓</span>
      </div>
    </div>
  );
}
