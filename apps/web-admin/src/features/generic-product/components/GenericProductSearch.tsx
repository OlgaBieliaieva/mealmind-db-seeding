"use client";

import { useState } from "react";
import { useGenericProductSearch } from "../hooks/useGenericProductSearch";
import { useGenericProductById } from "../hooks/useGenericProductById";

type Props = {
  valueId?: string;
  disabled?: boolean;
  onSelect: (productId: string | null) => void;
};

export function GenericProductSearch({ valueId, disabled, onSelect }: Props) {
  const [query, setQuery] = useState("");

  const { data: selected, isLoading: isLoadingSelected } =
    useGenericProductById(valueId);

  const { data, isFetching } = useGenericProductSearch(query);
  console.log(data);

  const items = data?.items ?? [];

  /* ---------------- selected mode ---------------- */

  if (valueId) {
    if (isLoadingSelected) {
      return (
        <div className="rounded border px-3 py-2 text-sm">Завантаження...</div>
      );
    }

    return (
      <div className="flex items-center justify-between rounded border px-3 py-2">
        <span className="text-sm font-medium">
          {selected?.name.ua ?? "Unknown"}
        </span>

        {!disabled && (
          <button
            type="button"
            onClick={() => onSelect(null)}
            className="text-sm text-red-600 hover:underline"
          >
            Змінити
          </button>
        )}
      </div>
    );
  }

  /* ---------------- search mode ---------------- */

  const showDropdown = query.length >= 2;

  return (
    <div className="relative">
      <input
        disabled={disabled}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Шукати базовий продукт..."
        className="w-full rounded border px-3 py-2 disabled:bg-gray-100"
      />

      {showDropdown && isFetching && (
        <div className="absolute z-10 mt-1 w-full rounded border bg-white p-2 text-sm shadow">
          Завантаження...
        </div>
      )}

      {showDropdown && !isFetching && items.length === 0 && (
        <div className="absolute z-10 mt-1 w-full rounded border bg-white p-2 text-sm shadow">
          Нічого не знайдено
        </div>
      )}

      {showDropdown && items.length > 0 && (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded border bg-white shadow">
          {items.map((item) => (
            <li
              key={item.product_id}
              className="cursor-pointer px-3 py-2 hover:bg-gray-100"
              onClick={() => {
                onSelect(item.product_id);
                setQuery("");
              }}
            >
              <div className="text-sm font-medium">{item.name_ua}</div>

              <div className="text-xs text-gray-500">{item.name_ua}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
