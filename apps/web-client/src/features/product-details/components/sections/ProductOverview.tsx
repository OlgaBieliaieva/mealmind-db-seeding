"use client";

import { ProductMacros } from "./ProductMacros";
import { ProductDetailsDTO } from "../../types/product-details.types";

export function ProductOverview({ product }: { product: ProductDetailsDTO }) {
  return (
    <div className="px-4 mt-4">
      <div className="mb-8">
        <ProductMacros
          calories={product.macros.calories}
          proteins={product.macros.proteins}
          fats={product.macros.fats}
          carbs={product.macros.carbs}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-sm text-gray-600">
          <span className="font-bold">Бренд:</span> {product.brand?.name ?? "—"}
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-bold">Країна реєстрації бренду:</span>{" "}
          {product.brand?.country ?? "—"}
        </div>
      </div>
    </div>
  );
}
