import { Prisma } from "@prisma/client";
import { RecipeRepository } from "../domain/recipe.repository";
import { RecipeSearchQuery } from "../domain/queries/recipe-search.query";
import { RecipeSearchQuery as Filters } from "../transport/admin/schemas/recipe-search.query.schema";
import { presentRecipeListItem } from "../transport/admin/presenters/recipe.list.presenter";
import {
  BadRequestError,
  NotFoundError,
} from "../../../shared/errors/http-errors";
import { CreateRecipeDTO } from "../dto/create-recipe.dto";

export class RecipeService {
  constructor(
    private repo: RecipeRepository,
    private searchQuery: RecipeSearchQuery,
  ) {}

  async create(data: CreateRecipeDTO) {
    if (!data.recipe.title) {
      throw new BadRequestError("TITLE_REQUIRED", "Title is required");
    }

    return this.repo.create({
      title: data.recipe.title,
      description: data.recipe.description,

      baseServings: data.recipe.base_servings,
      baseOutputWeightG: data.recipe.base_output_weight_g,

      difficulty: data.recipe.difficulty,

      prepTimeMin: data.recipe.prep_time_min,
      cookTimeMin: data.recipe.cook_time_min,

      recipeType: data.recipe.recipe_type_id
        ? {
            connect: { id: data.recipe.recipe_type_id },
          }
        : undefined,

      ingredients: {
        create: data.ingredients.map((i) => ({
          productId: i.product_id,
          quantityG: i.quantity_g,
          isOptional: i.is_optional,
          orderIndex: i.order_index,
        })),
      },

      steps: {
        create: data.steps.map((s) => ({
          stepNumber: s.step_number,
          instruction: s.instruction,
          timerSec: s.timer_sec,
        })),
      },

      cuisines: {
        create: data.cuisine_ids.map((id) => ({
          cuisineId: id,
        })),
      },

      dietaryTags: {
        create: data.dietary_tag_ids.map((id) => ({
          dietaryTagId: id,
        })),
      },
    });
  }

  async searchRecipes(filters: Filters) {
    const {
      query,
      recipe_type_id,
      cuisine_id,
      dietary_tag_id,
      status,
      page = 1,
      limit = 20,
    } = filters;

    const where: Prisma.RecipeWhereInput = {};

    if (status) where.status = status;

    if (recipe_type_id) {
      where.recipeTypeId = recipe_type_id;
    }

    if (query) {
      where.OR = [
        { title: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ];
    }

    if (cuisine_id) {
      where.cuisines = {
        some: {
          cuisineId: cuisine_id,
        },
      };
    }

    if (dietary_tag_id) {
      where.dietaryTags = {
        some: {
          dietaryTagId: dietary_tag_id,
        },
      };
    }

    const { items, total } = await this.searchQuery.searchRecipes(
      where,
      page,
      limit,
    );

    return {
      items: items.map(presentRecipeListItem),
      total,
      page,
      limit,
    };
  }

  async getDetails(id: string) {
    const recipe = await this.repo.findByIdDetailed(id);

    if (!recipe) {
      throw new NotFoundError("RECIPE_NOT_FOUND", "Recipe not found");
    }

    return recipe;
  }

  async deleteHard(id: string) {
    const recipe = await this.repo.findByIdDetailed(id);

    if (!recipe) {
      throw new NotFoundError("RECIPE_NOT_FOUND", "Recipe not found");
    }

    if (recipe.status !== "archived") {
      throw new BadRequestError(
        "ONLY_ARCHIVED_CAN_DELETE",
        "Recipe must be archived before deletion",
      );
    }

    await this.repo.deleteHard(id);
  }
}
