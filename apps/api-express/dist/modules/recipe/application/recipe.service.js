"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeService = void 0;
const client_1 = require("@prisma/client");
const recipe_list_presenter_1 = require("../transport/admin/presenters/recipe.list.presenter");
const http_errors_1 = require("../../../shared/errors/http-errors");
const recipe_nutrition_calculator_1 = require("../domain/services/recipe-nutrition.calculator");
class RecipeService {
    repo;
    searchQuery;
    constructor(repo, searchQuery) {
        this.repo = repo;
        this.searchQuery = searchQuery;
    }
    async create(data) {
        if (!data.recipe.title) {
            throw new http_errors_1.BadRequestError("TITLE_REQUIRED", "Title is required");
        }
        const isAuto = data.recipe.output_weight_mode !== "manual";
        let baseOutputWeight = data.recipe.base_output_weight_g;
        if (isAuto) {
            baseOutputWeight = data.ingredients.reduce((sum, i) => sum + i.quantity_g, 0);
        }
        const recipe = await this.repo.create({
            title: data.recipe.title,
            description: data.recipe.description,
            baseServings: data.recipe.base_servings,
            baseOutputWeightG: baseOutputWeight,
            difficulty: data.recipe.difficulty,
            prepTimeMin: data.recipe.prep_time_min,
            cookTimeMin: data.recipe.cook_time_min,
            author: data.recipe.recipe_author_id
                ? { connect: { id: data.recipe.recipe_author_id } }
                : undefined,
            photoUrl: data.recipe.photo_url,
            recipeType: data.recipe.recipe_type_id
                ? { connect: { id: data.recipe.recipe_type_id } }
                : undefined,
            ingredients: data.ingredients.length > 0
                ? {
                    create: data.ingredients.map((i) => ({
                        productId: i.product_id,
                        quantityG: i.quantity_g,
                        isOptional: i.is_optional,
                        orderIndex: i.order_index,
                    })),
                }
                : undefined,
            steps: data.steps.length > 0
                ? {
                    create: data.steps.map((s) => ({
                        stepNumber: s.step_number,
                        instruction: s.instruction,
                        timerSec: s.timer_sec,
                    })),
                }
                : undefined,
            cuisines: data.cuisine_ids.length > 0
                ? {
                    create: data.cuisine_ids.map((id) => ({
                        cuisineId: id,
                    })),
                }
                : undefined,
            dietaryTags: data.dietary_tag_ids.length > 0
                ? {
                    create: data.dietary_tag_ids.map((id) => ({
                        dietaryTagId: id,
                    })),
                }
                : undefined,
        });
        // 🔥 1. дістаємо повний рецепт з нутрієнтами продуктів
        const detailed = await this.repo.findByIdDetailed(recipe.id);
        if (detailed) {
            // 🔥 2. мапимо в формат calculator
            const ingredientsForCalc = detailed.ingredients.map((i) => ({
                quantityG: i.quantityG,
                product: {
                    nutrients: i.product.nutrients.map((n) => ({
                        nutrientId: n.nutrientId,
                        valuePer100g: n.valuePer100g,
                        unit: n.unit,
                    })),
                },
            }));
            // 🔥 3. рахуємо нутрієнти
            const calculated = recipe_nutrition_calculator_1.RecipeNutritionCalculator.calculate(ingredientsForCalc);
            // 🔥 4. зберігаємо
            await this.repo.createNutrients(recipe.id, calculated);
        }
        return recipe;
    }
    async searchRecipes(filters) {
        const { query, recipe_type_id, cuisine_id, dietary_tag_id, status, page = 1, limit = 20, } = filters;
        const where = {};
        if (status)
            where.status = status;
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
        const { items, total } = await this.searchQuery.searchRecipes(where, page, limit);
        return {
            items: items.map(recipe_list_presenter_1.presentRecipeListItem),
            total,
            page,
            limit,
        };
    }
    async getDetails(id) {
        const recipe = await this.repo.findByIdDetailed(id);
        if (!recipe) {
            throw new http_errors_1.NotFoundError("RECIPE_NOT_FOUND", "Recipe not found");
        }
        return recipe;
    }
    async publish(id) {
        return this.repo.updateStatus(id, client_1.RecipeStatus.published);
    }
    async archive(id) {
        return this.repo.updateStatus(id, client_1.RecipeStatus.archived);
    }
    async restore(id) {
        return this.repo.updateStatus(id, client_1.RecipeStatus.draft);
    }
    async deleteHard(id) {
        const recipe = await this.repo.findByIdDetailed(id);
        if (!recipe) {
            throw new http_errors_1.NotFoundError("RECIPE_NOT_FOUND", "Recipe not found");
        }
        if (recipe.status !== "archived") {
            throw new http_errors_1.BadRequestError("ONLY_ARCHIVED_CAN_DELETE", "Recipe must be archived before deletion");
        }
        await this.repo.deleteHard(id);
    }
    async update(id, data) {
        const existing = await this.repo.findByIdDetailed(id);
        if (!existing) {
            throw new http_errors_1.NotFoundError("RECIPE_NOT_FOUND", "Recipe not found");
        }
        // 🔥 1. оновлюємо основні дані
        await this.repo.update(id, {
            title: data.recipe.title,
            description: data.recipe.description,
            baseServings: data.recipe.base_servings,
            baseOutputWeightG: data.recipe.base_output_weight_g,
            difficulty: data.recipe.difficulty,
            prepTimeMin: data.recipe.prep_time_min,
            cookTimeMin: data.recipe.cook_time_min,
            photoUrl: data.recipe.photo_url,
            recipeType: data.recipe.recipe_type_id
                ? { connect: { id: data.recipe.recipe_type_id } }
                : { disconnect: true },
            author: data.recipe.recipe_author_id
                ? { connect: { id: data.recipe.recipe_author_id } }
                : { disconnect: true },
        });
        // 🔥 2. replace ingredients
        await this.repo.replaceIngredients(id, data.ingredients);
        // 🔥 3. replace steps
        await this.repo.replaceSteps(id, data.steps);
        // 🔥 4. replace cuisines
        await this.repo.replaceCuisines(id, data.cuisine_ids);
        // 🔥 5. replace dietary tags
        await this.repo.replaceDietaryTags(id, data.dietary_tag_ids);
        // 🔥 6. перерахунок нутрієнтів
        const detailed = await this.repo.findByIdDetailed(id);
        if (detailed) {
            const ingredientsForCalc = detailed.ingredients.map((i) => ({
                quantityG: i.quantityG,
                product: {
                    nutrients: i.product.nutrients.map((n) => ({
                        nutrientId: n.nutrientId,
                        valuePer100g: n.valuePer100g,
                        unit: n.unit,
                    })),
                },
            }));
            const calculated = recipe_nutrition_calculator_1.RecipeNutritionCalculator.calculate(ingredientsForCalc);
            await this.repo.replaceNutrients(id, calculated);
        }
    }
    // CLIENT
    async searchRecipesClient(filters) {
        const { query, page = 1, limit = 20 } = filters;
        const where = {
            status: "published",
        };
        if (query) {
            where.OR = [
                { title: { contains: query, mode: "insensitive" } },
                { description: { contains: query, mode: "insensitive" } },
            ];
        }
        const { items, total } = await this.searchQuery.searchRecipes(where, page, limit);
        return {
            items,
            total,
            page,
            limit,
        };
    }
}
exports.RecipeService = RecipeService;
