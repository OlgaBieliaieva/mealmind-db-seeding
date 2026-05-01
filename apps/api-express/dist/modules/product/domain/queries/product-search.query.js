"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSearchQuery = void 0;
class ProductSearchQuery {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async searchProducts(where, page, limit, options, context) {
        if (!options?.includeArchived) {
            where.status = "active";
        }
        const [items, total] = await this.prisma.$transaction([
            this.prisma.product.findMany({
                where,
                orderBy: { createdAt: "desc" },
                skip: (page - 1) * limit,
                take: limit,
                include: {
                    brand: true,
                    category: true,
                    nutrients: {
                        include: {
                            nutrient: true,
                        },
                    },
                    photos: true,
                    ...(context && {
                        favorites: {
                            where: {
                                familyId: context.familyId,
                                createdBy: context.userId,
                            },
                            select: { id: true },
                        },
                    }),
                },
            }),
            this.prisma.product.count({ where }),
        ]);
        return { items, total };
    }
    async searchGeneric(query) {
        return this.prisma.product.findMany({
            where: {
                type: "generic",
                OR: [
                    { nameEn: { contains: query, mode: "insensitive" } },
                    { nameUa: { contains: query, mode: "insensitive" } },
                ],
            },
            take: 10,
            orderBy: { nameEn: "asc" },
            select: {
                id: true,
                nameEn: true,
                nameUa: true,
                categoryId: true,
                rawOrCookedDefault: true,
            },
        });
    }
    async loadCategorySubtreeIds(categoryId) {
        const ids = [categoryId];
        const children = await this.prisma.category.findMany({
            where: { parentId: categoryId },
            select: { id: true },
        });
        for (const child of children) {
            const childIds = await this.loadCategorySubtreeIds(child.id);
            ids.push(...childIds);
        }
        return ids;
    }
    async searchRecipesByProduct(params) {
        const { productId, page, limit, familyId } = params;
        const where = {
            ingredients: {
                some: {
                    OR: [
                        { productId: productId },
                        {
                            product: {
                                parentProductId: productId,
                            },
                        },
                    ],
                },
            },
        };
        const [items, total] = await this.prisma.$transaction([
            this.prisma.recipe.findMany({
                where,
                orderBy: { createdAt: "desc" },
                skip: (page - 1) * limit,
                take: limit,
                include: {
                    recipeType: true,
                    author: true,
                    cuisines: {
                        include: { cuisine: true },
                    },
                    nutrients: {
                        include: { nutrient: true },
                    },
                    favorites: {
                        where: {
                            familyId,
                        },
                        select: { id: true },
                    },
                },
            }),
            this.prisma.recipe.count({ where }),
        ]);
        return { items, total };
    }
}
exports.ProductSearchQuery = ProductSearchQuery;
