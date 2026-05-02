"use client";

import { useState } from "react";
import { useDebounce } from "@/shared/lib/hooks/useDebounce";
import { useToggleFavorite } from "../hooks/useToggleFavorite";
import { FoodSearchInput } from "./sections/FoodSearchInput";
import { FoodTabs } from "./sections/FoodTabs";
import { FoodSearchList } from "./sections/FoodSearchList";

import {
  TabType,
  SelectedItem,
} from "@/features/meal-plan/add/types/add-meal-plan.types";

type Props = {
  selectedItems: SelectedItem[];
  onChange: (items: SelectedItem[]) => void;
};

export function FoodPicker({ selectedItems, onChange }: Props) {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("cookbook");
  const debouncedQuery = useDebounce(query, 300);
  const { mutate: toggleFavorite } = useToggleFavorite();
  function toggleItem(item: SelectedItem) {
    const exists = selectedItems.some(
      (i) => i.id === item.id && i.type === item.type,
    );

    if (exists) {
      onChange(
        selectedItems.filter(
          (i) => !(i.id === item.id && i.type === item.type),
        ),
      );
    } else {
      onChange([...selectedItems, item]);
    }
  }

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden pt-3">
      <FoodTabs active={activeTab} onChange={setActiveTab} />

      <FoodSearchInput value={query} onChange={setQuery} />

      <div className="flex-1 min-h-0 overflow-hidden">
        <FoodSearchList
          key={`${activeTab}-${debouncedQuery}`}
          activeTab={activeTab}
          query={debouncedQuery}
          selectedItems={selectedItems}
          onToggle={toggleItem}
          onFavoriteToggle={(item) =>
            toggleFavorite({
              id: item.id,
              type: item.type,
            })
          }
        />
      </div>
    </div>
  );
}
