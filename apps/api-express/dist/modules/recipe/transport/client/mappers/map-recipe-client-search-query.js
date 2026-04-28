"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapRecipeClientSearchQuery = mapRecipeClientSearchQuery;
function mapRecipeClientSearchQuery(query) {
    return {
        query: query.query,
        page: query.page ? Number(query.page) : 1,
        limit: query.limit ? Number(query.limit) : 20,
    };
}
