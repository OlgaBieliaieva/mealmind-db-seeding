"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeClientController = void 0;
const map_recipe_client_search_query_1 = require("./mappers/map-recipe-client-search-query");
const recipe_search_client_presenter_1 = require("./presenters/recipe-search.client.presenter");
const recipe_details_client_presenter_1 = require("./presenters/recipe-details.client.presenter");
class RecipeClientController {
    service;
    constructor(service) {
        this.service = service;
    }
    search = async (req, res, next) => {
        try {
            const { familyId, userId } = req.context;
            const query = (0, map_recipe_client_search_query_1.mapRecipeClientSearchQuery)(req.query);
            const result = await this.service.searchRecipesClient({
                ...query,
                familyId,
                userId,
            });
            res.json({
                ...result,
                items: result.items.map(recipe_search_client_presenter_1.presentRecipeListItemInSearchClient),
            });
        }
        catch (e) {
            next(e);
        }
    };
    cookbook = async (req, res, next) => {
        try {
            const queryBase = (0, map_recipe_client_search_query_1.mapRecipeClientSearchQuery)(req.query);
            const { familyId, userId } = req.context;
            const result = await this.service.getCookbookRecipes({
                ...queryBase,
                familyId,
                userId,
            });
            res.json({
                ...result,
                items: result.items.map(recipe_search_client_presenter_1.presentRecipeListItemInSearchClient),
            });
        }
        catch (e) {
            next(e);
        }
    };
    toggleFavorite = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { familyId, userId } = req.context;
            const isFavorite = await this.service.toggleFavorite(id, familyId, userId);
            res.json({ isFavorite });
        }
        catch (e) {
            next(e);
        }
    };
    getDetails = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { familyId, userId } = req.context;
            const recipe = await this.service.getRecipeDetails(id, {
                familyId,
                userId,
            });
            res.json((0, recipe_details_client_presenter_1.presentRecipeDetails)(recipe));
        }
        catch (e) {
            next(e);
        }
    };
}
exports.RecipeClientController = RecipeClientController;
