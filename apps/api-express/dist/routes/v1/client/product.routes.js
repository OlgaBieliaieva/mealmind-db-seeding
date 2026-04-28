"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductClientRouter = ProductClientRouter;
const express_1 = require("express");
const validate_query_1 = require("../../../middleware/validate-query");
const product_client_search_query_schema_1 = require("../../../modules/product/transport/client/schemas/product-client-search.query.schema");
function ProductClientRouter(controller) {
    const router = (0, express_1.Router)();
    router.get("/search", (0, validate_query_1.validateQuery)(product_client_search_query_schema_1.ProductClientSearchQuerySchema), controller.search);
    return router;
}
