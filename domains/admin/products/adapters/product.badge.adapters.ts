import { ProductState } from "@/domains/product/constants/product.constants";

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
