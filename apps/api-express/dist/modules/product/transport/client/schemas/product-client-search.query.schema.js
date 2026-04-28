"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductClientSearchQuerySchema = void 0;
const zod_1 = require("zod");
exports.ProductClientSearchQuerySchema = zod_1.z.object({
    query: zod_1.z.string().trim().optional(),
    page: zod_1.z.coerce.number().min(1).default(1),
    limit: zod_1.z.coerce.number().min(1).max(50).default(20),
});
