import {
  Prisma,
  PrismaClient,
  ProductUnit,
  ProductState,
} from "@prisma/client";
import { AdminCreateProductInput } from "../transport/admin/schemas/product.create.schema";
import { AdminUpdateProductInput } from "../transport/admin/schemas/product.update.schema";
import { ProductPersistenceAggregate } from "./persistence/product.prisma.types";
import { TempProductPhoto } from "../../product-media/types/product-media.types";
import { connectRelation } from "./persistence/prisma-relations.helper";

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

      const parentNutrients: Record<string, { value: number; unit: string }> =
        parent?.nutrients
          ? Object.fromEntries(
              parent.nutrients.map((n) => [
                n.nutrientId,
                {
                  value: n.valuePer100g,
                  unit: n.unit ?? "g",
                },
              ]),
            )
          : {};

      const finalNutrients: Record<string, { value: number; unit: string }> = {
        ...parentNutrients,
        ...(product.nutrients ?? {}),
      };

      if (Object.keys(finalNutrients).length > 0) {
        await tx.productNutrient.createMany({
          data: Object.entries(finalNutrients).map(([nid, v]) => ({
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

  async activate(id: string) {
    await this.prisma.product.update({
      where: { id },
      data: {
        status: "active",
        archivedAt: null,
      },
    });
  }

  async archive(id: string) {
    await this.prisma.product.update({
      where: { id },
      data: {
        status: "archived",
        archivedAt: new Date(),
      },
    });
  }

  async restore(id: string) {
    await this.prisma.product.update({
      where: { id },
      data: {
        status: "active",
        archivedAt: null,
      },
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

  async updatePartial(id: string, input: Partial<AdminUpdateProductInput>) {
    const data: Prisma.ProductUpdateInput = {};

    if (input.name) {
      data.nameEn = input.name.en;
      data.nameUa = input.name.ua;
    }

    if (input.unit !== undefined) {
      data.unit = input.unit as ProductUnit;
    }

    if (input.raw_or_cooked_default !== undefined) {
      data.rawOrCookedDefault = input.raw_or_cooked_default as ProductState;
    }

    if (input.category_id !== undefined) {
      data.category = {
        connect: { id: input.category_id },
      };
    }

    if (input.edible_part_pct !== undefined) {
      data.ediblePartPct = input.edible_part_pct;
    }

    if (input.yield_factor !== undefined) {
      data.yieldFactor = input.yield_factor;
    }

    if (input.cooking_loss_pct !== undefined) {
      data.cookingLossPct = input.cooking_loss_pct;
    }

    if (input.notes !== undefined) {
      data.notes = input.notes;
    }

    if (input.source !== undefined) {
      data.source = input.source;
    }

    if (input.barcode !== undefined) {
      data.barcode = input.barcode;
    }

    const brandRelation = connectRelation(input.brand_id);

    if (brandRelation) {
      data.brand = brandRelation;
    }

    if (input.is_verified !== undefined) {
      data.isVerified = input.is_verified;
    }

    await this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async replaceNutrients(
    productId: string,
    nutrients: Record<string, { value: number; unit: string }>,
  ) {
    await this.prisma.$transaction(async (tx) => {
      await tx.productNutrient.deleteMany({
        where: { productId },
      });

      await tx.productNutrient.createMany({
        data: Object.entries(nutrients).map(([nid, v]) => ({
          productId,
          nutrientId: nid,
          valuePer100g: v.value,
          unit: v.unit,
        })),
      });
    });
  }

  async removePhoto(productId: string, photoId: string) {
    const photo = await this.prisma.productPhoto.findFirst({
      where: {
        id: photoId,
        productId,
      },
    });

    if (!photo) throw new Error("Photo not found");

    await this.prisma.productPhoto.delete({
      where: { id: photoId },
    });
  }

  async deletePhotos(photoIds: string[]) {
    await this.prisma.productPhoto.deleteMany({
      where: {
        id: { in: photoIds },
      },
    });
  }

  async detachChildren(parentId: string) {
    await this.prisma.product.updateMany({
      where: {
        parentProductId: parentId,
      },
      data: {
        parentProductId: null,
      },
    });
  }

  async deleteHard(id: string) {
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
