"use client";

import { useState } from "react";
import { useSearch } from "../hooks/useSearch";
import { TabType, SelectedItem } from "../types/add-meal-plan.types";
import { SearchItem } from "./SearchItem";
import { Pagination } from "@/shared/ui/table/Pagination";

type Props = {
  activeTab: TabType;
  query?: string;
  selectedItems: SelectedItem[];
  onToggle: (item: SelectedItem) => void;
};

export function SearchList({
  activeTab,
  query,
  selectedItems,
  onToggle,
}: Props) {
  const [page, setPage] = useState(1);

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
        <SearchItem
          key={`${i.type}-${i.id}`}
          item={{
            id: i.id,
            type: i.type,
            title: i.name,
          }}
          selected={selectedSet.has(`${i.type}-${i.id}`)}
          onQuickAdd={() =>
            onToggle({
              id: i.id,
              type: i.type,
            })
          }
          onOpen={() => console.log("open details", i)}
        />
      ))}

      {data && (
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      )}
    </div>
  );
}


