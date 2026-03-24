import { PrismaClient } from "@prisma/client";
import { ProductRepository } from "./product.repository";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { createProductRouter } from "./product.routes";

export function createProductModule(prisma: PrismaClient) {
  const repo = new ProductRepository(prisma);
  const service = new ProductService(repo, prisma);
  const controller = new ProductController(service);

  const router = createProductRouter(controller);

  return {
    router,
  };
}
