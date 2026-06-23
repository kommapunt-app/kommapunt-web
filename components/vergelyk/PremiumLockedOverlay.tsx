"use client";

interface PremiumLockedOverlayProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export function PremiumLockedOverlay({
  title = "Premium kenmerk",
  description = "Ontsluit premium om hierdie resultate te sien en vergelykings uit te voer.",
  children,
}: PremiumLockedOverlayProps) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border-4 border-komma-black bg-[#FFFEF5] shadow-[6px_6px_0_0_#000]">
      <div aria-hidden="true" className="pointer-events-none select-none blur-sm opacity-60">
        {children}
      </div>

      <div className="absolute inset-0 flex items-center justify-center bg-komma-yellow/75 px-6 py-10 backdrop-blur-[2px]">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full border-4 border-komma-black bg-komma-pink text-xl font-extrabold shadow-[4px_4px_0_0_#000]">
            ★
          </div>
          <h3 className="text-2xl font-extrabold tracking-tight">{title}</h3>
          <p className="mt-2 text-sm font-semibold leading-relaxed text-komma-black/75 sm:text-base">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
