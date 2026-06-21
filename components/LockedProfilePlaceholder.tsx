"use client";

import { Button } from "@/components/Button";

interface LockedProfilePlaceholderProps {
  onUnlock: () => void;
}

export function LockedProfilePlaceholder({ onUnlock }: LockedProfilePlaceholderProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-[2rem] border-4 border-komma-black bg-komma-yellow shadow-[6px_6px_0_0_#FF1493]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-40 blur-md"
      >
        <div className="absolute left-[8%] top-[18%] size-32 rounded-full border-4 border-komma-black bg-komma-pink sm:size-40" />
        <div className="absolute right-[10%] top-[12%] size-24 rounded-full border-4 border-komma-black bg-white sm:size-28" />
        <div className="absolute bottom-[16%] left-[22%] size-20 rounded-full border-4 border-komma-black bg-white sm:size-24" />
        <div className="absolute bottom-[10%] right-[18%] size-28 rounded-full border-4 border-komma-black bg-komma-pink sm:size-32" />
        <div className="absolute left-1/2 top-1/2 size-36 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-komma-black bg-komma-yellow sm:size-44" />
      </div>

      <div className="relative z-10 px-6 py-14 text-center sm:px-10 sm:py-16">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full border-4 border-komma-black bg-komma-pink text-2xl font-extrabold shadow-[4px_4px_0_0_#000] sm:size-20 sm:text-3xl">
          i
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight text-komma-black sm:text-3xl">
          Jou Bubbles is gereed
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm font-semibold leading-relaxed text-komma-black/70 sm:text-base">
          Voltooi die vinnige vorm om jou profiel te sien en af te laai.
        </p>
        <Button onClick={onUnlock} className="mt-8 px-8 py-4 text-base sm:text-lg">
          Ontsluit my profiel
        </Button>
      </div>
    </div>
  );
}
