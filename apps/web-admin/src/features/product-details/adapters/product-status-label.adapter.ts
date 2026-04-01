import { PRODUCT_STATUS_LABELS } from "@/features/product/constants/product.status.labels";
import { ProductStatus } from "@/shared/domain/constants/product.constants";

export function getProductStatusLabel(type: ProductStatus | string) {
  return PRODUCT_STATUS_LABELS[type as ProductStatus] ?? type;
}
