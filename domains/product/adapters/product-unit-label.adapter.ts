import { PRODUCT_UNIT_LABELS } from "../constants/product.unit.labels";
import { ProductUnit } from "../constants/product.constants";

export function getProductUnitLabel(unit: ProductUnit | string) {
  return PRODUCT_UNIT_LABELS[unit as ProductUnit] ?? unit;
}