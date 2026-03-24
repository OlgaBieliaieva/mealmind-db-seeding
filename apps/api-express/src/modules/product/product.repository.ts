import { PrismaClient, Prisma } from "@prisma/client";
import { ProductInput } from "./dto/product.input";
import { ProductWithRelations } from "./types/product.types";
import { TempProductPhoto } from "../product-media/types/product-media.types";

export class ProductRepository {
  constructor(private prisma: PrismaClient) {}

  async createProduct(product: ProductInput) {
    return this.prisma.$transaction(async (tx) => {
      const parent =
        product.type === "branded" && product.parent_product_id
          ? await tx.product.findUnique({
              where: { id: product.parent_product_id },
              include: { nutrients: true },
            })
          : null;

      const ediblePartPct =
        product.edible_part_pct ?? parent?.ediblePartPct ?? undefined;

      const cookingLossPct =
        product.cooking_loss_pct ?? parent?.cookingLossPct ?? undefined;

      const yieldFactor =
        product.yield_factor ?? parent?.yieldFactor ?? undefined;

      const created = await tx.product.create({
        data: {
          nameEn: product.name.en,
          nameUa: product.name.ua,
          type: product.type,
          unit: product.unit,
          categoryId: product.category_id,
          brandId:
            product.type === "branded"
              ? (product.brand_id ?? undefined)
              : undefined,
          parentProductId:
            product.type === "branded"
              ? (product.parent_product_id ?? undefined)
              : undefined,
          barcode:
            product.type === "branded"
              ? (product.barcode ?? undefined)
              : undefined,
          notes: product.notes,
          isVerified: product.is_verified,
          source: product.source,
          rawOrCookedDefault: product.raw_or_cooked_default ?? "raw",
          ediblePartPct,
          cookingLossPct,
          yieldFactor,
        },
      });

      if (product.nutrients && Object.keys(product.nutrients).length) {
        await tx.productNutrient.createMany({
          data: Object.entries(product.nutrients).map(([nid, v]) => ({
            productId: created.id,
            nutrientId: nid,
            valuePer100g: v.value,
            unit: v.unit,
          })),
        });
      }

      return created;
    });
  }

  async findManyProductsWithCount(
    where: Prisma.ProductWhereInput,
    page: number,
    limit: number,
  ) {
    const [items, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          brand: true,
          category: true,
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    return { items, total };
  }

  async findGenericProductByQuery(query: string) {
    return this.prisma.product.findMany({
      where: {
        type: "generic",
        OR: [
          { nameEn: { contains: query, mode: "insensitive" } },
          { nameUa: { contains: query, mode: "insensitive" } },
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
  }

  async findByIdDetailed(id: string): Promise<ProductWithRelations | null> {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        brand: true,
        category: { include: { parent: true } },
        parentProduct: true,
        nutrients: { include: { nutrient: true } },
        photos: true,
      },
    });
  }

  async updateProduct(id: string, product: ProductInput) {
    return this.prisma.$transaction(async (tx) => {
      await tx.product.update({
        where: { id },
        data: {
          nameEn: product.name.en,
          nameUa: product.name.ua,
          unit: product.unit,
          notes: product.notes,
          source: product.source,
          isVerified: product.is_verified,
          cookingLossPct: product.cooking_loss_pct,
          ediblePartPct: product.edible_part_pct,
          yieldFactor: product.yield_factor,
          ...(product.type === "branded"
            ? {
                barcode: product.barcode,
                brandId: product.brand_id,
              }
            : {}),
        },
      });

      await tx.productNutrient.deleteMany({
        where: { productId: id },
      });

      if (product.nutrients && Object.keys(product.nutrients).length) {
        await tx.productNutrient.createMany({
          data: Object.entries(product.nutrients).map(([nid, v]) => ({
            productId: id,
            nutrientId: nid,
            valuePer100g: v.value,
            unit: v.unit,
          })),
        });
      }
    });
  }

  async deleteProduct(id: string) {
    return this.prisma.$transaction(async (tx) => {
      await tx.productNutrient.deleteMany({ where: { productId: id } });
      await tx.productPhoto.deleteMany({ where: { productId: id } });
      await tx.productTag.deleteMany({ where: { productId: id } });
      await tx.productFavorite.deleteMany({ where: { productId: id } });
      await tx.product.delete({ where: { id } });
    });
  }

  // product-media
  async attachPhotos(productId: string, photos: TempProductPhoto[]) {
    const safePhotos = photos.filter(
      (p): p is TempProductPhoto & { url: string } => !!p.url,
    );

    await this.prisma.productPhoto.createMany({
      data: safePhotos.map((p) => ({
        productId,
        url: p.url,
        objectName: p.objectName,
        photoType: p.type,
      })),
    });
  }
}
