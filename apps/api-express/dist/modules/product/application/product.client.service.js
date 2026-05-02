"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductClientService = void 0;
const http_errors_1 = require("../../../shared/errors/http-errors");
const product_search_helper_1 = require("../domain/queries/product-search.helper");
const recipe_search_client_presenter_1 = require("../../recipe/transport/client/presenters/recipe-search.client.presenter");
class ProductClientService {
    repo;
    searchQuery;
    constructor(repo, searchQuery) {
        this.repo = repo;
        this.searchQuery = searchQuery;
    }
    async searchProducts(filters) {
        const { query, page, limit, userId, familyId } = filters;
        const where = (0, product_search_helper_1.buildProductSearchWhere)({}, query);
        const { items, total } = await this.searchQuery.searchProducts(where, page, limit, { includeArchived: false }, { familyId, userId });
        return { items, total, page, limit };
    }
    async toggleFavorite(productId, familyId, userId) {
        return this.repo.toggleFavorite(productId, familyId, userId);
    }
    async getProductDetails(id, context) {
        const product = await this.repo.findByIdDetailed(id, context.familyId);
        if (!product) {
            throw new http_errors_1.NotFoundError("PRODUCT_NOT_FOUND", "Product not found");
        }
        return product;
    }
    async getProductRecipes(params) {
        const { items, total } = await this.searchQuery.searchRecipesByProduct(params);
        return {
            items: items.map(recipe_search_client_presenter_1.presentRecipeListItemInSearchClient),
            total,
            page: params.page,
            limit: params.limit,
        };
    }
}
exports.ProductClientService = ProductClientService;
