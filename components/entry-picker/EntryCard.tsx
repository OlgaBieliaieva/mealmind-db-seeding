"use client";

import { useRouter } from "next/navigation";
import { PickerItem } from "@/types/entry-picker";

type Props = {
  item: PickerItem;
  checked: boolean;
  onToggle: () => void;

  recipeMap: Record<string, boolean>;
  productMap: Record<string, boolean>;

  toggleRecipe: (id: string) => void;
  toggleProduct: (id: string) => void;

  selectedUserId: string | null;
  planId: string;
  date: string;
  mealTypeId: number;
};

export default function EntryCard({
  item,
  checked,
  onToggle,
  recipeMap,
  productMap,
  toggleRecipe,
  toggleProduct,
  selectedUserId,
  planId,
  date,
  mealTypeId,
}: Props) {
  const router = useRouter();
  // ⭐ Визначаємо чи улюблений
  const isFavorite =
    item.type === "recipe"
      ? Boolean(recipeMap[item.id])
      : Boolean(productMap[item.id]);

  // ⭐ Toggle handler
  const handleToggleFavorite = () => {
    if (!selectedUserId) return;

    if (item.type === "recipe") {
      toggleRecipe(item.id);
    } else {
      toggleProduct(item.id);
    }
  };

  const handleOpenDetails = () => {
    if (!selectedUserId) return;

    if (item.type === "recipe") {
      router.push(
        `/plan/${planId}/entry/recipe/${item.id}?date=${date}&mealTypeId=${mealTypeId}`,
      );
    }

    if (item.type === "product") {
      router.push(
        `/plan/${planId}/entry/product/${item.id}?date=${date}&mealTypeId=${mealTypeId}`,
      );
    }
  };

  return (
    <div className="bg-white rounded-2xl border p-4 flex items-center justify-between">
      {/* ⭐ Star */}
      <button
        type="button"
        onClick={handleToggleFavorite}
        disabled={!selectedUserId}
        className={`text-lg ${
          isFavorite ? "text-yellow-500" : "text-gray-300"
        }`}
      >
        {isFavorite ? "★" : "☆"}
      </button>

      {/* CLICKABLE INFO AREA */}
      <div onClick={handleOpenDetails} className="flex-1 px-3 cursor-pointer">
        <div className="text-xs text-gray-400 mb-1">
          {item.type === "recipe" ? "Рецепт" : "Продукт"}
        </div>

        <div className="text-sm font-medium text-gray-800">{item.title}</div>

        <div className="text-xs text-gray-400 mt-1">0 ккал / 100г</div>
      </div>

      {/* Checkbox */}
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="w-4 h-4"
      />
    </div>
  );
}
