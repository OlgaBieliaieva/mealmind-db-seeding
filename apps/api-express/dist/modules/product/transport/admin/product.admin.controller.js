"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductAdminController = void 0;
const map_product_search_query_1 = require("../shared/mappers/map-product-search-query");
const product_admin_presenter_1 = require("./presenters/product.admin.presenter");
class ProductAdminController {
    service;
    constructor(service) {
        this.service = service;
    }
    create = async (req, res, next) => {
        try {
            const created = await this.service.create(req.body);
            res.status(201).json({
                product_id: created.id,
            });
        }
        catch (err) {
            next(err);
        }
    };
    getDetails = async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await this.service.getDetails(id);
            res.json((0, product_admin_presenter_1.presentProductDetailsAdmin)(product));
        }
        catch (err) {
            next(err);
        }
    };
    update = async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            await this.service.update(id, body);
            res.json({ success: true });
        }
        catch (err) {
            next(err);
        }
    };
    search = async (req, res, next) => {
        try {
            const query = (0, map_product_search_query_1.mapProductSearchQuery)(req.query);
            const result = await this.service.searchProducts(query);
            res.json(result);
        }
        catch (e) {
            next(e);
        }
    };
    activate = async (req, res, next) => {
        try {
            const { id } = req.params;
            await this.service.activateProduct(id);
            res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    };
    archive = async (req, res, next) => {
        try {
            const { id } = req.params;
            await this.service.archiveProduct(id);
            res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    };
    restore = async (req, res, next) => {
        try {
            const { id } = req.params;
            await this.service.restoreProduct(id);
            res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    };
    hardDelete = async (req, res, next) => {
        try {
            const { id } = req.params;
            await this.service.deleteHardProduct(id);
            res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    };
    deletePhoto = async (req, res, next) => {
        try {
            const { id, photoId } = req.params;
            await this.service.removePhoto(id, photoId);
            res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    };
    getNutrientsBatch = async (req, res, next) => {
        try {
            const { product_ids } = req.body;
            const result = await this.service.getProductsNutrients(product_ids);
            res.json(result);
        }
        catch (e) {
            next(e);
        }
    };
}
exports.ProductAdminController = ProductAdminController;
