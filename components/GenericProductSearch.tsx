"use client";

import { useEffect, useState } from "react";
import { GenericProduct } from "@/types/generic-product";

type Props = {
  value?: GenericProduct | null;
  onSelect: (product: GenericProduct | null) => void;
};

export function GenericProductSearch({ value, onSelect }: Props) {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<GenericProduct[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setItems([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/products/generic?query=${encodeURIComponent(query)}`,
        );
        const data = await res.json();
        setItems(data.items ?? []);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  if (value) {
    return (
      <div className="rounded border p-2 flex items-center justify-between">
        <span>
          {value.name.en} / {value.name.ua}
        </span>
        <button
          type="button"
          className="text-sm text-red-600"
          onClick={() => onSelect(null)}
        >
          Change
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search generic product..."
        className="w-full rounded border px-3 py-2"
      />

      {loading && (
        <div className="absolute z-10 bg-white p-2 text-sm">Loading...</div>
      )}

      {items.length > 0 && (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded border bg-white shadow">
          {items.map((item) => (
            <li
              key={item.product_id}
              className="cursor-pointer px-3 py-2 hover:bg-gray-100"
              onClick={() => {
                onSelect(item);
                setQuery("");
                setItems([]);
              }}
            >
              {item.name.en} / {item.name.ua}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
