import { BubblesBibImage } from "@/components/BubblesBibImage";
import { BUBBLES_BIB_IMAGES } from "@/lib/bubbles-bib";

export function BubblesWhatSection() {
  return (
    <section className="rounded-[2rem] border-4 border-komma-black bg-white p-5 shadow-[6px_6px_0_0_#000] sm:p-8 lg:p-10">
      <h2 className="sr-only">Wat is Bubbles?</h2>

      <BubblesBibImage
        image={BUBBLES_BIB_IMAGES.watIsBubbles}
        alt="Wat is 'n Bubble? — KommaPunt infografika oor waardes, prioriteite en standpunte"
        priority
      />
    </section>
  );
}
