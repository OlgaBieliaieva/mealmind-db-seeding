import { Request, Response, NextFunction } from "express";
import { RecipeTypeService } from "../../application/recipe-type.service";
import { presentRecipeTypeList } from "./recipe-type.presenter";

export class RecipeTypeAdminController {
  constructor(private service: RecipeTypeService) {}

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getAll();

      res.json(presentRecipeTypeList(data));
    } catch (e) {
      next(e);
    }
  };
}
