import Image from "next/image";

export const KOMMA_LOGO_SRC = "/komma-logo.png";
export const KOMMA_LOGO_TRANSPARENT_SRC = "/komma-logo-transparent.png";

const LOGO_WIDTH = 1024;
const LOGO_HEIGHT = 220;

type LogoSize = "header" | "footer" | "display" | "onboarding";
type LogoVariant = "default" | "transparent";

const sizeClasses: Record<LogoSize, string> = {
  header: "h-10 w-auto sm:h-12 md:h-14",
  footer: "h-14 w-auto sm:h-16 md:h-[4.5rem]",
  display: "h-12 w-auto sm:h-14",
  onboarding: "h-10 w-auto sm:h-11",
};

interface LogoProps {
  size?: LogoSize;
  variant?: LogoVariant;
  align?: "left" | "center";
  className?: string;
  priority?: boolean;
}

export function Logo({
  size = "header",
  variant = "default",
  align = "left",
  className = "",
  priority = false,
}: LogoProps) {
  const alignClass = align === "center" ? "object-center" : "object-left";

  return (
    <Image
      src={variant === "transparent" ? KOMMA_LOGO_TRANSPARENT_SRC : KOMMA_LOGO_SRC}
      alt="Komma."
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      priority={priority}
      className={`block max-w-full object-contain ${alignClass} ${sizeClasses[size]} ${className}`.trim()}
    />
  );
}

export function LogoLink({
  size = "header",
  className = "",
  priority = false,
}: LogoProps) {
  return (
    <a
      href="/"
      className="inline-flex shrink-0 items-center"
      aria-label="Komma tuisblad"
    >
      <Logo size={size} className={className} priority={priority} />
    </a>
  );
}
