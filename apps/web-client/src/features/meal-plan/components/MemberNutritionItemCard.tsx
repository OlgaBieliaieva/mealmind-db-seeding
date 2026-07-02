"use client";

import Image from "next/image";
import { ShoppingCart, CookingPot } from "lucide-react";

import { AggregatedMealItemDTO } from "@/shared/types/meal-plan.types";
// import { useOpenAdvancedMealPlanEditor } from "../hooks/useOpenAdvancedMealPlanEditor";
import { RecipeCategoryIcons, productCategoryIcons } from "./MealItem";

type Props = {
  item: AggregatedMealItemDTO;
  memberId: string;
  mealTypeId: string;
};

export function MemberNutritionItemCard({ item, memberId, mealTypeId }: Props) {
//   const openEditor = useOpenAdvancedMealPlanEditor();

  const averagePortionGrams =
    item.portions > 0 ? Math.round(item.totalWeight / item.portions) : 0;

  return (
    <button
      type="button"
      onClick={() => console.log("open", item.id)}
      //   onClick={() =>
      //     openEditor({
      //       memberId,
      //       mealTypeId,
      //       recipeId: item.type === "recipe" ? item.id : undefined,
      //       productId: item.type === "product" ? item.id : undefined,
      //       amountG: averagePortionGrams,
      //     })
      //   }
      className="flex w-full gap-3 rounded-2xl border bg-white p-3 text-left shadow-sm transition hover:bg-gray-50"
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-100">
        {item.photoUrl ? (
          <Image
            src={item.photoUrl}
            alt={item.name}
            fill
            className="object-cover"
          />
        ) : item.type === "recipe" ? (
          <div className="flex items-center justify-center h-full text-2xl">
            {RecipeCategoryIcons[item.categoryCode ?? ""] ?? "🍳"}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-2xl">
            {productCategoryIcons[item.categoryCode ?? ""] ?? "🥕"}
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="flex items-center gap-2">
          {item.type === "recipe" ? (
            <CookingPot size={16} className="text-gray-400" />
          ) : (
            <ShoppingCart size={16} className="text-gray-400" />
          )}
          <div className="truncate text-sm font-medium text-gray-900">
            {item.name}
          </div>
        </div>

        <div className="text-xs text-gray-500">
          {item.categoryName ?? "Без категорії"} •{" "}
          {item.nutrition
            ? `${Math.round(item.nutrition.energyKcalPer100g)} ккал / 100 г`
            : "—"}
        </div>

        <div className="text-xs text-gray-600">
          Порція: {averagePortionGrams} г •{" "}
          {item.nutrition
            ? `${Math.round(item.nutrition.energyKcalPerPortion)} ккал`
            : "—"}
        </div>

        <div className="text-xs text-gray-600">
          {item.nutrition
            ? `Б ${item.nutrition.proteinPerPortion.toFixed(0)} • Ж ${item.nutrition.fatPerPortion.toFixed(0)} • В ${item.nutrition.carbsPerPortion.toFixed(0)}`
            : "—"}
        </div>
      </div>
    </button>
  );
}
