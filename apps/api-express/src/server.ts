import "dotenv/config";
import express from "express";
import cors from "cors";
import { createProductModule } from "./modules/product/product.module";

import { prisma } from "./db/prisma";

const app = express();

const productModule = createProductModule(prisma);

app.use(cors());
app.use(express.json());

app.use("/api/v1/products", productModule.adminRouter);

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
