import { Prisma } from "@prisma/client";
import { ProductPhoto } from "@prisma/client";
import { ProductDetailsDTO } from "@/domains/admin/products/types/product-details.dto";

type PrismaProductFull = Prisma.ProductGetPayload<{
  include: {
    brand: true;

    category: {
      include: {
        parent: true;
      };
    };

    parentProduct: true;

    nutrients: {
      include: {
        nutrient: true;
      };
    };

    photos: true;
  };
}>;

type ProductNutrientRow = Prisma.ProductNutrientGetPayload<{
  include: {
    nutrient: true;
  };
}>;

export function mapProductToDetailsDTO(
  product: PrismaProductFull,
): ProductDetailsDTO {
  return {
    id: product.id,

    name: product.nameUa,
    nameEn: product.nameEn,

    barcode: product.barcode,
    notes: product.notes,
    isVerified: product.isVerified,
    source: product.source,

    type: product.type,
    unit: product.unit,
    rawOrCooked: product.rawOrCookedDefault,

    category: product.category
      ? {
          leafId: product.category.id,
          leafName: product.category.nameUa,

          rootId: product.category.parent?.id,
          rootName: product.category.parent?.nameUa,
        }
      : undefined,

    brand: product.brand
      ? {
          id: product.brand.id,
          name:
            product.brand.country?.toLowerCase() === "україна"
              ? (product.brand.nameUa ?? product.brand.nameEn)
              : (product.brand.nameEn ?? product.brand.nameUa),
        }
      : undefined,

    parent: product.parentProduct
      ? {
          id: product.parentProduct.id,
          name: product.parentProduct.nameEn,
        }
      : undefined,

    cookingFactors: {
      ediblePartPct: product.ediblePartPct,
      cookingLossPct: product.cookingLossPct,
      yieldFactor: product.yieldFactor,
      inheritedFromGeneric: !!product.parentProductId,
    },

    nutrients: mapNutrients(product.nutrients),

    photos: mapPhotos(product.photos),
  };
}

function mapNutrients(
  rows: ProductNutrientRow[],
): Record<string, { name: string; value: number; unit: string }> {
  return rows
    .sort((a, b) => a.nutrient.sortOrder - b.nutrient.sortOrder)
    .reduce(
      (acc, row) => {
        acc[row.nutrient.code] = {
          name: row.nutrient.nameUa,
          value: row.valuePer100g,
          unit: row.unit ?? row.nutrient.defaultUnit,
        };

        return acc;
      },
      {} as Record<string, { name: string; value: number; unit: string }>,
    );
}

function mapPhotos(rows: ProductPhoto[]) {
  return rows.map((row) => ({
    id: row.id,
    url: row.url,
    type: row.photoType,
  }));
}
