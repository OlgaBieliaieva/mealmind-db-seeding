import { Request, Response, NextFunction } from "express";
import { FamilyService } from "../../application/family.service";
import { RequestWithContext } from "../../../../shared/types/request-with-context";
import { presentFamilyMember } from "./presenters/family.client.presenter";

export class FamilyClientController {
  constructor(private service: FamilyService) {}

  getFamily = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { familyId } = (req as RequestWithContext).context;

      const result = await this.service.getFamily(familyId);

      res.json(result);
    } catch (e) {
      next(e);
    }
  };

  getMembers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { familyId } = (req as RequestWithContext).context;

      const users = await this.service.getMembers(familyId);

      res.json(users.map(presentFamilyMember));
    } catch (e) {
      next(e);
    }
  };
}
