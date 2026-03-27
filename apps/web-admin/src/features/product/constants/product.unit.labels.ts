import {
  PRODUCT_UNITS,
  ProductUnit,
} from "@/src/shared/domain/constants/product.constants";

export const PRODUCT_UNIT_LABELS: Record<ProductUnit, string> = {
  [PRODUCT_UNITS.G]: "г",
  [PRODUCT_UNITS.ML]: "мл",
  [PRODUCT_UNITS.PCS]: "шт",
};
