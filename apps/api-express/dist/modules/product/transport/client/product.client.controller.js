"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductClientController = void 0;
const product_search_client_presenter_1 = require("./presenters/product-search.client.presenter");
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
            const result = await this.service.searchProductsClient({
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
}
exports.ProductClientController = ProductClientController;
