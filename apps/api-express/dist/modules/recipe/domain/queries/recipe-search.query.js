"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeSearchQuery = void 0;
class RecipeSearchQuery {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async searchRecipes(where, page, limit, context) {
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
                        include: {
                            cuisine: true,
                        },
                    },
                    nutrients: {
                        include: {
                            nutrient: true,
                        },
                    },
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
            this.prisma.recipe.count({ where }),
        ]);
        return { items, total };
    }
}
exports.RecipeSearchQuery = RecipeSearchQuery;
