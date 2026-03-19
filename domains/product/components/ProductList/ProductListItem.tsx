"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ProductListItemDto } from "../../types/product-list.types";
import { getProductTypeLabel } from "../../adapters/product-type-label.adapter";

type Props = {
  product: ProductListItemDto;
};

export function ProductListItem({ product }: Props) {
  const params = useSearchParams();

const returnTo =
  `/admin/products?${params.toString()}`;
  return (
    <Link href={`/admin/products/${product.product_id}?returnTo=${encodeURIComponent(returnTo)}`}>
      <div className="flex items-center justify-between border-b px-4 py-3 last:border-b-0 hover:bg-gray-50 cursor-pointer">
        <div>
          <div className="font-medium">{product.name_ua}</div>

          <div className="text-xs text-gray-500">
            {getProductTypeLabel(product.type)}
          </div>
        </div>

        <div className="text-sm text-gray-500">{product.brand ?? "—"}</div>
      </div>
    </Link>
  );
}
