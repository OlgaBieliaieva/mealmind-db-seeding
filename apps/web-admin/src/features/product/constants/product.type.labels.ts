import {
  PRODUCT_TYPES,
  ProductType,
} from "@/shared/domain/constants/product.constants";

export const PRODUCT_TYPE_LABELS: Record<ProductType, string> = {
  [PRODUCT_TYPES.GENERIC]: "Базовий продукт",
  [PRODUCT_TYPES.BRANDED]: "Брендований продукт",
};
