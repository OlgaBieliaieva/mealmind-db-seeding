"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRecipeAuthorModule = createRecipeAuthorModule;
const recipe_author_repository_1 = require("./domain/recipe-author.repository");
const recipe_author_service_1 = require("./application/recipe-author.service");
const recipe_author_controller_1 = require("./transport/recipe-author.controller");
const recipe_author_routes_1 = require("../../routes/v1/admin/recipe-author.routes");
function createRecipeAuthorModule(prisma) {
    const repo = new recipe_author_repository_1.RecipeAuthorRepository(prisma);
    const service = new recipe_author_service_1.RecipeAuthorService(repo);
    const controller = new recipe_author_controller_1.RecipeAuthorController(service);
    const adminRouter = (0, recipe_author_routes_1.RecipeAuthorRouter)(controller);
    return {
        adminRouter,
    };
}
