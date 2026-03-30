import { PrismaClient } from "@prisma/client";

import { BrandRepository } from "./domain/brand.repository";
import { BrandService } from "./application/brand.service";
import { BrandController } from "./transport/brand.controller";
import { BrandRouter } from "../../routes/v1/admin/brand.routes";

export function createBrandModule(prisma: PrismaClient) {
  const repo = new BrandRepository(prisma);
  const service = new BrandService(repo);
  const controller = new BrandController(service);

  const adminRouter = BrandRouter(controller);

  return {
    adminRouter,
  };
}
