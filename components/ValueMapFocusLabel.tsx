interface ValueMapFocusLabelProps {
  nameAf: string;
}

export function ValueMapFocusLabel({ nameAf }: ValueMapFocusLabelProps) {
  return (
    <div className="pointer-events-none absolute bottom-[calc(100%+0.75rem)] left-1/2 z-[60] -translate-x-1/2 whitespace-nowrap rounded-full border-4 border-komma-black bg-komma-yellow px-4 py-2 text-xs font-extrabold shadow-[4px_4px_0_0_#FF1493] animate-panel-arrive sm:text-sm">
      {nameAf} is hier geplaas
    </div>
  );
}
