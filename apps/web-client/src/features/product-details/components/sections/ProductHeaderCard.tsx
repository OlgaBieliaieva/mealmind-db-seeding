"use client";

import { ProductDetailsDTO } from "../../types/product-details.types";

export function ProductHeaderCard({ product }: { product: ProductDetailsDTO }) {
  return (
    <div className="space-y-2">
      <h1 className="text-xl font-semibold text-gray-900">{product.name}</h1>

      <div className="text-sm text-gray-500">{product.categoryName}</div>
    </div>
  );
}
