import { PrismaClient, RecipeStatus } from "@prisma/client";
import { RecipePersistenceAggregate } from "./persistence/recipe.prisma.types";
import { CalculatedNutrient } from "./services/recipe-nutrition.calculator";

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

  async createNutrients(recipeId: string, nutrients: CalculatedNutrient[]) {
    if (!nutrients.length) return;

    await this.prisma.recipeNutrient.createMany({
      data: nutrients.map((n) => ({
        recipeId,
        nutrientId: n.nutrientId,
        valueTotal: n.valueTotal,
        unit: n.unit,
      })),
    });
  }

  async replaceNutrients(recipeId: string, nutrients: CalculatedNutrient[]) {
    await this.prisma.recipeNutrient.deleteMany({
      where: { recipeId },
    });

    if (nutrients.length === 0) return;

    await this.prisma.recipeNutrient.createMany({
      data: nutrients.map((n) => ({
        recipeId,
        nutrientId: n.nutrientId,
        valueTotal: n.valueTotal,
        unit: n.unit,
      })),
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
                nutrients: true,
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

  async updateStatus(id: string, status: RecipeStatus) {
    return this.prisma.recipe.update({
      where: { id },
      data: { status },
    });
  }

  async deleteHard(id: string) {
    return this.prisma.$transaction(async (tx) => {
      await tx.recipeIngredient.deleteMany({ where: { recipeId: id } });
      await tx.recipeStep.deleteMany({ where: { recipeId: id } });
      await tx.recipeCuisine.deleteMany({ where: { recipeId: id } });
      await tx.recipeDietaryTag.deleteMany({ where: { recipeId: id } });
      await tx.recipeVideo.deleteMany({ where: { recipeId: id } });

      await tx.recipeNutrient.deleteMany({ where: { recipeId: id } });

      await tx.recipe.delete({ where: { id } });
    });
  }
}
