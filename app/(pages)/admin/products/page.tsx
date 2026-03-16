"use client";

import Link from "next/link";
import { PRODUCT_ADMIN_LABELS } from "@/domains/product/constants/product.admin.labels";

export default function ProductListPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{PRODUCT_ADMIN_LABELS.title}</h1>

        <Link
          href="/admin/products/new"
          className="rounded bg-black px-4 py-2 text-white"
        >
          {PRODUCT_ADMIN_LABELS.createButton}
        </Link>
      </div>

      <div className="rounded-xl border bg-white p-6 text-sm text-gray-500">
        Список продуктів буде тут 🙂
      </div>
    </div>
  );
}
