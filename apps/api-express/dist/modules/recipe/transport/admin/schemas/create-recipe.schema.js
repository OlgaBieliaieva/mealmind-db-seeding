"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRecipeSchema = void 0;
const zod_1 = require("zod");
const recipe_model_constants_1 = require("../../../constants/recipe-model.constants");
exports.createRecipeSchema = zod_1.z.object({
    recipe: zod_1.z.object({
        title: zod_1.z.string().min(1),
        description: zod_1.z.string().optional(),
        recipe_type_id: zod_1.z.string().uuid().optional(),
        base_servings: zod_1.z.number().min(1),
        base_output_weight_g: zod_1.z.number().min(0),
        output_weight_mode: zod_1.z.enum(["auto", "manual"]).default("auto"),
        difficulty: zod_1.z
            .enum([
            recipe_model_constants_1.RECIPE_DIFFICULTY.EASY,
            recipe_model_constants_1.RECIPE_DIFFICULTY.MEDIUM,
            recipe_model_constants_1.RECIPE_DIFFICULTY.HARD,
        ])
            .optional(),
        prep_time_min: zod_1.z.number().optional(),
        cook_time_min: zod_1.z.number().optional(),
        recipe_author_id: zod_1.z.string().uuid().optional(),
        photo_url: zod_1.z.string().url().optional(),
    }),
    ingredients: zod_1.z.array(zod_1.z.object({
        product_id: zod_1.z.string().uuid(),
        quantity_g: zod_1.z.number().positive(),
        is_optional: zod_1.z.boolean(),
        order_index: zod_1.z.number(),
    })),
    steps: zod_1.z.array(zod_1.z.object({
        step_number: zod_1.z.number(),
        instruction: zod_1.z.string(),
        timer_sec: zod_1.z.number().optional(),
    })),
    cuisine_ids: zod_1.z.array(zod_1.z.string().uuid()),
    dietary_tag_ids: zod_1.z.array(zod_1.z.string().uuid()),
});
