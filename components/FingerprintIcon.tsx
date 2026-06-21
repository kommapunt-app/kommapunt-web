interface FingerprintIconProps {
  className?: string;
}

export function FingerprintIcon({ className = "" }: FingerprintIconProps) {
  return (
    <svg
      viewBox="0 0 52 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <ellipse
        cx="26"
        cy="34"
        rx="20"
        ry="30"
        stroke="currentColor"
        strokeWidth="1.25"
        opacity="0.35"
      />
      <path
        d="M14 18 C18 14, 24 12, 30 14 C36 16, 40 22, 38 28"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 26 C16 22, 22 20, 28 22 C34 24, 38 30, 36 36"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M11 34 C15 30, 21 28, 27 30 C33 32, 37 38, 35 44"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 42 C16 38, 22 36, 28 38 C34 40, 38 46, 36 52"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14 50 C18 46, 24 44, 30 46 C34 48, 36 52, 34 56"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M18 14 C20 20, 21 28, 20 36 C19 44, 18 52, 19 58"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M26 12 C27 20, 28 30, 27 40 C26 50, 25 58, 26 62"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M34 16 C32 24, 31 34, 32 44 C33 52, 34 58, 33 60"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M22 24 C24 26, 25 30, 24 34 C23 38, 22 42, 23 46"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M30 26 C28 28, 27 32, 28 36 C29 40, 30 44, 29 48"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <circle cx="26" cy="34" r="2.5" fill="currentColor" opacity="0.5" />
    </svg>
  );
}
