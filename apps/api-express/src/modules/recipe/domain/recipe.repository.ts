import { PrismaClient } from "@prisma/client";
import { RecipePersistenceAggregate } from "./persistence/recipe.prisma.types";

export class RecipeRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: Parameters<typeof this.prisma.recipe.create>[0]["data"]) {
    return this.prisma.recipe.create({
      data,
      include: {
        ingredients: true,
        steps: true,
        cuisines: true,
        dietaryTags: true,
      },
    });
  }

  async findByIdDetailed(
    id: string,
  ): Promise<RecipePersistenceAggregate | null> {
    return this.prisma.recipe.findUnique({
      where: { id },
      include: {
        recipeType: true,
        ingredients: {
          include: {
            product: {
              include: {
                brand: true,
              },
            },
          },
        },
        steps: true,
        cuisines: {
          include: { cuisine: true },
        },
        dietaryTags: {
          include: { dietaryTag: true },
        },
        author: true,
        videos: {
          include: { author: true },
        },
        nutrients: true,
      },
    });
  }

  async deleteHard(id: string) {
    return this.prisma.$transaction(async (tx) => {
      await tx.recipeIngredient.deleteMany({ where: { recipeId: id } });
      await tx.recipeStep.deleteMany({ where: { recipeId: id } });
      await tx.recipeCuisine.deleteMany({ where: { recipeId: id } });
      await tx.recipeDietaryTag.deleteMany({ where: { recipeId: id } });
      await tx.recipeVideo.deleteMany({ where: { recipeId: id } });

      await tx.recipe.delete({ where: { id } });
    });
  }
}
