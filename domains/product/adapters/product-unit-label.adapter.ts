import { PRODUCT_UNIT_LABELS } from "../../../apps/web-admin/src/features/product/constants/product.unit.labels";
import { ProductUnit } from "../constants/product.constants";

export function getProductUnitLabel(unit: ProductUnit | string) {
  return PRODUCT_UNIT_LABELS[unit as ProductUnit] ?? unit;
}
