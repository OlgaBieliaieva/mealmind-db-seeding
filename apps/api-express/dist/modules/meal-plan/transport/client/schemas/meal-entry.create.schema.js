"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealEntriesBulkCreateSchema = exports.MealEntryCreateSchema = void 0;
const zod_1 = require("zod");
exports.MealEntryCreateSchema = zod_1.z
    .object({
    date: zod_1.z.string(),
    userId: zod_1.z.string().uuid(),
    mealTypeId: zod_1.z.string().uuid(),
    recipeId: zod_1.z.string().uuid().optional(),
    productId: zod_1.z.string().uuid().optional(),
    amount: zod_1.z.number().positive(),
    unit: zod_1.z.enum(["g", "ml", "portion"]),
})
    .refine((data) => data.recipeId || data.productId, {
    message: "Either recipeId or productId is required",
})
    .refine((data) => !(data.recipeId && data.productId), {
    message: "Only one of recipeId or productId allowed",
});
exports.MealEntriesBulkCreateSchema = zod_1.z.object({
    entries: zod_1.z.array(exports.MealEntryCreateSchema).min(1),
});
