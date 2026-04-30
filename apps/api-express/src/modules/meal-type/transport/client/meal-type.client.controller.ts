import { Request, Response, NextFunction } from "express";
import { MealTypeService } from "../../application/meal-type.service";
import { presentMealTypeClient } from "./presenters/meal-type.client.presenter";

export class MealTypeClientController {
  constructor(private service: MealTypeService) {}

  getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const items = await this.service.getAll();

      res.json(items.map(presentMealTypeClient));
    } catch (e) {
      next(e);
    }
  };
}
