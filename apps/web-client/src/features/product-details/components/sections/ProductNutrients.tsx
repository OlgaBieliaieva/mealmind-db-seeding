"use client";

import { ProductDetailsDTO } from "../../types/product-details.types";

export function ProductNutrients({ product }: { product: ProductDetailsDTO }) {
  return (
    <div className="px-4 mt-4 space-y-2">
      {product.nutrients.map((n) => (
        <div
          key={n.name}
          className="bg-white rounded-xl p-3 flex justify-between shadow-sm"
        >
          <span className="text-sm text-gray-700">{n.name}</span>
          <span className="text-sm font-medium">
            {n.value} {n.unit}
          </span>
        </div>
      ))}
    </div>
  );
}
