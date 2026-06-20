import type { MutableRefObject, ReactNode } from "react";
import {
  PotgooiIcon,
  type PotgooiIconId,
} from "@/components/potgooi-icons";

export type { PotgooiIconId };
export {
  PotgooiIcon,
  PotgooiIconDash,
  PotgooiIconDot,
  PotgooiIconI,
  PotgooiIconQuestion,
} from "@/components/potgooi-icons";

const ICON_WRAPPER_CLASS =
  "potgooi-icon-wrapper flex size-[72px] shrink-0 items-center justify-center overflow-visible lg:size-24";

export function PotgooiMobileConnector({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={`h-12 w-6 shrink-0 text-komma-black ${className}`.trim()}
    >
      <path
        d="M12 0V48"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PotgooiIconRow({
  icons,
  iconRefs,
  className = "",
}: {
  icons: readonly { id: PotgooiIconId }[];
  iconRefs?: MutableRefObject<(HTMLDivElement | null)[]>;
  className?: string;
}) {
  return (
    <div
      className={`potgooi-icon-row relative z-10 flex items-center justify-center gap-1 overflow-visible px-2 pt-6 pb-4 sm:gap-2 md:gap-3 ${className}`.trim()}
    >
      {icons.map((symbol, index) => (
        <div
          key={symbol.id}
          ref={
            iconRefs
              ? (el) => {
                  iconRefs.current[index] = el;
                }
              : undefined
          }
          className={ICON_WRAPPER_CLASS}
        >
          <PotgooiIcon id={symbol.id} />
        </div>
      ))}
    </div>
  );
}

export function PotgooiIconWrapper({
  id,
  className = "",
  children,
}: {
  id: PotgooiIconId;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`${ICON_WRAPPER_CLASS} ${className}`.trim()}>
      {children ?? <PotgooiIcon id={id} />}
    </div>
  );
}
