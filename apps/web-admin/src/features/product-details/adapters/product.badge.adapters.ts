import { ProductState } from "@/shared/domain/constants/product.constants";
import { ProductStatus } from "@/shared/domain/constants/product.constants";

export function getProductStateBadgeVariant(state: ProductState) {
  switch (state) {
    case "raw":
      return "info";

    case "cooked":
      return "success";

    default:
      return "neutral";
  }
}

export function getProductTypeBadgeVariant(type: string) {
  if (type === "generic") return "info";

  return "neutral";
}

export function getProductStatusBadgeVariant(state: ProductStatus) {
  switch (state) {
    case "draft":
      return "info";

    case "active":
      return "success";

    default:
      return "neutral";
  }
}