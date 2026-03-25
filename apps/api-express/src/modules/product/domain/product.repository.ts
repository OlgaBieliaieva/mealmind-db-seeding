import { PrismaClient, ProductUnit, ProductState } from "@prisma/client";
import { AdminCreateProductInput } from "../transport/admin/schemas/product.create.schema";
import { ProductPersistenceAggregate } from "./persistence/product.prisma.types";
import { TempProductPhoto } from "../../product-media/types/product-media.types";

export class ProductRepository {
  constructor(private prisma: PrismaClient) {}

  async create(product: AdminCreateProductInput) {
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
          unit: product.unit as ProductUnit,
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
          rawOrCookedDefault:
            (product.raw_or_cooked_default as ProductState) || "raw",
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

  async findByIdDetailed(
    id: string,
  ): Promise<ProductPersistenceAggregate | null> {
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

  async update(id: string, product: AdminCreateProductInput) {
    return this.prisma.$transaction(async (tx) => {
      await tx.product.update({
        where: { id },
        data: {
          nameEn: product.name.en,
          nameUa: product.name.ua,
          unit: product.unit as ProductUnit,
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

  async delete(id: string) {
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
