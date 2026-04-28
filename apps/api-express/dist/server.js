"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const error_handler_1 = require("./middleware/error-handler");
const product_module_1 = require("./modules/product/product.module");
const category_module_1 = require("./modules/category/category.module");
const brand_module_1 = require("./modules/brand/brand.module");
const nutrient_module_1 = require("./modules/nutrient/nutrient.module");
const recipe_module_1 = require("./modules/recipe/recipe.module");
const recipe_type_module_1 = require("./modules/recipe-type/recipe-type.module");
const cuisine_module_1 = require("./modules/cuisine/cuisine.module");
const dietary_tag_module_1 = require("./modules/dietary-tag/dietary-tag.module");
const recipe_author_module_1 = require("./modules/recipe-author/recipe-author.module");
const meal_plan_module_1 = require("./modules/meal-plan/meal-plan.module");
const family_module_1 = require("./modules/family/family.module");
const db_1 = require("@mealmind/db");
const PORT = process.env.PORT || 4000;
const app = (0, express_1.default)();
// ADMIN
const productModule = (0, product_module_1.createProductModule)(db_1.prisma);
const categoryModule = (0, category_module_1.createCategoryModule)(db_1.prisma);
const brandModule = (0, brand_module_1.createBrandModule)(db_1.prisma);
const nutrientModule = (0, nutrient_module_1.createNutrientModule)(db_1.prisma);
const recipeModule = (0, recipe_module_1.createRecipeModule)(db_1.prisma);
const recipeTypeModule = (0, recipe_type_module_1.createRecipeTypeModule)(db_1.prisma);
const cuisineModule = (0, cuisine_module_1.createCuisineModule)(db_1.prisma);
const dietaryTagModule = (0, dietary_tag_module_1.createDietaryTagModule)(db_1.prisma);
const recipeAuthorModule = (0, recipe_author_module_1.createRecipeAuthorModule)(db_1.prisma);
// CLIENT
const mealPlanModule = (0, meal_plan_module_1.createMealPlanModule)(db_1.prisma);
const familyModule = (0, family_module_1.createFamilyModule)(db_1.prisma);
const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://mealmind-web-client.vercel.app",
    "https://mealmind-db-seeding.vercel.app",
];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
app.use(express_1.default.json());
// ADMIN
app.use("/api/v1/admin/products", productModule.adminRouter);
app.use("/api/v1/admin/categories", categoryModule.adminRouter);
app.use("/api/v1/admin/brands", brandModule.adminRouter);
app.use("/api/v1/admin/nutrients", nutrientModule.adminRouter);
app.use("/api/v1/admin/recipes", recipeModule.adminRouter);
app.use("/api/v1/admin/recipe-types", recipeTypeModule.adminRouter);
app.use("/api/v1/admin/cuisines", cuisineModule.adminRouter);
app.use("/api/v1/admin/dietary-tags", dietaryTagModule.adminRouter);
app.use("/api/v1/admin/recipe-authors", recipeAuthorModule.adminRouter);
// CLIENT
app.use("/api/v1/client/meal-plans", mealPlanModule.router);
app.use("/api/v1/client/families", familyModule.router);
app.use("/api/v1/client/recipes", recipeModule.clientRouter);
app.use("/api/v1/client/products", productModule.clientRouter);
app.get("/health", (_req, res) => {
    res.json({
        status: "ok",
        service: "api-express",
        time: new Date(),
    });
});
app.get("/test-db", async (_req, res) => {
    const count = await db_1.prisma.product.count();
    res.json({
        products: count,
    });
});
app.use(error_handler_1.errorHandler);
app.listen(PORT, () => {
    console.log(`🚀 API running on http://localhost:${PORT}`);
});
