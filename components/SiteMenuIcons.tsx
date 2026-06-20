import type { ReactElement } from "react";

const ICON_PROPS = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true as const,
};

const STROKE = {
  stroke: "#000",
  strokeWidth: 2.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function HowItWorksIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path
        d="M9.5 18.5h5M10 21.5h4"
        {...STROKE}
      />
      <path
        d="M12 3.5c-2.8 0-5 2.1-5 4.7 0 1.8 1 3.4 2.5 4.2-.4.9-.9 2.1-1.2 2.8-.2.5.3.8.7.6 1.4-.7 2.6-1.4 3.4-1.9.4.1.9.1 1.3.1 2.8 0 5-2.1 5-4.7s-2.2-4.8-5-4.8Z"
        {...STROKE}
      />
    </svg>
  );
}

function ExamplesIcon() {
  return (
    <svg {...ICON_PROPS}>
      <rect x="4" y="4" width="7" height="7" rx="1.5" {...STROKE} />
      <rect x="13" y="4" width="7" height="7" rx="1.5" {...STROKE} />
      <rect x="4" y="13" width="7" height="7" rx="1.5" {...STROKE} />
      <rect x="13" y="13" width="7" height="7" rx="1.5" {...STROKE} />
    </svg>
  );
}

function ValuesIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path
        d="M12 4.5 5 8v5.5c0 3.2 2.8 5.8 7 7 4.2-1.2 7-3.8 7-7V8l-7-3.5Z"
        {...STROKE}
      />
      <path d="M12 4.5v15.5" {...STROKE} />
      <path d="M5 8l7 3.5 7-3.5" {...STROKE} />
    </svg>
  );
}

function PotgooiIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path
        d="M6 8.5c0-1.4 1.1-2.5 2.5-2.5h7c1.4 0 2.5 1.1 2.5 2.5v5.5c0 2.5-2 4.5-4.5 4.5H10.5c-2.5 0-4.5-2-4.5-4.5V8.5Z"
        {...STROKE}
      />
      <path d="M9 18.5h6" {...STROKE} />
      <path d="M10.5 21h3" {...STROKE} />
      <path d="M8.5 11h7M8.5 14h4.5" {...STROKE} />
    </svg>
  );
}

export type SiteMenuIconId = "how-it-works" | "examples" | "values" | "potgooi";

const MENU_ICONS: Record<SiteMenuIconId, () => ReactElement> = {
  "how-it-works": HowItWorksIcon,
  examples: ExamplesIcon,
  values: ValuesIcon,
  potgooi: PotgooiIcon,
};

export function SiteMenuIcon({ id }: { id: SiteMenuIconId }) {
  const Icon = MENU_ICONS[id];

  return (
    <span className="flex size-6 shrink-0 items-center justify-center">
      <Icon />
    </span>
  );
}
