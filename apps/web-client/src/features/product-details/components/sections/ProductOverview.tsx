"use client";

import { ProductDetailsDTO } from "../../types/product-details.types";

export function ProductOverview({ product }: { product: ProductDetailsDTO }) {
  return (
    <div className="px-4 mt-4">
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <div className="text-sm text-gray-600">
          Бренд: {product.brand?.name ?? "—"}
        </div>
        <div className="text-sm text-gray-600">
          Категорія: {product.categoryName ?? "—"}
        </div>
      </div>
    </div>
  );
}
