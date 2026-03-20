"use client";

import { useRouter } from "next/navigation";
import { useDeleteProduct } from "../../hooks/useDeleteProduct";
import { ProductDetailsDTO } from "../../types/product-details.dto";
import { Badge } from "@/domains/shared/components/badge/Badge";
import {
  getProductTypeBadgeVariant,
  getProductStateBadgeVariant,
} from "../../adapters/product.badge.adapters";

import { getProductStateLabel } from "@/domains/product/adapters/product-state-label.adapter";
import { getProductTypeLabel } from "@/domains/product/adapters/product-type-label.adapter";
import { getProductUnitLabel } from "@/domains/product/adapters/product-unit-label.adapter";
import { ProductDetailsBackLink } from "./ProductDetailsBackLink";

type Props = {
  product: ProductDetailsDTO;
};

export function ProductDetailsStickyHeader({ product }: Props) {
  const router = useRouter();
  const { mutate, isPending } = useDeleteProduct();
  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-xl flex flex-col items-center px-4 py-3 gap-2">
        <div className="w-full flex justify-between items-center">
          <ProductDetailsBackLink />

          <div className="flex gap-2">
            <button
              onClick={() => router.push(`/admin/products/${product.id}/edit`)}
              className="text-sm border px-3 py-1 rounded"
            >
              Змінити
            </button>

            <button
              className="text-sm border px-3 py-1 rounded"
              disabled={isPending}
              onClick={() => {
                if (confirm("Ви впевнені, що бажаєте видалити цей продукт?")) {
                  mutate(product.id);
                }
              }}
            >
              Видалити
            </button>
          </div>
        </div>
        <div className="w-full font-semibold px-4">{product.name}</div>

        <div className="w-full flex gap-2 px-4">
          <Badge variant={getProductTypeBadgeVariant(product.type)}>
            {getProductTypeLabel(product.type)}
          </Badge>

          <Badge>{getProductUnitLabel(product.unit)}</Badge>

          <Badge variant={getProductStateBadgeVariant(product.rawOrCooked)}>
            {getProductStateLabel(product.rawOrCooked)}
          </Badge>
        </div>
      </div>
    </div>
  );
}
