import { PRODUCT_STATE_LABELS } from "../constants/product.state.labels";
import { ProductState } from "../constants/product.constants";

export function getProductStateLabel(state: ProductState | string) {
  return PRODUCT_STATE_LABELS[state as ProductState] ?? state;
}
