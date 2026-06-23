import type { PremiumFeature, PremiumStatus } from "@/lib/premium/constants";

export type PremiumAccessResponse = {
  ok: boolean;
  hasAccess: boolean;
  feature: PremiumFeature;
  status: PremiumStatus | null;
  message?: string;
};
