import { ProductDetailsDto } from "@/shared/api/products/products.types";
import { ProductFormValues } from "../schemas/product-form.schema";

import {
  PRODUCT_UNITS,
  PRODUCT_STATES,
  ProductUnit,
  ProductState,
} from "@/shared/domain/constants/product.constants";

import {
  PRODUCT_PHOTO_TYPES,
  ProductPhotoType,
} from "@/shared/domain/constants/product.constants";

function mapPhotoType(type: string): ProductPhotoType {
  if (type === PRODUCT_PHOTO_TYPES.PACKAGING) return type;
  if (type === PRODUCT_PHOTO_TYPES.INGREDIENTS) return type;
  if (type === PRODUCT_PHOTO_TYPES.OTHER) return type;

  return PRODUCT_PHOTO_TYPES.OTHER;
}

export function normalizeUnit(value: string): ProductUnit {
  if (value === PRODUCT_UNITS.G) return value;
  if (value === PRODUCT_UNITS.ML) return value;
  if (value === PRODUCT_UNITS.PCS) return value;

  return PRODUCT_UNITS.G; // fallback
}

export function normalizeState(value: string): ProductState {
  if (value === PRODUCT_STATES.RAW) return value;
  if (value === PRODUCT_STATES.COOKED) return value;

  return PRODUCT_STATES.RAW; // fallback
}

export function mapProductDetailsToForm(
  dto: ProductDetailsDto,
): ProductFormValues {
  return {
    name_en: dto.name.en,
    name_ua: dto.name.ua,

    type: dto.type,
    unit: normalizeUnit(dto.unit),

    brand_id: dto.brand?.id,
    raw_or_cooked_default: normalizeState(dto.rawOrCooked),

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
      type: mapPhotoType(p.type),
      url: p.url,
      objectName: p.url,
    })),
  };
}
