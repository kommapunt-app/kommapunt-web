import { Button } from "./Button";

const heroButtonClass =
  "px-5 py-3 text-sm !text-white shadow-[4px_4px_0_0_#FF1493] hover:shadow-[6px_6px_0_0_#FF1493] sm:px-6 sm:py-3.5 sm:text-base";

export function HeroActionButtons() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-end sm:gap-4">
      <Button href="#how-it-works" className={heroButtonClass}>
        Hoe werk dit
      </Button>
      <Button href="#voorbeeld-profiele" className={heroButtonClass}>
        Voorbeelde
      </Button>
      <Button href="/bubbles" className={heroButtonClass}>
        Kies my Bubbles
      </Button>
    </div>
  );
}
