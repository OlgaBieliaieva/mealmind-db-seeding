"use client";

import { ProductListItem } from "./ProductListItem";
import { ProductListItemDto } from "@/shared/api/products/products.types";

type Props = {
  items: ProductListItemDto[];
};

export function ProductList({ items }: Props) {
  return (
    <div className="rounded border bg-white">
      {items.map((p) => (
        <ProductListItem key={p.product_id} product={p} />
      ))}
    </div>
  );
}
