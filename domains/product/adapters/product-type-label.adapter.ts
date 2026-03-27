import { PRODUCT_TYPE_LABELS } from "../../../apps/web-admin/src/features/product/constants/product.type.labels";
import { ProductType } from "../constants/product.constants";

export function getProductTypeLabel(type: ProductType | string) {
  return PRODUCT_TYPE_LABELS[type as ProductType] ?? type;
}
