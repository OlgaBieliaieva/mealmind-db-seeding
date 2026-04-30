"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const prisma_relations_helper_1 = require("./persistence/prisma-relations.helper");
class ProductRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(product) {
        return this.prisma.$transaction(async (tx) => {
            const parent = product.type === "branded" && product.parent_product_id
                ? await tx.product.findUnique({
                    where: { id: product.parent_product_id },
                    include: { nutrients: true },
                })
                : null;
            const ediblePartPct = product.edible_part_pct ?? parent?.ediblePartPct ?? undefined;
            const cookingLossPct = product.cooking_loss_pct ?? parent?.cookingLossPct ?? undefined;
            const yieldFactor = product.yield_factor ?? parent?.yieldFactor ?? undefined;
            const created = await tx.product.create({
                data: {
                    nameEn: product.name.en,
                    nameUa: product.name.ua,
                    type: product.type,
                    unit: product.unit,
                    categoryId: product.category_id,
                    brandId: product.type === "branded"
                        ? (product.brand_id ?? undefined)
                        : undefined,
                    parentProductId: product.type === "branded"
                        ? (product.parent_product_id ?? undefined)
                        : undefined,
                    barcode: product.type === "branded"
                        ? (product.barcode ?? undefined)
                        : undefined,
                    notes: product.notes,
                    isVerified: product.is_verified,
                    source: product.source,
                    rawOrCookedDefault: product.raw_or_cooked_default || "raw",
                    ediblePartPct,
                    cookingLossPct,
                    yieldFactor,
                },
            });
            const parentNutrients = parent?.nutrients
                ? Object.fromEntries(parent.nutrients.map((n) => [
                    n.nutrientId,
                    {
                        value: n.valuePer100g,
                        unit: n.unit ?? "g",
                    },
                ]))
                : {};
            const finalNutrients = {
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
    async activate(id) {
        await this.prisma.product.update({
            where: { id },
            data: {
                status: "active",
                archivedAt: null,
            },
        });
    }
    async archive(id) {
        await this.prisma.product.update({
            where: { id },
            data: {
                status: "archived",
                archivedAt: new Date(),
            },
        });
    }
    async restore(id) {
        await this.prisma.product.update({
            where: { id },
            data: {
                status: "active",
                archivedAt: null,
            },
        });
    }
    async findByIdDetailed(id) {
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
    async updatePartial(id, input) {
        const data = {};
        if (input.name) {
            data.nameEn = input.name.en;
            data.nameUa = input.name.ua;
        }
        if (input.unit !== undefined) {
            data.unit = input.unit;
        }
        if (input.raw_or_cooked_default !== undefined) {
            data.rawOrCookedDefault = input.raw_or_cooked_default;
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
        const brandRelation = (0, prisma_relations_helper_1.connectRelation)(input.brand_id);
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
    async replaceNutrients(productId, nutrients) {
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
    async removePhoto(productId, photoId) {
        const photo = await this.prisma.productPhoto.findFirst({
            where: {
                id: photoId,
                productId,
            },
        });
        if (!photo)
            throw new Error("Photo not found");
        await this.prisma.productPhoto.delete({
            where: { id: photoId },
        });
    }
    async deletePhotos(photoIds) {
        await this.prisma.productPhoto.deleteMany({
            where: {
                id: { in: photoIds },
            },
        });
    }
    async detachChildren(parentId) {
        await this.prisma.product.updateMany({
            where: {
                parentProductId: parentId,
            },
            data: {
                parentProductId: null,
            },
        });
    }
    async deleteHard(id) {
        return this.prisma.$transaction(async (tx) => {
            await tx.productNutrient.deleteMany({ where: { productId: id } });
            await tx.productPhoto.deleteMany({ where: { productId: id } });
            await tx.productTag.deleteMany({ where: { productId: id } });
            await tx.productFavorite.deleteMany({ where: { productId: id } });
            await tx.product.delete({ where: { id } });
        });
    }
    // product-media
    async attachPhotos(productId, photos) {
        const safePhotos = photos.filter((p) => !!p.url);
        await this.prisma.productPhoto.createMany({
            data: safePhotos.map((p) => ({
                productId,
                url: p.url,
                objectName: p.objectName,
                photoType: p.type,
            })),
        });
    }
    async findNutrientsByProductIds(productIds) {
        return this.prisma.productNutrient
            .findMany({
            where: {
                productId: {
                    in: productIds,
                },
            },
            include: {
                nutrient: true,
            },
        })
            .then((rows) => rows.map((r) => ({
            product_id: r.productId,
            nutrient_id: r.nutrientId,
            value: r.valuePer100g,
            unit: r.unit ?? "g",
        })));
    }
    async toggleFavorite(productId, familyId, userId) {
        const existing = await this.prisma.productFavorite.findUnique({
            where: {
                productId_familyId: {
                    productId,
                    familyId,
                },
            },
        });
        if (existing) {
            await this.prisma.productFavorite.delete({
                where: { id: existing.id },
            });
            return false;
        }
        await this.prisma.productFavorite.create({
            data: {
                productId,
                familyId,
                createdBy: userId,
            },
        });
        return true;
    }
}
exports.ProductRepository = ProductRepository;
