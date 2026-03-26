import { PrismaClient } from "@prisma/client";

import { ProductRepository } from "./domain/product.repository";
import { ProductSearchQuery } from "./domain/queries/product-search.query";
import { ProductValidationQuery } from "./domain/queries/product-validation.query";

import { ProductService } from "./application/product.service";

import { ProductAdminController } from "./transport/admin/product.admin.controller";
import { ProductAdminRouter } from "../../routes/v1/admin/product.routes";

export function createProductModule(prisma: PrismaClient) {
  const repo = new ProductRepository(prisma);
  const searchQuery = new ProductSearchQuery(prisma);
  const validationQuery = new ProductValidationQuery(prisma);

  const service = new ProductService(repo, searchQuery, validationQuery);

  const controller = new ProductAdminController(service);

  const adminRouter = ProductAdminRouter(controller);

  return {
    adminRouter,
  };
}
