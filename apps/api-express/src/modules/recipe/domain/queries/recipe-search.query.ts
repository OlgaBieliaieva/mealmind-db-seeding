import { PrismaClient, Prisma } from "@prisma/client";

export class RecipeSearchQuery {
  constructor(private prisma: PrismaClient) {}

  async searchRecipes(
    where: Prisma.RecipeWhereInput,
    page: number,
    limit: number,
  ) {
    const [items, total] = await this.prisma.$transaction([
      this.prisma.recipe.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          recipeType: true,
          author: true,
        },
      }),
      this.prisma.recipe.count({ where }),
    ]);

    return { items, total };
  }
}