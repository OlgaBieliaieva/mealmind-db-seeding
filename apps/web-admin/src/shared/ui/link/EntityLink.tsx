"use client";

import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  disabled?: boolean;
  prefetch?: boolean;
  icon?: ReactNode;
};

export function EntityLink({
  href,
  children,
  disabled,
  prefetch = true,
  icon,
}: Props) {
  if (disabled) {
    return (
      <span className="text-muted-foreground cursor-not-allowed">
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      prefetch={prefetch}
      className="inline-flex items-center gap-1 font-medium underline underline-offset-2 hover:text-primary transition"
    >
      {icon}
      {children}
    </Link>
  );
}
