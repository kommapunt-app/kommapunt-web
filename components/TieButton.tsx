interface TieButtonProps {
  onSelect: () => void;
}

export function TieButton({ onSelect }: TieButtonProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="rounded-full border-4 border-komma-black bg-white px-6 py-3 text-sm font-bold text-komma-black/70 shadow-[3px_3px_0_0_#000] transition-all hover:-translate-y-0.5 hover:bg-komma-yellow hover:text-komma-black hover:shadow-[4px_4px_0_0_#000] active:translate-y-0 active:shadow-[2px_2px_0_0_#000] sm:text-base"
    >
      Te naby om te kies
    </button>
  );
}
