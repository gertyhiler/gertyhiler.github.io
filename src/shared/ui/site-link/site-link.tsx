import type { ComponentProps } from "react";
// Native document navigation keeps static hosting and locale changes predictable.
export default function Link({
  href,
  children,
  ...props
}: ComponentProps<"a">) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return (
    <a {...props} href={href?.startsWith("/") ? `${basePath}${href}` : href}>
      {children}
    </a>
  );
}
