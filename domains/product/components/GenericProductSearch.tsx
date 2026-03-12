"use client";

import { useState } from "react";
import { useGenericProductSearch } from "../hooks/useGenericProductSearch";
import { GenericProduct } from "@/domains/product/types/generic-product.types";

type Props = {
  value?: GenericProduct | null;
  onSelect: (product: GenericProduct | null) => void;
};

export function GenericProductSearch({ value, onSelect }: Props) {
  const [query, setQuery] = useState("");

  const { data, isFetching } = useGenericProductSearch(query);

  const items = data?.items ?? [];

  /* ---------------- selected mode ---------------- */

  if (value) {
    return (
      <div className="flex items-center justify-between rounded border px-3 py-2">
        <span className="text-sm font-medium">{value.name.ua}</span>

        <button
          type="button"
          onClick={() => onSelect(null)}
          className="text-sm text-red-600 hover:underline"
        >
          Змінити
        </button>
      </div>
    );
  }

  /* ---------------- search mode ---------------- */

  const showDropdown = query.length >= 2;

  return (
    <div className="relative">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Шукати базовий продукт..."
        className="w-full rounded border px-3 py-2"
      />

      {/* loading */}
      {showDropdown && isFetching && (
        <div className="absolute z-10 mt-1 w-full rounded border bg-white p-2 text-sm shadow">
          Завантаження...
        </div>
      )}

      {/* empty */}
      {showDropdown && !isFetching && items.length === 0 && (
        <div className="absolute z-10 mt-1 w-full rounded border bg-white p-2 text-sm shadow">
          Нічого не знайдено
        </div>
      )}

      {/* results */}
      {showDropdown && items.length > 0 && (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded border bg-white shadow">
          {items.map((item) => (
            <li
              key={item.product_id}
              className="cursor-pointer px-3 py-2 hover:bg-gray-100"
              onClick={() => {
                onSelect(item);
                setQuery("");
              }}
            >
              <div className="text-sm font-medium">{item.name.ua}</div>

              <div className="text-xs text-gray-500">{item.name.en}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
