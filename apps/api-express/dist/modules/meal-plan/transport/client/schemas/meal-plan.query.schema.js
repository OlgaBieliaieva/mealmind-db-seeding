"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealPlanQuerySchema = void 0;
const zod_1 = require("zod");
exports.MealPlanQuerySchema = zod_1.z.object({
    date: zod_1.z.string().min(1),
});
