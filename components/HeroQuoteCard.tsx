interface HeroQuoteCardProps {
  quote: string;
  author: string;
}

export function HeroQuoteCard({ quote, author }: HeroQuoteCardProps) {
  return (
    <figure className="relative w-full rounded-[1.75rem] border-4 border-komma-black bg-[#F3F1EC] px-4 py-3 shadow-[5px_5px_0_0_#000] sm:px-5 lg:py-3.5">
      <span
        className="absolute left-3 top-0.5 font-serif text-5xl leading-none text-komma-pink sm:left-4 sm:text-6xl"
        aria-hidden="true"
      >
        &ldquo;
      </span>

      <blockquote className="relative z-10 pt-3 text-[0.9375rem] font-bold leading-tight text-komma-black sm:text-base lg:pt-3.5">
        {quote}
      </blockquote>

      <figcaption className="mt-2 text-sm font-extrabold text-komma-black/70">
        {author}
      </figcaption>
    </figure>
  );
}
