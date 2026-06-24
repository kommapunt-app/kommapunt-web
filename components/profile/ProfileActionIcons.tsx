import type { ReactElement, SVGProps } from "react";

export type ProfileActionIconId =
  | "download"
  | "share"
  | "link"
  | "whatsapp"
  | "email"
  | "coffee";

type ProfileActionIconTone = "light" | "dark";

type ProfileActionIconProps = {
  id: ProfileActionIconId;
  tone?: ProfileActionIconTone;
  className?: string;
};

const ICON_SIZE = 20;

function iconStroke(tone: ProfileActionIconTone): SVGProps<SVGSVGElement> {
  return {
    width: ICON_SIZE,
    height: ICON_SIZE,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
    stroke: tone === "light" ? "#F5DD00" : "#000000",
    strokeWidth: 2.25,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
}

function DownloadIcon({ tone }: { tone: ProfileActionIconTone }) {
  return (
    <svg {...iconStroke(tone)}>
      <path d="M12 4.5v9.5" />
      <path d="m8.5 11 3.5 3.5L15.5 11" />
      <path d="M5.5 18.5h13" />
    </svg>
  );
}

function ShareIcon({ tone }: { tone: ProfileActionIconTone }) {
  return (
    <svg {...iconStroke(tone)}>
      <circle cx="7" cy="12" r="2.25" />
      <circle cx="17" cy="7" r="2.25" />
      <circle cx="17" cy="17" r="2.25" />
      <path d="M9.1 11.1 14.8 8.1" />
      <path d="M9.1 12.9 14.8 15.9" />
    </svg>
  );
}

function LinkIcon({ tone }: { tone: ProfileActionIconTone }) {
  return (
    <svg {...iconStroke(tone)}>
      <path d="M10.2 13.8a3.4 3.4 0 0 0 4.8 0l2.2-2.2a3.4 3.4 0 0 0-4.8-4.8l-1 1" />
      <path d="M13.8 10.2a3.4 3.4 0 0 0-4.8 0l-2.2 2.2a3.4 3.4 0 0 0 4.8 4.8l1-1" />
    </svg>
  );
}

function WhatsAppIcon({ tone }: { tone: ProfileActionIconTone }) {
  return (
    <svg {...iconStroke(tone)}>
      <path d="M8.5 17.5 6 19l1.6-2.5A7.5 7.5 0 1 1 12 4.5a7.5 7.5 0 0 1 0 15 7.5 7.5 0 0 1-3.5-.9Z" />
      <path d="M10.2 10.1c.2-.5.8-.6 1.1-.3l.8.7c.3.2.7.2 1-.1l.5-.5c.3-.3.8-.2 1 .2.5.9.2 2-.7 2.7-.9.7-2 .8-3 .1-.8-.6-1.6-1.4-2.1-2.3-.2-.4 0-.8.4-1Z" />
    </svg>
  );
}

function EmailIcon({ tone }: { tone: ProfileActionIconTone }) {
  return (
    <svg {...iconStroke(tone)}>
      <path d="M5.5 7.5h13a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Z" />
      <path d="m6 9 6 4.5L18 9" />
    </svg>
  );
}

function CoffeeIcon({ tone }: { tone: ProfileActionIconTone }) {
  return (
    <svg {...iconStroke(tone)}>
      <path d="M7.5 9.5h8.5a2 2 0 0 1 0 4H9a1.5 1.5 0 0 1-1.5-1.5V9.5Z" />
      <path d="M16 10.5h1a2 2 0 0 1 0 4h-1" />
      <path d="M8.5 17.5h6" />
      <path d="M9.5 6.5c0-1 .8-1.5 1.5-1.5" />
      <path d="M12 6.5c0-1 .8-1.5 1.5-1.5" />
    </svg>
  );
}

const ICON_COMPONENTS: Record<
  ProfileActionIconId,
  (props: { tone: ProfileActionIconTone }) => ReactElement
> = {
  download: DownloadIcon,
  share: ShareIcon,
  link: LinkIcon,
  whatsapp: WhatsAppIcon,
  email: EmailIcon,
  coffee: CoffeeIcon,
};

export function ProfileActionIcon({
  id,
  tone = "dark",
  className = "",
}: ProfileActionIconProps) {
  const Icon = ICON_COMPONENTS[id];

  return (
    <span className={`inline-flex shrink-0 items-center justify-center ${className}`}>
      <Icon tone={tone} />
    </span>
  );
}

export function ProfileActionButtonLabel({
  icon,
  tone = "dark",
  children,
}: {
  icon: ProfileActionIconId;
  tone?: ProfileActionIconTone;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center justify-center gap-2.5">
      <ProfileActionIcon id={icon} tone={tone} />
      <span>{children}</span>
    </span>
  );
}
