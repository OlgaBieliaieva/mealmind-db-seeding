// TODO DELETE after refactor
import { ProductDetailsDTO } from "@/domains/admin/products/types/product-details.dto";
import { ProductFormValues } from "../../../apps/web-admin/src/features/product-form/schemas/product-form.schema";

export function mapProductDetailsToForm(
  dto: ProductDetailsDTO,
): ProductFormValues {
  return {
    name_en: dto.nameEn,
    name_ua: dto.name,

    type: dto.type,
    unit: dto.unit,

    brand_id: dto.brand?.id,
    raw_or_cooked_default: dto.rawOrCooked,

    category_id: dto.category.leafId,

    parent_product_id: dto.parent?.id,

    notes: dto.notes ?? "",
    is_verified: dto.isVerified,
    source: dto.source ?? "",

    barcode: dto.barcode ?? undefined,

    nutrients: dto.nutrients
      ? Object.fromEntries(
          dto.nutrients.map((n) => [
            n.nutrientId,
            {
              value: n.value,
              unit: n.unit,
            },
          ]),
        )
      : {},

    cooking_loss_pct: dto.cookingFactors?.cookingLossPct,
    edible_part_pct: dto.cookingFactors?.ediblePartPct,
    yield_factor: dto.cookingFactors?.yieldFactor,

    photos: dto.photos?.map((p) => ({
      type: p.type,
      url: p.url,
      objectName: p.url,
    })),
  };
}
