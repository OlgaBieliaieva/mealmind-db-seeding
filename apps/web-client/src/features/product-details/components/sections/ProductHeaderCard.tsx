"use client";

import { ProductDetailsDTO } from "../../types/product-details.types";

export function ProductHeaderCard({ product }: { product: ProductDetailsDTO }) {
  const { macros } = product;

  return (
    <div className="relative -mt-12 px-4">
      <div className="bg-white rounded-3xl shadow-lg p-4 space-y-3">
        <h1 className="text-lg font-semibold text-gray-900">{product.name}</h1>

        <div className="flex flex-wrap gap-2">
          <Chip label="🔥" value={macros.calories} suffix="ккал" />
          <Chip label="Б" value={macros.proteins} />
          <Chip label="Ж" value={macros.fats} />
          <Chip label="В" value={macros.carbs} />
        </div>

        <div className="text-xs text-gray-500">
          {product.brand?.name} • {product.categoryName}
        </div>
      </div>
    </div>
  );
}

function Chip({
  label,
  value,
  suffix,
}: {
  label: string;
  value: number;
  suffix?: string;
}) {
  return (
    <div className="px-3 py-1 rounded-full bg-gray-100 text-xs">
      {label} {Math.round(value)} {suffix}
    </div>
  );
}
