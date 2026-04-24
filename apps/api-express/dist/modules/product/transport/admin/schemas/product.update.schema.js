"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUpdateProductSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
/* name */
const NameSchema = zod_1.z.object({
    en: zod_1.z.string().min(1),
    ua: zod_1.z.string().min(1),
});
/* nutrients */
const NutrientValueSchema = zod_1.z.object({
    value: zod_1.z.number().min(0),
    unit: zod_1.z.string(),
});
const NutrientsSchema = zod_1.z.record(zod_1.z.string().uuid(), NutrientValueSchema);
/* photos */
const ProductPhotoUploadSchema = zod_1.z.object({
    type: zod_1.z.nativeEnum(client_1.ProductPhotoType),
    objectName: zod_1.z.string(),
});
/* UPDATE */
exports.AdminUpdateProductSchema = zod_1.z.object({
    // FULLY MUTABLE
    name: NameSchema.optional(),
    unit: zod_1.z.nativeEnum(client_1.ProductUnit).optional(),
    raw_or_cooked_default: zod_1.z.nativeEnum(client_1.ProductState).optional(),
    // SEMI MUTABLE
    category_id: zod_1.z.string().uuid().optional(),
    edible_part_pct: zod_1.z.number().min(0).max(100).optional(),
    yield_factor: zod_1.z.number().positive().optional(),
    cooking_loss_pct: zod_1.z.number().min(0).max(100).optional(),
    notes: zod_1.z.string().optional(),
    source: zod_1.z.string().optional(),
    is_verified: zod_1.z.boolean().optional(),
    barcode: zod_1.z.string().optional(),
    brand_id: zod_1.z.string().uuid().optional(),
    // SNAPSHOT REPLACE
    nutrients: NutrientsSchema.optional(),
    // ⭐ MEDIA MUTATION SET
    photos: zod_1.z
        .object({
        add: zod_1.z.array(ProductPhotoUploadSchema).optional(),
        remove: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    })
        .optional(),
});
