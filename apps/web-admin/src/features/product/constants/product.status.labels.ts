import {
  PRODUCT_STATUSES,
  ProductStatus,
} from "@/shared/domain/constants/product.constants";

export const PRODUCT_STATUS_LABELS: Record<ProductStatus, string> = {
  [PRODUCT_STATUSES.DRAFT]: "Чернетка",
  [PRODUCT_STATUSES.ACTIVE]: "Активний",
  [PRODUCT_STATUSES.ARCHIVED]: "Помічений на видалення",
};
