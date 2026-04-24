"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealEntryCreateSchema = void 0;
const zod_1 = require("zod");
exports.MealEntryCreateSchema = zod_1.z
    .object({
    date: zod_1.z.string(),
    userId: zod_1.z.string().uuid(),
    mealTypeId: zod_1.z.string().uuid(),
    recipeId: zod_1.z.string().uuid().optional(),
    productId: zod_1.z.string().uuid().optional(),
    amount: zod_1.z.number().positive(),
})
    .refine((data) => data.recipeId || data.productId, {
    message: "Either recipeId or productId is required",
})
    .refine((data) => !(data.recipeId && data.productId), {
    message: "Only one of recipeId or productId allowed",
});
