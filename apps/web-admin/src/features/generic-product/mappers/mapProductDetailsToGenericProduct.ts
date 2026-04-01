import { ProductDetailsDto } from "@/shared/api/products/products.types";
import { GenericProduct } from "../types/generic-product.types";

export function mapToGenericProduct(dto: ProductDetailsDto): GenericProduct {
  return {
    product_id: dto.id,
    category_id: dto.category.leafId,
    name: {
      ua: dto.name.ua,
      en: dto.name.en,
    },
    raw_or_cooked_default: dto.rawOrCooked,

    unit: dto.unit,

    cooking_loss_pct: dto.cookingFactors?.cookingLossPct,
    edible_part_pct: dto.cookingFactors?.ediblePartPct,
    yield_factor: dto.cookingFactors?.yieldFactor,
  };
}
