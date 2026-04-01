"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ProductListItemDto } from "@/shared/api/products/products.types";
import { getProductTypeLabel } from "../adapters/product-type-label.adapter";
import { getProductStatusBadgeVariant } from "@/features/product-details/adapters/product.badge.adapters";
import { getProductStatusLabel } from "@/features/product-details/adapters/product-status-label.adapter";
import { Badge } from "@/shared/ui/badge/Badge";

type Props = {
  product: ProductListItemDto;
};

export function ProductListItem({ product }: Props) {
  const params = useSearchParams();

  const returnTo = `/admin/products?${params.toString()}`;
  return (
    <Link
      href={`/admin/products/${product.product_id}?returnTo=${encodeURIComponent(returnTo)}`}
    >
      <div className="flex items-center justify-between border px-4 py-3 last:border-b-0 hover:bg-gray-50 cursor-pointer">
        <div className="flex items-center gap-1">
          <div>{product.is_verified ? "🟢" : "❌"}</div>
          <div>
            <div className="font-medium">{product.name_ua}</div>

            <div className="text-xs text-gray-500">
              {getProductTypeLabel(product.type)}
            </div>
          </div>
        </div>
        <div>
          <Badge variant={getProductStatusBadgeVariant(product.status)}>
            {getProductStatusLabel(product.status)}
          </Badge>
          <div className="text-sm text-gray-500">{product.brand ?? "—"}</div>
        </div>
      </div>
    </Link>
  );
}
