import { PRODUCT_TYPE_LABELS } from "@/features/product/constants/product.type.labels";
import { ProductType } from "@/shared/domain/constants/product.constants";

export function getProductTypeLabel(type: ProductType | string) {
  return PRODUCT_TYPE_LABELS[type as ProductType] ?? type;
}
