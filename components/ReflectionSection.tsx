const reflectionCards = [
  {
    title: "Wat beskerm jy?",
    body: "Watter van hierdie Bubbles sal jy verdedig as dit bedreig word?",
  },
  {
    title: "Wat dra minder gewig?",
    body: "Watter goeie waardes het laer geëindig as wat jy verwag het?",
  },
  {
    title: "Waar kan dit bots?",
    body: "Wanneer kan jou grootste Bubbles met ander mense s’n bots?",
  },
] as const;

export function ReflectionSection() {
  return (
    <section className="rounded-3xl border-4 border-komma-black bg-white p-6 shadow-[6px_6px_0_0_#000] sm:p-8">
      <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
        Wat maak jou punt?
      </h2>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-komma-black/75 sm:text-lg">
        Jou grootste Bubbles beïnvloed hoe jy die wêreld sien, watter gesprekke
        vir jou moeilik voel, en watter standpunte jy inneem.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-5">
        {reflectionCards.map((card, index) => (
          <div
            key={card.title}
            className={`rounded-2xl border-4 border-komma-black p-5 shadow-[4px_4px_0_0_#000] ${
              index === 0
                ? "bg-komma-pink/15"
                : index === 1
                  ? "bg-komma-yellow/50"
                  : "bg-[#FFFEF5]"
            }`}
          >
            <h3 className="text-lg font-extrabold leading-tight">
              {card.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-komma-black/75 sm:text-base">
              {card.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
