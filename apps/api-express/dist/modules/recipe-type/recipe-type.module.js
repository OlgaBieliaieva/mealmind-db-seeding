"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRecipeTypeModule = createRecipeTypeModule;
const recipe_type_repository_1 = require("./domain/recipe-type.repository");
const recipe_type_service_1 = require("./application/recipe-type.service");
const recipe_type_admin_controller_1 = require("./transport/admin/recipe-type.admin.controller");
const recipe_type_routes_1 = require("../../routes/v1/admin/recipe-type.routes");
function createRecipeTypeModule(prisma) {
    const repo = new recipe_type_repository_1.RecipeTypeRepository(prisma);
    const service = new recipe_type_service_1.RecipeTypeService(repo);
    const controller = new recipe_type_admin_controller_1.RecipeTypeAdminController(service);
    const adminRouter = (0, recipe_type_routes_1.RecipeTypeAdminRouter)(controller);
    return {
        adminRouter,
    };
}
