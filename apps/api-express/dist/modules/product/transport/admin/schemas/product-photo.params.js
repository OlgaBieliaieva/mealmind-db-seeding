"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductPhotoParamsSchema = void 0;
const zod_1 = require("zod");
exports.ProductPhotoParamsSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    photoId: zod_1.z.string().uuid(),
});
