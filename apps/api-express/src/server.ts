import "dotenv/config";
import express from "express";
import cors from "cors";
import { createProductModule } from "./modules/product/product.module";
import { createCategoryModule } from "./modules/category/category.module";
import { createBrandModule } from "./modules/brand/brand.module";
import { createNutrientModule } from "./modules/nutrient/nutrient.module";

import { prisma } from "./db/prisma";

const app = express();

const productModule = createProductModule(prisma);
const categoryModule = createCategoryModule(prisma);
const brandModule = createBrandModule(prisma);
const nutrientModule = createNutrientModule(prisma);

app.use(cors());
app.use(express.json());

app.use("/api/v1/admin/products", productModule.adminRouter);
app.use("/api/v1/admin/categories", categoryModule.adminRouter);
app.use("/api/v1/admin/brands", brandModule.adminRouter);
app.use("/api/v1/admin/nutrients", nutrientModule.adminRouter);

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

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`🚀 API running on http://localhost:${PORT}`);
});
