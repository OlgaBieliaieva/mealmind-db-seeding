"use client";

import { useRouter } from "next/navigation";
import { RecipeDetailsDTO } from "@/features/recipe-details/types/recipe-details.types";
import { formatQuantity } from "../utils/formatQuantity";
import { productCategoryIcons } from "@/features/product-details/components/sections/ProductHero";
import {
  normalizeCountryCode,
  getFlagEmoji,
} from "@/shared/lib/normalizeCountryCode";

export function IngredientItem({
  ingredient,
}: {
  ingredient: RecipeDetailsDTO["ingredients"][number];
}) {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.push(`/food/product/${ingredient.productId}`);
      }}
      className="w-full flex items-center justify-between bg-white rounded-xl p-3 border border-gray-100 shadow-sm active:scale-[0.98] transition"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-lg">
          {productCategoryIcons[ingredient.category.code ?? "default"] ?? "🥑"}
        </div>

        <div className="text-left">
          <div className="text-sm font-medium text-gray-900">
            {ingredient.name}
          </div>
          {/* BRAND */}
          {ingredient.brand?.name && (
            <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
              <span
                style={{
                  fontFamily: "Apple Color Emoji, Segoe UI Emoji, sans-serif",
                }}
              >
                {getFlagEmoji(normalizeCountryCode(ingredient.brand.country))}
              </span>
              <span>{ingredient.brand.name}</span>
            </div>
          )}

          {/* CATEGORY */}
          {ingredient.category.name && (
            <div className="text-xs text-gray-400 mt-1">
              {productCategoryIcons[ingredient.category.code ?? "default"] ??
                "🥑"}
              {ingredient.category.name}
            </div>
          )}
          {ingredient.isOptional && (
            <div className="text-[11px] text-gray-400">Опціонально</div>
          )}
        </div>
      </div>

      <div className="text-sm font-semibold text-gray-900 whitespace-nowrap">
        {formatQuantity(ingredient.quantity)} {ingredient.unit}
      </div>
    </button>
  );
}
