"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRecipeModule = createRecipeModule;
const recipe_routes_1 = require("../../routes/v1/admin/recipe.routes");
const recipe_repository_1 = require("./domain/recipe.repository");
const recipe_service_1 = require("./application/recipe.service");
const recipe_routes_2 = require("../../routes/v1/client/recipe.routes");
const recipe_admin_controller_1 = require("./transport/admin/recipe.admin.controller");
const recipe_client_controller_1 = require("./transport/client/recipe.client.controller");
const recipe_search_query_1 = require("./domain/queries/recipe-search.query");
function createRecipeModule(prisma) {
    const repo = new recipe_repository_1.RecipeRepository(prisma);
    const searchQuery = new recipe_search_query_1.RecipeSearchQuery(prisma);
    const service = new recipe_service_1.RecipeService(repo, searchQuery);
    const adminController = new recipe_admin_controller_1.RecipeAdminController(service);
    const clientController = new recipe_client_controller_1.RecipeClientController(service);
    return {
        adminRouter: (0, recipe_routes_1.RecipeAdminRouter)(adminController),
        clientRouter: (0, recipe_routes_2.RecipeClientRouter)(clientController),
    };
}
