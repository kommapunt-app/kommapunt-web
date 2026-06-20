import type { ReactElement } from "react";
import type { BubbleCategoryId } from "@/lib/bubbles";

const ICON_PROPS = {
  width: 32,
  height: 32,
  viewBox: "0 0 32 32",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true as const,
};

const STROKE = {
  stroke: "#000",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function EkIdentiteitIcon() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="16" cy="10.5" r="4.8" {...STROKE} />
      <path
        d="M8.5 27.5c1.2-6.8 4.8-9.2 7.5-9.5 2.9-.3 5.8 2.1 7.2 9.2"
        {...STROKE}
      />
    </svg>
  );
}

function MenseVerhoudingsIcon() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="10.5" cy="11" r="3.6" {...STROKE} />
      <circle cx="21.5" cy="11" r="3.6" {...STROKE} />
      <path d="M6.5 25.5c1-5.2 2.8-7.2 4-7.5 1.4-.4 2.8.8 3.5 2.2" {...STROKE} />
      <path d="M25.5 25.5c-1-5.2-2.8-7.2-4-7.5-1.4-.4-2.8.8-3.5 2.2" {...STROKE} />
      <path d="M14.2 15.8c1.6 1.1 3 1.1 4.6 0" {...STROKE} />
    </svg>
  );
}

function WaarheidBeginselsIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M16 6.5v19" {...STROKE} />
      <path d="M9.5 25.5h13" {...STROKE} />
      <path d="M7.5 10.5h17" {...STROKE} />
      <path d="M9 10.5 16 6.5l7 4" {...STROKE} />
      <path d="M9 10.8c0 2.8-.8 5.2-2.2 6.8" {...STROKE} />
      <path d="M23 10.8c0 2.8.8 5.2 2.2 6.8" {...STROKE} />
    </svg>
  );
}

function PrestasieGroeiIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M6.5 24.5 13 17.5l4.2 3.8L25.5 9.5" {...STROKE} />
      <path d="M18.5 9.5H25.5V16.2" {...STROKE} />
    </svg>
  );
}

function OrdeStabiliteitIcon() {
  return (
    <svg {...ICON_PROPS}>
      <rect x="7" y="18" width="9" height="9" rx="1.2" {...STROKE} />
      <rect x="16.5" y="13" width="9" height="9" rx="1.2" {...STROKE} />
      <rect x="11" y="8" width="9" height="9" rx="1.2" {...STROKE} />
    </svg>
  );
}

function BydraeVeranderingIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M16 25.5V14.5" {...STROKE} />
      <path d="M16 14.5c-4.5-1.2-6.8-4.2-5.8-7.2.8-2.5 3.8-3.2 5.8-1.8" {...STROKE} />
      <path d="M16 14.5c4.2-1 6.5-3.8 5.5-6.8-.8-2.3-3.5-3-5.5-1.6" {...STROKE} />
      <path d="M11.5 25.5h9" {...STROKE} />
    </svg>
  );
}

const CATEGORY_ICONS: Record<BubbleCategoryId, () => ReactElement> = {
  "ek-identiteit": EkIdentiteitIcon,
  "mense-verhoudings": MenseVerhoudingsIcon,
  "waarheid-beginsels": WaarheidBeginselsIcon,
  "prestasie-groei": PrestasieGroeiIcon,
  "orde-stabiliteit": OrdeStabiliteitIcon,
  "bydrae-verandering": BydraeVeranderingIcon,
};

interface BubbleCategoryIconProps {
  categoryId: BubbleCategoryId;
  className?: string;
}

export function BubbleCategoryIcon({
  categoryId,
  className = "",
}: BubbleCategoryIconProps) {
  const Icon = CATEGORY_ICONS[categoryId];

  return (
    <span
      className={`flex h-8 w-8 shrink-0 items-center justify-center sm:h-9 sm:w-9 ${className}`.trim()}
    >
      <Icon />
    </span>
  );
}
