import { Bubble } from "./Bubble";

export function BubbleVisual() {
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[480px]"
      aria-hidden="true"
    >
      {/* Central profile bubble */}
      <div className="absolute left-1/2 top-1/2 z-10 flex size-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-komma-black bg-[#F5F5F0] shadow-[6px_6px_0_0_#000] sm:size-44 lg:size-52">
        <div className="flex flex-col items-center gap-1">
          <div className="flex size-14 items-center justify-center rounded-full border-4 border-komma-black bg-komma-yellow sm:size-16">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="size-7 text-komma-black sm:size-8"
              aria-hidden="true"
            >
              <circle cx="12" cy="8" r="4" fill="currentColor" />
              <path
                d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="text-sm font-bold sm:text-base">Jy</span>
        </div>
      </div>

      <Bubble
        label="Familie"
        size="lg"
        variant="pink"
        className="left-[-5%] top-[2%]"
        animationClass="animate-float"
      />
      <Bubble
        label="Vryheid"
        size="md"
        variant="yellow"
        className="right-[-5%] top-[4%]"
        animationClass="animate-float-delayed"
      />
      <Bubble
        label="Geloof"
        size="sm"
        variant="yellow"
        className="left-[-7%] top-[54%]"
        animationClass="animate-float-slow"
      />
      <Bubble
        label="Prestasie"
        size="md"
        variant="off-white"
        className="right-[-7%] top-[40%]"
        animationClass="animate-float"
      />
      <Bubble
        label="Waarheid"
        size="xl"
        variant="off-white"
        className="bottom-[-2%] left-1/2 -translate-x-1/2"
        animationClass="animate-float-delayed"
      />

      {/* Decorative connector dots */}
      <div className="absolute left-[24%] top-[28%] size-3 rounded-full border-2 border-komma-black bg-komma-pink" />
      <div className="absolute right-[22%] top-[32%] size-2.5 rounded-full border-2 border-komma-black bg-[#F5F5F0]" />
      <div className="absolute bottom-[34%] left-[34%] size-2 rounded-full border-2 border-komma-black bg-komma-yellow" />
    </div>
  );
}
