import { Badge } from "@/domains/shared/components/badge/Badge";
import {
  getProductStateBadgeVariant,
  getProductTypeBadgeVariant,
} from "../../adapters/product.badge.adapters";

import { getProductStateLabel } from "@/domains/product/adapters/product-state-label.adapter";
import { getProductTypeLabel } from "@/domains/product/adapters/product-type-label.adapter";
import { getProductUnitLabel } from "@/domains/product/adapters/product-unit-label.adapter";

import { ProductDetailsDTO } from "../../types/product-details.dto";

type Props = {
  product: ProductDetailsDTO;
};

export function ProductDetailsHeaderCard({ product }: Props) {
  return (
    <div className="rounded-2xl border bg-white p-6">
      <div className="flex justify-between">
        <div className="space-y-2">
          <div className="text-2xl font-semibold">{product.name}</div>

          <div className="flex gap-2">
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
    </div>
  );
}
