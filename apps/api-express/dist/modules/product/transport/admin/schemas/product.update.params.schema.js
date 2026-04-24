"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUpdateProductParamsSchema = void 0;
const zod_1 = require("zod");
exports.AdminUpdateProductParamsSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
});
