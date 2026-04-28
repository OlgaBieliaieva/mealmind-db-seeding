"use client";

import { TabType } from "../types/add-meal-plan.types";
import { SearchItem } from "./SearchItem";

type Props = {
  activeTab: TabType;
  selectedItems: string[];
  onToggle: (id: string) => void;
};

type SearchItemType = {
  id: string;
  type: "recipe" | "product";
  title: string;
};

const mockRecipes: SearchItemType[] = [
  { id: "1", type: "recipe", title: "Чіа пудинг" },
  { id: "2", type: "recipe", title: "Омлет" },
];

const mockProducts: SearchItemType[] = [
  { id: "10", type: "product", title: "Банан" },
  { id: "11", type: "product", title: "Йогурт" },
];

export function SearchList({ activeTab, selectedItems, onToggle }: Props) {
  let items: SearchItemType[] = [];

  if (activeTab === "cookbook" || activeTab === "recipes") {
    items = mockRecipes;
  }

  if (activeTab === "products") {
    items = mockProducts;
  }

  return (
    <div className="pt-4 space-y-3">
      {items.map((item) => (
        <SearchItem
          key={`${item.type}-${item.id}`}
          item={item}
          selected={selectedItems.includes(item.id)}
          onQuickAdd={() => onToggle(item.id)}
          onOpen={() => console.log("open details", item)}
        />
      ))}
    </div>
  );
}
