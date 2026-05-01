import { PrismaClient } from "@prisma/client";

import { ProductRepository } from "./domain/product.repository";
import { ProductSearchQuery } from "./domain/queries/product-search.query";
import { ProductValidationQuery } from "./domain/queries/product-validation.query";
import { ProductAdminService } from "./application/product.admin.service";
import { ProductClientService } from "./application/product.client.service";
import { ProductAdminController } from "./transport/admin/product.admin.controller";
import { ProductAdminRouter } from "../../routes/v1/admin/product.routes";
import { ProductClientController } from "./transport/client/product.client.controller";
import { ProductClientRouter } from "../../routes/v1/client/product.routes";

export function createProductModule(prisma: PrismaClient) {
  const repo = new ProductRepository(prisma);
  const searchQuery = new ProductSearchQuery(prisma);
  const validationQuery = new ProductValidationQuery(prisma);

  const adminService = new ProductAdminService(
    repo,
    searchQuery,
    validationQuery,
  );
  const clientService = new ProductClientService(repo, searchQuery);

  const adminController = new ProductAdminController(adminService);
  const clientController = new ProductClientController(clientService);

  const adminRouter = ProductAdminRouter(adminController);
  const clientRouter = ProductClientRouter(clientController);

  return {
    adminRouter,
    clientRouter,
  };
}
