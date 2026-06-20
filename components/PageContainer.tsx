import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { PAGE_CONTAINER_CLASS, PAGE_GUTTER_CLASS } from "@/lib/page-layout";

type PageContainerProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
  outerClassName?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className" | "outerClassName">;

export function PageContainer<T extends ElementType = "div">({
  as,
  children,
  className = "",
  outerClassName = "",
  ...props
}: PageContainerProps<T>) {
  const Tag = as ?? "div";

  return (
    <Tag className={`${PAGE_GUTTER_CLASS} ${outerClassName}`.trim()} {...props}>
      <div className={`${PAGE_CONTAINER_CLASS} ${className}`.trim()}>{children}</div>
    </Tag>
  );
}
