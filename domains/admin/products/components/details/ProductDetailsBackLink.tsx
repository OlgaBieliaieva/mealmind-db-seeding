"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function ProductDetailsBackLink() {
  const params = useSearchParams();

  const returnTo = params.get("returnTo");

  const href = returnTo ?? "/admin/products";

  return (
    <Link href={href} className="text-sm text-gray-500 hover:underline">
      ← Назад до списку
    </Link>
  );
}
