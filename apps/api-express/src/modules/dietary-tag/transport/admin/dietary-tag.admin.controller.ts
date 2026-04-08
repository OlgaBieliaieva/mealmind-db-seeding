import { Request, Response, NextFunction } from "express";
import { DietaryTagService } from "../../application/dietary-tag.service";
import { presentDietaryTagList } from "./dietary-tag.presenter";

export class DietaryTagAdminController {
  constructor(private service: DietaryTagService) {}

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tags = await this.service.getAll();

      res.json(presentDietaryTagList(tags));
    } catch (e) {
      next(e);
    }
  };
}
