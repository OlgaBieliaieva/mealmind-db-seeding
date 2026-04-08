import { PrismaClient } from "@prisma/client";

import { DietaryTagRepository } from "./domain/dietary-tag.repository";
import { DietaryTagService } from "./application/dietary-tag.service";
import { DietaryTagAdminController } from "./transport/admin/dietary-tag.admin.controller";

import { DietaryTagAdminRouter } from "../../routes/v1/admin/dietary-tag.routes";

export function createDietaryTagModule(prisma: PrismaClient) {
  const repo = new DietaryTagRepository(prisma);
  const service = new DietaryTagService(repo);
  const controller = new DietaryTagAdminController(service);

  const adminRouter = DietaryTagAdminRouter(controller);

  return {
    adminRouter,
  };
}
