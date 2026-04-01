import { PRODUCT_UNIT_LABELS } from "@/features/product/constants/product.unit.labels";
import { ProductUnit } from "@/shared/domain/constants/product.constants";

export function getProductUnitLabel(unit: ProductUnit | string) {
  return PRODUCT_UNIT_LABELS[unit as ProductUnit] ?? unit;
}
