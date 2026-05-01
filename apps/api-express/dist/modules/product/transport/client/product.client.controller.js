"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductClientController = void 0;
const product_search_client_presenter_1 = require("./presenters/product-search.client.presenter");
const product_details_client_presenter_1 = require("./presenters/product-details.client.presenter");
class ProductClientController {
    service;
    constructor(service) {
        this.service = service;
    }
    search = async (req, res, next) => {
        try {
            const { familyId, userId } = req.context;
            const raw = req.query;
            const query = {
                ...raw,
                page: Number(raw.page ?? 1),
                limit: Number(raw.limit ?? 20),
            };
            const result = await this.service.searchProducts({
                ...query,
                familyId,
                userId,
            });
            res.json({
                ...result,
                items: result.items.map(product_search_client_presenter_1.presentProductListItemInSearchClient),
            });
        }
        catch (e) {
            next(e);
        }
    };
    toggleFavorite = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { familyId, userId } = req.context;
            const isFavorite = await this.service.toggleFavorite(id, familyId, userId);
            res.json({ isFavorite });
        }
        catch (e) {
            next(e);
        }
    };
    getDetails = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { familyId } = req.context;
            const product = await this.service.getProductDetails(id, {
                familyId,
            });
            res.json((0, product_details_client_presenter_1.presentProductDetails)(product));
        }
        catch (e) {
            next(e);
        }
    };
    getProductRecipes = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { page = "1", limit = "20" } = req.query;
            const { familyId } = req.context;
            const result = await this.service.getProductRecipes({
                productId: id,
                page: Number(page),
                limit: Number(limit),
                familyId,
            });
            res.json(result);
        }
        catch (e) {
            next(e);
        }
    };
}
exports.ProductClientController = ProductClientController;
