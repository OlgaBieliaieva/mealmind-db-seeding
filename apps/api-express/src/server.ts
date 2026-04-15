import "dotenv/config";
import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/error-handler";
import { createProductModule } from "./modules/product/product.module";
import { createCategoryModule } from "./modules/category/category.module";
import { createBrandModule } from "./modules/brand/brand.module";
import { createNutrientModule } from "./modules/nutrient/nutrient.module";
import { createRecipeModule } from "./modules/recipe/recipe.module";
import { createRecipeTypeModule } from "./modules/recipe-type/recipe-type.module";
import { createCuisineModule } from "./modules/cuisine/cuisine.module";
import { createDietaryTagModule } from "./modules/dietary-tag/dietary-tag.module";
import { createRecipeAuthorModule } from "./modules/recipe-author/recipe-author.module";

import { prisma } from "./db/prisma";

const PORT = 4000;

const app = express();

const productModule = createProductModule(prisma);
const categoryModule = createCategoryModule(prisma);
const brandModule = createBrandModule(prisma);
const nutrientModule = createNutrientModule(prisma);
const recipeModule = createRecipeModule(prisma);
const recipeTypeModule = createRecipeTypeModule(prisma);
const cuisineModule = createCuisineModule(prisma);
const dietaryTagModule = createDietaryTagModule(prisma);
const recipeAuthorModule = createRecipeAuthorModule(prisma);

app.use(cors());
app.use(express.json());

app.use("/api/v1/admin/products", productModule.adminRouter);
app.use("/api/v1/admin/categories", categoryModule.adminRouter);
app.use("/api/v1/admin/brands", brandModule.adminRouter);
app.use("/api/v1/admin/nutrients", nutrientModule.adminRouter);
app.use("/api/v1/admin/recipes", recipeModule.adminRouter);
app.use("/api/v1/admin/recipe-types", recipeTypeModule.adminRouter);
app.use("/api/v1/admin/cuisines", cuisineModule.adminRouter);
app.use("/api/v1/admin/dietary-tags", dietaryTagModule.adminRouter);
app.use("/api/v1/admin/recipe-authors", recipeAuthorModule.adminRouter);

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "api-express",
    time: new Date(),
  });
});

app.get("/test-db", async (_req, res) => {
  const count = await prisma.product.count();

  res.json({
    products: count,
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 API running on http://localhost:${PORT}`);
});
