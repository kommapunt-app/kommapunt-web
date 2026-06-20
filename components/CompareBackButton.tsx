interface CompareBackButtonProps {
  onBack: () => void;
  disabled?: boolean;
}

export function CompareBackButton({
  onBack,
  disabled = false,
}: CompareBackButtonProps) {
  return (
    <button
      type="button"
      onClick={onBack}
      disabled={disabled}
      className="inline-flex items-center gap-2 rounded-full border-4 border-komma-black bg-[#FFFEF5] px-5 py-2.5 text-sm font-bold text-komma-black shadow-[3px_3px_0_0_#000] transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-[4px_4px_0_0_#000] active:translate-y-0 active:shadow-[2px_2px_0_0_#000] disabled:pointer-events-none disabled:opacity-40 disabled:shadow-[3px_3px_0_0_#000] disabled:hover:translate-y-0 sm:px-6 sm:py-3 sm:text-base"
    >
      <span aria-hidden="true">←</span>
      Terug
    </button>
  );
}
