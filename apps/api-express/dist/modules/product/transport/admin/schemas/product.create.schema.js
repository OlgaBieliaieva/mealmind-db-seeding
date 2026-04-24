"use strict";
// SECTION ███ PRODUCT API SCHEMA ███
// WHY: validation для API layer
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminCreateProductSchema = exports.BrandSchema = exports.ProductPhotoSchema = exports.NutrientsSchema = exports.NutrientValueSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
/* ---------- constants ---------- */
const PRODUCT_TYPE_VALUES = Object.values(client_1.ProductType);
const PRODUCT_UNIT_VALUES = Object.values(client_1.ProductUnit);
const PRODUCT_STATE_VALUES = Object.values(client_1.ProductState);
const PRODUCT_PHOTO_TYPE_VALUES = Object.values(client_1.ProductPhotoType);
/* ---------- nutrients ---------- */
exports.NutrientValueSchema = zod_1.z.object({
    value: zod_1.z.number().min(0),
    unit: zod_1.z.string(),
});
exports.NutrientsSchema = zod_1.z.record(zod_1.z.string().uuid(), exports.NutrientValueSchema);
/* ---------- photos ---------- */
exports.ProductPhotoSchema = zod_1.z.object({
    type: zod_1.z.enum(PRODUCT_PHOTO_TYPE_VALUES),
    // url: z.string().url(),
    objectName: zod_1.z.string(),
});
/* ---------- brand ---------- */
exports.BrandSchema = zod_1.z.object({
    product_id: zod_1.z.string().uuid().optional(),
    name: zod_1.z.object({
        en: zod_1.z.string(),
        ua: zod_1.z.string(),
    }),
});
/* ---------- base product ---------- */
const BaseProductSchema = zod_1.z.object({
    product_id: zod_1.z.string().uuid().optional(),
    type: zod_1.z.enum(PRODUCT_TYPE_VALUES),
    raw_or_cooked_default: zod_1.z.enum(PRODUCT_STATE_VALUES).optional(),
    unit: zod_1.z.enum(PRODUCT_UNIT_VALUES),
    name: zod_1.z.object({
        en: zod_1.z.string().min(1),
        ua: zod_1.z.string().min(1),
    }),
    category_id: zod_1.z.string().uuid(),
    nutrients: exports.NutrientsSchema.optional(),
    edible_part_pct: zod_1.z.number().min(0).max(100).optional(),
    yield_factor: zod_1.z.number().positive().optional(),
    cooking_loss_pct: zod_1.z.number().min(0).max(100).optional(),
    photos: zod_1.z.array(exports.ProductPhotoSchema).optional(),
    notes: zod_1.z.string().optional(),
    source: zod_1.z.string().optional(),
    is_verified: zod_1.z.boolean().default(false),
});
/* ---------- generic-only ---------- */
const GenericProductSchema = BaseProductSchema.extend({
    type: zod_1.z.literal("generic"),
});
/* ---------- branded-only ---------- */
const BrandedProductSchema = BaseProductSchema.extend({
    type: zod_1.z.literal("branded"),
    brand_id: zod_1.z.string().uuid(),
    barcode: zod_1.z.string().min(8).optional(),
    parent_product_id: zod_1.z.string().uuid().optional(),
});
/* ---------- final product ---------- */
exports.AdminCreateProductSchema = zod_1.z.discriminatedUnion("type", [
    GenericProductSchema,
    BrandedProductSchema,
]);
