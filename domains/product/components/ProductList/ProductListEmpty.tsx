"use client";

import { PRODUCT_ADMIN_LABELS } from "../../constants/product.admin.labels";

export function ProductListEmpty() {
  return (
    <div className="rounded border bg-white p-6 text-center">
      <p className="font-medium">{PRODUCT_ADMIN_LABELS.empty.title}</p>

      <p className="text-sm text-gray-500">
        {PRODUCT_ADMIN_LABELS.empty.description}
      </p>
    </div>
  );
}
