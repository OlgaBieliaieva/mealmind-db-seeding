"use client";

import { useState } from "react";
import { useDebounce } from "@/shared/lib/hooks/useDebounce";

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
  const debouncedQuery = useDebounce(query, 300);

  const [activeTab, setActiveTab] = useState<TabType>("cookbook");

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
    <div className="pt-3">
      <FoodTabs active={activeTab} onChange={setActiveTab} />

      <FoodSearchInput value={query} onChange={setQuery} />

      <FoodSearchList
        key={`${activeTab}-${debouncedQuery}`}
        activeTab={activeTab}
        query={debouncedQuery}
        selectedItems={selectedItems}
        onToggle={toggleItem}
      />
    </div>
  );
}
