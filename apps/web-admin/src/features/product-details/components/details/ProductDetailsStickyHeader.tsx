"use client";

import { useRouter } from "next/navigation";
import { useDeleteProduct } from "@/features/product-form/hooks/useDeleteProduct";
import { ProductDetailsDto } from "@/shared/api/products/products.types";
import { Badge } from "@/shared/ui/badge/Badge";
import {
  getProductTypeBadgeVariant,
  getProductStateBadgeVariant,
} from "../../adapters/product.badge.adapters";

import { getProductStateLabel } from "../../adapters/product-state-label.adapter";
import { getProductTypeLabel } from "../../adapters/product-type-label.adapter";
import { getProductUnitLabel } from "../../adapters/product-unit-label.adapter";
import { ProductDetailsBackLink } from "./ProductDetailsBackLink";
import { mapProductState } from "../../mappers/product.mapper";

type Props = {
  product: ProductDetailsDto;
};

export function ProductDetailsStickyHeader({ product }: Props) {
  const router = useRouter();
  const { mutate, isPending } = useDeleteProduct();
  const state = mapProductState(product.rawOrCooked);
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
        <div className="w-full font-semibold px-4">{product.name.ua}</div>

        <div className="w-full flex gap-2 px-4">
          <Badge variant={getProductTypeBadgeVariant(product.type)}>
            {getProductTypeLabel(product.type)}
          </Badge>
          <Badge>{getProductUnitLabel(product.unit)}</Badge>

          <Badge variant={getProductStateBadgeVariant(state)}>
            {getProductStateLabel(state)}
          </Badge>
        </div>
      </div>
    </div>
  );
}
