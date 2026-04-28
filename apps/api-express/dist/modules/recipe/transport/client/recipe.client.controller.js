"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeClientController = void 0;
const map_recipe_client_search_query_1 = require("./mappers/map-recipe-client-search-query");
const recipe_client_presenter_1 = require("./presenters/recipe.client.presenter");
class RecipeClientController {
    service;
    constructor(service) {
        this.service = service;
    }
    search = async (req, res, next) => {
        try {
            const query = (0, map_recipe_client_search_query_1.mapRecipeClientSearchQuery)(req.query);
            const result = await this.service.searchRecipesClient(query);
            res.json({
                ...result,
                items: result.items.map(recipe_client_presenter_1.presentRecipeListItemClient),
            });
        }
        catch (e) {
            next(e);
        }
    };
}
exports.RecipeClientController = RecipeClientController;
