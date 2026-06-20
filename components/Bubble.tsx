import { BubbleLabel } from "./BubbleLabel";

type BubbleSize = "sm" | "md" | "lg" | "xl";
type BubbleVariant = "off-white" | "yellow" | "pink";

const sizeClasses: Record<BubbleSize, string> = {
  sm: "size-20 text-xs sm:size-24 sm:text-sm",
  md: "size-24 text-sm sm:size-32 sm:text-base",
  lg: "size-28 text-sm sm:size-36 sm:text-base",
  xl: "size-32 text-base sm:size-44 sm:text-lg",
};

const variantClasses: Record<BubbleVariant, string> = {
  "off-white": "bg-[#F5F5F0]",
  yellow: "bg-komma-yellow",
  pink: "bg-komma-pink text-white",
};

interface BubbleProps {
  label: string;
  size?: BubbleSize;
  variant?: BubbleVariant;
  className?: string;
  animationClass?: string;
}

export function Bubble({
  label,
  size = "md",
  variant = "off-white",
  className = "",
  animationClass = "",
}: BubbleProps) {
  return (
    <div
      className={`absolute flex items-center justify-center rounded-full border-4 border-komma-black font-bold leading-tight text-komma-black shadow-[4px_4px_0_0_#000] ${sizeClasses[size]} ${variantClasses[variant]} ${animationClass} ${className}`}
    >
      <BubbleLabel label={label} className="px-2 font-bold" />
    </div>
  );
}
