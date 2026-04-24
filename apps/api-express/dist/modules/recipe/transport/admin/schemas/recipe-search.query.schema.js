"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeSearchQuerySchema = void 0;
const zod_1 = require("zod");
exports.RecipeSearchQuerySchema = zod_1.z.object({
    query: zod_1.z.string().optional(),
    recipe_type_id: zod_1.z.string().uuid().optional(),
    cuisine_id: zod_1.z.string().uuid().optional(),
    dietary_tag_id: zod_1.z.string().uuid().optional(),
    status: zod_1.z.enum(["draft", "ready", "published", "archived"]).optional(),
    page: zod_1.z.coerce.number().min(1).default(1),
    limit: zod_1.z.coerce.number().min(1).max(100).default(20),
});
