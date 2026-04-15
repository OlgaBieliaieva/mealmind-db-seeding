"use client";

import { useState } from "react";
import { useProductSearch } from "../../hooks/useProductSearch";

type Props = {
  value?: string;
  onSelect: (id: string, label: string) => void;
};

export function ProductSearchSelect({ value, onSelect }: Props) {
  const [query, setQuery] = useState("");

  const { data } = useProductSearch(query);

  return (
    <div className="relative">
      <input
        className="w-full rounded border px-2 py-1"
        placeholder="Пошук продукту..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {data && data.items.length > 0 && (
        <div className="absolute z-10 mt-1 w-full rounded border bg-white shadow">
          {data.items.map((item) => (
            <div
              key={item.product_id}
              onClick={() => {
                onSelect(item.product_id, item.name_ua);
                setQuery(item.name_ua);
              }}
              className="cursor-pointer px-2 py-1 hover:bg-gray-100"
            >
              {item.name_ua}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
