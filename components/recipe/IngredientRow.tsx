"use client";

import { RecipeIngredientDraft } from "@/types/recipe-ingredient";
import { ProductSearch } from "../ProductSearch";

type Props = {
  ingredient: RecipeIngredientDraft;
  onChange: (next: RecipeIngredientDraft) => void;
  onRemove: () => void;
};

/**
 * Один рядок інгредієнта в рецепті.
 * Відповідає ТІЛЬКИ за UI та локальний стан інгредієнта.
 */
export function IngredientRow({ ingredient, onChange, onRemove }: Props) {
  return (
    <div className="grid grid-cols-12 gap-2 items-center">
      {/* === Продукт === */}
      <div className="col-span-6">
        {ingredient.product_id ? (
          <div className="flex items-center justify-between rounded border px-3 py-2 bg-gray-50">
            <span className="text-sm">{ingredient.product_name}</span>

            <button
              type="button"
              className="text-xs text-blue-600"
              onClick={() =>
                onChange({
                  ...ingredient,
                  product_id: null,
                  product_name: undefined,
                })
              }
            >
              Змінити
            </button>
          </div>
        ) : (
          <ProductSearch
            onSelect={(product) => {
              if (!product) return;

              onChange({
                ...ingredient,
                product_id: product.product_id,
                product_name: product.brand_name_ua
                  ? `${product.name_ua} — ${product.brand_name_ua}`
                  : product.name_ua,
              });
            }}
          />
        )}
      </div>

      {/* === Кількість (грами) === */}
      <input
        type="number"
        min={0}
        className="col-span-3 rounded border px-3 py-2"
        placeholder="г"
        value={ingredient.quantity_g}
        onChange={(e) =>
          onChange({
            ...ingredient,
            quantity_g: Number(e.target.value),
          })
        }
      />

      {/* === Опціональний інгредієнт === */}
      <label className="col-span-2 flex items-center gap-1 text-sm">
        <input
          type="checkbox"
          checked={ingredient.is_optional}
          onChange={(e) =>
            onChange({
              ...ingredient,
              is_optional: e.target.checked,
            })
          }
        />
        опціонально
      </label>

      {/* === Видалення === */}
      <button
        type="button"
        onClick={onRemove}
        className="col-span-1 text-red-600"
        aria-label="Видалити інгредієнт"
      >
        ✕
      </button>
    </div>
  );
}
