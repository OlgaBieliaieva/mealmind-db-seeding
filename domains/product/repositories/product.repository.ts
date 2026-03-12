// SECTION ███ PRODUCT REPOSITORY ███
// DATAFLOW: service → repository → prisma

import { prisma } from "@/lib/db/prisma";
import { ProductInput } from "../schemas/product.schema";

export const productRepository = {
  async create(product: ProductInput) {
    return prisma.$transaction(async (tx) => {
      const created = await tx.product.create({
        data: {
          nameEn: product.name.en,
          nameUa: product.name.ua,

          type: product.type,
          unit: product.unit,

          categoryId: product.category_id,

          brandId:
            product.type === "branded"
              ? product.brand_id
              : undefined,

          parentProductId:
            product.type === "branded"
              ? product.parent_product_id
              : undefined,

          barcode:
            product.type === "branded"
              ? product.barcode
              : undefined,

          notes: product.notes,
          isVerified: product.is_verified,
          source: product.source,

          rawOrCookedDefault:
            product.raw_or_cooked_default ?? "raw",
        },
      });

      if (product.nutrients) {
        await tx.productNutrient.createMany({
          data: Object.entries(product.nutrients).map(
            ([nutrientId, val]) => ({
              productId: created.id,
              nutrientId,
              valuePer100g: val.value,
              unit: val.unit,
            }),
          ),
        });
      }

      if (product.photos?.length) {
        await tx.productPhoto.createMany({
          data: product.photos.map((p) => ({
            productId: created.id,
            photoType: p.type,
            url: p.url,
          })),
        });
      }

      return {
        success: true,
        product_id: created.id,
      };
    });
  },
};