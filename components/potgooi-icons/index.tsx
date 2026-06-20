import type { ComponentType } from "react";
import { PotgooiIconDash } from "@/components/potgooi-icons/PotgooiIconDash";
import { PotgooiIconDot } from "@/components/potgooi-icons/PotgooiIconDot";
import { PotgooiIconI } from "@/components/potgooi-icons/PotgooiIconI";
import { PotgooiIconQuestion } from "@/components/potgooi-icons/PotgooiIconQuestion";

export type PotgooiIconId = "i" | "dash" | "punt" | "vraagteken";

export { PotgooiIconI, PotgooiIconDash, PotgooiIconDot, PotgooiIconQuestion };

type PotgooiIconComponentProps = { className?: string };

export const POTGOOI_ICON_COMPONENTS: Record<
  PotgooiIconId,
  ComponentType<PotgooiIconComponentProps>
> = {
  i: PotgooiIconI,
  dash: PotgooiIconDash,
  punt: PotgooiIconDot,
  vraagteken: PotgooiIconQuestion,
};

export function PotgooiIcon({
  id,
  className = "",
}: {
  id: PotgooiIconId;
  className?: string;
}) {
  const Icon = POTGOOI_ICON_COMPONENTS[id];
  return <Icon className={className} />;
}
