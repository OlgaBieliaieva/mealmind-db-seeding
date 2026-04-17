"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function RecipeDetailsBackLink() {
  const params = useSearchParams();

  const returnTo = params.get("returnTo");

  return (
    <Link
      href={returnTo ?? "/admin/recipes"}
      className="text-sm text-gray-500 hover:underline"
    >
      ← Назад до списку
    </Link>
  );
}
