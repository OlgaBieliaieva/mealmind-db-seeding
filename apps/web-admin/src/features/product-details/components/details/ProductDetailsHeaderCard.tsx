import { Badge } from "@/shared/ui/badge/Badge";

import {
  getProductStateBadgeVariant,
  getProductTypeBadgeVariant,
  getProductStatusBadgeVariant,
} from "../../adapters/product.badge.adapters";

import { getProductStateLabel } from "../../adapters/product-state-label.adapter";
import { getProductTypeLabel } from "../../adapters/product-type-label.adapter";
import { getProductUnitLabel } from "../../adapters/product-unit-label.adapter";

import { ProductDetailsDto } from "@/shared/api/products/products.types";
import { mapProductState } from "../../mappers/product.mapper";
import { getProductStatusLabel } from "../../adapters/product-status-label.adapter";

type Props = {
  product: ProductDetailsDto;
};

export function ProductDetailsHeaderCard({ product }: Props) {
  const state = mapProductState(product.rawOrCooked);
  return (
    <div className="rounded-2xl border bg-white p-6">
      <div className="flex justify-between">
        <div className="space-y-2">
          <div className="text-2xl font-semibold">{product.name.ua}</div>

          <div className="flex gap-2">
            <Badge variant={getProductStatusBadgeVariant(product.status)}>
              {getProductStatusLabel(product.status)}
            </Badge>
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
    </div>
  );
}
