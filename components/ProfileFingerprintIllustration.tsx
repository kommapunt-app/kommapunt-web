import { PROFILE_CARD_FINGERPRINT_SRC } from "@/lib/profile-card";

interface ProfileFingerprintIllustrationProps {
  className?: string;
}

export function ProfileFingerprintIllustration({
  className = "",
}: ProfileFingerprintIllustrationProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={PROFILE_CARD_FINGERPRINT_SRC}
      alt=""
      width={320}
      height={400}
      aria-hidden="true"
      className={`shrink-0 object-contain ${className}`.trim()}
    />
  );
}
