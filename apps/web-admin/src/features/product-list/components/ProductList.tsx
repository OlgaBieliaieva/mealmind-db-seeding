"use client";

import { ProductListItem } from "./ProductListItem";
import { ProductListItemDto } from "@/shared/api/products/products.types";

type Props = {
  items: ProductListItemDto[];

  mode?: "default" | "select";

  selectedIds?: string[];

  onToggleSelect?: (product: ProductListItemDto) => void;
};

export function ProductList({
  items,
  mode = "default",
  selectedIds = [],
  onToggleSelect,
}: Props) {
  return (
    <div className="rounded border bg-white">
      {items.map((p) => (
        <ProductListItem
          key={p.product_id}
          product={p}
          mode={mode}
          checked={selectedIds.includes(p.product_id)}
          onToggleSelect={onToggleSelect}
        />
      ))}
    </div>
  );
}
