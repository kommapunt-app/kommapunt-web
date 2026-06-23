export const PREMIUM_FEATURE_PROFILE_COMPARISON = "profile_comparison" as const;

export type PremiumFeature = typeof PREMIUM_FEATURE_PROFILE_COMPARISON;

export const PREMIUM_STATUS_ACTIVE = "active" as const;
export const PREMIUM_STATUS_PENDING = "pending" as const;
export const PREMIUM_STATUS_EXPIRED = "expired" as const;
export const PREMIUM_STATUS_CANCELLED = "cancelled" as const;

export type PremiumStatus =
  | typeof PREMIUM_STATUS_ACTIVE
  | typeof PREMIUM_STATUS_PENDING
  | typeof PREMIUM_STATUS_EXPIRED
  | typeof PREMIUM_STATUS_CANCELLED;

export const PREMIUM_UPGRADE_CONTACT_EMAIL = "hello@kommapunt.co.za";
