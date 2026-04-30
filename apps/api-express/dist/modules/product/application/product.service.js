"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const http_errors_1 = require("../../../shared/errors/http-errors");
const product_admin_presenter_1 = require("../transport/admin/presenters/product.admin.presenter");
const product_media_service_1 = require("../domain/product-media.service");
const product_media_worker_1 = require("../../product-media/product-media.worker");
const product_search_helper_1 = require("../domain/queries/product-search.helper");
class ProductService {
    repo;
    searchQuery;
    validationQuery;
    constructor(repo, searchQuery, validationQuery) {
        this.repo = repo;
        this.searchQuery = searchQuery;
        this.validationQuery = validationQuery;
    }
    async getDetails(id) {
        const product = await this.repo.findByIdDetailed(id);
        if (!product) {
            throw new Error("Product not found");
        }
        return product;
    }
    async create(input) {
        // ⭐ VALIDATION через query layer
        const categoryExists = await this.validationQuery.categoryExists(input.category_id);
        if (!categoryExists) {
            throw new Error("Category not found");
        }
        if (input.type === "branded") {
            const brandExists = await this.validationQuery.brandExists(input.brand_id);
            if (!brandExists) {
                throw new Error("Brand not found");
            }
        }
        // ⭐ MEDIA SPLIT
        const { photos, ...rest } = input;
        const created = await this.repo.create(rest);
        if (input.is_verified) {
            await this.repo.activate(created.id);
        }
        // ⭐ MEDIA LIFECYCLE
        if (photos?.length) {
            const validPhotos = photos.filter((p) => !!p.objectName);
            if (validPhotos.length) {
                const finalized = await (0, product_media_service_1.finalizeProductPhotos)(created.id, validPhotos);
                await this.repo.attachPhotos(created.id, finalized);
                Promise.all(finalized.map((p) => (0, product_media_worker_1.generateProductPhotoVariants)(created.id, p.objectName)));
            }
        }
        return created;
    }
    async activateProduct(id) {
        const product = await this.repo.findByIdDetailed(id);
        if (!product)
            throw new Error("Product not found");
        if (product.status === "active")
            return;
        await this.repo.activate(id);
    }
    async archiveProduct(id) {
        const product = await this.repo.findByIdDetailed(id);
        if (!product)
            throw new Error("Product not found");
        if (product.status === "archived")
            return;
        // ⭐ IMPORTANT BUSINESS RULE
        if (product.type === "generic") {
            await this.repo.detachChildren(product.id);
        }
        await this.repo.archive(id);
    }
    async restoreProduct(id) {
        const product = await this.repo.findByIdDetailed(id);
        if (!product)
            throw new Error("Product not found");
        if (product.status !== "archived") {
            throw new Error("Only archived product can be restored");
        }
        await this.repo.restore(id);
    }
    async update(id, input) {
        const existing = await this.repo.findByIdDetailed(id);
        if (!existing) {
            throw new Error("Product not found");
        }
        // ⭐ CATEGORY RULE
        if (existing.parentProductId && input.category_id !== undefined) {
            throw new Error("Cannot change category for inherited product");
        }
        // ⭐ BRAND RULE
        if (existing.type === "generic" && input.brand_id !== undefined) {
            throw new Error("Generic product cannot have brand");
        }
        if (existing.type === "branded") {
            if (input.brand_id === null) {
                throw new Error("Brand cannot be removed");
            }
            if (input.brand_id) {
                const exists = await this.validationQuery.brandExists(input.brand_id);
                if (!exists)
                    throw new Error("Brand not found");
            }
        }
        const { nutrients, photos, ...rest } = input;
        await this.repo.updatePartial(id, rest);
        // ⭐ nutrients snapshot replace
        if (nutrients !== undefined) {
            await this.repo.replaceNutrients(id, nutrients);
        }
        // ⭐ media mutation
        if (photos?.add?.length) {
            const finalized = await (0, product_media_service_1.finalizeProductPhotos)(id, photos.add);
            await this.repo.attachPhotos(id, finalized);
            Promise.all(finalized.map((p) => (0, product_media_worker_1.generateProductPhotoVariants)(id, p.objectName)));
        }
        if (photos?.remove?.length) {
            await this.repo.deletePhotos(photos.remove);
        }
    }
    async deleteHardProduct(id) {
        const product = await this.repo.findByIdDetailed(id);
        if (!product)
            throw new http_errors_1.NotFoundError("PRODUCT_NOT_FOUND", "Product not found");
        if (product.status !== "archived") {
            throw new http_errors_1.BadRequestError("ONLY_ARCHIVED_CAN_DELETE", "Product must be archived before deletion");
        }
        // TODO later
        // check recipe usage
        // check plan usage
        await this.repo.deleteHard(id);
    }
    async searchProducts(filters) {
        const { query, type, categoryId, brandId, page = 1, limit = 20 } = filters;
        const where = {};
        if (type)
            where.type = type;
        if (categoryId) {
            const ids = await this.searchQuery.loadCategorySubtreeIds(categoryId);
            where.categoryId = { in: ids };
        }
        if (brandId)
            where.brandId = brandId;
        if (query) {
            where.OR = [
                { nameEn: { contains: query, mode: "insensitive" } },
                { nameUa: { contains: query, mode: "insensitive" } },
            ];
        }
        const { items, total } = await this.searchQuery.searchProducts(where, page, limit, {
            includeArchived: true,
        });
        return {
            items: items.map(product_admin_presenter_1.presentProductListItem),
            total,
            page,
            limit,
        };
    }
    async genericSearch(query) {
        if (!query || query.trim().length < 2) {
            return [];
        }
        return this.searchQuery.searchGeneric(query);
    }
    async removePhoto(productId, photoId) {
        await this.repo.removePhoto(productId, photoId);
    }
    async getProductsNutrients(productIds) {
        if (!productIds.length)
            return {};
        const rows = await this.repo.findNutrientsByProductIds(productIds);
        const result = {};
        for (const row of rows) {
            if (!result[row.product_id]) {
                result[row.product_id] = {};
            }
            result[row.product_id][row.nutrient_id] = {
                value: row.value,
                unit: row.unit,
            };
        }
        return result;
    }
    // CLIENT
    async searchProductsClient(filters) {
        const { query, page = 1, limit = 20, userId, familyId } = filters;
        const baseWhere = {};
        const where = (0, product_search_helper_1.buildProductSearchWhere)(baseWhere, query);
        const { items, total } = await this.searchQuery.searchProducts(where, page, limit, {
            includeArchived: false,
        }, { userId, familyId });
        return {
            items,
            total,
            page,
            limit,
        };
    }
    async toggleFavorite(productId, familyId, userId) {
        return this.repo.toggleFavorite(productId, familyId, userId);
    }
}
exports.ProductService = ProductService;
