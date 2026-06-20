import type { ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
  href?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-4 border-komma-black bg-komma-black !text-komma-yellow shadow-[4px_4px_0_0_#FF1493] hover:shadow-[6px_6px_0_0_#FF1493] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[2px_2px_0_0_#FF1493]",
  secondary:
    "border-4 border-komma-black bg-white !text-komma-black shadow-[4px_4px_0_0_#000] hover:bg-komma-yellow hover:-translate-y-0.5 active:translate-y-0 active:shadow-[2px_2px_0_0_#000]",
};

export function Button({
  variant = "primary",
  href,
  className = "",
  children,
  type = "button",
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-bold transition-all sm:text-lg ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
