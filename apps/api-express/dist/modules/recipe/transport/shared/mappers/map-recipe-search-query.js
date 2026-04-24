"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapRecipeSearchQuery = mapRecipeSearchQuery;
function mapRecipeSearchQuery(query) {
    return {
        query: query.query,
        recipe_type_id: query.recipe_type_id,
        cuisine_id: query.cuisine_id,
        dietary_tag_id: query.dietary_tag_id,
        status: query.status,
        page: query.page ? Number(query.page) : 1,
        limit: query.limit ? Number(query.limit) : 20,
    };
}
