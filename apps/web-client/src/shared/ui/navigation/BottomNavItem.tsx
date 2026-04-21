"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/cn";

type Props = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

export function BottomNavItem({ href, label, icon }: Props) {
  const pathname = usePathname();

  // 👉 підтримка вкладених роутів (/plan/123)
  const isActive = pathname.startsWith(href);

  return (
    <Link
      href={href}
      className="flex flex-1 flex-col items-center justify-center gap-1"
    >
      {/* Icon wrapper */}
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200",
          isActive ? "bg-purple-100 text-purple-600" : "text-gray-400",
        )}
      >
        {icon}
      </div>

      {/* Label */}
      <span
        className={cn(
          "text-[11px] font-medium transition-colors",
          isActive ? "text-purple-600" : "text-gray-400",
        )}
      >
        {label}
      </span>
    </Link>
  );
}
