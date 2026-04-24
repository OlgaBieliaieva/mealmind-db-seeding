"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSearchQuerySchema = void 0;
const zod_1 = require("zod");
exports.ProductSearchQuerySchema = zod_1.z.object({
    query: zod_1.z.string().optional(),
    type: zod_1.z.enum(["generic", "branded"]).optional(),
    categoryId: zod_1.z.string().uuid().optional(),
    brandId: zod_1.z.string().uuid().optional(),
    page: zod_1.z.coerce.number().min(1).default(1),
    limit: zod_1.z.coerce.number().min(1).max(100).default(20),
});
