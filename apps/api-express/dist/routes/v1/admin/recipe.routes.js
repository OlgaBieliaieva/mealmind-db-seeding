"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeAdminRouter = RecipeAdminRouter;
const express_1 = require("express");
const validate_body_1 = require("../../../middleware/validate-body");
const validate_params_1 = require("../../../middleware/validate-params");
const validate_query_1 = require("../../../middleware/validate-query");
const create_recipe_schema_1 = require("../../../modules/recipe/transport/admin/schemas/create-recipe.schema");
const recipe_id_params_schema_1 = require("../../../modules/recipe/transport/admin/schemas/recipe-id.params.schema");
const recipe_search_query_schema_1 = require("../../../modules/recipe/transport/admin/schemas/recipe-search.query.schema");
function RecipeAdminRouter(controller) {
    const router = (0, express_1.Router)();
    router.post("/", (0, validate_body_1.validateBody)(create_recipe_schema_1.createRecipeSchema), controller.create);
    router.get("/search", (0, validate_query_1.validateQuery)(recipe_search_query_schema_1.RecipeSearchQuerySchema), controller.search);
    router.get("/:id", (0, validate_params_1.validateParams)(recipe_id_params_schema_1.RecipeIdParamsSchema), controller.getDetails);
    router.patch("/:id", (0, validate_params_1.validateParams)(recipe_id_params_schema_1.RecipeIdParamsSchema), (0, validate_body_1.validateBody)(create_recipe_schema_1.createRecipeSchema), controller.update);
    router.post("/:id/publish", (0, validate_params_1.validateParams)(recipe_id_params_schema_1.RecipeIdParamsSchema), controller.publish);
    router.post("/:id/archive", (0, validate_params_1.validateParams)(recipe_id_params_schema_1.RecipeIdParamsSchema), controller.archive);
    router.post("/:id/restore", (0, validate_params_1.validateParams)(recipe_id_params_schema_1.RecipeIdParamsSchema), controller.restore);
    router.delete("/:id/hard", (0, validate_params_1.validateParams)(recipe_id_params_schema_1.RecipeIdParamsSchema), controller.deleteHard);
    return router;
}
