import { PRODUCT_STATE_LABELS } from "@/features/product/constants/product.state.labels";
import { ProductState } from "@/shared/domain/constants/product.constants";

export function getProductStateLabel(state: ProductState | string) {
  return PRODUCT_STATE_LABELS[state as ProductState] ?? state;
}
