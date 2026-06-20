import { Button } from "@/components/Button";
import { PotgooiDiagram } from "@/components/PotgooiDiagram";
import {
  POTGOOI_KOMMAPUNT,
} from "@/lib/potgooi-content";

export function PotgooiContent() {
  return (
    <div className="space-y-12 overflow-visible sm:space-y-16">
      <section className="mx-auto max-w-3xl text-center">
        <p className="text-lg leading-relaxed text-komma-black/85 sm:text-xl sm:leading-relaxed">
          Kom vertel wie jy is, wat vir jou belangrik is, en hoe jy by jou punt
          uitkom.
        </p>
      </section>

      <section
        aria-label="Die vier vrae van elke KommaPunt-gesprek"
        className="overflow-visible"
      >
        <PotgooiDiagram />
      </section>

      <section className="rounded-[2rem] border-4 border-komma-black bg-[#F3F1EC] p-6 shadow-[6px_6px_0_0_#000] sm:p-8">
        <h2 className="mb-5 text-2xl font-extrabold tracking-tight sm:text-3xl">
          Wat is KommaPunt?
        </h2>
        <div className="space-y-4 text-base leading-relaxed text-komma-black/85 sm:text-lg">
          {POTGOOI_KOMMAPUNT.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <p className="mt-6 text-lg font-extrabold tracking-tight text-komma-pink sm:text-xl">
          {POTGOOI_KOMMAPUNT.taglineEn}
        </p>
      </section>

      <section className="rounded-[2rem] border-4 border-komma-black bg-white p-6 shadow-[6px_6px_0_0_#FF1493] sm:p-8">
        <h2 className="mb-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
          Neem deel aan die gesprek
        </h2>
        <p className="mb-6 max-w-2xl text-base leading-relaxed text-komma-black/85 sm:text-lg">
          Het jy &rsquo;n storie, &rsquo;n standpunt of &rsquo;n vraag wat jy
          wil deel? Ons hoor graag van jou.
        </p>
        <Button href="/neem-deel" className="px-8 py-4 text-base sm:text-lg">
          Deel jou punt
        </Button>
      </section>
    </div>
  );
}
