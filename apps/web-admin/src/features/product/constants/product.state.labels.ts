import {
  PRODUCT_STATES,
  ProductState,
} from "@/shared/domain/constants/product.constants";

export const PRODUCT_STATE_LABELS: Record<ProductState, string> = {
  [PRODUCT_STATES.RAW]: "Сирий",
  [PRODUCT_STATES.COOKED]: "Приготований",
};
