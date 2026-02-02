"use client";

import { useEffect, useState } from "react";
import { ProductSearchItem } from "@/types/product-search";

type Props = {
  onSelect: (product: ProductSearchItem | null) => void;
};

export function ProductSearch({ onSelect }: Props) {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<ProductSearchItem[]>([]);
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
          `/api/products/search?query=${encodeURIComponent(query)}`,
        );
        const data = await res.json();
        setItems(data.items ?? []);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="relative">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Пошук продукту…"
        className="w-full rounded border px-3 py-2"
      />

      {loading && (
        <div className="absolute z-10 bg-white p-2 text-sm">Завантаження…</div>
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
              <div className="text-sm">{item.name_ua}</div>

              {item.brand_name_ua && (
                <div className="text-xs text-gray-500">
                  {item.brand_name_ua}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
