"use client";

import { useTransition, useState } from "react";
import { toggleFavoriteAction } from "@/app/admin/menu-plans/[id]/add-entry/action";
import { PickerItem } from "@/types/entry-picker";
import { ProductFavorite } from "@/types/product-favorite.dto";

type Props = {
  item: PickerItem;
  checked: boolean;
  onToggle: () => void;
  favorites: ProductFavorite[];
  selectedUserId: string | null;
  familyId: string;
};

export default function EntryCard({
  item,
  checked,
  onToggle,
  favorites,
  selectedUserId,
  familyId,
}: Props) {
  const isFavorite =
    item.type === "product" && favorites.some((f) => f.product_id === item.id);

  const [optimisticFavorite, setOptimisticFavorite] = useState(isFavorite);

  const [isPending, startTransition] = useTransition();

  const handleToggleFavorite = () => {
    if (!selectedUserId || item.type !== "product") return;

    startTransition(async () => {
      setOptimisticFavorite((prev) => !prev);

      await toggleFavoriteAction(item.id, selectedUserId, familyId);
    });
  };
  return (
    <div className="bg-white rounded-2xl border p-4 flex items-center justify-between">
      <button
        onClick={handleToggleFavorite}
        className={`text-lg ${
          optimisticFavorite ? "text-yellow-500" : "text-gray-300"
        }`}
        disabled={isPending}
      >
        {optimisticFavorite ? "★" : "☆"}
      </button>
      <div className="flex-1">
        <div className="text-xs text-gray-400 mb-1">
          {item.type === "recipe" ? "Рецепт" : "Продукт"}
        </div>

        <div className="text-sm font-medium text-gray-800">{item.title}</div>

        <div className="text-xs text-gray-400 mt-1">0 ккал / 100г</div>
      </div>

      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="w-4 h-4"
      />
    </div>
  );
}
