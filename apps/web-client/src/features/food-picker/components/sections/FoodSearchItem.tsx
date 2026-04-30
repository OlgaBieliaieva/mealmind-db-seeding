"use client";

import { RecipeSearchItem } from "./RecipeSearchItem";
import { ProductSearchItem } from "./ProductSearchItem";
import { SearchItemDTO } from "@/shared/types/search.types";

type Props = {
  item: SearchItemDTO;

  selected: boolean;

  onQuickAdd: () => void;
  onOpen: () => void;
  onFavoriteToggle?: () => void;
};

export function FoodSearchItem({
  item,
  selected,
  onQuickAdd,
  onOpen,
  onFavoriteToggle,
}: Props) {
  if (item.type === "recipe") {
    return (
      <RecipeSearchItem
        item={item}
        selected={selected}
        onToggle={onQuickAdd}
        onOpen={onOpen}
        onFavoriteToggle={onFavoriteToggle}
      />
    );
  }

  return (
    <ProductSearchItem
      item={item}
      selected={selected}
      onToggle={onQuickAdd}
      onOpen={onOpen}
      onFavoriteToggle={onFavoriteToggle}
    />
  );
}
