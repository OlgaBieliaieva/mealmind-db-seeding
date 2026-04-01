import { PrismaClient } from "@prisma/client";

import { CategoryRepository } from "./domain/category.repository";
import { CategoryService } from "./application/category.service";
import { CategoryController } from "./transport/category.controller";

import { CategoryRouter } from "../../routes/v1/admin/category.routes";

export function createCategoryModule(prisma: PrismaClient) {
  const repo = new CategoryRepository(prisma);

  const service = new CategoryService(repo);

  const controller = new CategoryController(service);

  const adminRouter = CategoryRouter(controller);

  return {
    adminRouter,
  };
}
