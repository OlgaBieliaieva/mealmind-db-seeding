import { Prisma } from "@prisma/client";
import { ProductPersistenceAggregate } from "../../../domain/persistence/product.prisma.types";

type ProductListRow = Prisma.ProductGetPayload<{
  include: {
    brand: true;
    category: true;
  };
}>;

export function presentProductListItem(product: ProductListRow) {
  return {
    product_id: product.id,
    name_en: product.nameEn,
    name_ua: product.nameUa,
    type: product.type,
    category: product.category?.nameUa ?? null,
    brand: product.brand
      ? product.brand.country?.toLowerCase() === "україна"
        ? product.brand.nameUa
        : product.brand.nameEn
      : null,
    status: product.status,
    is_verified: product.isVerified,
  };
}

export function presentProductDetailsAdmin(
  product: ProductPersistenceAggregate,
) {
  return {
    id: product.id,
    name: {
      ua: product.nameUa,
      en: product.nameEn,
    },
    type: product.type,
    unit: product.unit,
    brand: product.brand?.nameUa ?? product.brand?.nameEn ?? null,
    category: product.category?.nameUa ?? null,
    nutrients: product.nutrients.map((n) => ({
      code: n.nutrient.code,
      value: n.valuePer100g,
      unit: n.unit,
    })),
    photos: product.photos,
  };
}
