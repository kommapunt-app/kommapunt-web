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

function HomeIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M4.5 10.5 12 4.5l7.5 6" {...STROKE} />
      <path
        d="M6.5 9.5V19a1 1 0 0 0 1 1H10v-5h4v5h2.5a1 1 0 0 0 1-1V9.5"
        {...STROKE}
      />
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

function PostersIcon() {
  return (
    <svg {...ICON_PROPS}>
      <rect x="4.5" y="5" width="15" height="14" rx="2" {...STROKE} />
      <path d="M8 9.5h8M8 12.5h6M8 15.5h4" {...STROKE} />
      <path d="M16.5 4.5 19 7v10.5" {...STROKE} />
    </svg>
  );
}

function BubblesIcon() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="12" cy="12" r="7.5" {...STROKE} />
      <circle cx="9" cy="11" r="1.2" fill="#000" stroke="none" />
      <circle cx="14.5" cy="10" r="1" fill="#000" stroke="none" />
      <circle cx="13" cy="14.5" r="0.9" fill="#000" stroke="none" />
    </svg>
  );
}

export type SiteMenuIconId = "home" | "values" | "posters" | "bubbles";

const MENU_ICONS: Record<SiteMenuIconId, () => ReactElement> = {
  home: HomeIcon,
  values: ValuesIcon,
  posters: PostersIcon,
  bubbles: BubblesIcon,
};

export function SiteMenuIcon({ id }: { id: SiteMenuIconId }) {
  const Icon = MENU_ICONS[id];

  return (
    <span className="flex size-6 shrink-0 items-center justify-center">
      <Icon />
    </span>
  );
}
