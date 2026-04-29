import { Router } from "express";
import { withFamily } from "../../../middleware/with-family";
import { FamilyClientController } from "../../../modules/family/transport/client/family.client.controller";

export function FamilyClientRouter(controller: FamilyClientController) {
  const router = Router();

  router.use(withFamily);

  router.get("/", controller.getFamily);
  router.get("/members", controller.getMembers);

  return router;
}
