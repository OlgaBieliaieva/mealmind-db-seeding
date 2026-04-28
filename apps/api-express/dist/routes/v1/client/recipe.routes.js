"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeClientRouter = RecipeClientRouter;
const express_1 = require("express");
const validate_query_1 = require("../../../middleware/validate-query");
const recipe_client_search_query_schema_1 = require("../../../modules/recipe/transport/client/schemas/recipe-client-search.query.schema");
function RecipeClientRouter(controller) {
    const router = (0, express_1.Router)();
    router.get("/search", (0, validate_query_1.validateQuery)(recipe_client_search_query_schema_1.RecipeClientSearchQuerySchema), controller.search);
    return router;
}
