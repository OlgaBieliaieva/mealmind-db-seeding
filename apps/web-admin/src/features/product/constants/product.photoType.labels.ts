import {
  PRODUCT_PHOTO_TYPES,
  ProductPhotoType,
} from "@/shared/domain/constants/product.constants";

export const PRODUCT_PHOTO_TYPE_LABELS: Record<ProductPhotoType, string> = {
  [PRODUCT_PHOTO_TYPES.PACKAGING]: "Пакування",
  [PRODUCT_PHOTO_TYPES.INGREDIENTS]: "Склад",
  [PRODUCT_PHOTO_TYPES.OTHER]: "Інше",
};
