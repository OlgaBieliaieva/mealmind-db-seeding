"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductAdminRouter = ProductAdminRouter;
const express_1 = require("express");
const validate_body_1 = require("../../../middleware/validate-body");
const validate_params_1 = require("../../../middleware/validate-params");
const validate_query_1 = require("../../../middleware/validate-query");
const product_create_schema_1 = require("../../../modules/product/transport/admin/schemas/product.create.schema");
const product_update_schema_1 = require("../../../modules/product/transport/admin/schemas/product.update.schema");
const product_id_params_schema_1 = require("../../../modules/product/transport/shared/schemas/product-id.params.schema");
const product_photo_params_1 = require("../../../modules/product/transport/admin/schemas/product-photo.params");
const product_search_query_schema_1 = require("../../../modules/product/transport/admin/schemas/product-search.query.schema");
function ProductAdminRouter(controller) {
    const router = (0, express_1.Router)();
    router.post("/", (0, validate_body_1.validateBody)(product_create_schema_1.AdminCreateProductSchema), controller.create);
    router.patch("/:id", (0, validate_params_1.validateParams)(product_id_params_schema_1.ProductIdParamsSchema), (0, validate_body_1.validateBody)(product_update_schema_1.AdminUpdateProductSchema), controller.update);
    // router.get("/", controller.search);
    router.get("/search", (0, validate_query_1.validateQuery)(product_search_query_schema_1.ProductSearchQuerySchema), controller.search);
    router.get("/:id", (0, validate_params_1.validateParams)(product_id_params_schema_1.ProductIdParamsSchema), controller.getDetails);
    router.post("/:id/activate", (0, validate_params_1.validateParams)(product_id_params_schema_1.ProductIdParamsSchema), controller.activate);
    router.post("/:id/archive", (0, validate_params_1.validateParams)(product_id_params_schema_1.ProductIdParamsSchema), controller.archive);
    router.post("/:id/restore", (0, validate_params_1.validateParams)(product_id_params_schema_1.ProductIdParamsSchema), controller.restore);
    router.delete("/:id/hard", (0, validate_params_1.validateParams)(product_id_params_schema_1.ProductIdParamsSchema), controller.hardDelete);
    router.delete("/:id/photos/:photoId", (0, validate_params_1.validateParams)(product_photo_params_1.ProductPhotoParamsSchema), controller.deletePhoto);
    router.post("/nutrients", controller.getNutrientsBatch);
    return router;
}
