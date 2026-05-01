"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductClientRouter = ProductClientRouter;
const express_1 = require("express");
const with_family_1 = require("../../../middleware/with-family");
const validate_query_1 = require("../../../middleware/validate-query");
const validate_params_1 = require("../../../middleware/validate-params");
const product_client_search_query_schema_1 = require("../../../modules/product/transport/client/schemas/product-client-search.query.schema");
const product_id_params_schema_1 = require("../../../modules/product/transport/shared/schemas/product-id.params.schema");
function ProductClientRouter(controller) {
    const router = (0, express_1.Router)();
    router.use(with_family_1.withFamily);
    router.get("/search", (0, validate_query_1.validateQuery)(product_client_search_query_schema_1.ProductClientSearchQuerySchema), controller.search);
    router.get("/:id", (0, validate_params_1.validateParams)(product_id_params_schema_1.ProductIdParamsSchema), controller.getDetails);
    router.get("/:id/recipes", (0, validate_params_1.validateParams)(product_id_params_schema_1.ProductIdParamsSchema), controller.getProductRecipes);
    router.post("/:id/favorite", (0, validate_params_1.validateParams)(product_id_params_schema_1.ProductIdParamsSchema), controller.toggleFavorite);
    return router;
}
