import { PRODUCT_PHOTO_TYPE_LABELS } from "../../../apps/web-admin/src/features/product/constants/product.photoType.labels";
import { ProductPhotoType } from "../constants/product.constants";

export function getProductPhotoTypeLabel(type: ProductPhotoType | string) {
  return PRODUCT_PHOTO_TYPE_LABELS[type as ProductPhotoType] ?? type;
}
