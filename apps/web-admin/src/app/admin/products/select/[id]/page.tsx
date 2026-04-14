"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useMemo } from "react";

import { useProductDetails } from "@/features/product-details/hooks/useProductDetails";
import { MacrosBlock } from "@/features/product-select/components/MacrosBlock";
import { NutrientsList } from "@/features/product-select/components/NutrientsList";

import {
  getSelection,
  upsertSelection,
  removeSelection,
} from "@/shared/lib/selection/recipe-selection";

export default function ProductSelectDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const selectedMap = getSelection();
  const existing = selectedMap[id];
  
  const { data, isLoading } = useProductDetails();

  const [quantity, setQuantity] = useState(existing?.quantity_g ?? 100);

  const [expanded, setExpanded] = useState(false);

  const isEdit = !!existing;

  // ===== NUTRIENTS =====

  const nutrients = useMemo(() => {
    if (!data?.nutrients) return [];

    return data.nutrients.map((n) => ({
      ...n,
      value: (n.value * quantity) / 100,
    }));
  }, [data, quantity]);

  if (isLoading || !data) return <div>Loading...</div>;

  const product = data;

  // ===== ACTIONS =====

  function handleSave() {
    upsertSelection({
      product_id: product.id,
      quantity_g: quantity,
      name: product.name.ua,
      brand: product.brand?.name,
      unit: product.unit,
    });

    router.push("/admin/products/select");
  }

  function handleRemove() {
    removeSelection(product.id);

    router.push("/admin/products/select");
  }

  return (
    <div className="space-y-6 pb-20">
      {/* HEADER */}
      <div>
        <h1 className="text-lg font-semibold">{product.name.ua}</h1>

        <div className="text-sm text-gray-500">
          {product.brand?.name ?? "—"}
        </div>

        <div className="text-xs text-gray-400 mt-1">
          {product.category?.leafName} • {product.status}
        </div>
      </div>

      {/* QUANTITY */}
      <div className="flex flex-col gap-3">
        <span className="text-base font-medium">Додати до рецепта</span>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">Кількість:</span>

          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border rounded px-3 py-2 w-24 text-lg font-semibold grow"
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">Одиниця:</span>

          <div className="border rounded px-3 py-2 w-24 text-lg font-semibold text-gray-500 grow">
            {product.unit}
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      {!isEdit ? (
        <button
          onClick={handleSave}
          className="w-full bg-black text-white py-3 rounded"
        >
          Додати
        </button>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="flex-1 bg-black text-white py-3 rounded"
          >
            Зберегти
          </button>

          <button
            onClick={handleRemove}
            className="flex-1 border py-3 rounded text-red-500"
          >
            Видалити
          </button>
        </div>
      )}

      {/* MACROS */}
      <MacrosBlock nutrients={nutrients} />

      {/* DETAILS */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="text-sm text-blue-500"
      >
        {expanded ? "Сховати" : "Дивитися деталі"}
      </button>

      {expanded && <NutrientsList nutrients={nutrients} />}
    </div>
  );
}
