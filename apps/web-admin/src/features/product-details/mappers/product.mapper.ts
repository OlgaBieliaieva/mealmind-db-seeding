import {
  PRODUCT_STATES,
  PRODUCT_UNITS,
  ProductState,
  ProductUnit,
} from "@/shared/domain/constants/product.constants";

export function mapProductState(value: string): ProductState {
  if (value === PRODUCT_STATES.RAW) return value;
  if (value === PRODUCT_STATES.COOKED) return value;

  return PRODUCT_STATES.RAW; // fallback
}

export function mapProductUnit(value: string): ProductUnit {
  if (
    value === PRODUCT_UNITS.G ||
    value === PRODUCT_UNITS.ML ||
    value === PRODUCT_UNITS.PCS
  )
    return value;
  return "g";
}
