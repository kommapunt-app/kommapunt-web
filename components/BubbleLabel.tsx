import { formatBubbleLabel } from "@/lib/bubble-label";

interface BubbleLabelProps {
  label: string;
  className?: string;
}

export function BubbleLabel({ label, className = "" }: BubbleLabelProps) {
  const lines = formatBubbleLabel(label);

  return (
    <span className={`block text-center leading-tight ${className}`}>
      {lines.map((line, index) => (
        <span key={`${line}-${index}`} className="block">
          {line}
        </span>
      ))}
    </span>
  );
}
