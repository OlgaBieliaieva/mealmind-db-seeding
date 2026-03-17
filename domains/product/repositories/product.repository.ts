// SECTION ███ PRODUCT REPOSITORY ███
// DATAFLOW: service → repository → prisma

import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { ProductInput } from "../schemas/product.schema";
import { getCategoryDescendantIds } from "../utils/getCategoryDescendantIds";

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

          brandId: product.type === "branded" ? product.brand_id : undefined,

          parentProductId:
            product.type === "branded" ? product.parent_product_id : undefined,

          barcode: product.type === "branded" ? product.barcode : undefined,

          notes: product.notes,
          isVerified: product.is_verified,
          source: product.source,

          rawOrCookedDefault: product.raw_or_cooked_default ?? "raw",
        },
      });

      if (product.nutrients) {
        await tx.productNutrient.createMany({
          data: Object.entries(product.nutrients).map(([nutrientId, val]) => ({
            productId: created.id,
            nutrientId,
            valuePer100g: val.value,
            unit: val.unit,
          })),
        });
      }

      return {
        success: true,
        product_id: created.id,
      };
    });
  },

  async searchGeneric(query: string) {
    return prisma.product.findMany({
      where: {
        type: "generic",
        OR: [
          {
            nameEn: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            nameUa: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      take: 10,
      orderBy: {
        nameEn: "asc",
      },
      select: {
        id: true,
        nameEn: true,
        nameUa: true,
        categoryId: true,
        rawOrCookedDefault: true,
      },
    });
  },

  async searchProducts(filters: {
    query?: string;
    type?: "generic" | "branded";
    categoryId?: string;
    brandId?: string;
    page?: number;
    limit?: number;
  }) {
    const { query, type, categoryId, brandId, page = 1, limit = 20 } = filters;

    const where: Prisma.ProductWhereInput = {};

    if (type) where.type = type;

    if (categoryId) {
      const ids = await getCategoryDescendantIds(categoryId);

      where.categoryId = {
        in: ids,
      };
    }

    if (brandId) where.brandId = brandId;

    if (query) {
      where.OR = [
        {
          nameEn: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          nameUa: {
            contains: query,
            mode: "insensitive",
          },
        },
      ];
    }

    const [items, total] = await prisma.$transaction([
      prisma.product.findMany({
        where,
        orderBy: {
          createdAt: "desc",
        },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          brand: true,
          category: true,
        },
      }),

      prisma.product.count({
        where,
      }),
    ]);

    return {
      items: items.map((p) => ({
        product_id: p.id,
        name_en: p.nameEn,
        name_ua: p.nameUa,
        type: p.type,
        category: p.category?.nameUa,
        brand: p.brand
          ? p.brand.country?.toLowerCase() === "україна"
            ? p.brand?.nameUa
            : p.brand.nameEn
          : null,
        is_verified: p.isVerified,
      })),
      total,
      page,
      limit,
    };
  },
};
