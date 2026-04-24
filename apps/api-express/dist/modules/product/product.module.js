"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductModule = createProductModule;
const product_repository_1 = require("./domain/product.repository");
const product_search_query_1 = require("./domain/queries/product-search.query");
const product_validation_query_1 = require("./domain/queries/product-validation.query");
const product_service_1 = require("./application/product.service");
const product_admin_controller_1 = require("./transport/admin/product.admin.controller");
const product_routes_1 = require("../../routes/v1/admin/product.routes");
function createProductModule(prisma) {
    const repo = new product_repository_1.ProductRepository(prisma);
    const searchQuery = new product_search_query_1.ProductSearchQuery(prisma);
    const validationQuery = new product_validation_query_1.ProductValidationQuery(prisma);
    const service = new product_service_1.ProductService(repo, searchQuery, validationQuery);
    const controller = new product_admin_controller_1.ProductAdminController(service);
    const adminRouter = (0, product_routes_1.ProductAdminRouter)(controller);
    return {
        adminRouter,
    };
}
