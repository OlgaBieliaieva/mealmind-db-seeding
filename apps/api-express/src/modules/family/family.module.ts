import { PrismaClient } from "@prisma/client";

import { FamilyRepository } from "./domain/family.repository";
import { FamilyService } from "./application/family.service";
import { FamilyClientController } from "./transport/client/family.client.controller";
import { FamilyClientRouter } from "../../routes/v1/client/family.routes";

export function createFamilyModule(prisma: PrismaClient) {
  const repo = new FamilyRepository(prisma);
  const service = new FamilyService(repo);
  const controller = new FamilyClientController(service);

  const clientRouter = FamilyClientRouter(controller);

  return {
    clientRouter,
  };
}
