import { Prisma, PrismaClient, RecipeStatus } from "@prisma/client";
import { RecipePersistenceAggregate } from "./persistence/recipe.prisma.types";
import { CalculatedNutrient } from "./services/recipe-nutrition.calculator";
import { CreateRecipeDTO } from "../dto/create-recipe.dto";

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

  async update(id: string, data: Prisma.RecipeUpdateInput) {
    return this.prisma.recipe.update({
      where: { id },
      data,
    });
  }

  async replaceIngredients(
    recipeId: string,
    ingredients: CreateRecipeDTO["ingredients"],
  ) {
    await this.prisma.recipeIngredient.deleteMany({
      where: { recipeId },
    });

    if (!ingredients.length) return;

    await this.prisma.recipeIngredient.createMany({
      data: ingredients.map((i) => ({
        recipeId,
        productId: i.product_id,
        quantityG: i.quantity_g,
        isOptional: i.is_optional,
        orderIndex: i.order_index,
      })),
    });
  }

  async replaceSteps(recipeId: string, steps: CreateRecipeDTO["steps"]) {
    await this.prisma.recipeStep.deleteMany({
      where: { recipeId },
    });

    if (!steps.length) return;

    await this.prisma.recipeStep.createMany({
      data: steps.map((s) => ({
        recipeId,
        stepNumber: s.step_number,
        instruction: s.instruction,
      })),
    });
  }

  async replaceCuisines(recipeId: string, cuisineIds: string[]) {
    await this.prisma.recipeCuisine.deleteMany({
      where: { recipeId },
    });

    if (!cuisineIds.length) return;

    await this.prisma.recipeCuisine.createMany({
      data: cuisineIds.map((id) => ({
        recipeId,
        cuisineId: id,
      })),
    });
  }

  async replaceDietaryTags(recipeId: string, tagIds: string[]) {
    await this.prisma.recipeDietaryTag.deleteMany({
      where: { recipeId },
    });

    if (!tagIds.length) return;

    await this.prisma.recipeDietaryTag.createMany({
      data: tagIds.map((id) => ({
        recipeId,
        dietaryTagId: id,
      })),
    });
  }
}
