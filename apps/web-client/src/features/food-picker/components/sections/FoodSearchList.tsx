"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearch } from "../../hooks/useSearch";
import {
  TabType,
  SelectedItem,
} from "../../../meal-plan/add/types/add-meal-plan.types";
import { SearchItemDTO } from "@/shared/types/search.types";
import { FoodSearchItem } from "./FoodSearchItem";
import { Pagination } from "@/shared/ui/table/Pagination";

type Props = {
  activeTab: TabType;
  query?: string;
  selectedItems: SelectedItem[];
  onToggle: (item: SelectedItem) => void;
  onFavoriteToggle: (item: SearchItemDTO) => void;
};

export function FoodSearchList({
  activeTab,
  query,
  selectedItems,
  onToggle,
  onFavoriteToggle,
}: Props) {
  const [page, setPage] = useState(1);
  const router = useRouter();

  const { data, isLoading, error } = useSearch({
    tab: activeTab,
    query,
    page,
  });

  const selectedSet = new Set(selectedItems.map((i) => `${i.type}-${i.id}`));

  if (error) {
    return <div className="p-4 text-sm text-red-500">Помилка</div>;
  }

  const totalPages = data ? Math.ceil(data.total / data.limit) : 1;

  return (
    <div className="pt-4 space-y-3">
      {isLoading && !data && (
        <div className="p-4 text-sm text-gray-500">Завантаження...</div>
      )}
      {!isLoading && data?.items.length === 0 && (
        <div className="p-4 text-sm text-gray-400">Нічого не знайдено</div>
      )}
      {data?.items.map((i) => (
        <FoodSearchItem
          key={`${i.type}-${i.id}`}
          item={i}
          selected={selectedSet.has(`${i.type}-${i.id}`)}
          onQuickAdd={() =>
            onToggle({
              id: i.id,
              type: i.type,
            })
          }
          onOpen={() => {
            router.push(`/food/${i.type}/${i.id}`);
          }}
          onFavoriteToggle={() => onFavoriteToggle(i)}
          // onMouseEnter={() => {
          //   router.prefetch(`/food/${i.type}/${i.id}`);
          // }}
        />
      ))}

      {data && (
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      )}
    </div>
  );
}
