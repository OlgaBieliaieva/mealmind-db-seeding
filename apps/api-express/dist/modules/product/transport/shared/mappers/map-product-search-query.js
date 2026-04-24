"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapProductSearchQuery = mapProductSearchQuery;
function mapProductSearchQuery(query) {
    return {
        page: query.page ? Number(query.page) : 1,
        limit: query.limit ? Number(query.limit) : 20,
        query: typeof query.query === "string" ? query.query.trim() : undefined,
        type: query.type === "generic" || query.type === "branded"
            ? query.type
            : undefined,
        categoryId: typeof query.categoryId === "string" ? query.categoryId : undefined,
        brandId: typeof query.brandId === "string" ? query.brandId : undefined,
    };
}
