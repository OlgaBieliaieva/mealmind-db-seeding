// cuisine.module.ts

import { PrismaClient } from "@prisma/client";

import { CuisineRepository } from "./domain/cuisine.repository";
import { CuisineService } from "./application/cuisine.service";
import { CuisineAdminController } from "./transport/admin/cuisine.admin.controller";

import { CuisineAdminRouter } from "../../routes/v1/admin/cuisine.routes";

export function createCuisineModule(prisma: PrismaClient) {
  const repo = new CuisineRepository(prisma);
  const service = new CuisineService(repo);
  const controller = new CuisineAdminController(service);

  const adminRouter = CuisineAdminRouter(controller);

  return {
    adminRouter,
  };
}
