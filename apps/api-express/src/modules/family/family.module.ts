import { PrismaClient } from "@prisma/client";

import { FamilyRepository } from "./domain/family.repository";
import { FamilyService } from "./application/family.service";
import { FamilyController } from "./transport/client/family.controller";
import { FamilyRouter } from "../../routes/v1/client/family.routes";

export function createFamilyModule(prisma: PrismaClient) {
  const repo = new FamilyRepository(prisma);
  const service = new FamilyService(repo);
  const controller = new FamilyController(service);

  const router = FamilyRouter(controller);

  return {
    router,
  };
}
