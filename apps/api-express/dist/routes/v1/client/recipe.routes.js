"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeClientRouter = RecipeClientRouter;
const express_1 = require("express");
const validate_query_1 = require("../../../middleware/validate-query");
const validate_params_1 = require("../../../middleware/validate-params");
const with_family_1 = require("../../../middleware/with-family");
const recipe_client_search_query_schema_1 = require("../../../modules/recipe/transport/client/schemas/recipe-client-search.query.schema");
const recipe_id_params_schema_1 = require("../../../modules/recipe/transport/admin/schemas/recipe-id.params.schema");
function RecipeClientRouter(controller) {
    const router = (0, express_1.Router)();
    router.use(with_family_1.withFamily);
    router.get("/search", (0, validate_query_1.validateQuery)(recipe_client_search_query_schema_1.RecipeClientSearchQuerySchema), controller.search);
    router.get("/cookbook", (0, validate_query_1.validateQuery)(recipe_client_search_query_schema_1.RecipeClientSearchQuerySchema), controller.cookbook);
    router.post("/:id/favorite", (0, validate_params_1.validateParams)(recipe_id_params_schema_1.RecipeIdParamsSchema), controller.toggleFavorite);
    return router;
}
