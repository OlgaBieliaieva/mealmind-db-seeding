"use client";

import { ProductListItem } from "./ProductListItem";
import { ProductListItemDto } from "../../types/product-list.types";

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
