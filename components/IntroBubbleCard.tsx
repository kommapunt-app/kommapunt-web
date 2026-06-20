import { MAX_BUBBLES } from "@/lib/constants";
import { Logo } from "@/components/Logo";
import { Button } from "./Button";

interface IntroBubbleCardProps {
  onUnderstand: () => void;
}

export function IntroBubbleCard({ onUnderstand }: IntroBubbleCardProps) {
  return (
    <div className="mx-auto max-w-lg rounded-3xl border-4 border-komma-black bg-[#F3F1EC] p-8 shadow-[8px_8px_0_0_#000] sm:p-10">
      <div className="mb-8 flex justify-center sm:mb-10">
        <Logo
          size="onboarding"
          variant="transparent"
          align="center"
          priority
        />
      </div>

      <h1 className="mb-5 text-center text-3xl font-extrabold tracking-tight sm:mb-6 sm:text-4xl">
        Wat is Bubbles?
      </h1>

      <p className="mb-6 text-center text-base leading-relaxed text-komma-black/80 sm:mb-8 sm:text-lg">
        Bubbles is dinge wat vir jou belangrik is. Dit is dinge waarna jy streef,
        wat jy probeer beskerm, en waarvoor jy sal opstaan wanneer dit bedreig
        word.
      </p>

      <p className="mb-8 text-center text-sm font-semibold text-komma-black/60 sm:mb-10 sm:text-base">
        Kies die {MAX_BUBBLES} Bubbles wat die meeste gewig vir jou dra.
      </p>

      <div className="flex justify-center">
        <Button onClick={onUnderstand}>Begin</Button>
      </div>
    </div>
  );
}
