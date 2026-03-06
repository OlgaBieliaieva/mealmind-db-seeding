// SECTION ███ PRODUCT REPOSITORY ███
// DATAFLOW: service → repository → prisma

import { prisma } from "@/lib/db/prisma";

import { ProductInput } from "../schemas/product.schema";

export const productRepository = {
  async create(product: ProductInput) {
    const created = await prisma.product.create({
      data: {
        nameEn: product.name.en,

        nameUa: product.name.ua,

        type: product.type,

        unit: product.unit,

        categoryId: product.category_id,

        brandId: product.type === "branded" ? product.brand_id : undefined,

        parentProductId:
          product.type === "branded" ? product.parent_product_id : undefined,

        barcode: product.type === "branded" ? product.barcode : undefined,

        notes: product.notes,

        isVerified: product.is_verified,

        source: product.source,
        rawOrCookedDefault: "raw",
      },
    });

    return {
      success: true,
      product_id: created.id,
    };
  },
};
