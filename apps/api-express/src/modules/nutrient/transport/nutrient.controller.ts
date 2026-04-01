import { Request, Response, NextFunction } from "express";
import { NutrientQuery } from "../domain/nutrient.repository";
import { presentNutrientReference } from "./admin/presenters/nutrient.presenter";

export class NutrientController {
  constructor(private query: NutrientQuery) {}

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const nutrients = await this.query.getAll();

      res.json(nutrients.map(presentNutrientReference));
    } catch (e) {
      next(e);
    }
  };
}
